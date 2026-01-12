import React from "react";
import { normalizeIconClass } from "./iconUtils";

// Función helper para convertir nombres de colores comunes a valores CSS válidos
const getColorValue = (color?: string): string | undefined => {
  if (!color) return undefined;

  // Si ya es un valor CSS válido (hex, rgb, rgba, hsl, etc.), retornarlo
  if (
    color.startsWith("#") ||
    color.startsWith("rgb") ||
    color.startsWith("hsl")
  ) {
    return color;
  }

  // Mapeo de nombres de colores comunes
  const colorMap: Record<string, string> = {
    white: "#ffffff",
    black: "#000000",
    "gray-800": "#1f2937",
    "gray-700": "#374151",
    "gray-600": "#4b5563",
    "gray-500": "#6b7280",
    "gray-400": "#9ca3af",
    "gray-300": "#d1d5db",
    "gray-200": "#e5e7eb",
    "gray-100": "#f3f4f6",
    "gray-50": "#f9fafb",
  };

  return colorMap[color.toLowerCase()] || color;
};

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  iconLabel?: string;
  bg?: string;
  textColor?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  rounded = false,
  className = "",
  icon,
  iconPosition = "left",
  iconLabel,
  bg,
  textColor,
  onClick,
}) => {
  const baseClasses =
    "inline-flex items-center font-medium font-[var(--font-default)]";

  const variantClasses = {
    primary: `
      bg-[var(--color-primary-light)] text-gray-800
    `,
    secondary: `
      bg-[var(--color-secondary-light)] text-gray-800
    `,
    success: `
      bg-[var(--color-success-light)] text-gray-800
    `,
    warning: `
      bg-[var(--color-warning-light)] text-gray-800
    `,
    danger: `
      bg-[var(--color-danger-light)] text-gray-800
    `,
    info: `
      bg-[var(--color-info-light)] text-gray-800
    `,
  };

  const sizeClasses = {
    sm: "py-0.5 text-xs",
    md: "py-0.5 text-sm",
    lg: "py-1 text-base",
  };

  // Padding horizontal: si hay icono, el badge no tiene padding, se aplica a los elementos internos
  const horizontalPaddingClasses = icon
    ? "" // Sin padding horizontal en el badge cuando hay icono
    : size === "sm"
    ? "px-2"
    : size === "md"
    ? "px-2.5"
    : "px-3";

  // Padding para el texto: flex-1 para ocupar el espacio, padding solo en el lado opuesto al icono
  const textPaddingClasses = icon
    ? iconPosition === "left"
      ? size === "sm"
        ? "flex-1 pr-2"
        : size === "md"
        ? "flex-1 pr-2.5"
        : "flex-1 pr-3"
      : size === "sm"
      ? "flex-1 pl-2"
      : size === "md"
      ? "flex-1 pl-2.5"
      : "flex-1 pl-3"
    : "";

  // Padding para el icono: solo en el lado del borde
  const iconPaddingClasses = icon
    ? iconPosition === "left"
      ? size === "sm"
        ? "pl-2"
        : size === "md"
        ? "pl-2.5"
        : "pl-3"
      : size === "sm"
      ? "pr-2"
      : size === "md"
      ? "pr-2.5"
      : "pr-3"
    : "";

  const roundedClasses = rounded ? "rounded-full" : "rounded-md";

  const gapClasses = icon ? "gap-2" : ""; // Gap entre icono y texto cuando hay icono

  const iconSizeClasses =
    size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

  // Si se proporciona bg personalizado, usar estilos inline; si no, usar las clases de variante
  const backgroundClasses = bg ? "" : variantClasses[variant];

  // Estilos inline para colores personalizados
  const inlineStyles: React.CSSProperties = bg
    ? {
        backgroundColor: getColorValue(bg) || bg,
        color: getColorValue(textColor) || textColor || "#1f2937", // gray-800 por defecto
      }
    : {};

  // Si hay onClick y no hay iconos, agregar cursor-pointer al badge completo
  const cursorClasses = onClick && !icon ? "cursor-pointer" : "";

  const classes = `${baseClasses} ${backgroundClasses} ${sizeClasses[size]} ${horizontalPaddingClasses} ${roundedClasses} ${gapClasses} ${cursorClasses} ${className}`;

  const renderIcon = () => {
    if (!icon) return null;
    // Si hay onClick y hay iconos, el onClick se aplica solo a los iconos
    const iconClasses = onClick
      ? `${normalizeIconClass(icon)} ${iconSizeClasses} cursor-pointer`
      : `${normalizeIconClass(icon)} ${iconSizeClasses}`;

    return (
      <span className={iconPaddingClasses}>
        <i
          className={iconClasses}
          aria-hidden={!iconLabel}
          aria-label={iconLabel}
          onClick={onClick}
          role={onClick ? "button" : undefined}
          tabIndex={onClick ? 0 : undefined}
          onKeyDown={
            onClick
              ? (e: React.KeyboardEvent) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    // Crear un evento sintético compatible con MouseEvent
                    const syntheticEvent = {
                      ...e,
                      currentTarget: e.currentTarget,
                      target: e.target,
                    } as unknown as React.MouseEvent<HTMLElement>;
                    onClick(syntheticEvent);
                  }
                }
              : undefined
          }
        />
      </span>
    );
  };

  // Si hay onClick y no hay iconos, aplicar onClick al badge completo
  const badgeProps =
    onClick && !icon
      ? {
          onClick,
          role: "button" as const,
          tabIndex: 0,
          onKeyDown: (e: React.KeyboardEvent<HTMLSpanElement>) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              // Crear un evento sintético compatible con MouseEvent
              const syntheticEvent = {
                ...e,
                currentTarget: e.currentTarget,
                target: e.target,
              } as unknown as React.MouseEvent<HTMLElement>;
              onClick(syntheticEvent);
            }
          },
        }
      : {};

  return (
    <span className={classes} style={inlineStyles} {...badgeProps}>
      {icon && iconPosition === "left" && renderIcon()}
      <span className={textPaddingClasses}>{children}</span>
      {icon && iconPosition === "right" && renderIcon()}
    </span>
  );
};
