import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  type PaginationInterface,
} from "../components/form-controls/Pagination";
import { useAsyncRequest } from "../hooks/useAsyncRequest";

export interface CrudContextType<T> {
  list: Array<T> | undefined;
  item: T | undefined;
  page: number;
  pages: number;
  total: number;
  limit: number;
  isLoading: boolean;
  pagination: ReactNode;
  params: Record<string, any>;
  extraData?: Record<string, any>;
  setExtraData: Dispatch<SetStateAction<Record<string, any> | undefined>>;
  fetchItems: {
    execute: (params?: Record<string, any>) => Promise<void>;
    isLoading: boolean;
  };
  fetchItem: {
    execute: (
      params?: Record<string, any> | string | number
    ) => Promise<T | undefined>;
    isLoading: boolean;
  };
  createItem: {
    execute: (item: T) => Promise<T | undefined | null>;
    isLoading: boolean;
  };
  updateItem: {
    execute: (item: T) => Promise<T | undefined | null>;
    isLoading: boolean;
  };
  deleteItem: {
    execute: (item: T) => Promise<void>;
    isLoading: boolean;
  };
}

const createCrudContext = <T,>() => {
  return createContext<CrudContextType<T> | undefined>(undefined);
};

// Crear el contexto con un tipo genérico por defecto
// Los usuarios pueden crear su propio contexto con su tipo específico
export const CrudContext = createCrudContext<any>();

export interface PromiseWithOptions<TResult, TParams extends any[] = []> {
  execute: (...params: TParams) => Promise<TResult>;
  successMessage?: string;
  errorMessage?: string;
}

interface CrudProviderProps<T> {
  children: ReactNode;
  getPromise?:
  | ((
    params?: Record<string, any>
  ) => Promise<Array<T> | PaginationInterface<T> | undefined>)
  | PromiseWithOptions<
    Array<T> | PaginationInterface<T> | undefined,
    [params?: Record<string, any>]
  >;
  getItemPromise?:
  | ((
    params?: Record<string, any> | string | number
  ) => Promise<T | undefined>)
  | PromiseWithOptions<
    T | undefined,
    [params?: Record<string, any> | string | number]
  >;
  postPromise?:
  | ((item: T) => Promise<T | undefined | null>)
  | PromiseWithOptions<T | undefined | null, [item: T]>;
  putPromise?:
  | ((item: T) => Promise<T | undefined | null>)
  | PromiseWithOptions<T | undefined | null, [item: T]>;
  deletePromise?:
  | ((item: T) => Promise<void>)
  | PromiseWithOptions<void, [item: T]>;
  urlParams?: Array<string>;
  limit?: number;
  pageParam?: string;
  singleItemId?: string | number;
  extraData?: Record<string, any>;
}

