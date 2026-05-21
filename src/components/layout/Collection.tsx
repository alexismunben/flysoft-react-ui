import React from "react";
import type { Density } from "../../contexts/types";
import {
  comfortableDensity,
  compactDensity,
  denseDensity,
} from "../../contexts/presets";

export type CollectionGap = "tight" | "sm" | "md" | "lg" | string;

export interface CollectionProps {
  children: React.ReactNode;
  /**
   * Tamaño del gap entre items. Acepta presets semánticos que respetan la densidad
   * activa o cualquier valor CSS arbitrario (p. ej. "0.5rem", "8px").
   * - "tight" → 0
   * - "sm"    → var(--flysoft-density-gap-sm)
   * - "md"    → var(--flysoft-density-gap-md) (default)
   * - "lg"    → var(--flysoft-density-gap-lg)
   */
  gap?: CollectionGap;
  direction?: "column" | "row";
  wrap?: boolean;
  className?: string;
  /**
   * Override local de densidad: redefine las variables CSS --flysoft-density-*
   * para esta Collection y sus descendientes. Útil para crear secciones densas
   * dentro de un layout con densidad global "comfortable".
   */
  density?: Density;
}

const densityPresets: Record<Density, typeof comfortableDensity> = {
  comfortable: comfortableDensity,
  compact: compactDensity,
  dense: denseDensity,
};

const buildDensityOverride = (
  density: Density | undefined,
): React.CSSProperties | undefined => {
  if (!density) return undefined;
  const tokens = densityPresets[density];
  return {
    "--flysoft-density-padding-x-sm": tokens.paddingX.sm,
    "--flysoft-density-padding-x-md": tokens.paddingX.md,
    "--flysoft-density-padding-x-lg": tokens.paddingX.lg,
    "--flysoft-density-padding-y-sm": tokens.paddingY.sm,
    "--flysoft-density-padding-y-md": tokens.paddingY.md,
    "--flysoft-density-padding-y-lg": tokens.paddingY.lg,
    "--flysoft-density-container-padding-x": tokens.containerPaddingX,
    "--flysoft-density-container-padding-y": tokens.containerPaddingY,
    "--flysoft-density-gap-sm": tokens.gap.sm,
    "--flysoft-density-gap-md": tokens.gap.md,
    "--flysoft-density-gap-lg": tokens.gap.lg,
    "--flysoft-density-font-xs": tokens.fontXs,
    "--flysoft-density-font-sm": tokens.fontSm,
    "--flysoft-density-font-base": tokens.fontBase,
    "--flysoft-density-font-lg": tokens.fontLg,
    "--flysoft-density-font-xl": tokens.fontXl,
  } as React.CSSProperties;
};

const resolveGap = (gap: CollectionGap | undefined): string => {
  if (gap === undefined) return "var(--flysoft-density-gap-md)";
  if (gap === "tight") return "0";
  if (gap === "sm") return "var(--flysoft-density-gap-sm)";
  if (gap === "md") return "var(--flysoft-density-gap-md)";
  if (gap === "lg") return "var(--flysoft-density-gap-lg)";
  return gap; // valor CSS arbitrario (ej. "0.5rem", "8px")
};

export const Collection: React.FC<CollectionProps> = ({
  children,
  gap,
  direction = "column",
  wrap = false,
  className = "",
  density,
}) => {
  const baseClasses = `
    flex
    font-[var(--font-default)]
  `;

  const directionClasses = {
    column: "flex-col",
    row: "flex-row",
  };

  const wrapClass = wrap ? "flex-wrap" : "flex-nowrap";

  const classes =
    `${baseClasses} ${directionClasses[direction]} ${wrapClass} ${className}`.trim();

  const densityOverride = buildDensityOverride(density);

  const style: React.CSSProperties = {
    gap: resolveGap(gap),
    ...densityOverride,
  };

  return (
    <div
      className={classes}
      style={style}
      data-density-override={density}
    >
      {children}
    </div>
  );
};
