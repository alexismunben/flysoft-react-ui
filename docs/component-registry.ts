/**
 * Registro Automático de Componentes
 *
 * Este archivo mantiene un catálogo actualizado de todos los componentes
 * disponibles en la librería, sus props, variantes y ejemplos de uso.
 */

import {
  COMPONENTS,
  TEMPLATES,
  THEMES,
  ICON_CATEGORIES,
} from "../flysoft-ui.config";

// ============================================================================
// INTERFACES
// ============================================================================

export interface ComponentMetadata {
  name: string;
  category: string;
  description: string;
  props: PropMetadata[];
  variants: VariantMetadata[];
  examples: ExampleMetadata[];
  icon?: string;
  filePath: string;
  lastUpdated: string;
}

export interface PropMetadata {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: any;
  description: string;
  options?: string[];
}

export interface VariantMetadata {
  name: string;
  description: string;
  example: string;
}

export interface ExampleMetadata {
  name: string;
  description: string;
  code: string;
  category: string;
}

export interface TemplateMetadata {
  name: string;
  category: string;
  description: string;
  components: string[];
  useCases: string[];
  filePath: string;
  lastUpdated: string;
}

// ============================================================================
// REGISTRO DE COMPONENTES
// ============================================================================

export const COMPONENT_REGISTRY: ComponentMetadata[] = [
  {
    name: "Button",
    category: "form-controls",
    description:
      "Botón personalizable con múltiples variantes, tamaños y soporte para iconos FontAwesome 5",
    props: [
      {
        name: "variant",
        type: "'primary' | 'outline' | 'ghost'",
        required: false,
        defaultValue: "primary",
        description: "Variante visual del botón",
        options: ["primary", "outline", "ghost"],
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: "md",
        description: "Tamaño del botón",
        options: ["sm", "md", "lg"],
      },
      {
        name: "icon",
        type: "string",
        required: false,
        description: "Clase de FontAwesome 5 (ej: fa-user, fa-save)",
        options: Object.values(ICON_CATEGORIES).flat(),
      },
      {
        name: "iconPosition",
        type: "'left' | 'right'",
        required: false,
        defaultValue: "left",
        description: "Posición del icono",
        options: ["left", "right"],
      },
      {
        name: "loading",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "Estado de carga del botón",
      },
      {
        name: "disabled",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "Estado deshabilitado del botón",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Contenido del botón",
      },
    ],
    variants: [
      {
        name: "primary",
        description: "Botón principal con fondo de color primario",
        example: '<Button variant="primary">Guardar</Button>',
      },
      {
        name: "outline",
        description: "Botón con borde y fondo transparente",
        example: '<Button variant="outline">Cancelar</Button>',
      },
      {
        name: "ghost",
        description: "Botón sin borde ni fondo, solo texto",
        example: '<Button variant="ghost">Enlace</Button>',
      },
    ],
    examples: [
      {
        name: "Botón con icono",
        description: "Botón con icono de FontAwesome",
        code: '<Button icon="fa-save" variant="primary">Guardar</Button>',
        category: "basic",
      },
      {
        name: "Botón de carga",
        description: "Botón en estado de carga",
        code: '<Button loading={true} variant="primary">Procesando...</Button>',
        category: "states",
      },
      {
        name: "Botón deshabilitado",
        description: "Botón deshabilitado",
        code: '<Button disabled={true} variant="primary">No disponible</Button>',
        category: "states",
      },
    ],
    icon: "fa-mouse-pointer",
    filePath: "src/components/form-controls/Button.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "Input",
    category: "form-controls",
    description:
      "Campo de entrada con soporte para labels, iconos FontAwesome 5 y estados de error",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Texto del label del campo",
      },
      {
        name: "error",
        type: "string",
        required: false,
        description: "Mensaje de error a mostrar",
      },
      {
        name: "icon",
        type: "string",
        required: false,
        description: "Clase de FontAwesome 5 (ej: fa-user, fa-envelope)",
        options: Object.values(ICON_CATEGORIES).flat(),
      },
      {
        name: "iconPosition",
        type: "'left' | 'right'",
        required: false,
        defaultValue: "left",
        description: "Posición del icono",
        options: ["left", "right"],
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: "md",
        description: "Tamaño del campo",
        options: ["sm", "md", "lg"],
      },
      {
        name: "type",
        type: "string",
        required: false,
        defaultValue: "text",
        description: "Tipo de input HTML",
        options: ["text", "email", "password", "number", "tel", "url"],
      },
    ],
    variants: [
      {
        name: "sm",
        description: "Campo pequeño",
        example: '<Input size="sm" label="Nombre" />',
      },
      {
        name: "md",
        description: "Campo mediano (por defecto)",
        example: '<Input size="md" label="Email" />',
      },
      {
        name: "lg",
        description: "Campo grande",
        example: '<Input size="lg" label="Mensaje" />',
      },
    ],
    examples: [
      {
        name: "Campo con icono",
        description: "Campo con icono de FontAwesome",
        code: '<Input label="Email" icon="fa-envelope" type="email" />',
        category: "basic",
      },
      {
        name: "Campo con error",
        description: "Campo mostrando mensaje de error",
        code: '<Input label="Email" error="Email inválido" />',
        category: "validation",
      },
      {
        name: "Campo de contraseña",
        description: "Campo de contraseña con icono",
        code: '<Input label="Contraseña" type="password" icon="fa-lock" />',
        category: "security",
      },
    ],
    icon: "fa-keyboard",
    filePath: "src/components/form-controls/Input.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "Card",
    category: "layout",
    description:
      "Contenedor de tarjeta con header, contenido y footer opcionales",
    props: [
      {
        name: "title",
        type: "string",
        required: false,
        description: "Título del header de la tarjeta",
      },
      {
        name: "subtitle",
        type: "string",
        required: false,
        description: "Subtítulo del header de la tarjeta",
      },
      {
        name: "variant",
        type: "'default' | 'elevated' | 'outlined'",
        required: false,
        defaultValue: "default",
        description: "Variante visual de la tarjeta",
        options: ["default", "elevated", "outlined"],
      },
      {
        name: "headerActions",
        type: "ReactNode",
        required: false,
        description: "Elementos de acción en el header",
      },
      {
        name: "footer",
        type: "ReactNode",
        required: false,
        description: "Contenido del footer",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Contenido principal de la tarjeta",
      },
    ],
    variants: [
      {
        name: "default",
        description: "Tarjeta con borde sutil",
        example: '<Card title="Mi Tarjeta">Contenido</Card>',
      },
      {
        name: "elevated",
        description: "Tarjeta con sombra elevada",
        example: '<Card variant="elevated" title="Mi Tarjeta">Contenido</Card>',
      },
      {
        name: "outlined",
        description: "Tarjeta con borde más visible",
        example: '<Card variant="outlined" title="Mi Tarjeta">Contenido</Card>',
      },
    ],
    examples: [
      {
        name: "Tarjeta básica",
        description: "Tarjeta con título y contenido",
        code: '<Card title="Mi Tarjeta">Contenido de la tarjeta</Card>',
        category: "basic",
      },
      {
        name: "Tarjeta con acciones",
        description: "Tarjeta con botones en el header",
        code: '<Card title="Mi Tarjeta" headerActions={<Button>Acción</Button>}>Contenido</Card>',
        category: "advanced",
      },
      {
        name: "Tarjeta con footer",
        description: "Tarjeta con contenido en el footer",
        code: '<Card title="Mi Tarjeta" footer={<div>Footer</div>}>Contenido</Card>',
        category: "advanced",
      },
    ],
    icon: "fa-id-card",
    filePath: "src/components/layout/Card.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "Badge",
    category: "utils",
    description:
      "Etiqueta pequeña para mostrar estados, categorías o contadores",
    props: [
      {
        name: "variant",
        type: "'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'",
        required: false,
        defaultValue: "primary",
        description: "Variante de color del badge",
        options: [
          "primary",
          "secondary",
          "success",
          "warning",
          "danger",
          "info",
        ],
      },
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: "md",
        description: "Tamaño del badge",
        options: ["sm", "md", "lg"],
      },
      {
        name: "rounded",
        type: "boolean",
        required: false,
        defaultValue: false,
        description: "Aplicar bordes completamente redondeados",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Contenido del badge",
      },
    ],
    variants: [
      {
        name: "primary",
        description: "Badge con color primario",
        example: '<Badge variant="primary">Nuevo</Badge>',
      },
      {
        name: "success",
        description: "Badge con color de éxito",
        example: '<Badge variant="success">Activo</Badge>',
      },
      {
        name: "warning",
        description: "Badge con color de advertencia",
        example: '<Badge variant="warning">Pendiente</Badge>',
      },
      {
        name: "danger",
        description: "Badge con color de peligro",
        example: '<Badge variant="danger">Error</Badge>',
      },
    ],
    examples: [
      {
        name: "Badge de estado",
        description: "Badge mostrando estado de un elemento",
        code: '<Badge variant="success">Activo</Badge>',
        category: "status",
      },
      {
        name: "Badge de contador",
        description: "Badge mostrando número de elementos",
        code: '<Badge variant="primary">5</Badge>',
        category: "counter",
      },
      {
        name: "Badge redondeado",
        description: "Badge con bordes completamente redondeados",
        code: '<Badge variant="info" rounded>Info</Badge>',
        category: "styling",
      },
    ],
    icon: "fa-tag",
    filePath: "src/components/utils/Badge.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "ThemeSwitcher",
    category: "utils",
    description:
      "Componente para cambiar temas dinámicamente con soporte para múltiples temas",
    props: [
      {
        name: "size",
        type: "'sm' | 'md' | 'lg'",
        required: false,
        defaultValue: "md",
        description: "Tamaño del switcher",
        options: ["sm", "md", "lg"],
      },
      {
        name: "showLabel",
        type: "boolean",
        required: false,
        defaultValue: true,
        description: "Mostrar etiqueta del tema actual",
      },
    ],
    variants: [
      {
        name: "sm",
        description: "Switcher pequeño",
        example: '<ThemeSwitcher size="sm" />',
      },
      {
        name: "md",
        description: "Switcher mediano (por defecto)",
        example: '<ThemeSwitcher size="md" />',
      },
      {
        name: "lg",
        description: "Switcher grande",
        example: '<ThemeSwitcher size="lg" />',
      },
    ],
    examples: [
      {
        name: "Switcher básico",
        description: "Switcher con etiqueta",
        code: "<ThemeSwitcher />",
        category: "basic",
      },
      {
        name: "Switcher sin etiqueta",
        description: "Switcher solo con iconos",
        code: "<ThemeSwitcher showLabel={false} />",
        category: "compact",
      },
    ],
    icon: "fa-palette",
    filePath: "src/components/ThemeSwitcher.tsx",
    lastUpdated: new Date().toISOString(),
  },
];

