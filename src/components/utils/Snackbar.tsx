import React, { useEffect, useState, useRef, useCallback } from "react";
import type { SnackbarVariant } from "../../contexts/SnackbarContext";

export interface SnackbarProps {
  id: string;
  message: string;
  variant: SnackbarVariant;
  duration?: number; // en milisegundos
  icon?: string; // clase de FontAwesome 5
  iconLabel?: string; // aria-label para el ícono
  onClose: (id: string) => void;
}

export const Snackbar: React.FC<SnackbarProps> = ({
  id,
  message,
  variant,
  duration = 3000,
  icon,
  iconLabel,
  onClose,
}) => {
  const [progress, setProgress] = useState(100);
  const [isClosing, setIsClosing] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const remainingTimeRef = useRef<number>(duration);

  // Mapeo de variantes a colores y clases
  const variantConfig = {
    primary: {
      bg: "bg-[var(--color-primary-light)]",
      border: "border-[var(--color-primary)]",
      text: "text-gray-800",
      progressColor: "var(--color-primary)",
    },
    secondary: {
      bg: "bg-[var(--color-secondary-light)]",
      border: "border-[var(--color-secondary)]",
      text: "text-gray-800",
      progressColor: "var(--color-secondary)",
    },
    success: {
      bg: "bg-[var(--color-success-light)]",
      border: "border-[var(--color-success)]",
      text: "text-gray-800",
      progressColor: "var(--color-success)",
    },
    warning: {
      bg: "bg-[var(--color-warning-light)]",
      border: "border-[var(--color-warning)]",
      text: "text-gray-800",
      progressColor: "var(--color-warning)",
    },
    danger: {
      bg: "bg-[var(--color-danger-light)]",
      border: "border-[var(--color-danger)]",
      text: "text-gray-800",
      progressColor: "var(--color-danger)",
    },
    info: {
      bg: "bg-[var(--color-info-light)]",
      border: "border-[var(--color-info)]",
      text: "text-gray-800",
      progressColor: "var(--color-info)",
    },
  };

  const config = variantConfig[variant];

  // Función para cerrar el snackbar
  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Esperar a que termine la animación antes de remover
    setTimeout(() => {
      onClose(id);
    }, 300); // Duración de la animación de salida
  }, [id, onClose]);

  // Efecto para la barra de progreso
  useEffect(() => {
    if (duration <= 0) {
      // Si duration es 0 o negativo, no se cierra automáticamente
      return;
    }

    const updateProgress = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(newProgress);

      if (newProgress <= 0) {
        handleClose();
      }
    };

    // Actualizar cada 50ms para una animación suave
    intervalRef.current = setInterval(updateProgress, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [duration, handleClose]);

  // Pausar el progreso cuando el mouse está sobre el snackbar
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    const elapsed = Date.now() - startTimeRef.current;
    remainingTimeRef.current = duration - elapsed;
  };

  // Reanudar el progreso cuando el mouse sale del snackbar
  const handleMouseLeave = () => {
    if (remainingTimeRef.current > 0) {
      startTimeRef.current = Date.now();
      const updateProgress = () => {
        const elapsed = Date.now() - startTimeRef.current;
        const newProgress = Math.max(
          0,
          ((remainingTimeRef.current - elapsed) / duration) * 100
        );
        setProgress(newProgress);

        if (newProgress <= 0) {
          handleClose();
        }
      };

      intervalRef.current = setInterval(updateProgress, 50);
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
        relative w-[18rem] bg-white rounded-md shadow-lg border border-gray-200
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
        className={`${config.bg} ${config.text} p-4 flex items-start gap-3 relative`}
      >
        {/* Barra de progreso - dentro del contenido, pegada al borde superior */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
            <div
              className="h-full transition-all duration-50 ease-linear"
              style={{
                width: `${progress}%`,
                backgroundColor: "#00000050",
              }}
            />
          </div>
        )}

        {/* Ícono */}
        {displayIcon && (
          <div className="flex-shrink-0 -mt-0.5">
            <i
              className={`fa ${displayIcon} text-base`}
              aria-hidden={!iconLabel}
              aria-label={iconLabel}
            />
          </div>
        )}

        {/* Mensaje */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium break-words max-w-full">
            {message}
          </p>
        </div>

        {/* Botón de cerrar */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
          aria-label="Cerrar notificación"
          type="button"
        >
          <i className="fa fa-times text-sm" />
        </button>
      </div>
    </div>
  );
};
