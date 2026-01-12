import React from "react";
import { normalizeIconClass } from "../src/components/utils/iconUtils";

/**
 * Template para Nuevos Componentes
 *
 * Este template proporciona la estructura estándar para crear nuevos componentes
 * en la librería flysoft-react-ui. Incluye comentarios JSDoc completos, ejemplos
 * de uso y metadatos para el sistema de documentación.
 *
 * INSTRUCCIONES DE USO:
 * 1. Copia este archivo a la carpeta apropiada (form-controls, layout, utils)
 * 2. Reemplaza "ComponentName" con el nombre real del componente
 * 3. Actualiza la interfaz ComponentNameProps con las props necesarias
 * 4. Implementa la lógica del componente
 * 5. Actualiza los ejemplos de uso
 * 6. Ejecuta el script de actualización de documentación
 */

// ============================================================================
// INTERFAZ DE PROPS
// ============================================================================

export interface ComponentNameProps {
  /**
   * Descripción de la prop
   * @example "valor de ejemplo"
   */
  propName?: string;

  /**
   * Prop requerida
   * @example "valor requerido"
   */
  requiredProp: string;

  /**
   * Variante del componente
   * @default "default"
   * @example "primary"
   */
  variant?: "default" | "primary" | "secondary";

  /**
   * Tamaño del componente
   * @default "md"
   * @example "lg"
   */
  size?: "sm" | "md" | "lg";

  /**
   * Icono de FontAwesome 5
   * @example "fa-user"
   */
  icon?: string;

  /**
   * Estado deshabilitado
   * @default false
   * @example true
   */
  disabled?: boolean;

  /**
   * Clase CSS adicional
   * @example "custom-class"
   */
  className?: string;

  /**
   * Contenido del componente
   * @example "Texto del componente"
   */
  children?: React.ReactNode;

  /**
   * Función de callback
   * @example () => console.log("clicked")
   */
  onClick?: () => void;
}

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

/**
 * ComponentName - Descripción breve del componente
 *
 * Descripción detallada del componente, su propósito y casos de uso principales.
 *
 * @example
 * ```tsx
 * // Ejemplo básico
 * <ComponentName variant="primary" size="md">
 *   Contenido del componente
 * </ComponentName>
 * ```
 *
 * @example
 * ```tsx
 * // Ejemplo con icono
 * <ComponentName
 *   variant="secondary"
 *   icon="fa-user"
 *   onClick={() => console.log("clicked")}
 * >
 *   Componente con icono
 * </ComponentName>
 * ```
 *
 * @example
 * ```tsx
 * // Ejemplo deshabilitado
 * <ComponentName
 *   disabled={true}
 *   variant="primary"
 * >
 *   Componente deshabilitado
 * </ComponentName>
 * ```
 *
 * @param props - Props del componente
 * @returns Elemento JSX del componente
 */
export const ComponentName: React.FC<ComponentNameProps> = ({
  propName,
  requiredProp,
  variant = "default",
  size = "md",
  icon,
  disabled = false,
  className = "",
  children,
  onClick,
  ...props
}) => {
  // ============================================================================
  // CONFIGURACIÓN DE CLASES CSS
  // ============================================================================

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-sm transition-colors 
    cursor-pointer font-[var(--font-default)]
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    default: `
      bg-[var(--color-bg-default)] text-[var(--color-text-primary)] 
      border border-[var(--color-border-default)]
      hover:bg-[var(--color-bg-secondary)]
    `,
    primary: `
      bg-[var(--color-primary)] text-[var(--color-primary-contrast)] 
      hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]
    `,
    secondary: `
      bg-[var(--color-secondary)] text-[var(--color-secondary-contrast)] 
      hover:bg-[var(--color-secondary-dark)] focus:ring-[var(--color-secondary)]
    `,
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  // ============================================================================
  // FUNCIONES AUXILIARES
  // ============================================================================

  const renderIcon = () => {
    if (!icon) return null;

    const iconClasses =
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

    return (
      <i className={`${normalizeIconClass(icon)} ${iconClasses} mr-2`} aria-hidden="true" />
    );
  };

  // ============================================================================
  // MANEJO DE EVENTOS
  // ============================================================================

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // ============================================================================
  // RENDERIZADO
  // ============================================================================

  return (
    <div
      className={classes}
      onClick={handleClick}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      {...props}
    >
      {icon && renderIcon()}
      {children}
    </div>
  );
};