// ============================================================================
// REGISTRO DE TEMPLATES
// ============================================================================

export const TEMPLATE_REGISTRY: TemplateMetadata[] = [
  {
    name: "LoginForm",
    category: "forms",
    description:
      "Formulario de login completo con validación de email y contraseña",
    components: ["Button", "Input", "Card"],
    useCases: ["Authentication", "User Login", "Admin Panel", "Mobile App"],
    filePath: "templates/forms/LoginForm.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "RegistrationForm",
    category: "forms",
    description:
      "Formulario de registro con validación de contraseñas y campos requeridos",
    components: ["Button", "Input", "Card"],
    useCases: [
      "User Registration",
      "Account Creation",
      "Sign Up",
      "Onboarding",
    ],
    filePath: "templates/forms/RegistrationForm.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "ContactForm",
    category: "forms",
    description: "Formulario de contacto con textarea y validación de campos",
    components: ["Button", "Input", "Card"],
    useCases: ["Contact Page", "Support Form", "Feedback", "Help Desk"],
    filePath: "templates/forms/ContactForm.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "DashboardLayout",
    category: "layouts",
    description:
      "Layout de dashboard con estadísticas, métricas y contenido organizado",
    components: ["Card", "Badge", "Button"],
    useCases: [
      "Admin Dashboard",
      "Analytics",
      "Reports",
      "Overview",
      "KPI Display",
    ],
    filePath: "templates/layouts/DashboardLayout.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "SidebarLayout",
    category: "layouts",
    description:
      "Layout con sidebar de navegación, contenido principal y información de usuario",
    components: ["Button", "Badge"],
    useCases: [
      "Admin Panel",
      "Navigation",
      "App Layout",
      "Desktop App",
      "Management Interface",
    ],
    filePath: "templates/layouts/SidebarLayout.tsx",
    lastUpdated: new Date().toISOString(),
  },
  {
    name: "FormPattern",
    category: "patterns",
    description:
      "Patrón reutilizable para crear cualquier tipo de formulario con validación",
    components: ["Button", "Input", "Card"],
    useCases: [
      "Custom Forms",
      "Dynamic Forms",
      "Reusable Forms",
      "Form Builder",
      "Wizard Forms",
    ],
    filePath: "templates/patterns/FormPattern.tsx",
    lastUpdated: new Date().toISOString(),
  },
];

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

