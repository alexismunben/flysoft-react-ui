import React from "react";
import { LinkButton } from "../form-controls";

export interface DataFieldProps {
  label?: string;
  value?: string | number | React.ReactNode;
  inline?: boolean;
  align?: "left" | "right" | "center";
  title?: string;
  link?: string;
  className?: string;
  labelClassName?: string;
  /**
   * Tamaño relativo a la densidad activa.
   * - "md" (default): label = font-sm, value = font-base.
   * - "sm": override local que baja un nivel — label = font-xs, value = font-sm.
   *   Útil para listas densas dentro de cards no-densas.
   */
  size?: "sm" | "md";
  /**
   * Gap entre label y value en modo stack (no inline).
   * - "tight": pegado, 0px (label sobre value sin separación).
   * - "sm": gap chico — usa --flysoft-density-gap-sm.
   * - "md" (default): usa --flysoft-density-gap-sm también pero respeta densidad.
   */
  gap?: "tight" | "sm" | "md";
  /**
   * Si es true, oculta el ":" después del label en modo inline.
   * Útil para campos donde el label ya es lo suficientemente claro por contexto.
   */
  hideColon?: boolean;
}

export const DataField: React.FC<DataFieldProps> = ({
  label,
  value,
  inline = false,
  align = "left",
  title,
  link,
  className = "",
  labelClassName = "",
  size = "md",
  gap = "md",
  hideColon = false,
}) => {
  const alignClasses = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  const justifyClasses = {
    left: "justify-start",
    right: "justify-end",
    center: "justify-center",
  };

  // Tamaños según size: en sm bajamos un nivel completo.
  const labelFontSize =
    size === "sm"
      ? "var(--flysoft-density-font-xs)"
      : "var(--flysoft-density-font-sm)";
  const valueFontSize =
    size === "sm"
      ? "var(--flysoft-density-font-sm)"
      : "var(--flysoft-density-font-base)";

  const stackGap =
    gap === "tight"
      ? "0"
      : gap === "sm"
        ? "var(--flysoft-density-gap-sm)"
        : "var(--flysoft-density-gap-sm)"; // md también usa gap-sm; "tight" es 0

  const baseContainerClasses = `
    font-[var(--font-default)]
    ${alignClasses[align]}
    ${className}
  `.trim();

  const baseLabelClasses =
    `text-[var(--color-text-primary)] ${labelClassName}`.trim();

  const baseValueClasses = `text-[var(--color-text-primary)]`;

  if (inline) {
    return (
      <div className={baseContainerClasses} title={title}>
        <div
          className={`flex items-center ${justifyClasses[align]}`}
          style={{ gap: "var(--flysoft-density-gap-sm)" }}
        >
          {label && (
            <span
              className={baseLabelClasses}
              style={{ fontSize: labelFontSize, opacity: 0.7 }}
            >
              {label}
              {hideColon ? "" : ":"}
            </span>
          )}
          <span
            className={baseValueClasses}
            style={{ fontSize: valueFontSize }}
          >
            {value}
          </span>
          {link && (
            <LinkButton
              to={link}
              size="sm"
              variant="ghost"
              icon="fa-arrow-right"
              aria-label="Abrir enlace"
            />
          )}
        </div>
      </div>
    );
  }

  // Modo vertical: label arriba, value abajo
  return (
    <div className={baseContainerClasses} title={title}>
      {label && (
        <div
          className={baseLabelClasses}
          style={{
            fontSize: labelFontSize,
            marginBottom: stackGap,
            opacity: 0.7,
          }}
        >
          {label}
        </div>
      )}
      <div className={`flex items-center gap-2 ${justifyClasses[align]}`}>
        <div className={baseValueClasses} style={{ fontSize: valueFontSize }}>
          {value}
        </div>
        {link && (
          <LinkButton
            to={link}
            size="sm"
            variant="ghost"
            icon="fa-arrow-right"
            aria-label="Abrir enlace"
          />
        )}
      </div>
    </div>
  );
};