// ============================================================================
// EXPORTACIÓN POR DEFECTO
// ============================================================================

export default ComponentName;

// ============================================================================
// METADATOS PARA EL SISTEMA DE DOCUMENTACIÓN
// ============================================================================

/**
 * Metadatos del componente para el sistema de documentación automática
 *
 * Estos metadatos se utilizan para generar automáticamente la documentación,
 * actualizar el registro de componentes y mantener sincronizada la información.
 */
export const COMPONENT_METADATA = {
  name: "ComponentName",
  category: "form-controls", // o "layout", "utils"
  description: "Descripción breve del componente",
  filePath: "src/components/form-controls/ComponentName.tsx", // Actualizar ruta
  props: [
    {
      name: "propName",
      type: "string",
      required: false,
      description: "Descripción de la prop",
    },
    {
      name: "requiredProp",
      type: "string",
      required: true,
      description: "Prop requerida",
    },
    {
      name: "variant",
      type: "'default' | 'primary' | 'secondary'",
      required: false,
      defaultValue: "default",
      description: "Variante del componente",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      required: false,
      defaultValue: "md",
      description: "Tamaño del componente",
    },
    {
      name: "icon",
      type: "string",
      required: false,
      description: "Icono de FontAwesome 5",
    },
    {
      name: "disabled",
      type: "boolean",
      required: false,
      defaultValue: false,
      description: "Estado deshabilitado",
    },
    {
      name: "className",
      type: "string",
      required: false,
      description: "Clase CSS adicional",
    },
    {
      name: "children",
      type: "ReactNode",
      required: false,
      description: "Contenido del componente",
    },
    {
      name: "onClick",
      type: "() => void",
      required: false,
      description: "Función de callback",
    },
  ],
  variants: [
    {
      name: "default",
      description: "Variante por defecto",
      example: '<ComponentName variant="default">Contenido</ComponentName>',
    },
    {
      name: "primary",
      description: "Variante primaria",
      example: '<ComponentName variant="primary">Contenido</ComponentName>',
    },
    {
      name: "secondary",
      description: "Variante secundaria",
      example: '<ComponentName variant="secondary">Contenido</ComponentName>',
    },
  ],
  examples: [
    {
      name: "Ejemplo básico",
      description: "Uso básico del componente",
      code: "<ComponentName>Contenido básico</ComponentName>",
      category: "basic",
    },
    {
      name: "Con icono",
      description: "Componente con icono de FontAwesome",
      code: '<ComponentName icon="fa-user">Con icono</ComponentName>',
      category: "icon",
    },
    {
      name: "Deshabilitado",
      description: "Componente en estado deshabilitado",
      code: "<ComponentName disabled={true}>Deshabilitado</ComponentName>",
      category: "states",
    },
  ],
  useCases: ["Formularios", "Navegación", "Acciones", "Interfaz de usuario"],
  icon: "fa-component", // Icono representativo del componente
  lastUpdated: new Date().toISOString(),
};

// ============================================================================
// INSTRUCCIONES DE ACTUALIZACIÓN
// ============================================================================

/**
 * INSTRUCCIONES PARA ACTUALIZAR LA DOCUMENTACIÓN:
 *
 * 1. Actualizar src/index.ts:
 *    - Añadir export del componente
 *    - Añadir export del tipo de props
 *
 * 2. Actualizar docs/component-metadata.json:
 *    - Añadir metadatos del componente
 *
 * 3. Actualizar flysoft-ui.config.ts:
 *    - Añadir configuración del componente
 *
 * 4. Actualizar .cursorrules:
 *    - Añadir reglas para el nuevo componente
 *
 * 5. Actualizar README.md:
 *    - Añadir documentación del componente
 *
 * 6. Ejecutar script de validación:
 *    - npm run validate-docs
 *
 * 7. Crear template si es apropiado:
 *    - Si el componente es común, crear template en templates/
 */
