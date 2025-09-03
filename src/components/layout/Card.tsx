import React from "react";

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  headerActions,
  footer,
  variant = "default",
}) => {
  const baseClasses = `
    bg-[var(--color-bg-default)] rounded-lg border
    font-[var(--font-default)]
  `;

  const variantClasses = {
    default: `border-[var(--color-border-default)]`,
    elevated: `border-[var(--color-border-default)] shadow-[var(--shadow-lg)]`,
    outlined: `border-[var(--color-gray-300)]`,
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div className={classes}>
      {(title || subtitle || headerActions) && (
        <div className="px-6 py-4 border-b border-[var(--color-border-default)]">
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="flex items-center space-x-2">{headerActions}</div>
            )}
          </div>
        </div>
      )}

      <div className="px-6 py-4">{children}</div>

      {footer && (
        <div className="px-6 py-4 border-t border-[var(--color-border-default)] bg-[var(--color-bg-secondary)] rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};
