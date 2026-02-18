import React from "react";
import { twMerge } from "tailwind-merge";

export interface SkeletonProps {
  /**
   * Clases adicionales de Tailwind para personalizar el skeleton (medidas, bordes, etc.)
   * La animación y el fondo base se mantendrán a menos que se sobreescriban explícitamente.
   */
  className?: string;
}

/**
 * Componente Skeleton para mostrar estados de carga.
 * Consiste en un div con una animación de pulso y un fondo grisáceo por defecto.
 */
export const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={twMerge(
        "animate-pulse bg-[var(--color-bg-secondary)] rounded-md",
        className,
      )}
    />
  );
};
