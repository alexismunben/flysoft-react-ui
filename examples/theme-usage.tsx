import React from "react";
import {
  ThemeProvider,
  useTheme,
  useThemeOverride,
  useTemporaryOverride,
  lightTheme,
  darkTheme,
  blueTheme,
  greenTheme,
} from "../src/index";

// Ejemplo básico de uso del tema
function BasicThemeExample() {
  const { theme, setTheme, currentThemeName, isDark } = useTheme();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Tema Actual: {currentThemeName}</h2>
      <p>Es modo oscuro: {isDark ? "Sí" : "No"}</p>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("blue")}>Blue</button>
        <button onClick={() => setTheme("green")}>Green</button>
      </div>

      <div
        style={{
          padding: "20px",
          backgroundColor: `var(--flysoft-bg-default)`,
          color: `var(--flysoft-text-primary)`,
          border: `2px solid var(--flysoft-border-default)`,
          borderRadius: `var(--flysoft-radius-md)`,
          boxShadow: `var(--flysoft-shadow-md)`,
        }}
      >
        <h3>Contenido con Tema Aplicado</h3>
        <p>Este contenido se adapta automáticamente al tema seleccionado.</p>
        <div
          style={{
            backgroundColor: `var(--flysoft-primary)`,
            color: `var(--flysoft-primary-contrast)`,
            padding: "10px",
            borderRadius: `var(--flysoft-radius-sm)`,
            display: "inline-block",
          }}
        >
          Botón con colores del tema
        </div>
      </div>
    </div>
  );
}

// Ejemplo de override de tema
function ThemeOverrideExample() {
  const { applyOverride, revertOverride } = useThemeOverride();

  const handleHover = () => {
    applyOverride({ primary: "#ff6b6b", secondary: "#4ecdc4" });
  };

  const handleLeave = () => {
    revertOverride(["primary", "secondary"]);
  };

  return (
    <div
      style={{ padding: "20px" }}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <h3>Hover para Override Temporal</h3>
      <p>Pasa el mouse sobre este elemento para ver el override del tema.</p>
      <div
        style={{
          backgroundColor: `var(--flysoft-primary)`,
          color: `var(--flysoft-primary-contrast)`,
          padding: "15px",
          borderRadius: `var(--flysoft-radius-md)`,
          display: "inline-block",
        }}
      >
        Color primario personalizado
      </div>
    </div>
  );
}

// Ejemplo de override temporal automático
function TemporaryOverrideExample() {
  const { applyTemporaryOverride } = useTemporaryOverride(
    { primary: "#ff9ff3", danger: "#feca57" },
    3000 // 3 segundos
  );

  return (
    <div style={{ padding: "20px" }}>
      <h3>Override Temporal Automático</h3>
      <p>
        Haz clic en el botón para aplicar un override que se revierte en 3
        segundos.
      </p>
      <button onClick={applyTemporaryOverride}>
        Aplicar Override Temporal
      </button>
      <div
        style={{
          backgroundColor: `var(--flysoft-primary)`,
          color: `var(--flysoft-primary-contrast)`,
          padding: "15px",
          marginTop: "10px",
          borderRadius: `var(--flysoft-radius-md)`,
          display: "inline-block",
        }}
      >
        Color temporal
      </div>
    </div>
  );
}

// Ejemplo de tema personalizado
function CustomThemeExample() {
  const { setTheme } = useTheme();

  const customTheme = {
    name: "custom",
    colors: {
      primary: "#6c5ce7",
      primaryContrast: "#ffffff",
      primaryDark: "#5f3dc4",
      primaryLight: "#a29bfe",
      secondary: "#fd79a8",
      secondaryContrast: "#ffffff",
      secondaryDark: "#e84393",
      secondaryLight: "#fdcb6e",
      success: "#00b894",
      successContrast: "#ffffff",
      successDark: "#00a085",
      successLight: "#55a3ff",
      warning: "#fdcb6e",
      warningContrast: "#ffffff",
      warningDark: "#f39c12",
      warningLight: "#feca57",
      danger: "#e17055",
      dangerContrast: "#ffffff",
      dangerDark: "#d63031",
      dangerLight: "#ff7675",
      info: "#74b9ff",
      infoContrast: "#ffffff",
      infoDark: "#0984e3",
      infoLight: "#a29bfe",
      gray50: "#f8f9fa",
      gray100: "#e9ecef",
      gray200: "#dee2e6",
      gray300: "#ced4da",
      gray400: "#adb5bd",
      gray500: "#6c757d",
      gray600: "#495057",
      gray700: "#343a40",
      gray800: "#212529",
      gray900: "#121212",
      borderDefault: "#dee2e6",
      borderFocus: "#6c5ce7",
      borderError: "#e17055",
      bgDefault: "#ffffff",
      bgSecondary: "#f8f9fa",
      bgDisabled: "#e9ecef",
      textPrimary: "#121212",
      textSecondary: "#343a40",
      textMuted: "#6c757d",
      textDisabled: "#adb5bd",
    },
    shadows: {
      sm: "0 2px 4px rgba(108, 92, 231, 0.1)",
      md: "0 4px 8px rgba(108, 92, 231, 0.15)",
      lg: "0 8px 16px rgba(108, 92, 231, 0.2)",
    },
    radius: {
      sm: "0.375rem",
      md: "0.5rem",
      lg: "0.75rem",
      full: "9999px",
    },
    spacing: {
      xs: "0.25rem",
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    fonts: {
      default: '"Inter", sans-serif',
      sizeDefault: "16px",
      colorDefault: "#121212",
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Tema Personalizado</h3>
      <p>
        Haz clic en el botón para aplicar un tema completamente personalizado.
      </p>
      <button onClick={() => setTheme(customTheme)}>
        Aplicar Tema Personalizado
      </button>
      <div
        style={{
          backgroundColor: `var(--flysoft-primary)`,
          color: `var(--flysoft-primary-contrast)`,
          padding: "15px",
          marginTop: "10px",
          borderRadius: `var(--flysoft-radius-md)`,
          display: "inline-block",
        }}
      >
        Tema personalizado aplicado
      </div>
    </div>
  );
}

// Componente principal de la aplicación
function ThemeDemoApp() {
  return (
    <ThemeProvider initialTheme="light">
      <div style={{ fontFamily: "var(--flysoft-font-default)" }}>
        <h1
          style={{
            textAlign: "center",
            color: "var(--flysoft-text-primary)",
            marginBottom: "40px",
          }}
        >
          Demostración del Sistema de Temas
        </h1>

        <BasicThemeExample />
        <hr
          style={{
            borderColor: "var(--flysoft-border-default)",
            margin: "40px 0",
          }}
        />

        <ThemeOverrideExample />
        <hr
          style={{
            borderColor: "var(--flysoft-border-default)",
            margin: "40px 0",
          }}
        />

        <TemporaryOverrideExample />
        <hr
          style={{
            borderColor: "var(--flysoft-border-default)",
            margin: "40px 0",
          }}
        />

        <CustomThemeExample />
      </div>
    </ThemeProvider>
  );
}

export default ThemeDemoApp;
