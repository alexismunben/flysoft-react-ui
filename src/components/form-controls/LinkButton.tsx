import React from "react";
import { Link } from "react-router-dom";
import { normalizeIconClass } from "../utils/iconUtils";

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

export interface LinkButtonProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  target?: string;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  bg?: string;
  textColor?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  children?: React.ReactNode;
}

type Ripple = {
  id: number;
  x: number;
  y: number;
  size: number;
};

export const LinkButton: React.FC<LinkButtonProps> = ({
  to,
  target,
  variant = "primary",
  size = "md",
  color = "primary",
  bg,
  textColor,
  icon,
  iconPosition = "left",
  children,
  className = "",
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);

  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-sm transition-colors 
    cursor-pointer relative overflow-hidden no-underline outline-none focus:outline-none 
    focus-visible:outline-none active:outline-none focus:ring-0 focus:ring-offset-0
    font-[var(--font-default)]
  `;

  // Mapeo de clases para variant primary con color primary (usa Tailwind)
  const getVariantClasses = (variantType: string, colorType: string) => {
    // Solo usar clases Tailwind para primary con color primary
    if (colorType === "primary") {
      if (variantType === "primary") {
        return `
          bg-[var(--color-primary)] text-[var(--color-primary-contrast)] 
          hover:bg-[var(--color-primary-dark)]
        `;
      } else if (variantType === "outline") {
        return `
          border border-[var(--color-primary)] text-[var(--color-primary)] 
          hover:bg-[var(--color-bg-secondary)]
        `;
      } else {
        return `
          text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)]
        `;
      }
    }
    // Para otros colores, retornar clases base sin color (se aplicarán con estilos inline)
    if (variantType === "primary") {
      return ``;
    } else if (variantType === "outline") {
      return `border hover:bg-[var(--color-bg-secondary)]`;
    } else {
      return `hover:bg-[var(--color-bg-secondary)]`;
    }
  };

  // Si se proporciona bg personalizado, no usar las clases de variante
  const variantClasses = bg ? "" : getVariantClasses(variant, color);
  
  // Determinar si necesitamos usar estilos inline para colores del sistema
  const needsInlineStyles = !bg && color !== "primary";

  const sizeClasses = {
    sm: `${children ? "px-3 py-1.5" : "p-1.5"} text-sm`,
    md: `${children ? "px-4 py-2" : "p-2"} text-base`,
    lg: `${children ? "px-6 py-3" : "p-3"} text-lg`,
  };

  // Clases adicionales para variant outline cuando hay bg personalizado
  const outlineClasses = bg && variant === "outline" ? "border" : "";

  const classes = `${baseClasses} ${variantClasses} ${sizeClasses[size]} ${outlineClasses} ${className}`;

  // Función para obtener el valor de una variable CSS
  const getCSSVariable = (varName: string): string => {
    if (typeof window !== "undefined") {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      // Si no se encuentra la variable, intentar con el prefijo flysoft
      if (!value && varName.startsWith("--color-")) {
        const flysoftVarName = varName.replace("--color-", "--flysoft-");
        return (
          getComputedStyle(document.documentElement)
            .getPropertyValue(flysoftVarName)
            .trim() || value
        );
      }
      return value;
    }
    return "";
  };

  // Estilos inline para colores personalizados o colores del sistema (no primary)
  const inlineStyles: React.CSSProperties = bg
    ? {
        backgroundColor:
          variant === "primary" ? getColorValue(bg) || bg : undefined,
        color:
          getColorValue(textColor) ||
          textColor ||
          (variant === "primary" ? "#ffffff" : getColorValue(bg) || bg),
        borderColor:
          variant === "outline" ? getColorValue(bg) || bg : undefined,
        ...(variant === "ghost" && {
          color:
            getColorValue(textColor) || textColor || getColorValue(bg) || bg,
        }),
      }
    : needsInlineStyles
    ? {
        ...(variant === "primary" && {
          backgroundColor: getCSSVariable(`--color-${color}`),
          color: getCSSVariable(`--color-${color}-contrast`) || "#ffffff",
        }),
        ...(variant === "outline" && {
          borderColor: getCSSVariable(`--color-${color}`),
          color: getCSSVariable(`--color-${color}`),
        }),
        ...(variant === "ghost" && {
          color: getCSSVariable(`--color-${color}`),
        }),
      }
    : {};

  // Función para oscurecer un color (para hover en variant primary con bg personalizado)
  const darkenColor = (color: string, percent: number): string => {
    const hex = color.replace("#", "");
    const num = parseInt(hex, 16);
    const r = Math.max(0, Math.floor((num >> 16) * (1 - percent / 100)));
    const g = Math.max(
      0,
      Math.floor(((num >> 8) & 0x00ff) * (1 - percent / 100))
    );
    const b = Math.max(0, Math.floor((num & 0x0000ff) * (1 - percent / 100)));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  const renderIcon = () => {
    if (!icon) return null;

    const iconClasses =
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

    return (
      <i
        className={`${normalizeIconClass(icon)} ${iconClasses} ${
          children ? (iconPosition === "right" ? "ml-2" : "mr-2") : ""
        } mt-0.5`}
      />
    );
  };

  // Determinar el color del ripple basado en el variant y si hay bg personalizado
  const rippleColor = bg
    ? variant === "primary"
      ? "rgba(255, 255, 255, 0.45)"
      : "rgba(0, 0, 0, 0.15)"
    : variant === "primary"
    ? "rgba(255, 255, 255, 0.45)"
    : "rgba(0, 0, 0, 0.15)";

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const targetElement = event.currentTarget;
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const id = window.performance.now();

      const newRipple: Ripple = { id, x, y, size };
      setRipples((prev) => [...prev, newRipple]);

      window.setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
      }, 600);
    }

    onClick?.(event);
  };

  // Determinar si es una ruta externa (http/https) o interna
  const isExternal = to.startsWith("http://") || to.startsWith("https://") || to.startsWith("mailto:") || to.startsWith("tel:");

  // Combinar estilos inline - agregar outline: none para asegurar que no aparezca
  const combinedStyles: React.CSSProperties = {
    ...inlineStyles,
    outline: "none",
    outlineWidth: "0",
    outlineStyle: "none",
    outlineOffset: "0",
    WebkitTapHighlightColor: "transparent",
    boxShadow: "none",
  };

  const linkProps = {
    className: classes,
    style: combinedStyles,
    onClick: handleClick,
    onFocus: (e: React.FocusEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.outline = "none";
      e.currentTarget.style.outlineWidth = "0";
      e.currentTarget.style.outlineStyle = "none";
      e.currentTarget.style.outlineOffset = "0";
      e.currentTarget.style.boxShadow = "none";
    },
    onBlur: (e: React.FocusEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.outline = "none";
      e.currentTarget.style.outlineWidth = "0";
      e.currentTarget.style.outlineStyle = "none";
      e.currentTarget.style.outlineOffset = "0";
      e.currentTarget.style.boxShadow = "none";
    },
    onKeyDown: (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      // Eliminar outline cuando se presiona cualquier tecla
      if (e.key === "Tab" || e.key === "Enter" || e.key === " ") {
        e.currentTarget.style.outline = "none";
        e.currentTarget.style.outlineWidth = "0";
        e.currentTarget.style.outlineStyle = "none";
        e.currentTarget.style.outlineOffset = "0";
        e.currentTarget.style.boxShadow = "none";
      }
    },
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (variant === "primary") {
        if (bg) {
          const hoverBg = darkenColor(getColorValue(bg) || bg, 15);
          e.currentTarget.style.backgroundColor = hoverBg;
        } else if (needsInlineStyles) {
          const hoverBg = getCSSVariable(`--color-${color}-dark`);
          e.currentTarget.style.backgroundColor = hoverBg;
        }
      }
    },
    onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (variant === "primary") {
        if (bg) {
          e.currentTarget.style.backgroundColor = getColorValue(bg) || bg;
        } else if (needsInlineStyles) {
          e.currentTarget.style.backgroundColor = getCSSVariable(
            `--color-${color}`
          );
        }
      }
    },
    ...props,
  };

  if (isExternal) {
    const externalTarget = target || "_blank";
    return (
      <a
        href={to}
        target={externalTarget}
        rel={externalTarget === "_blank" ? "noopener noreferrer" : undefined}
        {...linkProps}
      >
        <span className="absolute inset-0 pointer-events-none">
          {ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full opacity-40 flysoft-button-ripple"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
                backgroundColor: rippleColor,
              }}
            />
          ))}
        </span>
        <span className="relative inline-flex items-center justify-center">
          {icon && iconPosition === "left" && renderIcon()}
          {children}
          {icon && iconPosition === "right" && renderIcon()}
        </span>
      </a>
    );
  }

  return (
    <Link to={to} {...linkProps}>
      <span className="absolute inset-0 pointer-events-none">
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full opacity-40 flysoft-button-ripple"
            style={{
              top: ripple.y,
              left: ripple.x,
              width: ripple.size,
              height: ripple.size,
              backgroundColor: rippleColor,
            }}
          />
        ))}
      </span>
      <span className="relative inline-flex items-center justify-center">
        {icon && iconPosition === "left" && renderIcon()}
        {children}
        {icon && iconPosition === "right" && renderIcon()}
      </span>
    </Link>
  );
};

