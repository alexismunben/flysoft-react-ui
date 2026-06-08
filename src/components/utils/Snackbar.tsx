import React, { useEffect, useState, useRef, useCallback } from "react";
import type { SnackbarVariant } from "../../contexts/SnackbarContext";
import { normalizeIconClass } from "./iconUtils";

export interface SnackbarProps {
  id: string;
  message: string;
  variant: SnackbarVariant;
  duration?: number; // en milisegundos
  icon?: string; // clase de FontAwesome 5
  iconLabel?: string; // aria-label para el ícono
  onClose: (id: string) => void;
}

export const Snackbar: React.FC<SnackbarProps> = React.memo(
  ({ id, message, variant, duration = 3000, icon, iconLabel, onClose }) => {
    const [progress, setProgress] = useState(100);
    const [isClosing, setIsClosing] = useState(false);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const remainingTimeRef = useRef<number>(duration);
    const closingRef = useRef(false);

    // Mapeo de variantes a colores y clases.
    // Diseño "filled": fondo con el color sólido de la variante y texto con su
    // color de contraste (blanco). Maximiza la legibilidad respecto del esquema
    // anterior (fondo claro saturado + texto oscuro) sin salir del set de
    // variables --color-{variant}* existente.
    const variantConfig = {
      primary: {
        bg: "bg-[var(--color-primary)]",
        border: "border-[var(--color-primary-dark)]",
        text: "text-[var(--color-primary-contrast)]",
      },
      secondary: {
        bg: "bg-[var(--color-secondary)]",
        border: "border-[var(--color-secondary-dark)]",
        text: "text-[var(--color-secondary-contrast)]",
      },
      success: {
        bg: "bg-[var(--color-success)]",
        border: "border-[var(--color-success-dark)]",
        text: "text-[var(--color-success-contrast)]",
      },
      warning: {
        bg: "bg-[var(--color-warning)]",
        border: "border-[var(--color-warning-dark)]",
        text: "text-[var(--color-warning-contrast)]",
      },
      danger: {
        bg: "bg-[var(--color-danger)]",
        border: "border-[var(--color-danger-dark)]",
        text: "text-[var(--color-danger-contrast)]",
      },
      info: {
        bg: "bg-[var(--color-info)]",
        border: "border-[var(--color-info-dark)]",
        text: "text-[var(--color-info-contrast)]",
      },
    };

    const config = variantConfig[variant];

    // Función para cerrar el snackbar
    const handleClose = useCallback(() => {
      if (closingRef.current) return;
      closingRef.current = true;

      setIsClosing(true);

      // Limpiar intervalo inmediatamente
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      // Esperar a que termine la animación antes de remover del estado global
      setTimeout(() => {
        onClose(id);
      }, 300);
    }, [id, onClose]);

    // Efecto para la barra de progreso
    useEffect(() => {
      if (duration <= 0) return;

      const updateProgress = () => {
        if (closingRef.current) return;

        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(newProgress);

        if (newProgress <= 0) {
          handleClose();
        }
      };

      intervalRef.current = window.setInterval(updateProgress, 50);

      return () => {
        if (intervalRef.current) {
          window.clearInterval(intervalRef.current);
        }
      };
    }, [duration, handleClose]);

    // Pausar el progreso cuando el mouse está sobre el snackbar
    const handleMouseEnter = () => {
      if (closingRef.current) return;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = duration - elapsed;
    };

    // Reanudar el progreso cuando el mouse sale del snackbar
    const handleMouseLeave = () => {
      if (closingRef.current) return;

      if (remainingTimeRef.current > 0) {
        startTimeRef.current = Date.now();
        const updateProgress = () => {
          if (closingRef.current) return;

          const elapsed = Date.now() - startTimeRef.current;
          const newProgress = Math.max(
            0,
            ((remainingTimeRef.current - elapsed) / duration) * 100,
          );
          setProgress(newProgress);

          if (newProgress <= 0) {
            handleClose();
          }
        };

        intervalRef.current = window.setInterval(updateProgress, 50);
      }
    };

    // Íconos por defecto según la variante
    const defaultIcons: Record<SnackbarVariant, string> = {
      primary: "fa-info-circle",
      secondary: "fa-info-circle",
      success: "fa-check-circle",
      warning: "fa-exclamation-triangle",
      danger: "fa-times-circle",
      info: "fa-info-circle",
    };

    const displayIcon = icon || defaultIcons[variant];

    return (
      <div
        className={`
        relative w-[18rem] rounded-md shadow-lg border ${config.border}
        overflow-hidden transition-all duration-300 ease-in-out
        ${
          isClosing ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
        }
      `}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="alert"
        aria-live="polite"
      >
        {/* Contenido del snackbar */}
        <div
          className={`${config.bg} ${config.text} px-[var(--flysoft-density-padding-x-md)] py-[var(--flysoft-density-padding-y-md)] flex items-start gap-3 relative`}
          style={{ fontSize: "var(--flysoft-density-font-sm)" }}
        >
          {/* Barra de progreso - dentro del contenido, pegada al borde superior */}
          {duration > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
              <div
                className="h-full transition-all duration-50 ease-linear"
                style={{
                  width: `${progress}%`,
                  backgroundColor: "rgba(255, 255, 255, 0.55)",
                }}
              />
            </div>
          )}

          {/* Ícono */}
          {displayIcon && (
            <div className="flex-shrink-0 mt-0.5">
              <i
                className={normalizeIconClass(displayIcon)}
                style={{ fontSize: "var(--flysoft-density-font-base)" }}
                aria-hidden={!iconLabel}
                aria-label={iconLabel}
              />
            </div>
          )}

          {/* Mensaje */}
          <div className="flex-1 min-w-0">
            <p className="font-medium break-words max-w-full">{message}</p>
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={handleClose}
            className="flex-shrink-0 ml-2 bg-transparent border-0 p-0 opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            aria-label="Cerrar notificación"
            type="button"
          >
            <i
              className={normalizeIconClass("fa-times")}
              style={{ fontSize: "var(--flysoft-density-font-sm)" }}
            />
          </button>
        </div>
      </div>
    );
  },
);
