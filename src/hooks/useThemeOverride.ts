import { useCallback, useEffect, useRef } from "react";
import type { ThemeOverride } from "../contexts/types";

interface UseThemeOverrideOptions {
  scope?: "global" | "local";
  element?: HTMLElement | null;
  prefix?: string;
}

/**
 * Hook para aplicar overrides directos a variables CSS del tema
 * Permite personalización granular sin cambiar el tema completo
 */
export const useThemeOverride = (options: UseThemeOverrideOptions = {}) => {
  const { scope = "global", element = null, prefix = "flysoft" } = options;

  const appliedOverrides = useRef<Set<string>>(new Set());

  // Función para aplicar override
  const applyOverride = useCallback(
    (overrides: ThemeOverride) => {
      const targetElement =
        scope === "global" ? document.documentElement : element;

      if (!targetElement) {
        console.warn("useThemeOverride: No target element available");
        return;
      }

      Object.entries(overrides).forEach(([key, value]) => {
        const cssVarName = `--${prefix}-${key
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()}`;

        // Aplicar el override
        targetElement.style.setProperty(cssVarName, String(value));

        // Registrar para poder revertir después
        appliedOverrides.current.add(cssVarName);
      });
    },
    [scope, element, prefix]
  );

  // Función para revertir overrides específicos
  const revertOverride = useCallback(
    (keys: string[]) => {
      const targetElement =
        scope === "global" ? document.documentElement : element;

      if (!targetElement) return;

      keys.forEach((key) => {
        const cssVarName = `--${prefix}-${key
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase()}`;

        if (appliedOverrides.current.has(cssVarName)) {
          targetElement.style.removeProperty(cssVarName);
          appliedOverrides.current.delete(cssVarName);
        }
      });
    },
    [scope, element, prefix]
  );

  // Función para revertir todos los overrides aplicados
  const revertAllOverrides = useCallback(() => {
    const targetElement =
      scope === "global" ? document.documentElement : element;

    if (!targetElement) return;

    appliedOverrides.current.forEach((cssVarName) => {
      targetElement.style.removeProperty(cssVarName);
    });

    appliedOverrides.current.clear();
  }, [scope, element]);

  // Función para obtener el valor actual de una variable CSS
  const getCSSVariable = useCallback(
    (key: string): string | null => {
      const targetElement =
        scope === "global" ? document.documentElement : element;

      if (!targetElement) return null;

      const cssVarName = `--${prefix}-${key
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()}`;
      return (
        getComputedStyle(targetElement).getPropertyValue(cssVarName) || null
      );
    },
    [scope, element, prefix]
  );

  // Función para verificar si un override está aplicado
  const isOverrideApplied = useCallback(
    (key: string): boolean => {
      const cssVarName = `--${prefix}-${key
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()}`;
      return appliedOverrides.current.has(cssVarName);
    },
    [prefix]
  );

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      revertAllOverrides();
    };
  }, [revertAllOverrides]);

  return {
    applyOverride,
    revertOverride,
    revertAllOverrides,
    getCSSVariable,
    isOverrideApplied,
    appliedOverridesCount: appliedOverrides.current.size,
  };
};

/**
 * Hook para aplicar overrides temporales que se revierten automáticamente
 */
export const useTemporaryOverride = (
  overrides: ThemeOverride,
  duration: number = 3000,
  options: UseThemeOverrideOptions = {}
) => {
  const { applyOverride, revertOverride } = useThemeOverride(options);

  const applyTemporaryOverride = useCallback(() => {
    applyOverride(overrides);

    const timeoutId = setTimeout(() => {
      revertOverride(Object.keys(overrides));
    }, duration);

    return () => {
      clearTimeout(timeoutId);
      revertOverride(Object.keys(overrides));
    };
  }, [applyOverride, revertOverride, overrides, duration]);

  return { applyTemporaryOverride };
};
