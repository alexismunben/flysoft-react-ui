import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useCallback,
  type Dispatch,
  type SetStateAction,
} from "react";
import { ThemeProvider, useTheme } from "./ThemeContext";
import type { Density, Theme, ThemeContextType } from "./types";
import { AppLayout } from "../components/layout/AppLayout";
import { SnackbarProvider } from "./SnackbarContext";
import { SnackbarContainer } from "../components/utils/SnackbarContainer";

export interface NavbarInterface {
  navBarLeftNode?: string | ReactNode;
  navBarRightNode?: string | ReactNode;
  fullWidthNavbar: boolean;
  /**
   * Altura del navbar.
   *
   * @default "64px"
   */
  height?: string;
  /** Clases del contenedor del navbar (incluye el botón). */
  className?: string;
}

export interface LeftDrawerInterface {
  headerNode?: ReactNode;
  contentNode?: ReactNode;
  footerNode?: ReactNode;
  /** Clases del contenedor del drawer (header, contenido y footer). */
  className?: string;
  /**
   * Ancho del drawer. Pisa cualquier clase de ancho que venga en `className`.
   * Si no se pasa, el drawer usa la clase `w-64`.
   *
   * @default "16rem"
   */
  width?: string;
}

export interface AppLayoutContextType extends ThemeContextType {
  // Layout state
  navbar: NavbarInterface | undefined;
  leftDrawer: LeftDrawerInterface | undefined;
  contentFooter: ReactNode | undefined;
  className: string;

  // Layout setters
  setNavbar: Dispatch<SetStateAction<NavbarInterface | undefined>>;
  setLeftDrawer: Dispatch<SetStateAction<LeftDrawerInterface | undefined>>;
  setContentFooter: (node: ReactNode | undefined) => void;
  setClassName: (className: string) => void;
  setNavBarLeftNode: (node: string | ReactNode | undefined) => void;
  setNavbarRightNode: (node: string | ReactNode | undefined) => void;

  // Left drawer commands (aplican al drawer colapsable de móvil/tablet)
  isLeftDrawerOpen: boolean;
  openLeftDrawer: () => void;
  closeLeftDrawer: () => void;
  toggleLeftDrawer: () => void;
}

const AppLayoutContext = createContext<AppLayoutContextType | undefined>(
  undefined,
);

interface AppLayoutProviderProps {
  children: ReactNode;
  // Theme props
  initialTheme?: string | Theme;
  storageKey?: string;
  forceInitialTheme?: boolean;
  // Density props (propagadas al ThemeProvider interno)
  density?: Density;
  densityStorageKey?: string;
  forceInitialDensity?: boolean;
  onDensityChange?: (density: Density) => void;
  // Layout initial props
  initialNavbar?: NavbarInterface;
  initialLeftDrawer?: LeftDrawerInterface;
  initialContentFooter?: ReactNode;
  className?: string;
}

