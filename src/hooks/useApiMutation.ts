import { useCallback, useRef, useState } from "react";
import type { AxiosRequestConfig } from "axios";
import {
  apiClient,
  type AppApiError,
  type HttpMethod,
  type RequestOptions,
} from "../services/apiClient";
import { invalidateQueries } from "./useApi";

type MutationMethod = Exclude<HttpMethod, "get">;

export interface UseApiMutationOptions<
  TResponse,
  TBody = unknown,
  TParams = Record<string, unknown>,
> extends Omit<RequestOptions<TBody, TParams>, "config"> {
  method?: MutationMethod;
  config?: AxiosRequestConfig;
  invalidateKeys?: string[];
  onSuccess?: (data: TResponse) => void | Promise<void>;
  onError?: (error: AppApiError) => void | Promise<void>;
  onSettled?: (
    data: TResponse | undefined,
    error: AppApiError | undefined,
  ) => void | Promise<void>;
}

export interface UseApiMutationResult<
  TResponse,
  TBody = unknown,
  TParams = Record<string, unknown>,
> {
  data: TResponse | undefined;
  loading: boolean;
  error: AppApiError | undefined;
  mutate: (
    override?: Partial<RequestOptions<TBody, TParams>>,
  ) => void;
  mutateAsync: (
    override?: Partial<RequestOptions<TBody, TParams>>,
  ) => Promise<TResponse>;
  reset: () => void;
}

const callMutation = async <TResponse, TBody, TParams>(
  method: MutationMethod,
  options: RequestOptions<TBody, TParams>,
) => {
  switch (method) {
    case "post":
      return apiClient.post<TResponse, TBody, TParams>(options);
    case "put":
      return apiClient.put<TResponse, TBody, TParams>(options);
    case "patch":
      return apiClient.patch<TResponse, TBody, TParams>(options);
    case "delete":
      return apiClient.delete<TResponse, TParams>({
        url: options.url,
        params: options.params,
        headers: options.headers,
        config: options.config,
      });
    default:
      return apiClient.post<TResponse, TBody, TParams>(options);
  }
};

const buildMutationOptions = <TResponse, TBody, TParams>(
  base: UseApiMutationOptions<TResponse, TBody, TParams>,
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

export const useApiMutation = <
  TResponse,
  TBody = unknown,
  TParams = Record<string, unknown>,
>(
  options: UseApiMutationOptions<TResponse, TBody, TParams>,
): UseApiMutationResult<TResponse, TBody, TParams> => {
  const {
    method = "post",
    invalidateKeys,
    onSuccess,
    onError,
    onSettled,
  } = options;

  const [data, setData] = useState<TResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AppApiError>();

  const latestOptionsRef = useRef(options);
  latestOptionsRef.current = options;

  const mutateAsync = useCallback(
    async (
      override?: Partial<RequestOptions<TBody, TParams>>,
    ): Promise<TResponse> => {
      const activeOptions = latestOptionsRef.current;
      const requestOptions = buildMutationOptions(
        activeOptions,
        override,
      );
      setLoading(true);
      setError(undefined);
      try {
        const response = await callMutation<TResponse, TBody, TParams>(
          method,
          requestOptions,
        );
        setData(response);
        await onSuccess?.(response);
        if (invalidateKeys?.length) {
          await invalidateQueries(invalidateKeys);
        }
        await onSettled?.(response, undefined);
        return response;
      } catch (err) {
        const appError = err as AppApiError;
        setError(appError);
        await onError?.(appError);
        await onSettled?.(undefined, appError);
        throw appError;
      } finally {
        setLoading(false);
      }
    },
    [invalidateKeys, method, onError, onSettled, onSuccess],
  );

  const mutate = useCallback(
    (override?: Partial<RequestOptions<TBody, TParams>>) => {
      void mutateAsync(override);
    },
    [mutateAsync],
  );

  const reset = useCallback(() => {
    setData(undefined);
    setError(undefined);
    setLoading(false);
  }, []);

  return {
    data,
    loading,
    error,
    mutate,
    mutateAsync,
    reset,
  };
};


