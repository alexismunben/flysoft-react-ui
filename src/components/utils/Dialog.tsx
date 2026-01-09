import React, { useEffect } from "react";

export interface DialogProps {
  isOpen: boolean;
  title: React.ReactNode;
  dialogBody: React.ReactNode;
  dialogActions: React.ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  dialogBody,
  dialogActions,
  onClose,
  closeOnOverlayClick = false,
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
        className="relative w-auto max-w-lg min-w-[400px] bg-[var(--color-bg-default)] rounded-lg shadow-[var(--shadow-xl)] border border-[var(--color-border-default)] font-[var(--font-default)] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ overflow: "visible" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border-default)] flex-shrink-0">
          <h2
            id="dialog-title"
            className="text-lg font-semibold text-[var(--color-text-primary)]"
          >
            {title}
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-4 p-1 rounded-md text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer"
              aria-label="Cerrar dialog"
            >
              <i className="fa fa-times" />
            </button>
          )}
        </div>

        {/* Body */}
        <div 
          className="px-6 py-4 flex-1 text-[var(--color-text-primary)] min-w-0"
          style={{ 
            overflowY: "auto",
            overflowX: "visible",
            maxHeight: "calc(90vh - 200px)"
          }}
        >
          {dialogBody}
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-[var(--color-border-default)] flex items-center justify-end gap-2 flex-shrink-0 flex-wrap">
          {dialogActions}
        </div>
      </div>
    </div>
  );
};