// Internal component that uses ThemeContext and provides AppLayoutContext
const AppLayoutProviderInner: React.FC<{
  children: ReactNode;
  initialNavbar?: NavbarInterface;
  initialLeftDrawer?: LeftDrawerInterface;
  initialContentFooter?: ReactNode;
  initialClassName?: string;
}> = ({
  children,
  initialNavbar,
  initialLeftDrawer,
  initialContentFooter,
  initialClassName,
}) => {
  // Get theme context
  const themeContext = useTheme();

  // Layout state - ensure default height is set
  const [navbar, setNavbar] = useState<NavbarInterface | undefined>(() => {
    const defaultNavbar = { fullWidthNavbar: true, height: "64px" };
    if (initialNavbar) {
      return { ...defaultNavbar, ...initialNavbar };
    }
    return defaultNavbar;
  });
  const [leftDrawer, setLeftDrawer] = useState<LeftDrawerInterface | undefined>(
    initialLeftDrawer || {},
  );
  const [contentFooter, setContentFooter] = useState<ReactNode | undefined>(
    initialContentFooter,
  );
  const [className, setClassName] = useState<string>(initialClassName || "");
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);

  // Comandos del drawer izquierdo, disponibles también desde useLeftDrawer()
  const openLeftDrawer = useCallback(() => setIsLeftDrawerOpen(true), []);
  const closeLeftDrawer = useCallback(() => setIsLeftDrawerOpen(false), []);
  const toggleLeftDrawer = useCallback(
    () => setIsLeftDrawerOpen((prev) => !prev),
    [],
  );

  // Memoize setters to avoid unnecessary re-renders
  const handleSetNavbar = useCallback(
    (
      newNavbar:
        | NavbarInterface
        | undefined
        | ((prev: NavbarInterface | undefined) => NavbarInterface | undefined),
    ) => {
      setNavbar(newNavbar);
    },
    [],
  );

  const handleSetLeftDrawer = useCallback(
    (
      newLeftDrawer:
        | LeftDrawerInterface
        | undefined
        | ((
            prev: LeftDrawerInterface | undefined,
          ) => LeftDrawerInterface | undefined),
    ) => {
      setLeftDrawer(newLeftDrawer);
    },
    [],
  );

  const handleSetClassName = useCallback((newClassName: string) => {
    setClassName(newClassName);
  }, []);

  const handleSetContentFooter = useCallback((node: ReactNode | undefined) => {
    setContentFooter(node);
  }, []);

  // Setters para actualizar solo los nodos del navbar
  const handleSetNavBarLeftNode = useCallback(
    (node: string | ReactNode | undefined) => {
      setNavbar((prev) => {
        if (!prev) {
          // Si no hay navbar previo, crear uno nuevo con valores por defecto
          return {
            fullWidthNavbar: true,
            height: "64px",
            navBarLeftNode: node,
          };
        }
        return {
          ...prev,
          navBarLeftNode: node,
        };
      });
    },
    [],
  );

  const handleSetNavbarRightNode = useCallback(
    (node: string | ReactNode | undefined) => {
      setNavbar((prev) => {
        if (!prev) {
          // Si no hay navbar previo, crear uno nuevo con valores por defecto
          return {
            fullWidthNavbar: true,
            height: "64px",
            navBarRightNode: node,
          };
        }
        return {
          ...prev,
          navBarRightNode: node,
        };
      });
    },
    [],
  );

  const value: AppLayoutContextType = {
    // Theme context values
    ...themeContext,
    // Layout state
    navbar,
    leftDrawer,
    contentFooter,
    className,
    // Layout setters
    setNavbar: handleSetNavbar,
    setLeftDrawer: handleSetLeftDrawer,
    setContentFooter: handleSetContentFooter,
    setClassName: handleSetClassName,
    setNavBarLeftNode: handleSetNavBarLeftNode,
    setNavbarRightNode: handleSetNavbarRightNode,
    // Left drawer commands
    isLeftDrawerOpen,
    openLeftDrawer,
    closeLeftDrawer,
    toggleLeftDrawer,
  };

  return (
    <AppLayoutContext.Provider value={value}>
      <AppLayout
        navbar={navbar}
        leftDrawer={leftDrawer}
        contentFooter={contentFooter}
        className={className}
        isLeftDrawerOpen={isLeftDrawerOpen}
        onLeftDrawerOpenChange={setIsLeftDrawerOpen}
      >
        {children}
      </AppLayout>
    </AppLayoutContext.Provider>
  );
};

export const AppLayoutProvider: React.FC<AppLayoutProviderProps> = ({
  children,
  initialTheme = "light",
  storageKey = "flysoft-theme",
  forceInitialTheme = false,
  density,
  densityStorageKey,
  forceInitialDensity,
  onDensityChange,
  initialNavbar,
  initialLeftDrawer,
  initialContentFooter,
  className = "",
}) => {
  return (
    <ThemeProvider
      initialTheme={initialTheme}
      storageKey={storageKey}
      forceInitialTheme={forceInitialTheme}
      density={density}
      densityStorageKey={densityStorageKey}
      forceInitialDensity={forceInitialDensity}
      onDensityChange={onDensityChange}
    >
      <SnackbarProvider>
        <AppLayoutProviderInner
          initialNavbar={initialNavbar}
          initialLeftDrawer={initialLeftDrawer}
          initialContentFooter={initialContentFooter}
          initialClassName={className}
        >
          {children}
        </AppLayoutProviderInner>
        <SnackbarContainer position="bottom-right" />
      </SnackbarProvider>
    </ThemeProvider>
  );
};

// Hook to use AppLayout context
 
export const useAppLayout = (): AppLayoutContextType => {
  const context = useContext(AppLayoutContext);
  if (context === undefined) {
    throw new Error("useAppLayout must be used within an AppLayoutProvider");
  }
  return context;
};

// Hook to check if AppLayout context is available
 
export const useAppLayoutContext = () => {
  const context = useContext(AppLayoutContext);
  return context !== undefined;
};
