import React from "react";

export interface CardProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
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
  // Separar clases de background del className
  const classArray = className.trim().split(/\s+/).filter(Boolean);
  const bgClasses: string[] = [];
  const otherClasses: string[] = [];

  classArray.forEach((cls) => {
    // Detectar clases de background (bg-*, bg-gradient-*, bg-[...])
    if (cls.startsWith("bg-") || cls.startsWith("bg-gradient-")) {
      bgClasses.push(cls);
    } else {
      otherClasses.push(cls);
    }
  });

  const backgroundClass =
    bgClasses.length > 0 ? bgClasses.join(" ") : "bg-[var(--color-bg-default)]";

  const baseClasses = `
    ${backgroundClass} rounded-lg border
    font-[var(--font-default)]
  `;

  const variantClasses = {
    default: `border-[var(--color-border-default)]`,
    elevated: `border-[var(--color-border-default)] shadow-[var(--shadow-lg)]`,
    outlined: `border-[var(--color-gray-300)]`,
  };

  const classes = `${baseClasses} ${
    variantClasses[variant]
  } ${otherClasses.join(" ")}`;

  return (
    <div className={classes}>
      {(title || subtitle || headerActions) && (
        <div className="px-6 pt-4">
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

      {footer && <div className="px-6 pb-4">{footer}</div>}
    </div>
  );
};
