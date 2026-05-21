import React from "react";
import { twMerge } from "tailwind-merge";
import { compactDensity } from "../../contexts/presets";

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
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  /**
   * Override local de densidad: cuando es true, fuerza el preset "compact" para los
   * paddings, gaps y tipografía DE ESTA CARD (y sus hijos que consuman las variables
   * --flysoft-density-*), independientemente de la densidad global del ThemeProvider.
   */
  compact?: boolean;
}

const compactDensityOverride: React.CSSProperties = {
  "--flysoft-density-padding-x-sm": compactDensity.paddingX.sm,
  "--flysoft-density-padding-x-md": compactDensity.paddingX.md,
  "--flysoft-density-padding-x-lg": compactDensity.paddingX.lg,
  "--flysoft-density-padding-y-sm": compactDensity.paddingY.sm,
  "--flysoft-density-padding-y-md": compactDensity.paddingY.md,
  "--flysoft-density-padding-y-lg": compactDensity.paddingY.lg,
  "--flysoft-density-container-padding-x": compactDensity.containerPaddingX,
  "--flysoft-density-container-padding-y": compactDensity.containerPaddingY,
  "--flysoft-density-gap-sm": compactDensity.gap.sm,
  "--flysoft-density-gap-md": compactDensity.gap.md,
  "--flysoft-density-gap-lg": compactDensity.gap.lg,
  "--flysoft-density-font-xs": compactDensity.fontXs,
  "--flysoft-density-font-sm": compactDensity.fontSm,
  "--flysoft-density-font-base": compactDensity.fontBase,
  "--flysoft-density-font-lg": compactDensity.fontLg,
  "--flysoft-density-font-xl": compactDensity.fontXl,
} as React.CSSProperties;

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  className = "",
  headerActions,
  footer,
  variant = "default",
  alwaysDisplayHeaderActions = false,
  headerClassName = "",
  contentClassName = "",
  footerClassName = "",
  compact = false,
}) => {
  const variantClasses = {
    default: "border-[var(--color-border-default)]",
    elevated: "border-[var(--color-border-default)] shadow-[var(--shadow-lg)]",
    outlined: "border-[var(--color-gray-300)]",
  };

  // Unimos las clases usando twMerge para consistencia
  const mergedClasses = twMerge(
    "bg-[var(--color-bg-default)] rounded-lg border font-[var(--font-default)]",
    variantClasses[variant],
    className,
  );

  // Verificamos si existe alguna clase de ancho (w-*) que no sea w-auto.
  // Es importante distinguir entre w-* (ancho) y max-w-*/min-w-* (límites),
  // ya que un max-w-* sin un w-full puede hacer que la card colapse a su contenido.
  const hasExplicitWidth = mergedClasses.split(/\s+/).some((cls) => {
    const mainClass = cls.split(":").pop() || "";
    return (
      mainClass.startsWith("w-") &&
      mainClass !== "w-auto" &&
      !mainClass.startsWith("max-w-") &&
      !mainClass.startsWith("min-w-")
    );
  });

  // Si no hay un ancho explícito, forzamos w-full para que ocupe todo el espacio disponible
  // (incluyendo el espacio limitado por un posible max-w- en la misma card o en su padre).
  const classes = hasExplicitWidth ? mergedClasses : `${mergedClasses} w-full`;

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

  const containerStyle = compact ? compactDensityOverride : undefined;

  return (
    <div
      className={`${classes} relative`}
      data-density-override={compact ? "compact" : undefined}
      style={containerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(title || subtitle || headerActions) && (
        <div
          className={twMerge(
            "px-[var(--flysoft-density-container-padding-x)] pt-[var(--flysoft-density-container-padding-y)]",
            headerClassName,
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3
                  className="font-semibold text-[var(--color-text-primary)]"
                  style={{ fontSize: "var(--flysoft-density-font-lg)" }}
                >
                  {title}
                </h3>
              )}
              {subtitle && (
                <div
                  className="text-[var(--color-text-secondary)] mt-1"
                  style={{ fontSize: "var(--flysoft-density-font-sm)" }}
                >
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

      {children && (
        <div
          className={twMerge(
            "px-[var(--flysoft-density-container-padding-x)] py-[var(--flysoft-density-container-padding-y)]",
            contentClassName,
          )}
        >
          {children}
        </div>
      )}
      {footer && (
        <div
          className={twMerge(
            "px-[var(--flysoft-density-container-padding-x)] pb-[var(--flysoft-density-container-padding-y)] flex items-center justify-end",
            footerClassName,
          )}
        >
          {footer}
        </div>
      )}
    </div>
  );
};
