import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  rounded?: boolean;
  className?: string;
  icon?: string;
  iconPosition?: "left" | "right";
  iconLabel?: string;
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
}) => {
  const baseClasses =
    "inline-flex items-center font-medium font-[var(--font-default)]";

  const variantClasses = {
    primary: `
      bg-[var(--color-primary-light)] text-[var(--color-primary-dark)]
      hover:bg-[var(--color-primary)] hover:text-[var(--color-primary-contrast)]
    `,
    secondary: `
      bg-[var(--color-secondary-light)] text-[var(--color-secondary-dark)]
      hover:bg-[var(--color-secondary)] hover:text-[var(--color-secondary-contrast)]
    `,
    success: `
      bg-[var(--color-success-light)] text-[var(--color-success-dark)]
      hover:bg-[var(--color-success)] hover:text-[var(--color-success-contrast)]
    `,
    warning: `
      bg-[var(--color-warning-light)] text-[var(--color-warning-dark)]
      hover:bg-[var(--color-warning)] hover:text-[var(--color-warning-contrast)]
    `,
    danger: `
      bg-[var(--color-danger-light)] text-[var(--color-danger-dark)]
      hover:bg-[var(--color-danger)] hover:text-[var(--color-danger-contrast)]
    `,
    info: `
      bg-[var(--color-info-light)] text-[var(--color-info-dark)]
      hover:bg-[var(--color-info)] hover:text-[var(--color-info-contrast)]
    `,
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
    lg: "px-3 py-1 text-base",
  };

  const roundedClasses = rounded ? "rounded-full" : "rounded-md";

  const gapClasses = icon ? "gap-2" : "";

  const iconSizeClasses =
    size === "sm" ? "text-xs" : size === "md" ? "text-sm" : "text-base";

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses} ${gapClasses} ${className}`;

  const renderIcon = () => {
    if (!icon) return null;
    return (
      <i
        className={`fa ${icon} ${iconSizeClasses}`}
        aria-hidden={!iconLabel}
        aria-label={iconLabel}
      />
    );
  };

  return (
    <span className={classes}>
      {icon && iconPosition === "left" && renderIcon()}
      <span>{children}</span>
      {icon && iconPosition === "right" && renderIcon()}
    </span>
  );
};
