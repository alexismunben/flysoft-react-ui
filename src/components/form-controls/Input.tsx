import React from "react";
import { normalizeIconClass } from "../utils/iconUtils";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  /**
   * Callback cuando se hace click en el ícono. Si está definido, el ícono será clickeable.
   */
  onIconClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /**
   * Si es true, el input será de solo lectura. No se podrá modificar pero no se verá como disabled.
   * Por defecto es false.
   */
  readOnly?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = "left",
      size = "md",
      className = "",
      id,
      onIconClick,
      readOnly = false,
      ...props
    },
    ref,
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseClasses = `
    w-full border rounded-[var(--flysoft-density-input-radius)] transition-colors focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    font-[var(--font-default)] text-[var(--color-text-primary)]
    flysoft-input-reset box-border
  `;

    const readOnlyClasses = readOnly
      ? `border-transparent bg-transparent focus:ring-0`
      : `focus:ring-1 bg-[var(--color-bg-default)]`;

    const paddingBySize = {
      sm: readOnly
        ? "p-0"
        : "px-[var(--flysoft-density-padding-x-sm)] py-[var(--flysoft-density-padding-y-sm)]",
      md: readOnly
        ? "p-0"
        : "px-[var(--flysoft-density-padding-x-md)] py-[var(--flysoft-density-padding-y-md)]",
      lg: readOnly
        ? "p-0"
        : "px-[var(--flysoft-density-padding-x-lg)] py-[var(--flysoft-density-padding-y-lg)]",
    };
    const fontVarBySize: Record<"sm" | "md" | "lg", string> = {
      sm: "var(--flysoft-density-font-sm)",
      md: "var(--flysoft-density-font-base)",
      lg: "var(--flysoft-density-font-lg)",
    };

    const stateClasses = readOnly
      ? ""
      : error
        ? `border-[var(--color-border-error)] focus:border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]`
        : `border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]`;

    // Padding-x del input según size (lo necesitamos para posicionar el icono).
    const paddingXVarBySize: Record<"sm" | "md" | "lg", string> = {
      sm: "var(--flysoft-density-padding-x-sm)",
      md: "var(--flysoft-density-padding-x-md)",
      lg: "var(--flysoft-density-padding-x-lg)",
    };

    const inputClasses = `${baseClasses} ${readOnlyClasses} ${paddingBySize[size]} ${stateClasses} ${className}`;

    // El input + icono comparte: el icono se posiciona al borde del padding-x,
    // y el padding-left/right del input se ajusta dejando una separación
    // proporcional (gap-sm) entre icono y texto. Así, en densidades chicas el
    // icono queda más cerca del texto en lugar de mantener gap fijo.
    const inputPaddingLeftWithIcon =
      icon && iconPosition === "left" && !readOnly
        ? `calc(${paddingXVarBySize[size]} + 1em + var(--flysoft-density-gap-sm))`
        : undefined;
    const inputPaddingRightWithIcon =
      icon && iconPosition === "right" && !readOnly
        ? `calc(${paddingXVarBySize[size]} + 1em + var(--flysoft-density-gap-sm))`
        : undefined;

    const inputFontStyle: React.CSSProperties = {
      fontSize: fontVarBySize[size],
      minHeight: `var(--flysoft-density-control-height-${size})`,
      ...(inputPaddingLeftWithIcon ? { paddingLeft: inputPaddingLeftWithIcon } : {}),
      ...(inputPaddingRightWithIcon ? { paddingRight: inputPaddingRightWithIcon } : {}),
    };

    const renderIcon = () => {
      if (!icon || readOnly) return null;

      // Icono: tamaño escala con el font del input (1em). Posición al borde del padding-x.
      const iconStyle: React.CSSProperties = {
        fontSize: fontVarBySize[size],
        [iconPosition === "left" ? "left" : "right"]: paddingXVarBySize[size],
      };

      return (
        <i
          className={`${normalizeIconClass(icon)} text-[var(--color-text-muted)] absolute top-1/2 -translate-y-1/2 flex items-center justify-center ${onIconClick && !readOnly ? "cursor-pointer hover:text-[var(--color-primary)] transition-colors" : ""}`}
          style={iconStyle}
          onClick={readOnly ? undefined : onIconClick}
        />
      );
    };

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[var(--color-primary)] mb-1 font-[var(--font-default)]"
            style={{ fontSize: "var(--flysoft-density-font-sm)" }}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && iconPosition === "left" && renderIcon()}
          <input
            ref={ref}
            id={inputId}
            className={inputClasses}
            style={inputFontStyle}
            autoComplete="off"
            readOnly={readOnly}
            {...props}
          />
          {icon && iconPosition === "right" && renderIcon()}
        </div>
        {error && (
          <p
            className="mt-1 text-[var(--color-danger)] font-[var(--font-default)]"
            style={{ fontSize: "var(--flysoft-density-font-sm)" }}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
