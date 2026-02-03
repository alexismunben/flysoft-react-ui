import React from "react";
import { useSnackbarState, useSnackbar } from "../../contexts/SnackbarContext";
import { Snackbar } from "./Snackbar";

export interface SnackbarContainerProps {
  position?:
    | "top-right"
    | "top-left"
    | "bottom-right"
    | "bottom-left"
    | "top-center"
    | "bottom-center";
  maxSnackbars?: number; // Máximo número de snackbars visibles
}

export const SnackbarContainer: React.FC<SnackbarContainerProps> = ({
  position = "top-right",
  maxSnackbars = 5,
}) => {
  const snackbars = useSnackbarState();
  const { removeSnackbar } = useSnackbar();

  // Limitar el número de snackbars visibles
  const visibleSnackbars = snackbars.slice(-maxSnackbars);

  // Clases de posición
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  };

  if (snackbars.length === 0) {
    return null;
  }

  return (
    <div
      className={`
        fixed z-50 pointer-events-none
        ${positionClasses[position]}
      `}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex flex-col gap-3 pointer-events-auto">
        {visibleSnackbars.map((snackbar) => (
          <Snackbar
            key={snackbar.id}
            id={snackbar.id}
            message={snackbar.message}
            variant={snackbar.variant}
            duration={snackbar.duration}
            icon={snackbar.icon}
            iconLabel={snackbar.iconLabel}
            onClose={removeSnackbar}
          />
        ))}
      </div>
    </div>
  );
};
