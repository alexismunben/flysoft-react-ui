import React, { useEffect } from "react";
import { normalizeIconClass } from "./iconUtils";
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

export interface DialogProps {
  isOpen: boolean;
  title: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
  compact?: boolean;
  bodyWidth?: string | number;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  children,
  footer,
  onClose,
  closeOnOverlayClick = false,
  compact = false,
  bodyWidth,
}) => {
  // Prevenir scroll del body cuando el dialog está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Manejar tecla Escape para cerrar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && onClose) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = () => {
    if (closeOnOverlayClick && onClose) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleOverlayClick}
      />

      {/* Dialog Container */}
      <div
        className={`relative bg-[var(--color-bg-default)] rounded-lg shadow-[var(--shadow-xl)] border border-[var(--color-border-default)] font-[var(--font-default)] max-h-[90vh] flex flex-col${bodyWidth ? "" : " w-auto max-w-lg min-w-[400px]"}`}
        data-density-override={compact ? "compact" : undefined}
        onClick={(e) => e.stopPropagation()}
        style={{
          overflow: "visible",
          width:
            bodyWidth !== undefined
              ? typeof bodyWidth === "number"
                ? `${bodyWidth}px`
                : bodyWidth
              : undefined,
          maxWidth: bodyWidth !== undefined ? "calc(100vw - 2rem)" : undefined,
          ...(compact ? compactDensityOverride : {}),
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-[var(--flysoft-density-container-padding-x)] py-[var(--flysoft-density-container-padding-y)] border-b border-[var(--color-border-default)] flex-shrink-0"
        >
          <h2
            id="dialog-title"
            className="font-semibold text-[var(--color-text-primary)]"
            style={{ fontSize: "var(--flysoft-density-font-lg)" }}
          >
            {title}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 p-1 rounded-md flysoft-button-reset bg-transparent border-none text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
              aria-label="Cerrar dialog"
            >
              <i className={normalizeIconClass("fa-times")} />
            </button>
          )}
        </div>

        {/* Body */}
        <div
          className="px-[var(--flysoft-density-container-padding-x)] py-[var(--flysoft-density-container-padding-y)] flex-1 text-[var(--color-text-primary)] min-w-0"
          style={{
            overflowY: "auto",
            overflowX: "visible",
            maxHeight: "calc(90vh - 200px)",
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className="px-[var(--flysoft-density-container-padding-x)] py-[var(--flysoft-density-container-padding-y)] border-t border-[var(--color-border-default)] flex items-center justify-end gap-2 flex-shrink-0 flex-wrap"
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};
