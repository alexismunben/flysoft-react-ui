export interface Theme {
  name: string;
  colors: {
    primary: string;
    primaryContrast: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryContrast: string;
    secondaryDark: string;
    secondaryLight: string;
    success: string;
    successContrast: string;
    successDark: string;
    successLight: string;
    warning: string;
    warningContrast: string;
    warningDark: string;
    warningLight: string;
    danger: string;
    dangerContrast: string;
    dangerDark: string;
    dangerLight: string;
    info: string;
    infoContrast: string;
    infoDark: string;
    infoLight: string;
    accent: string;
    accentContrast: string;
    accentDark: string;
    accentLight: string;
    gray50: string;
    gray100: string;
    gray200: string;
    gray300: string;
    gray400: string;
    gray500: string;
    gray600: string;
    gray700: string;
    gray800: string;
    gray900: string;
    borderDefault: string;
    borderFocus: string;
    borderError: string;
    bgDefault: string;
    bgSecondary: string;
    bgDisabled: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textDisabled: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
  radius: {
    sm: string;
    md: string;
    lg: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  fonts: {
    default: string;
    sizeDefault: string;
    colorDefault: string;
  };
  density?: Density;
  densityTokens?: DensityTokens;
}

export type Density = "comfortable" | "compact" | "dense";

export interface DensityTokens {
  paddingX: { sm: string; md: string; lg: string };
  paddingY: { sm: string; md: string; lg: string };
  /** Padding horizontal para containers (Card, Dialog, Filter panel). */
  containerPaddingX: string;
  /** Padding vertical para containers (Card header/footer/content). */
  containerPaddingY: string;
  gap: { sm: string; md: string; lg: string };
  fontXs: string;
  fontSm: string;
  fontBase: string;
  fontLg: string;
  fontXl: string;
  controlHeight: { sm: string; md: string; lg: string };
  /**
   * Tamaño (ancho/alto) del indicator de Checkbox (cuadrado) y RadioButton
   * (círculo). Se reduce en compact/dense para no abrumar visualmente cuando
   * el resto de la UI es más chica.
   */
  controlIndicator: { sm: string; md: string; lg: string };
  /** Border-radius para inputs, badges del filter, botones — escala con densidad. */
  inputRadius: string;
  dataTableRow: string;
  dataTableHeader: string;
  cardGap: string;
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | string) => void;
  updateTheme: (updates: Partial<Theme> | ((prev: Theme) => Theme)) => void;
  currentThemeName: string;
  availableThemes: string[];
  resetToDefault: () => void;
  isDark: boolean;
  density: Density;
  setDensity: (density: Density) => void;
}

export interface ThemeOverride {
  [key: string]: string | number;
}
