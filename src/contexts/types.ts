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
}

export interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme | string) => void;
  currentThemeName: string;
  availableThemes: string[];
  resetToDefault: () => void;
  isDark: boolean;
}

export interface ThemeOverride {
  [key: string]: string | number;
}
