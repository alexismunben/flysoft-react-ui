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

  const baseContainerClasses = `
    font-[var(--font-default)]
    ${alignClasses[align]}
    ${className}
  `.trim();

  const baseLabelClasses = `
    text-sm text-[var(--color-text-primary)]
    ${labelClassName}
  `.trim();

  const baseValueClasses = `
    text-base text-[var(--color-text-primary)]
  `;

  if (inline) {
    // Modo inline: label y value en la misma línea
    return (
      <div className={baseContainerClasses} title={title}>
        <div className={`flex items-center gap-2 ${justifyClasses[align]}`}>
          {label && <span className={baseLabelClasses}>{label}:</span>}
          <span className={baseValueClasses}>{value}</span>
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
      {label && <div className={baseLabelClasses}>{label}</div>}
      <div className={`flex items-center gap-2 ${justifyClasses[align]}`}>
        <div className={baseValueClasses}>{value}</div>
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
