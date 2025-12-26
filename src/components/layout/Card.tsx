import React from "react";
import { DropdownMenu } from "../utils/DropdownMenu";

interface ActionItem {
  id: string | number;
  content: React.ReactNode;
}

export interface CardProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  /**
   * Acciones para el header de la tarjeta. Retorna un array de ReactNode que se mostrarán en un DropdownMenu.
   */
  headerActions?: () => Array<React.ReactNode>;
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

  // Convertir array de ReactNode a array de ActionItem para DropdownMenu
  const convertActionsToOptions = (
    actions: Array<React.ReactNode>
  ): ActionItem[] => {
    return actions.map((action, index) => ({
      id: index,
      content: (
        <div
          onClick={(e) => {
            // Detener la propagación para que el onClick del DropdownMenu no interfiera
            e.stopPropagation();
          }}
        >
          {action}
        </div>
      ),
    }));
  };

  const headerActionsArray = headerActions?.();
  const hasHeaderActions = headerActionsArray && headerActionsArray.length > 0;
  const [isHovered, setIsHovered] = React.useState(false);
  const [isLargeScreen, setIsLargeScreen] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div
      className={`${classes} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {(title || subtitle || hasHeaderActions) && (
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
          </div>
        </div>
      )}
      {hasHeaderActions && (
        <div
          className="absolute top-2 right-2 transition-opacity"
          style={{
            opacity: isLargeScreen ? (isHovered ? 1 : 0) : 1,
          }}
        >
          <DropdownMenu<ActionItem>
            options={convertActionsToOptions(headerActionsArray)}
            onOptionSelected={() => {
              // Las acciones ya manejan sus propios eventos
            }}
            renderOption={(item) => item.content}
            replaceOnSingleOption={true}
          />
        </div>
      )}

      <div className="px-6 py-4">{children}</div>

      {footer && <div className="px-6 pb-4">{footer}</div>}
    </div>
  );
};