export const getComponentByName = (
  name: string
): ComponentMetadata | undefined => {
  return COMPONENT_REGISTRY.find((comp) => comp.name === name);
};

export const getTemplateByName = (
  name: string
): TemplateMetadata | undefined => {
  return TEMPLATE_REGISTRY.find((template) => template.name === name);
};

export const getComponentsByCategory = (
  category: string
): ComponentMetadata[] => {
  return COMPONENT_REGISTRY.filter((comp) => comp.category === category);
};

export const getTemplatesByCategory = (
  category: string
): TemplateMetadata[] => {
  return TEMPLATE_REGISTRY.filter((template) => template.category === category);
};

export const getAllComponentNames = (): string[] => {
  return COMPONENT_REGISTRY.map((comp) => comp.name);
};

export const getAllTemplateNames = (): string[] => {
  return TEMPLATE_REGISTRY.map((template) => template.name);
};

export const getComponentsByUseCase = (
  useCase: string
): ComponentMetadata[] => {
  return COMPONENT_REGISTRY.filter((comp) =>
    comp.examples.some((example) =>
      example.category.toLowerCase().includes(useCase.toLowerCase())
    )
  );
};

export const getTemplatesByUseCase = (useCase: string): TemplateMetadata[] => {
  return TEMPLATE_REGISTRY.filter((template) =>
    template.useCases.some((uc) =>
      uc.toLowerCase().includes(useCase.toLowerCase())
    )
  );
};

