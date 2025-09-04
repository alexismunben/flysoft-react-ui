import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * Hook que aplica estilos globales del tema al body y html
 * Útil para aplicaciones host que quieren que el tema afecte toda la página
 */
export const useGlobalThemeStyles = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (body) {
      // Aplicar estilos al body
      body.style.backgroundColor = theme.colors.bgDefault;
      body.style.color = theme.colors.textPrimary;
      body.style.fontFamily = theme.fonts.default;
      body.style.margin = "0";
      body.style.padding = "0";
    }

    if (html) {
      // Aplicar estilos al html
      html.style.backgroundColor = theme.colors.bgDefault;
      html.style.color = theme.colors.textPrimary;
    }

    // Cleanup function para restaurar estilos originales
    return () => {
      if (body) {
        body.style.backgroundColor = "";
        body.style.color = "";
        body.style.fontFamily = "";
        body.style.margin = "";
        body.style.padding = "";
      }
      if (html) {
        html.style.backgroundColor = "";
        html.style.color = "";
      }
    };
  }, [theme]);
};