export function CrudProvider<T>({
  children,
  getPromise,
  getItemPromise,
  postPromise,
  putPromise,
  deletePromise,
  limit = 15,
  pageParam = "pagina",
  urlParams = [],
  singleItemId,
  extraData: extraDataProp,
}: CrudProviderProps<T>) {
  const [extraData, setExtraData] = useState<Record<string, any> | undefined>(
    extraDataProp
  );
  const [list, setList] = useState<Array<T> | undefined>(undefined);
  const [item, setItem] = useState<T | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();

  // Extraer funciones execute y opciones de las promises
  const getPromiseExecute = getPromise
    ? typeof getPromise === "function"
      ? getPromise
      : getPromise.execute
    : undefined;
  const getPromiseSuccessMessage =
    getPromise && typeof getPromise === "object"
      ? getPromise.successMessage
      : undefined;
  const getPromiseErrorMessage =
    getPromise && typeof getPromise === "object"
      ? getPromise.errorMessage
      : undefined;

  const postPromiseExecute = postPromise
    ? typeof postPromise === "function"
      ? postPromise
      : postPromise.execute
    : undefined;
  const postPromiseSuccessMessage =
    postPromise && typeof postPromise === "object"
      ? postPromise.successMessage
      : undefined;
  const postPromiseErrorMessage =
    postPromise && typeof postPromise === "object"
      ? postPromise.errorMessage
      : undefined;

  const putPromiseExecute = putPromise
    ? typeof putPromise === "function"
      ? putPromise
      : putPromise.execute
    : undefined;
  const putPromiseSuccessMessage =
    putPromise && typeof putPromise === "object"
      ? putPromise.successMessage
      : undefined;
  const putPromiseErrorMessage =
    putPromise && typeof putPromise === "object"
      ? putPromise.errorMessage
      : undefined;

  const deletePromiseExecute = deletePromise
    ? typeof deletePromise === "function"
      ? deletePromise
      : deletePromise.execute
    : undefined;
  const deletePromiseSuccessMessage =
    deletePromise && typeof deletePromise === "object"
      ? deletePromise.successMessage
      : undefined;
  const deletePromiseErrorMessage =
    deletePromise && typeof deletePromise === "object"
      ? deletePromise.errorMessage
      : undefined;

  const getItemPromiseExecute = getItemPromise
    ? typeof getItemPromise === "function"
      ? getItemPromise
      : getItemPromise.execute
    : undefined;
  const getItemPromiseSuccessMessage =
    getItemPromise && typeof getItemPromise === "object"
      ? getItemPromise.successMessage
      : undefined;
  const getItemPromiseErrorMessage =
    getItemPromise && typeof getItemPromise === "object"
      ? getItemPromise.errorMessage
      : undefined;

  const getPromiseRef = useRef(getPromiseExecute);

  // Hooks para manejar las peticiones asíncronas con mensajes opcionales
  const fetchDataAsync = useAsyncRequest({
    successMessage: getPromiseSuccessMessage,
    errorMessage: getPromiseErrorMessage,
  });
  const createItemAsync = useAsyncRequest({
    successMessage: postPromiseSuccessMessage,
    errorMessage: postPromiseErrorMessage,
  });
  const updateItemAsync = useAsyncRequest({
    successMessage: putPromiseSuccessMessage,
    errorMessage: putPromiseErrorMessage,
  });
  const deleteItemAsync = useAsyncRequest({
    successMessage: deletePromiseSuccessMessage,
    errorMessage: deletePromiseErrorMessage,
  });
  const fetchItemAsync = useAsyncRequest({
    successMessage: getItemPromiseSuccessMessage,
    errorMessage: getItemPromiseErrorMessage,
  });

  // El isLoading del contexto usa el hook de fetchData
  const isLoading = fetchDataAsync.isLoading;

  // Actualizar la referencia cuando cambie getPromise
  useEffect(() => {
    getPromiseRef.current = getPromiseExecute;
  }, [getPromiseExecute]);

  // Función para obtener los parámetros de la URL
  const getUrlParams = useCallback(() => {
    const params: Record<string, any> = { limit };

    // Agregar pageParam si existe en la URL
    const pageValue = searchParams.get(pageParam);
    if (pageValue) {
      const parsedPage = parseInt(pageValue, 10);
      if (!isNaN(parsedPage)) {
        params[pageParam] = parsedPage;
      }
    }

    // Agregar urlParams si existen en la URL
    urlParams.forEach((paramName) => {
      const paramValue = searchParams.get(paramName);
      if (paramValue !== null) {
        params[paramName] = paramValue;
      }
    });

    return params;
  }, [searchParams, pageParam, urlParams, limit]);

  // Función para obtener los datos
  const fetchData = useCallback(
    async (params?: Record<string, any>) => {
      if (!getPromiseExecute) {
        return;
      }
      // Obtener los parámetros que se van a usar
      const requestParams = params || getUrlParams();

      // Crear una clave única para estos parámetros
      const paramsKey = JSON.stringify(requestParams);

      const result = await fetchDataAsync.execute(async () => {
        return await getPromiseRef.current!(requestParams);
      });

      // Solo procesar el resultado si no es undefined (undefined significa error)
      if (result !== undefined) {
        if (result && typeof result === "object" && "list" in result) {
          // Es un PaginationInterface
          const { list, page, pages, total } = result as PaginationInterface<T>;
          setList(list);
          setPage(page);
          setPages(pages);
          setTotal(total);
        } else if (Array.isArray(result)) {
          // Es un array simple
          setList(result);
          setPage(1);
          setTotal(result.length);
          setPages(Math.ceil(result.length / limit));
        } else {
          // Resultado null
          setList(undefined);
          setPage(1);
          setPages(1);
          setTotal(0);
        }
      }
    },
    [getUrlParams, limit, fetchDataAsync, getPromiseExecute]
  );

  // Ref para almacenar los valores anteriores de urlParams
  const prevUrlParamsValuesRef = useRef<Record<string, string | null>>({});

  // Memoizar los valores actuales de los urlParams
  const urlParamsValues = useMemo(() => {
    const values: Record<string, string | null> = {};
    urlParams.forEach((paramName) => {
      values[paramName] = searchParams.get(paramName);
    });
    return values;
  }, [searchParams, urlParams]);

  // Memoizar los parámetros de URL para evitar re-renders innecesarios
  const urlParamsKey = useMemo(() => urlParams.join(","), [urlParams]);

  // Memoizar solo los parámetros relevantes de la URL (urlParams + pageParam)
  // para que el useEffect solo se ejecute cuando cambien estos parámetros
  const relevantParamsKey = useMemo(() => {
    const relevantParams: Record<string, string | null> = {};

    // Agregar pageParam si existe
    const pageValue = searchParams.get(pageParam);
    if (pageValue) {
      relevantParams[pageParam] = pageValue;
    }

    // Agregar urlParams si existen
    urlParams.forEach((paramName) => {
      const paramValue = searchParams.get(paramName);
      if (paramValue !== null) {
        relevantParams[paramName] = paramValue;
      }
    });

    return JSON.stringify(relevantParams);
  }, [searchParams, pageParam, urlParams]);

  // Memoizar los parámetros actuales para exponerlos
  const currentParams = useMemo(
    () => getUrlParams(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams, pageParam, urlParamsKey, limit, urlParams]
  );

  // Función para recargar los datos
  const fetchItemsExecute = useCallback(
    async (params?: Record<string, any>) => {
      await fetchData(params);
    },
    [fetchData]
  );

  // Función para obtener un item individual
  const fetchItemExecute = useCallback(
    async (
      params?: Record<string, any> | string | number
    ): Promise<T | undefined> => {
      if (!getItemPromiseExecute) {
        throw new Error(
          "getItemPromise is not defined. Please provide getItemPromise to CrudProvider."
        );
      }
      // Si no se pasan parámetros, usar singleItemId si está disponible
      const finalParams = params !== undefined ? params : singleItemId;
      if (finalParams === undefined) {
        throw new Error(
          "No parameters provided and singleItemId is not defined. Please provide parameters or set singleItemId in CrudProvider."
        );
      }
      const result = await fetchItemAsync.execute(async () => {
        return await getItemPromiseExecute(finalParams);
      });
      if (result !== undefined) {
        setItem(result);
      }
      return result;
    },
    [getItemPromiseExecute, fetchItemAsync, singleItemId]
  );

  // Función para crear un item
  const createItemExecute = useCallback(
    async (item: T): Promise<T | undefined | null> => {
      if (!postPromiseExecute) {
        throw new Error(
          "postPromise is not defined. Please provide postPromise to CrudProvider."
        );
      }
      return await createItemAsync.execute(async () => {
        return await postPromiseExecute(item);
      });
    },
    [postPromiseExecute, createItemAsync]
  );

  // Función para actualizar un item
  const updateItemExecute = useCallback(
    async (item: T): Promise<T | undefined | null> => {
      if (!putPromiseExecute) {
        throw new Error(
          "putPromise is not defined. Please provide putPromise to CrudProvider."
        );
      }
      return await updateItemAsync.execute(async () => {
        return await putPromiseExecute(item);
      });
    },
    [putPromiseExecute, updateItemAsync]
  );

  // Función para eliminar un item
  const deleteItemExecute = useCallback(
    async (item: T): Promise<void> => {
      if (!deletePromiseExecute) {
        throw new Error(
          "deletePromise is not defined. Please provide deletePromise to CrudProvider."
        );
      }
      await deleteItemAsync.execute(async () => {
        await deletePromiseExecute(item);
      });
    },
    [deletePromiseExecute, deleteItemAsync]
  );

  // useEffect para resetear pageParam a 1 cuando cambien los urlParams
  useEffect(() => {
    // Verificar si hay algún urlParam definido
    if (urlParams.length === 0) {
      prevUrlParamsValuesRef.current = {};
      return;
    }

    // Comparar valores actuales con los anteriores
    const prevValues = prevUrlParamsValuesRef.current;
    const hasChanged = urlParams.some(
      (paramName) => prevValues[paramName] !== urlParamsValues[paramName]
    );

    // Si los urlParams cambiaron, resetear pageParam a 1
    if (hasChanged) {
      const currentPage = searchParams.get(pageParam);
      if (currentPage && currentPage !== "1") {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(pageParam, "1");
        setSearchParams(newSearchParams, { replace: true });
        // No hacer fetchData aquí, se hará cuando cambien los searchParams
        return;
      }
    }

    // Actualizar los valores anteriores
    prevUrlParamsValuesRef.current = { ...urlParamsValues };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(urlParamsValues), pageParam, urlParamsKey]);

  // useEffect para ejecutar fetchData cuando cambian los parámetros relevantes o getPromise
  useEffect(() => {
    if (!getPromiseExecute) {
      return;
    }

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 0);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [relevantParamsKey, getPromiseExecute]);

  // useEffect para obtener el item individual cuando cambie singleItemId
  useEffect(() => {
    if (singleItemId !== undefined && getItemPromiseExecute) {
      fetchItemExecute(singleItemId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleItemId]);

  // Sincronizar extraDataProp con el estado local
  useEffect(() => {
    setExtraData(extraDataProp);
  }, [extraDataProp]);

  const value: CrudContextType<T> = {
    list,
    item,
    page,
    pages,
    total,
    limit,
    isLoading,
    params: currentParams,
    fetchItems: {
      execute: fetchItemsExecute,
      isLoading: fetchDataAsync.isLoading,
    },
    fetchItem: {
      execute: fetchItemExecute,
      isLoading: fetchItemAsync.isLoading,
    },
    createItem: {
      execute: createItemExecute,
      isLoading: createItemAsync.isLoading,
    },
    updateItem: {
      execute: updateItemExecute,
      isLoading: updateItemAsync.isLoading,
    },
    deleteItem: {
      execute: deleteItemExecute,
      isLoading: deleteItemAsync.isLoading,
    },
    pagination: (
      <Pagination
        page={page}
        pages={pages}
        total={total}
        fieldName={pageParam}
        isLoading={isLoading}
      />
    ),
    extraData,
    setExtraData,
  };

  return <CrudContext.Provider value={value}>{children}</CrudContext.Provider>;
}

// Hook to use Crud context
// eslint-disable-next-line react-refresh/only-export-components
export function useCrud<T>(): CrudContextType<T> {
  const context = useContext(CrudContext);
  if (context === undefined) {
    throw new Error("useCrud must be used within a CrudProvider");
  }
  return context as CrudContextType<T>;
}
