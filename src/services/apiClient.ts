import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosHeaders,
} from "axios";

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

type TokenProvider = () => string | undefined;

interface RequestOptions {
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}

interface FileResponse {
  data: Blob;
  headers: AxiosResponse["headers"];
}

interface UploadFileOptions {
  paramName?: string;
  [key: string]: unknown;
}

class ApiClientService {
  private instance: AxiosInstance;
  private tokenProvider?: TokenProvider;

  constructor(config?: ApiClientConfig) {
    this.instance = axios.create({
      baseURL: config?.baseURL ?? "",
      timeout: config?.timeout ?? 15000,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor para inyectar el token automáticamente
    this.instance.interceptors.request.use(
      (config) => {
        const token = this.tokenProvider?.();
        if (token && config.headers) {
          // Manejo compatible con diferentes versiones de axios
          if ("set" in config.headers && typeof config.headers.set === "function") {
            config.headers.set("Authorization", `Bearer ${token}`);
          } else {
            const headers = config.headers as Record<string, string>;
            headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    // Response interceptor para manejo de errores (opcional, puede extenderse)
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  /**
   * Establece el proveedor de token que se usará en todas las peticiones
   * @param provider Función que retorna el token de autorización
   */
  setTokenProvider(provider: TokenProvider | undefined): void {
    this.tokenProvider = provider;
  }

  /**
   * Limpia el proveedor de token
   */
  clearTokenProvider(): void {
    this.tokenProvider = undefined;
  }

  /**
   * Actualiza la configuración por defecto del cliente
   */
  updateDefaults(config: ApiClientConfig): void {
    if (config.baseURL) {
      this.instance.defaults.baseURL = config.baseURL;
    }
    if (config.timeout) {
      this.instance.defaults.timeout = config.timeout;
    }
    if (config.headers) {
      this.instance.defaults.headers = {
        ...this.instance.defaults.headers,
        ...config.headers,
      } as AxiosHeaders;
    }
  }

  private async axiosRequest<T = unknown>({
    method,
    url,
    headers,
    body,
  }: {
    method: string;
    url: string;
    headers?: Record<string, string>;
    body?: unknown;
  }): Promise<AxiosResponse<T>> {
    return await this.instance({
      method,
      headers,
      url,
      data: body,
    });
  }

  /**
   * Realiza una petición GET
   */
  async get<T = unknown>(
    url: string,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await this.axiosRequest<T>({
      method: "GET",
      url,
      headers,
    });
    return response.data;
  }

  /**
   * Realiza una petición POST
   */
  async post<T = unknown>(
    url: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await this.axiosRequest<T>({
      method: "POST",
      url,
      headers,
      body,
    });
    return response.data;
  }

  /**
   * Realiza una petición PUT
   */
  async put<T = unknown>(
    url: string,
    body?: unknown,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await this.axiosRequest<T>({
      method: "PUT",
      url,
      headers,
      body,
    });
    return response.data;
  }

  /**
   * Realiza una petición DELETE
   */
  async del<T = unknown>(
    url: string,
    headers?: Record<string, string>,
  ): Promise<T> {
    const response = await this.axiosRequest<T>({
      method: "DELETE",
      url,
      headers,
    });
    return response.data;
  }

  /**
   * Obtiene un archivo como Blob
   */
  async getFile(
    url: string,
    headers: Record<string, string> = {},
  ): Promise<FileResponse> {
    const response = await this.instance.get<Blob>(url, {
      responseType: "blob",
      headers,
    });
    return {
      data: response.data,
      headers: response.headers,
    };
  }

  /**
   * Obtiene un archivo y retorna su URL como objeto
   */
  async getFileAsUrl(
    url: string,
    headers: Record<string, string> = {},
  ): Promise<string> {
    const { data } = await this.getFile(url, headers);
    const blob = new Blob([data], { type: data.type });
    return URL.createObjectURL(blob);
  }

  /**
   * Abre un archivo en una nueva ventana
   */
  async openFile(url: string, headers?: Record<string, string>): Promise<void> {
    const { data } = await this.getFile(url, headers);
    const urlData = URL.createObjectURL(data);
    window.open(urlData);
  }

  /**
   * Descarga un archivo
   */
  async downloadFile(
    url: string,
    headers?: Record<string, string>,
  ): Promise<void> {
    const { data, headers: dataHeaders } = await this.getFile(url, headers);

    const contentDisposition =
      dataHeaders["content-disposition"] || dataHeaders["Content-Disposition"];
    const fileName = contentDisposition
      ?.split("filename=")[1]
      ?.split(";")[0]
      .replaceAll('"', "");

    const blob = new Blob([data], { type: data.type });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", fileName || "");
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  /**
   * Sube uno o más archivos usando FormData
   */
  async uploadFile<T = unknown>(
    url: string,
    files: FileList | File[],
    headers?: UploadFileOptions,
  ): Promise<T> {
    const formData = new FormData();
    const { paramName = "file", ...newHeaders } = headers || {};

    const fileArray = Array.from(files);
    for (const file of fileArray) {
      formData.append(paramName, file, file.name);
    }

    const response = await this.instance.post<T>(url, formData, {
      headers: newHeaders as Record<string, string>,
    });

    return response.data;
  }
}

// Instancia compartida del cliente
const sharedClient = new ApiClientService();

/**
 * Cliente de API compartido con todas las funciones de HTTP
 */
export const apiClient = sharedClient;

/**
 * Crea una nueva instancia del cliente de API
 */
export const createApiClient = (config?: ApiClientConfig): ApiClientService => {
  return new ApiClientService(config);
};

/**
 * Establece el proveedor de token global para el cliente compartido
 */
export const setApiClientTokenProvider = (
  provider: TokenProvider | undefined,
): void => {
  sharedClient.setTokenProvider(provider);
};

/**
 * Limpia el proveedor de token global
 */
export const clearApiClientTokenProvider = (): void => {
  sharedClient.clearTokenProvider();
};

