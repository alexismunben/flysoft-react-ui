import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Theme, ThemeContextType } from "./types";
import { themes, defaultTheme } from "./presets";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string | Theme;
  storageKey?: string;
  forceInitialTheme?: boolean; // Nueva prop para forzar el tema inicial
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  initialTheme = "light",
  storageKey = "flysoft-theme",
  forceInitialTheme = false,
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

  // Function to apply theme to CSS variables
  const applyThemeToCSS = (theme: Theme) => {
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

    // Set theme name as data attribute for CSS targeting
    root.setAttribute("data-theme", theme.name);
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

    // Apply to CSS
    applyThemeToCSS(newTheme);
  };

  // Function to reset to initial theme (the one passed as initialTheme prop)
  const resetToDefault = () => {
    setTheme(getInitialTheme());
  };

  // Apply theme on mount and when theme changes
  useEffect(() => {
    applyThemeToCSS(currentTheme);
  }, [currentTheme]);

  // Check if current theme is dark
  const isDark = currentTheme.name === "dark";

  const value: ThemeContextType = {
    theme: currentTheme,
    setTheme,
    currentThemeName,
    availableThemes: Object.keys(themes),
    resetToDefault,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// Hook to use theme context
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Hook to check if theme context is available
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  return context !== undefined;
};
