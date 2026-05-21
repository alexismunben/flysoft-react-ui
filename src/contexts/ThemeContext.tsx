import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import type { Density, DensityTokens, Theme, ThemeContextType } from "./types";
import { themes, defaultTheme, densityPresets, comfortableDensity } from "./presets";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const toKebabCase = (value: string) =>
  value.replace(/([A-Z])/g, "-$1").toLowerCase();

const buildDensityVariables = (tokens: DensityTokens): Record<string, string> => ({
  "--flysoft-density-padding-x-sm": tokens.paddingX.sm,
  "--flysoft-density-padding-x-md": tokens.paddingX.md,
  "--flysoft-density-padding-x-lg": tokens.paddingX.lg,
  "--flysoft-density-padding-y-sm": tokens.paddingY.sm,
  "--flysoft-density-padding-y-md": tokens.paddingY.md,
  "--flysoft-density-padding-y-lg": tokens.paddingY.lg,
  "--flysoft-density-container-padding-x": tokens.containerPaddingX,
  "--flysoft-density-container-padding-y": tokens.containerPaddingY,
  "--flysoft-density-gap-sm": tokens.gap.sm,
  "--flysoft-density-gap-md": tokens.gap.md,
  "--flysoft-density-gap-lg": tokens.gap.lg,
  "--flysoft-density-font-xs": tokens.fontXs,
  "--flysoft-density-font-sm": tokens.fontSm,
  "--flysoft-density-font-base": tokens.fontBase,
  "--flysoft-density-font-lg": tokens.fontLg,
  "--flysoft-density-font-xl": tokens.fontXl,
  "--flysoft-density-control-height-sm": tokens.controlHeight.sm,
  "--flysoft-density-control-height-md": tokens.controlHeight.md,
  "--flysoft-density-control-height-lg": tokens.controlHeight.lg,
  "--flysoft-density-control-indicator-sm": tokens.controlIndicator.sm,
  "--flysoft-density-control-indicator-md": tokens.controlIndicator.md,
  "--flysoft-density-control-indicator-lg": tokens.controlIndicator.lg,
  "--flysoft-density-input-radius": tokens.inputRadius,
  "--flysoft-density-datatable-row": tokens.dataTableRow,
  "--flysoft-density-datatable-header": tokens.dataTableHeader,
  "--flysoft-density-card-gap": tokens.cardGap,
});

const resolveDensityTokens = (theme: Theme, density: Density): DensityTokens => {
  if (theme.density === density && theme.densityTokens) {
    return theme.densityTokens;
  }
  return densityPresets[density] ?? comfortableDensity;
};

const buildThemeResetStyles = (theme: Theme, density: Density): CSSProperties => {
  const cssVariables: Record<string, string> = {
    "--flysoft-theme-name": theme.name,
    "--flysoft-density-name": density,
  };

  Object.entries(theme.colors).forEach(([key, value]) => {
    cssVariables[`--flysoft-${toKebabCase(key)}`] = value;
  });

  Object.entries(theme.shadows).forEach(([key, value]) => {
    cssVariables[`--flysoft-shadow-${key}`] = value;
  });

  Object.entries(theme.radius).forEach(([key, value]) => {
    cssVariables[`--flysoft-radius-${key}`] = value;
  });

  Object.entries(theme.spacing).forEach(([key, value]) => {
    cssVariables[`--flysoft-spacing-${key}`] = value;
  });

  Object.entries(theme.fonts).forEach(([key, value]) => {
    cssVariables[`--flysoft-font-${key}`] = value;
  });

  Object.assign(cssVariables, buildDensityVariables(resolveDensityTokens(theme, density)));

  return {
    color: theme.fonts.colorDefault ?? theme.colors.textPrimary,
    //backgroundColor: theme.colors.bgDefault,
    fontFamily: theme.fonts.default,
    // Font-size base del wrapper: usa la variable de densidad, así span/div y
    // todo lo que herede font-size escala con la densidad activa. Comfortable
    // queda 1rem (16px) → idéntico al valor previo de theme.fonts.sizeDefault.
    fontSize: "var(--flysoft-density-font-base)",
    lineHeight: "1.5",
    ...cssVariables,
  };
};

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string | Theme;
  storageKey?: string;
  forceInitialTheme?: boolean; // Nueva prop para forzar el tema inicial
  onThemeChange?: (theme: Theme) => void; // Callback para persistencia externa
  /**
   * Densidad global inicial. Controla padding, tipografía y altura de los controles
   * de toda la librería sin necesidad de pasar `compact`/`size` por componente.
   */
  density?: Density;
  /** Clave separada para persistir la densidad en localStorage. */
  densityStorageKey?: string;
  /** Si es true, ignora el valor guardado en localStorage y fuerza `density`. */
  forceInitialDensity?: boolean;
  onDensityChange?: (density: Density) => void;
}

