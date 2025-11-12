import axios from "axios";
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

export type HttpMethod = "get" | "post" | "put" | "delete" | "patch";

export interface AppApiError {
  message: string;
  code?: string;
  status?: number;
  details?: unknown;
  originalError?: unknown;
}

export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export interface RequestOptions<
  TBody = unknown,
  TParams = Record<string, unknown>,
> {
  url: string;
  params?: TParams;
  data?: TBody;
  headers?: Record<string, string>;
  config?: AxiosRequestConfig;
}

type TokenProvider = () => string | undefined;

const DEFAULT_CONFIG: Required<Pick<ApiClientConfig, "baseURL" | "timeout">> = {
  baseURL: "/api",
  timeout: 15000,
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const extractErrorData = (error: AxiosError): Record<string, unknown> => {
  if (isObject(error.response?.data)) {
    return error.response?.data;
  }
  if (typeof error.response?.data === "string") {
    return { message: error.response?.data };
  }
  return {};
};

export class ApiClient {
  private readonly instance: AxiosInstance;
  private tokenProvider?: TokenProvider;

  constructor(config?: ApiClientConfig) {
    this.instance = axios.create({
      baseURL: config?.baseURL ?? DEFAULT_CONFIG.baseURL,
      timeout: config?.timeout ?? DEFAULT_CONFIG.timeout,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...config?.headers,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use((requestConfig) => {
      const token = this.tokenProvider?.();
      if (token) {
        if (requestConfig.headers && "set" in requestConfig.headers) {
          requestConfig.headers.set?.("Authorization", `Bearer ${token}`);
        } else {
          const existingHeaders =
            (requestConfig.headers as Record<string, string> | undefined) ?? {};
          requestConfig.headers = {
            ...existingHeaders,
            Authorization: `Bearer ${token}`,
          } as AxiosRequestHeaders;
        }
      }
      return requestConfig;
    });

    this.instance.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(this.toAppApiError(error)),
    );
  }

  setTokenProvider(provider: TokenProvider | undefined) {
    this.tokenProvider = provider;
  }

  clearTokenProvider() {
    this.tokenProvider = undefined;
  }

  updateDefaults(config: ApiClientConfig) {
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
      };
    }
  }

  async get<TResponse, TParams = Record<string, unknown>>(
    options: RequestOptions<never, TParams>,
  ): Promise<TResponse> {
    try {
      const response = await this.instance.get<TResponse>(options.url, {
        params: options.params,
        headers: options.headers,
        ...options.config,
      });
      return this.transformResponse(response);
    } catch (error) {
      throw this.ensureAppApiError(error);
    }
  }

  async delete<TResponse, TParams = Record<string, unknown>>(
    options: RequestOptions<never, TParams>,
  ): Promise<TResponse> {
    try {
      const response = await this.instance.delete<TResponse>(options.url, {
        params: options.params,
        headers: options.headers,
        ...options.config,
      });
      return this.transformResponse(response);
    } catch (error) {
      throw this.ensureAppApiError(error);
    }
  }

  async post<
    TResponse,
    TBody = unknown,
    TParams = Record<string, unknown>,
  >(options: RequestOptions<TBody, TParams>): Promise<TResponse> {
    try {
      const response = await this.instance.post<TResponse>(options.url, options.data, {
        params: options.params,
        headers: options.headers,
        ...options.config,
      });
      return this.transformResponse(response);
    } catch (error) {
      throw this.ensureAppApiError(error);
    }
  }

  async put<
    TResponse,
    TBody = unknown,
    TParams = Record<string, unknown>,
  >(options: RequestOptions<TBody, TParams>): Promise<TResponse> {
    try {
      const response = await this.instance.put<TResponse>(options.url, options.data, {
        params: options.params,
        headers: options.headers,
        ...options.config,
      });
      return this.transformResponse(response);
    } catch (error) {
      throw this.ensureAppApiError(error);
    }
  }

  async patch<
    TResponse,
    TBody = unknown,
    TParams = Record<string, unknown>,
  >(options: RequestOptions<TBody, TParams>): Promise<TResponse> {
    try {
      const response = await this.instance.patch<TResponse>(options.url, options.data, {
        params: options.params,
        headers: options.headers,
        ...options.config,
      });
      return this.transformResponse(response);
    } catch (error) {
      throw this.ensureAppApiError(error);
    }
  }

  private transformResponse<TResponse>(
    response: AxiosResponse<TResponse>,
  ): TResponse {
    return response.data;
  }

  private ensureAppApiError(error: unknown): AppApiError {
    if (this.isAppApiError(error)) {
      return error;
    }
    return this.toAppApiError(error);
  }

  private isAppApiError(error: unknown): error is AppApiError {
    return (
      isObject(error) &&
      typeof error.message === "string" &&
      ("code" in error || "status" in error || "details" in error)
    );
  }

  private toAppApiError(error: unknown): AppApiError {
    if (axios.isAxiosError(error)) {
      const extracted = extractErrorData(error);
      return {
        message:
          (extracted.message as string) ??
          error.message ??
          "Unexpected API error",
        code:
          (extracted.code as string) ??
          (error.code as string | undefined) ??
          "API_ERROR",
        status: error.response?.status ?? error.status,
        details: extracted,
        originalError: error,
      };
    }

    if (error instanceof Error) {
      return {
        message: error.message,
        code: "UNKNOWN_ERROR",
        details: undefined,
        originalError: error,
      };
    }

    return {
      message: "Unexpected error",
      code: "UNKNOWN_ERROR",
      details: error,
    };
  }
}

const sharedClient = new ApiClient();

export const apiClient = sharedClient;

export const createApiClient = (config?: ApiClientConfig) => new ApiClient(config);

export const setApiClientTokenProvider = (provider: TokenProvider | undefined) => {
  sharedClient.setTokenProvider(provider);
};

export const clearApiClientTokenProvider = () => {
  sharedClient.clearTokenProvider();
};


