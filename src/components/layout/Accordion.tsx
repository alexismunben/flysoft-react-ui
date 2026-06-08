import React, { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { normalizeIconClass } from "../utils/iconUtils";
import { compactDensity } from "../../contexts/presets";

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

export interface AccordionProps {
  title: string | React.ReactNode;
  children: React.ReactNode;
  icon?: string;
  rightNode?: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  /**
   * Clases adicionales para el header (el botón que despliega/colapsa el acordeón).
   */
  headerClassName?: string;
  /**
   * Clases adicionales para el contenedor del contenido (children).
   */
  contentClassName?: string;
  variant?: "default" | "elevated" | "outlined";
  onToggle?: (isOpen: boolean) => void;
  compact?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  icon,
  rightNode,
  defaultOpen = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
  variant = "default",
  onToggle,
  compact = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [contentHeight, setContentHeight] = useState<number>(0);
  const contentRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        // Usar requestAnimationFrame para asegurar que el DOM esté actualizado
        requestAnimationFrame(() => {
          if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight);
          }
        });
      } else {
        setContentHeight(0);
      }
    }
  }, [isOpen, children]);

  // Inicializar altura si está abierto por defecto
  useEffect(() => {
    if (defaultOpen && contentRef.current) {
      requestAnimationFrame(() => {
        if (contentRef.current) {
          setContentHeight(contentRef.current.scrollHeight);
        }
      });
    }
  }, [defaultOpen]);

  const handleToggle = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    if (onToggle) {
      onToggle(newIsOpen);
    }
  };

  return (
    <div
      className={`${classes} overflow-hidden`}
      data-density-override={compact ? "compact" : undefined}
      style={compact ? compactDensityOverride : undefined}
    >
      <button
        onClick={handleToggle}
        className={twMerge(
          "w-full flex items-center justify-between px-[var(--flysoft-density-padding-x-md)] py-[var(--flysoft-density-padding-y-lg)] flysoft-button-reset bg-transparent border-none hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer",
          headerClassName,
        )}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {icon && (
            <i
              className={`${normalizeIconClass(
                icon,
              )} text-[var(--color-text-secondary)] flex-shrink-0`}
            />
          )}
          <span className="text-left font-medium text-[var(--color-text-primary)] truncate">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {rightNode && (
            <div
              className="flex items-center"
              onClick={(e) => e.stopPropagation()}
            >
              {rightNode}
            </div>
          )}
          <i
            className={`${normalizeIconClass(
              `fa-chevron-${isOpen ? "up" : "down"}`,
            )} text-[var(--color-text-secondary)] transition-all duration-200 flex-shrink-0`}
          />
        </div>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: `${contentHeight}px`,
        }}
      >
        <div
          className={twMerge(
            "px-[var(--flysoft-density-padding-x-md)] py-[var(--flysoft-density-padding-y-lg)] text-[var(--color-text-primary)]",
            contentClassName,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