const isDensity = (value: unknown): value is Density =>
  value === "comfortable" || value === "compact" || value === "dense";

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "light",
  storageKey = "flysoft-theme",
  forceInitialTheme = false,
  onThemeChange,
  density: initialDensity,
  densityStorageKey = "flysoft-density",
  forceInitialDensity = false,
  onDensityChange,
}) => {
  // Almacenar el tema inicial para poder resetear a él
  const getInitialTheme = (): Theme => {
    if (typeof initialTheme === "string") {
      return themes[initialTheme] || defaultTheme;
    }
    return initialTheme;
  };

  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    // Si forceInitialTheme es true, usar siempre el initialTheme
    if (forceInitialTheme) {
      return getInitialTheme();
    }

    // Try to get theme from localStorage
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(storageKey);
      if (savedTheme) {
        if (themes[savedTheme]) {
          return themes[savedTheme];
        }
        // Try to parse as custom theme
        try {
          const parsed = JSON.parse(savedTheme);
          if (parsed.name && parsed.colors) {
            return parsed;
          }
        } catch {
          // Invalid JSON, fallback to default
        }
      }
    }

    // Handle initialTheme prop
    return getInitialTheme();
  });

  const [currentThemeName, setCurrentThemeName] = useState(currentTheme.name);

  const resolveInitialDensity = (): Density => {
    if (forceInitialDensity && isDensity(initialDensity)) {
      return initialDensity;
    }

    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(densityStorageKey);
      if (isDensity(saved)) return saved;
    }

    if (isDensity(initialDensity)) return initialDensity;
    if (isDensity(currentTheme.density)) return currentTheme.density;
    return "comfortable";
  };

  const [currentDensity, setCurrentDensity] = useState<Density>(resolveInitialDensity);

  // Function to apply theme to CSS variables
  const applyThemeToCSS = (theme: Theme, density: Density) => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;

    // Apply color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVarName = `--flysoft-${key
        .replace(/([A-Z])/g, "-$1")
        .toLowerCase()}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply shadow variables
    Object.entries(theme.shadows).forEach(([key, value]) => {
      const cssVarName = `--flysoft-shadow-${key}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply radius variables
    Object.entries(theme.radius).forEach(([key, value]) => {
      const cssVarName = `--flysoft-radius-${key}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply spacing variables
    Object.entries(theme.spacing).forEach(([key, value]) => {
      const cssVarName = `--flysoft-spacing-${key}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply font variables
    Object.entries(theme.fonts).forEach(([key, value]) => {
      const cssVarName = `--flysoft-font-${key}`;
      root.style.setProperty(cssVarName, value);
    });

    // Apply density variables (depende del nivel de densidad activo)
    const densityVars = buildDensityVariables(resolveDensityTokens(theme, density));
    Object.entries(densityVars).forEach(([cssVarName, value]) => {
      root.style.setProperty(cssVarName, value);
    });

    // Set theme name as data attribute for CSS targeting
    root.setAttribute("data-theme", theme.name);
    root.setAttribute("data-density", density);

    // Apply background and text colors to body for better integration
    const body = document.body;
    if (body) {
      //body.style.backgroundColor = theme.colors.bgDefault;
      body.style.color = theme.colors.textPrimary;
      body.style.fontFamily = theme.fonts.default;
    }
  };

  // Function to set theme
  const setTheme = (theme: Theme | string) => {
    let newTheme: Theme;

    if (typeof theme === "string") {
      if (themes[theme]) {
        newTheme = themes[theme];
      } else {
        console.warn(`Theme "${theme}" not found, falling back to default`);
        newTheme = defaultTheme;
      }
    } else {
      newTheme = theme;
    }

    setCurrentTheme(newTheme);
    setCurrentThemeName(newTheme.name);

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(newTheme));
    }

    // Trigger external callback
    onThemeChange?.(newTheme);

    // Apply to CSS (preserva la densidad activa)
    applyThemeToCSS(newTheme, currentDensity);
  };

  const setDensity = (density: Density) => {
    setCurrentDensity(density);

    if (typeof window !== "undefined") {
      localStorage.setItem(densityStorageKey, density);
    }

    onDensityChange?.(density);
    applyThemeToCSS(currentTheme, density);
  };

  // Function to update theme partially
  const updateTheme = (updates: Partial<Theme> | ((prev: Theme) => Theme)) => {
    setCurrentTheme((prev) => {
      const newTheme =
        typeof updates === "function"
          ? updates(prev)
          : {
              ...prev,
              ...updates,
              colors: { ...prev.colors, ...updates.colors },
              shadows: { ...prev.shadows, ...updates.shadows },
              radius: { ...prev.radius, ...updates.radius },
              spacing: { ...prev.spacing, ...updates.spacing },
              fonts: { ...prev.fonts, ...updates.fonts },
            };

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem(storageKey, JSON.stringify(newTheme));
      }

      // Trigger external callback
      onThemeChange?.(newTheme);

      return newTheme;
    });
  };

  // Function to reset to initial theme (the one passed as initialTheme prop)
  const resetToDefault = () => {
    setTheme(getInitialTheme());
  };

  // Apply theme on mount and when theme/density changes
  useEffect(() => {
    applyThemeToCSS(currentTheme, currentDensity);
  }, [currentTheme, currentDensity]);

  // Check if current theme is dark
  const isDark = currentTheme.name === "dark";

  const themeResetStyles = useMemo(
    () => buildThemeResetStyles(currentTheme, currentDensity),
    [currentTheme, currentDensity],
  );

  const value: ThemeContextType = {
    theme: currentTheme,
    setTheme,
    updateTheme,
    currentThemeName,
    availableThemes: Object.keys(themes),
    resetToDefault,
    isDark,
    density: currentDensity,
    setDensity,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div
        className="flysoft-theme-reset"
        style={themeResetStyles}
        data-theme={currentTheme.name}
        data-density={currentDensity}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

// Hook to use theme context
// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Hook to check if theme context is available
// eslint-disable-next-line react-refresh/only-export-components
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context !== undefined;
};
