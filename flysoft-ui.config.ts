/**
 * Configuración Centralizada de Flysoft React UI
 *
 * Este archivo contiene toda la configuración de componentes, temas,
 * patrones y metadatos de la librería.
 */

// ============================================================================
// CONFIGURACIÓN DE COMPONENTES
// ============================================================================

export interface ComponentConfig {
  name: string;
  category: "form-controls" | "layout" | "utils" | "templates";
  description: string;
  props: string[];
  variants: string[];
  examples: string[];
  icon?: string;
}

export const COMPONENTS: ComponentConfig[] = [
  {
    name: "Button",
    category: "form-controls",
    description:
      "Botón personalizable con múltiples variantes, tamaños y soporte para iconos",
    props: ["variant", "size", "icon", "iconPosition", "loading", "disabled"],
    variants: ["primary", "outline", "ghost"],
    examples: ["LoginForm", "RegistrationForm", "ContactForm"],
    icon: "fa-mouse-pointer",
  },
  {
    name: "Input",
    category: "form-controls",
    description:
      "Campo de entrada con soporte para labels, iconos y estados de error",
    props: ["label", "error", "icon", "iconPosition", "size", "type"],
    variants: ["sm", "md", "lg"],
    examples: ["LoginForm", "RegistrationForm", "ContactForm"],
    icon: "fa-keyboard",
  },
  {
    name: "Card",
    category: "layout",
    description:
      "Contenedor de tarjeta con header, contenido y footer opcionales",
    props: ["title", "subtitle", "variant", "headerActions", "footer"],
    variants: ["default", "elevated", "outlined"],
    examples: ["Dashboard", "SidebarLayout", "FormContainers"],
    icon: "fa-id-card",
  },
  {
    name: "Badge",
    category: "utils",
    description: "Etiqueta pequeña para mostrar estados o categorías",
    props: ["variant", "size", "rounded"],
    variants: ["primary", "secondary", "success", "warning", "danger", "info"],
    examples: ["Dashboard", "SidebarLayout", "StatusIndicators"],
    icon: "fa-tag",
  },
  {
    name: "ThemeSwitcher",
    category: "utils",
    description: "Componente para cambiar temas dinámicamente",
    props: ["size", "showLabel"],
    variants: ["sm", "md", "lg"],
    examples: ["ThemeExample", "Dashboard", "SidebarLayout"],
    icon: "fa-palette",
  },
];

// ============================================================================
// CONFIGURACIÓN DE TEMPLATES
// ============================================================================

export interface TemplateConfig {
  name: string;
  category: "forms" | "layouts" | "patterns";
  description: string;
  components: string[];
  useCases: string[];
  file: string;
}

export const TEMPLATES: TemplateConfig[] = [
  {
    name: "LoginForm",
    category: "forms",
    description: "Formulario de login completo con validación",
    components: ["Button", "Input", "Card"],
    useCases: ["Authentication", "User Login", "Admin Panel"],
    file: "templates/forms/LoginForm.tsx",
  },
  {
    name: "RegistrationForm",
    category: "forms",
    description: "Formulario de registro con validación de contraseñas",
    components: ["Button", "Input", "Card"],
    useCases: ["User Registration", "Account Creation", "Sign Up"],
    file: "templates/forms/RegistrationForm.tsx",
  },
  {
    name: "ContactForm",
    category: "forms",
    description: "Formulario de contacto con textarea y validación",
    components: ["Button", "Input", "Card"],
    useCases: ["Contact Page", "Support Form", "Feedback"],
    file: "templates/forms/ContactForm.tsx",
  },
  {
    name: "DashboardLayout",
    category: "layouts",
    description: "Layout de dashboard con estadísticas y contenido",
    components: ["Card", "Badge", "Button"],
    useCases: ["Admin Dashboard", "Analytics", "Reports"],
    file: "templates/layouts/DashboardLayout.tsx",
  },
  {
    name: "SidebarLayout",
    category: "layouts",
    description: "Layout con sidebar de navegación y contenido principal",
    components: ["Button", "Badge"],
    useCases: ["Admin Panel", "Navigation", "App Layout"],
    file: "templates/layouts/SidebarLayout.tsx",
  },
  {
    name: "FormPattern",
    category: "patterns",
    description: "Patrón reutilizable para cualquier formulario",
    components: ["Button", "Input", "Card"],
    useCases: ["Custom Forms", "Dynamic Forms", "Reusable Forms"],
    file: "templates/patterns/FormPattern.tsx",
  },
];

