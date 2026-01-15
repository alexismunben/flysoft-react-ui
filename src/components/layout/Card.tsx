import React from "react";

export interface CardProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  /**
   * Acciones para el header de la tarjeta. Se muestra directamente el ReactNode proporcionado.
   */
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  /**
   * Si es true, las headerActions siempre se muestran. Si es false, solo se muestran al hacer hover (en pantallas grandes).
   * En resoluciones md e inferiores, siempre se muestran sin importar este valor.
   */
  alwaysDisplayHeaderActions?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  headerActions,
  footer,
  variant = "default",
  alwaysDisplayHeaderActions = false,
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

  const classes = `${baseClasses} ${variantClasses[variant]
    } ${otherClasses.join(" ")}`;

  const [isHovered, setIsHovered] = React.useState(false);
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      // md breakpoint en Tailwind es 768px, así que lg es 1024px
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  // Determinar la opacidad de las headerActions
  const getHeaderActionsOpacity = () => {
    if (!headerActions) return 0;
    // En pantallas pequeñas (md e inferiores) siempre se muestran
    if (!isLargeScreen) return 1;
    // Si alwaysDisplayHeaderActions es true, siempre se muestran
    if (alwaysDisplayHeaderActions) return 1;
    // Si es false y pantalla grande, solo al hacer hover
    return isHovered ? 1 : 0;
  };

  return (
    <div
      className={`${classes} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
                <div className="text-sm text-[var(--color-text-secondary)] mt-1">
                  {subtitle}
                </div>
              )}
            </div>
            {headerActions && (
              <div
                className="flex items-center transition-opacity"
                style={{
                  opacity: getHeaderActionsOpacity(),
                }}
              >
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}

      {children && <div className="px-6 py-4">{children}</div>}
      {footer && <div className="px-6 pb-4 flex items-center justify-end">{footer}</div>}
    </div>
  );
};
