import React from "react";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  labelPosition?: "left" | "right";
  error?: string;
  size?: "sm" | "md" | "lg";
  /**
   * Si es true, el checkbox será de solo lectura. No se podrá modificar pero se verá igual visualmente.
   * Por defecto es false.
   */
  readOnly?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      labelPosition = "right",
      error,
      size = "md",
      className = "",
      id,
      readOnly = false,
      onClick,
      onChange,
      ...props
    },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const labelSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const checkboxClasses = `
      ${sizeClasses[size]}
      rounded border transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0
      cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed
      border-[var(--color-border-default)]
      checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)]
      focus:ring-[var(--color-primary)]
      ${
        error
          ? "border-[var(--color-border-error)] checked:border-[var(--color-border-error)] checked:bg-[var(--color-danger)]"
          : ""
      }
      ${className}
    `;

    const checkboxStyle = error
      ? { accentColor: "var(--color-danger)" }
      : { accentColor: "var(--color-primary)" };

    const labelClasses = `
      ${labelSizeClasses[size]}
      font-[var(--font-default)] cursor-pointer select-none
      ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}
      ${
        error
          ? "text-[var(--color-danger)]"
          : "text-[var(--color-text-primary)]"
      }
    `;

    const containerClasses = `
      flex items-center gap-2
      ${labelPosition === "left" ? "flex-row-reverse" : "flex-row"}
    `;

    // Prevenir cambios cuando está en modo readOnly
    const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
      if (readOnly) {
        e.preventDefault();
        return false;
      }
      // Llamar al onClick original si existe
      if (onClick) {
        onClick(e);
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly) {
        e.preventDefault();
        return;
      }
      // Llamar al onChange original si existe
      if (onChange) {
        onChange(e);
      }
    };

    const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
      if (readOnly) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleLabelMouseDown = (e: React.MouseEvent<HTMLLabelElement>) => {
      if (readOnly) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    return (
      <div className="w-full">
        <div className={containerClasses}>
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            className={checkboxClasses}
            style={checkboxStyle}
            readOnly={readOnly}
            onClick={handleClick}
            onChange={handleChange}
            {...props}
          />
          {label && (
            <label
              htmlFor={readOnly ? undefined : checkboxId}
              className={labelClasses}
              onClick={handleLabelClick}
              onMouseDown={handleLabelMouseDown}
            >
              {label}
            </label>
          )}
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

Checkbox.displayName = "Checkbox";
