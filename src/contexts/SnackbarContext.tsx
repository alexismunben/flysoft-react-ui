import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

export type SnackbarVariant =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export interface SnackbarMessage {
  id: string;
  message: string;
  variant: SnackbarVariant;
  duration?: number; // en milisegundos, default 3000
  icon?: string; // clase de FontAwesome 5 (ej: "fa-check", "fa-exclamation-triangle")
  iconLabel?: string; // aria-label para el ícono
}

export interface SnackbarActionsType {
  showSnackbar: (
    message: string,
    variant?: SnackbarVariant,
    options?: {
      duration?: number;
      icon?: string;
      iconLabel?: string;
    },
  ) => void;
  removeSnackbar: (id: string) => void;
}

export interface SnackbarContextType extends SnackbarActionsType {
  snackbars: SnackbarMessage[];
}

const SnackbarStateContext = createContext<SnackbarMessage[] | undefined>(
  undefined,
);
const SnackbarActionsContext = createContext<SnackbarActionsType | undefined>(
  undefined,
);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const showSnackbar = useCallback(
    (
      message: string,
      variant: SnackbarVariant = "info",
      options?: {
        duration?: number;
        icon?: string;
        iconLabel?: string;
      },
    ) => {
      const id = `snackbar-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      const newSnackbar: SnackbarMessage = {
        id,
        message,
        variant,
        duration: options?.duration ?? 3000,
        icon: options?.icon,
        iconLabel: options?.iconLabel,
      };

      setSnackbars((prev) => [...prev, newSnackbar]);
    },
    [],
  );

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  const actions = useMemo(
    () => ({
      showSnackbar,
      removeSnackbar,
    }),
    [showSnackbar, removeSnackbar],
  );

  return (
    <SnackbarActionsContext.Provider value={actions}>
      <SnackbarStateContext.Provider value={snackbars}>
        {children}
      </SnackbarStateContext.Provider>
    </SnackbarActionsContext.Provider>
  );
};

export const useSnackbar = (): SnackbarActionsType => {
  const context = useContext(SnackbarActionsContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

export const useSnackbarState = (): SnackbarMessage[] => {
  const context = useContext(SnackbarStateContext);
  if (context === undefined) {
    throw new Error("useSnackbarState must be used within a SnackbarProvider");
  }
  return context;
};
