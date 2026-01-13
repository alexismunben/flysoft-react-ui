import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

export interface LoaderProps {
  isLoading?: boolean;
  text?: string;
  children?: React.ReactNode;
  keepContentWhileLoading?: boolean;
  contentLoadingNode?: React.ReactNode;
  overlayClassName?: string; // Clases de Tailwind para personalizar el overlay (ej: "bg-black/50 backdrop-blur-sm rounded-lg")
}

export const Loader: React.FC<LoaderProps> = ({
  isLoading = false,
  text,
  children,
  keepContentWhileLoading,
  contentLoadingNode,
  overlayClassName,
}) => {
  const { theme } = useTheme();
  const displayText = text;

  // Clases por defecto del overlay (negro semitransparente con blur)
  const defaultOverlayClasses = "bg-black/50 backdrop-blur-sm";

  // Combinar clases por defecto con las personalizadas
  const overlayClasses = overlayClassName
    ? overlayClassName
    : defaultOverlayClasses;

  // Barra de progreso infinita
  const ProgressBar = () => {
    // Variable CSS para el gradiente del color primario
    const gradientColor = `no-repeat linear-gradient(${theme.colors.primary} 0 0)`;
    const bgSecondary = theme.colors.bgSecondary || theme.colors.gray100;

    return (
      <div
        className="flex flex-col items-center gap-0.5 w-full"
        role="status"
        aria-live="polite"
      >
        <div
          className="h-1 w-full rounded"
          style={
            {
              "--c": gradientColor,
              background: `var(--c), var(--c), ${bgSecondary}`,
              backgroundSize: "60% 100%",
              animation: "l16 3s infinite",
            } as React.CSSProperties & { "--c": string }
          }
        />
        {displayText && (
          <span className="text-xs text-[var(--color-text-secondary)] font-[var(--font-default)]">
            {displayText}
          </span>
        )}
      </div>
    );
  };

  // Si no está cargando, mostrar solo children (si existen)
  if (!isLoading) {
    return <>{children}</>;
  }

  // Variante 1: Con contentLoadingNode
  if (contentLoadingNode) {
    return (
      <div className="relative">
        {/* Ocultar children completamente cuando hay contentLoadingNode */}
        {/* Mostrar contentLoadingNode */}
        <div
          className={
            keepContentWhileLoading ? "opacity-50 pointer-events-none" : ""
          }
        >
          {contentLoadingNode}
        </div>

        {/* Loader centrado horizontal y verticalmente encima */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none px-4">
          <div className="bg-[var(--color-bg-default)] rounded-lg p-6 shadow-lg border border-[var(--color-border-default)] pointer-events-auto w-full">
            <ProgressBar />
          </div>
        </div>
      </div>
    );
  }

  // Variante 2: Con children pero sin contentLoadingNode
  if (children) {
    // Si keepContentWhileLoading es true, mostrar children con overlay
    if (keepContentWhileLoading) {
      return (
        <div className="relative">
          {/* Children visibles pero deshabilitados */}
          <div className="pointer-events-none select-none">{children}</div>

          {/* Overlay similar al Dialog */}
          <div
            className={`absolute inset-0 flex items-center justify-center z-10 pointer-events-auto px-4 ${overlayClasses}`}
          >
            <div className="bg-[var(--color-bg-default)] rounded-lg p-6 shadow-lg border border-[var(--color-border-default)] w-full max-w-2xl">
              <ProgressBar />
            </div>
          </div>
        </div>
      );
    }

    // Si no tiene keepContentWhileLoading, ocultar children y mostrar solo loader básico
    return (
      <div className="flex items-center justify-center p-6 w-full">
        <div className="w-full max-w-2xl">
          <ProgressBar />
        </div>
      </div>
    );
  }

  // Variante 3: Sin contentLoadingNode ni children - solo loader
  return (
    <div className="flex items-center justify-center p-6 w-full">
      <div className="w-full max-w-2xl">
        <ProgressBar />
      </div>
    </div>
  );
};