export const searchComponents = (query: string): ComponentMetadata[] => {
  const lowercaseQuery = query.toLowerCase();
  return COMPONENT_REGISTRY.filter(
    (comp) =>
      comp.name.toLowerCase().includes(lowercaseQuery) ||
      comp.description.toLowerCase().includes(lowercaseQuery) ||
      comp.props.some((prop) =>
        prop.name.toLowerCase().includes(lowercaseQuery)
      )
  );
};

export const searchTemplates = (query: string): TemplateMetadata[] => {
  const lowercaseQuery = query.toLowerCase();
  return TEMPLATE_REGISTRY.filter(
    (template) =>
      template.name.toLowerCase().includes(lowercaseQuery) ||
      template.description.toLowerCase().includes(lowercaseQuery) ||
      template.useCases.some((uc) => uc.toLowerCase().includes(lowercaseQuery))
  );
};

// ============================================================================
// ESTADÍSTICAS DEL REGISTRO
// ============================================================================

export const getRegistryStats = () => {
  const componentCategories = [
    ...new Set(COMPONENT_REGISTRY.map((c) => c.category)),
  ];
  const templateCategories = [
    ...new Set(TEMPLATE_REGISTRY.map((t) => t.category)),
  ];
  const totalProps = COMPONENT_REGISTRY.reduce(
    (acc, comp) => acc + comp.props.length,
    0
  );
  const totalVariants = COMPONENT_REGISTRY.reduce(
    (acc, comp) => acc + comp.variants.length,
    0
  );
  const totalExamples = COMPONENT_REGISTRY.reduce(
    (acc, comp) => acc + comp.examples.length,
    0
  );

  return {
    totalComponents: COMPONENT_REGISTRY.length,
    totalTemplates: TEMPLATE_REGISTRY.length,
    componentCategories,
    templateCategories,
    totalProps,
    totalVariants,
    totalExamples,
    lastUpdated: new Date().toISOString(),
  };
};

export default {
  COMPONENT_REGISTRY,
  TEMPLATE_REGISTRY,
  getComponentByName,
  getTemplateByName,
  getComponentsByCategory,
  getTemplatesByCategory,
  getAllComponentNames,
  getAllTemplateNames,
  getComponentsByUseCase,
  getTemplatesByUseCase,
  searchComponents,
  searchTemplates,
  getRegistryStats,
};