// ============================================================================
// CONFIGURACIÓN DE TEMAS
// ============================================================================

export interface ThemeConfig {
  name: string;
  displayName: string;
  description: string;
  colors: Record<string, string>;
  isDark?: boolean;
}

export const THEMES: ThemeConfig[] = [
  {
    name: "light",
    displayName: "Light",
    description: "Tema claro por defecto",
    colors: {
      primary: "#3b82f6",
      secondary: "#6b7280",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      bg: "#ffffff",
      text: "#111827",
    },
    isDark: false,
  },
  {
    name: "dark",
    displayName: "Dark",
    description: "Tema oscuro elegante",
    colors: {
      primary: "#60a5fa",
      secondary: "#9ca3af",
      success: "#34d399",
      warning: "#fbbf24",
      danger: "#f87171",
      bg: "#111827",
      text: "#f9fafb",
    },
    isDark: true,
  },
  {
    name: "blue",
    displayName: "Blue",
    description: "Variación azul profesional",
    colors: {
      primary: "#1e40af",
      secondary: "#475569",
      success: "#059669",
      warning: "#d97706",
      danger: "#dc2626",
      bg: "#f8fafc",
      text: "#0f172a",
    },
    isDark: false,
  },
  {
    name: "green",
    displayName: "Green",
    description: "Variación verde natural",
    colors: {
      primary: "#059669",
      secondary: "#6b7280",
      success: "#10b981",
      warning: "#f59e0b",
      danger: "#ef4444",
      bg: "#f0fdf4",
      text: "#064e3b",
    },
    isDark: false,
  },
];

// ============================================================================
// CONFIGURACIÓN DE ICONOS
// ============================================================================

export const ICON_CATEGORIES = {
  user: [
    "fa-user",
    "fa-user-circle",
    "fa-user-friends",
    "fa-user-plus",
    "fa-user-minus",
  ],
  forms: ["fa-edit", "fa-keyboard", "fa-mouse-pointer", "fa-check", "fa-times"],
  navigation: [
    "fa-home",
    "fa-arrow-left",
    "fa-arrow-right",
    "fa-bars",
    "fa-times",
  ],
  actions: [
    "fa-save",
    "fa-trash",
    "fa-edit",
    "fa-plus",
    "fa-minus",
    "fa-search",
  ],
  communication: [
    "fa-envelope",
    "fa-phone",
    "fa-comment",
    "fa-paper-plane",
    "fa-bell",
  ],
  security: [
    "fa-lock",
    "fa-unlock",
    "fa-shield-alt",
    "fa-key",
    "fa-sign-in-alt",
  ],
  status: [
    "fa-check-circle",
    "fa-times-circle",
    "fa-exclamation-triangle",
    "fa-info-circle",
  ],
  media: ["fa-image", "fa-video", "fa-file", "fa-download", "fa-upload"],
  layout: ["fa-th", "fa-list", "fa-grid-3x3", "fa-columns", "fa-table"],
};

// ============================================================================
// CONFIGURACIÓN DE PATRONES COMUNES
// ============================================================================

export interface PatternConfig {
  name: string;
  description: string;
  components: string[];
  useCases: string[];
  example: string;
}

export const COMMON_PATTERNS: PatternConfig[] = [
  {
    name: "Form with Validation",
    description: "Formulario con validación de campos y manejo de errores",
    components: ["Input", "Button", "Card"],
    useCases: ["Login", "Registration", "Contact", "Settings"],
    example: "LoginForm",
  },
  {
    name: "Dashboard with Stats",
    description: "Dashboard con tarjetas de estadísticas y métricas",
    components: ["Card", "Badge", "Button"],
    useCases: ["Admin Panel", "Analytics", "Reports", "Overview"],
    example: "DashboardExample",
  },
  {
    name: "Navigation Layout",
    description: "Layout con navegación lateral y contenido principal",
    components: ["Button", "Badge"],
    useCases: ["Admin Panel", "App Navigation", "Sidebar Menu"],
    example: "SidebarLayoutExample",
  },
  {
    name: "Theme Switching",
    description: "Sistema de cambio de temas dinámico",
    components: ["ThemeSwitcher", "ThemeProvider"],
    useCases: ["User Preferences", "Dark Mode", "Custom Themes"],
    example: "ThemeExample",
  },
];

