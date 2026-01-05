import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "react-router-dom";
import {
  Pagination,
  type PaginationInterface,
} from "../components/form-controls/Pagination";

export interface ListCrudContextType<T> {
  list: Array<T> | undefined;
  page: number;
  pages: number;
  total: number;
  limit: number;
  isLoading: boolean;
  pagination: ReactNode;
}

const createListCrudContext = <T,>() => {
  return createContext<ListCrudContextType<T> | undefined>(undefined);
};

// Crear el contexto con un tipo genérico por defecto
// Los usuarios pueden crear su propio contexto con su tipo específico
export const ListCrudContext = createListCrudContext<any>();

interface ListCrudProviderProps<T> {
  children: ReactNode;
  getPromise: (
    params?: Record<string, any>
  ) => Promise<Array<T> | PaginationInterface<T> | undefined>;
  urlParams?: Array<string>;
  limit?: number;
  pageParam?: string;
}

export function ListCrudProvider<T>({
  children,
  getPromise,
  limit = 15,
  pageParam = "pagina",
  urlParams = [],
}: ListCrudProviderProps<T>) {
  const [list, setList] = useState<Array<T> | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [pages, setPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const getPromiseRef = useRef(getPromise);
  const [searchParams] = useSearchParams();

  // Actualizar la referencia cuando cambie getPromise
  useEffect(() => {
    getPromiseRef.current = getPromise;
  }, [getPromise]);

  // Función para obtener los parámetros de la URL
  const getUrlParams = () => {
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
  };

  // Función para obtener los datos
  const fetchData = async (params?: Record<string, any>) => {
    setIsLoading(true);
    try {
      const requestParams = params || getUrlParams();
      const result = await getPromiseRef.current(requestParams);
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
        // Resultado undefined o null
        setList(undefined);
        setPage(1);
        setPages(1);
        setTotal(0);
      }
    } catch (error) {
      console.error("Error fetching data in ListCrudContext:", error);
      setList(undefined);
      setPage(1);
      setPages(1);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect para escuchar cambios en getPromise
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getPromise]);

  // Memoizar los parámetros de URL para evitar re-renders innecesarios
  const urlParamsKey = useMemo(() => urlParams.join(","), [urlParams]);

  // useEffect para escuchar cambios en los query params
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, pageParam, urlParamsKey]);

  const value: ListCrudContextType<T> = {
    list,
    page,
    pages,
    total,
    limit,
    isLoading,
    pagination: (
      <Pagination
        page={page}
        pages={pages}
        total={total}
        fieldName={pageParam}
        isLoading={isLoading}
      />
    ),
  };

  return (
    <ListCrudContext.Provider value={value}>
      {children}
    </ListCrudContext.Provider>
  );
}

// Hook to use ListCrud context
// eslint-disable-next-line react-refresh/only-export-components
export function useListCrud<T>(): ListCrudContextType<T> {
  const context = useContext(ListCrudContext);
  if (context === undefined) {
    throw new Error("useListCrud must be used within a ListCrudProvider");
  }
  return context as ListCrudContextType<T>;
}
