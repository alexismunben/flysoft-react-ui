import { createContext, useContext } from "react";

/**
 * Comandos para controlar el drawer izquierdo del AppLayout.
 *
 * En resoluciones grandes el drawer está siempre visible, por lo que
 * `closeLeftDrawer()` no produce ningún cambio visual. En móvil/tablet el
 * drawer se muestra como panel flotante con overlay y estos comandos lo
 * abren o cierran.
 */
export interface LeftDrawerContextType {
  /** Indica si el drawer móvil está abierto */
  isLeftDrawerOpen: boolean;
  /**
   * Indica si el drawer se está mostrando como panel colapsable con overlay
   * (móvil/tablet con contenido en el drawer). En desktop es `false`.
   */
  isLeftDrawerCollapsible: boolean;
  /** Abre el drawer */
  openLeftDrawer: () => void;
  /** Cierra el drawer */
  closeLeftDrawer: () => void;
  /** Alterna el estado del drawer */
  toggleLeftDrawer: () => void;
}

export const LeftDrawerContext = createContext<
  LeftDrawerContextType | undefined
>(undefined);

/**
 * Hook para controlar el drawer izquierdo desde cualquier componente
 * renderizado dentro de `AppLayout` (contenido del drawer, navbar, footer o
 * children).
 *
 * @example
 * ```tsx
 * const { closeLeftDrawer } = useLeftDrawer();
 *
 * <LinkButton to="/inicio" onClick={closeLeftDrawer}>Inicio</LinkButton>
 * ```
 */
export const useLeftDrawer = (): LeftDrawerContextType => {
  const context = useContext(LeftDrawerContext);
  if (context === undefined) {
    throw new Error("useLeftDrawer must be used within an AppLayout");
  }
  return context;
};

/**
 * Igual que `useLeftDrawer` pero devuelve `undefined` en lugar de lanzar error
 * cuando el componente se usa fuera de un `AppLayout`. Útil para componentes
 * reutilizables que pueden renderizarse dentro o fuera del layout.
 */
export const useOptionalLeftDrawer = (): LeftDrawerContextType | undefined =>
  useContext(LeftDrawerContext);