// ============================================================================
// CONFIGURACIÓN DE KEYWORDS PARA PACKAGE.JSON
// ============================================================================

export const PACKAGE_KEYWORDS = [
  "react",
  "ui",
  "components",
  "tailwind",
  "typescript",
  "forms",
  "login",
  "registration",
  "contact-forms",
  "dashboard",
  "layout",
  "themes",
  "fontawesome",
  "accessibility",
  "responsive",
  "modern",
  "design-system",
];

// ============================================================================
// CONFIGURACIÓN DE EXPORTS
// ============================================================================

export const EXPORT_CATEGORIES = {
  components: ["Button", "Input", "Card", "Badge", "ThemeSwitcher"],
  templates: [
    "LoginForm",
    "RegistrationForm",
    "ContactForm",
    "DashboardLayout",
    "SidebarLayout",
    "FormPattern",
  ],
  contexts: ["ThemeProvider", "useTheme", "useThemeOverride"],
  hooks: ["useGlobalThemeStyles"],
};

// ============================================================================
// CONFIGURACIÓN DE VALIDACIÓN
// ============================================================================

export interface ValidationRule {
  component: string;
  prop: string;
  type: "required" | "optional";
  description: string;
}

export const VALIDATION_RULES: ValidationRule[] = [
  {
    component: "Button",
    prop: "children",
    type: "required",
    description: "El contenido del botón es requerido",
  },
  {
    component: "Input",
    prop: "label",
    type: "optional",
    description: "El label es opcional pero recomendado para accesibilidad",
  },
  {
    component: "Card",
    prop: "children",
    type: "required",
    description: "El contenido de la tarjeta es requerido",
  },
];

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

export const getComponentByName = (
  name: string
): ComponentConfig | undefined => {
  return COMPONENTS.find((comp) => comp.name === name);
};

export const getTemplateByName = (name: string): TemplateConfig | undefined => {
  return TEMPLATES.find((template) => template.name === name);
};

export const getComponentsByCategory = (
  category: string
): ComponentConfig[] => {
  return COMPONENTS.filter((comp) => comp.category === category);
};

export const getTemplatesByCategory = (category: string): TemplateConfig[] => {
  return TEMPLATES.filter((template) => template.category === category);
};

export const getAllComponentNames = (): string[] => {
  return COMPONENTS.map((comp) => comp.name);
};

export const getAllTemplateNames = (): string[] => {
  return TEMPLATES.map((template) => template.name);
};

export const getThemeByName = (name: string): ThemeConfig | undefined => {
  return THEMES.find((theme) => theme.name === name);
};

export const getIconsByCategory = (category: string): string[] => {
  return ICON_CATEGORIES[category as keyof typeof ICON_CATEGORIES] || [];
};

export const getAllIconCategories = (): string[] => {
  return Object.keys(ICON_CATEGORIES);
};

// ============================================================================
// CONFIGURACIÓN DE CURSOR AI
// ============================================================================

export const CURSOR_AI_CONFIG = {
  priorityComponents: getAllComponentNames(),
  priorityTemplates: getAllTemplateNames(),
  iconLibrary: "FontAwesome 5",
  themeSystem: "flysoft-react-ui themes",
  commonPatterns: COMMON_PATTERNS.map((p) => p.name),
  keywords: PACKAGE_KEYWORDS,
};

export default {
  COMPONENTS,
  TEMPLATES,
  THEMES,
  ICON_CATEGORIES,
  COMMON_PATTERNS,
  PACKAGE_KEYWORDS,
  EXPORT_CATEGORIES,
  VALIDATION_RULES,
  CURSOR_AI_CONFIG,
  getComponentByName,
  getTemplateByName,
  getComponentsByCategory,
  getTemplatesByCategory,
  getAllComponentNames,
  getAllTemplateNames,
  getThemeByName,
  getIconsByCategory,
  getAllIconCategories,
};
