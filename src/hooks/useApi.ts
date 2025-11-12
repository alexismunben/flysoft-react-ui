import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import {
  apiClient,
  type AppApiError,
  type HttpMethod,
  type RequestOptions,
} from "../services/apiClient";

type AnyRequestOptions = RequestOptions<unknown, Record<string, unknown>>;

type QueryRefetcher = (
  override?: Partial<AnyRequestOptions>,
) => Promise<unknown>;

const queryRegistry = new Map<string, Set<QueryRefetcher>>();

const defaultError: AppApiError = {
  message: "Unknown API error",
  code: "UNKNOWN",
};

export const registerQuery = (key: string, refetcher: QueryRefetcher) => {
  if (!key) return;
  const existing = queryRegistry.get(key) ?? new Set<QueryRefetcher>();
  existing.add(refetcher);
  queryRegistry.set(key, existing);
};

export const unregisterQuery = (key: string, refetcher: QueryRefetcher) => {
  const existing = queryRegistry.get(key);
  if (!existing) return;
  existing.delete(refetcher);
  if (existing.size === 0) {
    queryRegistry.delete(key);
  }
};

export const invalidateQueries = async (keys: string[]) => {
  const tasks: Promise<unknown>[] = [];
  keys.forEach((key) => {
    const refetchers = queryRegistry.get(key);
    if (!refetchers) return;
    refetchers.forEach((refetcher) => {
      tasks.push(
        Promise.resolve()
          .then(() => refetcher())
          .catch(() => {
            // Swallow refetch errors during invalidation.
          }),
      );
    });
  });
  await Promise.allSettled(tasks);
};

type CleanHttpMethod = HttpMethod;

export interface UseApiOptions<
  TResponse,
  TParams = Record<string, unknown>,
  TBody = unknown,
  TTransformed = TResponse,
> extends Omit<RequestOptions<TBody, TParams>, "config"> {
  method?: CleanHttpMethod;
  transform?: (response: TResponse) => TTransformed;
  enabled?: boolean;
  queryKey?: string;
  config?: AxiosRequestConfig;
  onSuccess?: (data: TTransformed) => void;
  onError?: (error: AppApiError) => void;
}

export interface UseApiResult<
  TData,
  TBody = unknown,
  TParams = Record<string, unknown>,
> {
  data: TData | undefined;
  loading: boolean;
  error: AppApiError | undefined;
  refetch: (
    override?: Partial<RequestOptions<TBody, TParams>>,
  ) => Promise<TData>;
  reset: () => void;
}

// UI components can map `error` or `loading` to themed indicators such as `Badge`
// or in-card alerts without modifying this hook. See the docs example for guidance.

const callMethod = async <TResponse, TParams, TBody>(
  method: CleanHttpMethod,
  options: RequestOptions<TBody, TParams>,
) => {
  switch (method) {
    case "get":
      return apiClient.get<TResponse, TParams>(
        options as unknown as RequestOptions<never, TParams>,
      );
    case "delete":
      return apiClient.delete<TResponse, TParams>(
        options as unknown as RequestOptions<never, TParams>,
      );
    case "post":
      return apiClient.post<TResponse, TBody, TParams>(options);
    case "put":
      return apiClient.put<TResponse, TBody, TParams>(options);
    case "patch":
      return apiClient.patch<TResponse, TBody, TParams>(options);
    default:
      return apiClient.get<TResponse, TParams>(
        options as unknown as RequestOptions<never, TParams>,
      );
  }
};

const buildRequestOptions = <
  TResponse,
  TParams,
  TBody,
  TTransformed = TResponse,
>(
  base: UseApiOptions<TResponse, TParams, TBody, TTransformed>,
  override?: Partial<RequestOptions<TBody, TParams>>,
): RequestOptions<TBody, TParams> => ({
  url: (override?.url as string) ?? base.url,
  params: (override?.params as TParams | undefined) ?? base.params,
  data: (override?.data as TBody | undefined) ?? base.data,
  headers: {
    ...base.headers,
    ...((override?.headers as Record<string, string> | undefined) ?? {}),
  },
  config: {
    ...base.config,
    ...((override?.config as AxiosRequestConfig | undefined) ?? {}),
  },
});

export const useApi = <
  TResponse,
  TParams = Record<string, unknown>,
  TBody = unknown,
  TTransformed = TResponse,
>(
  options: UseApiOptions<TResponse, TParams, TBody, TTransformed>,
): UseApiResult<TTransformed, TBody, TParams> => {
  const {
    method = "get",
    enabled = true,
    transform,
    onSuccess,
    onError,
    queryKey,
  } = options;

  const [data, setData] = useState<TTransformed>();
  const [loading, setLoading] = useState<boolean>(enabled);
  const [error, setError] = useState<AppApiError>();

  const latestOptionsRef = useRef(options);
  latestOptionsRef.current = options;

  const transformRef = useRef(transform);
  transformRef.current = transform;

  const onSuccessRef = useRef(onSuccess);
  onSuccessRef.current = onSuccess;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const refetch = useCallback(
    async (
      override?: Partial<RequestOptions<TBody, TParams>>,
    ): Promise<TTransformed> => {
      const activeOptions = latestOptionsRef.current;
      const requestOptions = buildRequestOptions(
        activeOptions,
        override,
      );
      setLoading(true);
      setError(undefined);
      try {
        const response = await callMethod<TResponse, TParams, TBody>(
          method,
          requestOptions,
        );
        const transformed = (transformRef.current
          ? transformRef.current(response)
          : (response as unknown as TTransformed)) as TTransformed;
        setData(transformed);
        onSuccessRef.current?.(transformed);
        return transformed;
      } catch (err) {
        const appError = (err as AppApiError) ?? defaultError;
        setError(appError);
        onErrorRef.current?.(appError);
        throw appError;
      } finally {
        setLoading(false);
      }
    },
    [method],
  );

  const stableRefetch = useMemo(() => refetch, [refetch]);

  useEffect(() => {
    if (queryKey) {
      registerQuery(queryKey, stableRefetch as QueryRefetcher);
      return () => {
        unregisterQuery(queryKey, stableRefetch as QueryRefetcher);
      };
    }
    return undefined;
  }, [queryKey, stableRefetch]);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    const run = async () => {
      try {
        await refetch();
      } catch {
        if (!cancelled) {
          // Error state already handled inside refetch.
        }
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [enabled, refetch]);

  const reset = useCallback(() => {
    setData(undefined);
    setError(undefined);
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    reset,
  };
};


