import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: string;
  iconPosition?: "left" | "right";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  children,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-sm transition-colors 
    cursor-pointer
    disabled:opacity-50 disabled:cursor-not-allowed
    font-[var(--font-default)]
  `;

  const variantClasses = {
    primary: `
      bg-[var(--color-primary)] text-[var(--color-primary-contrast)] 
      hover:bg-[var(--color-primary-dark)] focus:ring-[var(--color-primary)]
    `,
    outline: `
      border border-[var(--color-primary)] text-[var(--color-primary)] 
      hover:bg-[var(--color-bg-secondary)] focus:ring-[var(--color-primary)]
    `,
    ghost: `
      text-[var(--color-primary)] hover:bg-[var(--color-bg-secondary)] 
      focus:ring-[var(--color-primary)]
    `,
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const renderIcon = () => {
    if (!icon) return null;

    const iconClasses =
      size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6";

    return (
      <i
        className={`fa ${icon} ${iconClasses} ${
          iconPosition === "right" ? "ml-2" : "mr-2"
        }`}
      />
    );
  };

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <i className="fa fa-spinner fa-spin mr-2" />}
      {icon && iconPosition === "left" && !loading && renderIcon()}
      {children}
      {icon && iconPosition === "right" && !loading && renderIcon()}
    </button>
  );
};
