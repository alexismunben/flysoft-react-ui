import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

export type SnackbarVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";

export interface SnackbarMessage {
  id: string;
  message: string;
  variant: SnackbarVariant;
  duration?: number; // en milisegundos, default 3000
  icon?: string; // clase de FontAwesome 5 (ej: "fa-check", "fa-exclamation-triangle")
  iconLabel?: string; // aria-label para el ícono
}

export interface SnackbarContextType {
  showSnackbar: (message: string, variant?: SnackbarVariant, options?: {
    duration?: number;
    icon?: string;
    iconLabel?: string;
  }) => void;
  removeSnackbar: (id: string) => void;
  snackbars: SnackbarMessage[];
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);

  const showSnackbar = useCallback((
    message: string,
    variant: SnackbarVariant = "info",
    options?: {
      duration?: number;
      icon?: string;
      iconLabel?: string;
    }
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
  }, []);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((snackbar) => snackbar.id !== id));
  }, []);

  const value: SnackbarContextType = {
    showSnackbar,
    removeSnackbar,
    snackbars,
  };

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

