import { useState, useCallback } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
import type { SnackbarVariant } from "../contexts/SnackbarContext";

export interface AsyncRequestOptions {
  successMessage?: string;
  errorMessage?: string;
  successVariant?: SnackbarVariant;
  errorVariant?: SnackbarVariant;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

export interface UseAsyncRequestReturn {
  isLoading: boolean;
  execute: <T>(requestFn: () => Promise<T>) => Promise<T | undefined>;
  setLoading: (loading: boolean) => void;
}

export function useAsyncRequest(
  options: AsyncRequestOptions = {}
): UseAsyncRequestReturn {
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  const {
    successMessage,
    errorMessage,
    successVariant = "success",
    errorVariant = "danger",
    onSuccess,
    onError,
    onFinally,
  } = options;

  const execute = useCallback(
    async <T>(requestFn: () => Promise<T>): Promise<T | undefined> => {
      setIsLoading(true);
      try {
        const result = await requestFn();

        // Mostrar snackbar de éxito solo si existe successMessage
        if (successMessage) {
          console.log("TIENE SUCCESS MESSAGE", successMessage);
          showSnackbar(successMessage, successVariant);
        }

        onSuccess?.(result);
        return result;
      } catch (error) {
        console.error("Error en async request:", error);

        // Determinar el mensaje de error:
        // 1. Si existe errorMessage en las opciones, usarlo
        // 2. Si no, intentar usar error.message
        // 3. Si tampoco existe, usar un mensaje genérico
        let finalErrorMessage: string | undefined;

        if (errorMessage) {
          finalErrorMessage = errorMessage;
        } else if (error instanceof Error && error.message) {
          finalErrorMessage = error.message;
        } else if (
          error &&
          typeof error === "object" &&
          "message" in error &&
          typeof error.message === "string"
        ) {
          finalErrorMessage = error.message;
        } else {
          finalErrorMessage = "Ha ocurrido un error";
        }

        // Mostrar snackbar de error solo si existe un mensaje de error
        if (finalErrorMessage) {
          showSnackbar(finalErrorMessage, errorVariant);
        }

        onError?.(error);
        return undefined;
      } finally {
        setIsLoading(false);
        onFinally?.();
      }
    },
    [
      showSnackbar,
      successMessage,
      errorMessage,
      successVariant,
      errorVariant,
      onSuccess,
      onError,
      onFinally,
    ]
  );

  const setLoading = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return {
    isLoading,
    execute,
    setLoading,
  };
}
