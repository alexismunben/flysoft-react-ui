import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
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
    ref
  ) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = `
    w-full border rounded-lg transition-colors focus:outline-none
    disabled:opacity-50 disabled:cursor-not-allowed
    font-[var(--font-default)] text-[var(--color-text-primary)]
  `;

  const readOnlyClasses = readOnly
    ? `border-transparent bg-transparent focus:ring-0`
    : `focus:ring-1 bg-[var(--color-bg-default)]`;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const stateClasses = readOnly
    ? ""
    : error
    ? `border-[var(--color-border-error)] focus:border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]`
    : `border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]`;

  const inputClasses = `${baseClasses} ${readOnlyClasses} ${sizeClasses[size]} ${stateClasses} ${className}`;

  const iconClasses =
    size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

  const renderIcon = () => {
    if (!icon) return null;

    const iconElement = (
      <i
        className={`fa ${icon} ${iconClasses} text-[var(--color-text-muted)] absolute top-1/2 transform -translate-y-1/2 ${
          iconPosition === "left" ? "left-3" : "right-3"
        } ${onIconClick && !readOnly ? "cursor-pointer hover:text-[var(--color-primary)] transition-colors" : ""}`}
        onClick={readOnly ? undefined : onIconClick}
      />
    );

    return iconElement;
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm text-[var(--color-primary)] mb-1 font-[var(--font-default)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && renderIcon()}
        <input
          ref={ref}
          id={inputId}
          className={`${inputClasses} ${
            icon && iconPosition === "left" ? "pl-10" : ""
          } ${icon && iconPosition === "right" ? "pr-10" : ""}`}
          autoComplete="off"
          readOnly={readOnly}
          {...props}
        />
        {icon && iconPosition === "right" && renderIcon()}
      </div>
      {error && (
        <p className="mt-1 text-sm text-[var(--color-danger)] font-[var(--font-default)]">
          {error}
        </p>
      )}
    </div>
  );
  }
);

Input.displayName = "Input";
