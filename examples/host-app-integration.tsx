import React from 'react';
import { ThemeProvider, useGlobalThemeStyles } from '../src/index';

// Ejemplo de cómo integrar la librería en una aplicación host
// para que el tema afecte toda la página

const MyHostApp: React.FC = () => {
  // Hook que aplica estilos globales del tema
  useGlobalThemeStyles();

  return (
    <div>
      <h1>Mi Aplicación Host</h1>
      <p>Este contenido ahora usa los colores del tema aplicado</p>
      
      {/* Tus componentes de la librería aquí */}
      {/* <Button>Mi Botón</Button> */}
    </div>
  );
};

// Tema personalizado para la aplicación host
const hostCustomTheme = {
  name: "host-theme",
  colors: {
    primary: "#8B5CF6", // Purple
    primaryContrast: "#FFFFFF",
    primaryDark: "#7C3AED",
    primaryLight: "#A78BFA",
    secondary: "#06B6D4",
    secondaryContrast: "#FFFFFF",
    secondaryDark: "#0891B2",
    secondaryLight: "#22D3EE",
    success: "#10B981",
    successContrast: "#FFFFFF",
    successDark: "#059669",
    successLight: "#34D399",
    warning: "#F59E0B",
    warningContrast: "#FFFFFF",
    warningDark: "#D97706",
    warningLight: "#FBBF24",
    danger: "#EF4444",
    dangerContrast: "#FFFFFF",
    dangerDark: "#DC2626",
    dangerLight: "#F87171",
    info: "#06B6D4",
    infoContrast: "#FFFFFF",
    infoDark: "#0891B2",
    infoLight: "#22D3EE",
    gray50: "#F9FAFB",
    gray100: "#F3F4F6",
    gray200: "#E5E7EB",
    gray300: "#D1D5DB",
    gray400: "#9CA3AF",
    gray500: "#6B7280",
    gray600: "#4B5563",
    gray700: "#374151",
    gray800: "#1F2937",
    gray900: "#111827",
    borderDefault: "#E5E7EB",
    borderFocus: "#8B5CF6",
    borderError: "#EF4444",
    bgDefault: "#FFFFFF",
    bgSecondary: "#F9FAFB",
    bgDisabled: "#F3F4F6",
    textPrimary: "#111827",
    textSecondary: "#374151",
    textMuted: "#6B7280",
    textDisabled: "#9CA3AF",
  },
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  radius: {
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
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
    default: "Inter, sans-serif",
    sizeDefault: "16px",
    colorDefault: "#111827",
  },
};

// Aplicación principal con ThemeProvider
const HostAppWithTheme: React.FC = () => {
  return (
    <ThemeProvider initialTheme={hostCustomTheme} forceInitialTheme={true}>
      <MyHostApp />
    </ThemeProvider>
  );
};

export default HostAppWithTheme;

/* 
INSTRUCCIONES DE USO:

1. Envuelve tu aplicación con ThemeProvider y pasa tu tema personalizado
2. Usa el hook useGlobalThemeStyles() en tu componente principal
3. El tema ahora afectará toda la página, incluyendo el fondo del body/html

EJEMPLO MÍNIMO:

import { ThemeProvider, useGlobalThemeStyles } from 'flysoft-react-ui';

const App = () => {
  useGlobalThemeStyles(); // Aplica estilos globales
  
  return (
    <div>
      <h1>Mi App</h1>
      {/* Tu contenido aquí */}
    </div>
  );
};

const AppWithTheme = () => (
  <ThemeProvider initialTheme={miTemaPersonalizado}>
    <App />
  </ThemeProvider>
);
*/
