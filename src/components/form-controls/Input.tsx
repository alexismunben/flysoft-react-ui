import React from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  iconPosition = "left",
  size = "md",
  className = "",
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseClasses = `
    w-full border rounded-lg transition-colors focus:outline-none focus:ring-2 
    disabled:opacity-50 disabled:cursor-not-allowed
    font-[var(--font-default)] text-[var(--color-text-primary)]
    bg-[var(--color-bg-default)]
  `;

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const stateClasses = error
    ? `border-[var(--color-border-error)] focus:border-[var(--color-border-error)] focus:ring-[var(--color-border-error)]`
    : `border-[var(--color-border-default)] focus:border-[var(--color-border-focus)] focus:ring-[var(--color-border-focus)]`;

  const inputClasses = `${baseClasses} ${sizeClasses[size]} ${stateClasses} ${className}`;

  const iconClasses =
    size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

  const renderIcon = () => {
    if (!icon) return null;

    return (
      <i
        className={`fa ${icon} ${iconClasses} text-[var(--color-text-muted)] absolute top-1/2 transform -translate-y-1/2 ${
          iconPosition === "left" ? "left-3" : "right-3"
        }`}
      />
    );
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1 font-[var(--font-default)]"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {icon && iconPosition === "left" && renderIcon()}
        <input
          id={inputId}
          className={`${inputClasses} ${
            icon && iconPosition === "left" ? "pl-10" : ""
          } ${icon && iconPosition === "right" ? "pr-10" : ""}`}
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
};
