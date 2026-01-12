import React from "react";
import { normalizeIconClass } from "./iconUtils";

/**
 * Helper function to convert color names to CSS values
 */
const getColorValue = (color?: string): string | undefined => {
  if (!color) return undefined;

  // If already a valid CSS value (hex, rgb, rgba, hsl, etc.), return it
  if (
    color.startsWith("#") ||
    color.startsWith("rgb") ||
    color.startsWith("hsl")
  ) {
    return color;
  }

  // Map common color names
  const colorMap: Record<string, string> = {
    white: "#ffffff",
    black: "#000000",
    "gray-800": "#1f2937",
    "gray-700": "#374151",
    "gray-600": "#4b5563",
    "gray-500": "#6b7280",
    "gray-400": "#9ca3af",
    "gray-300": "#d1d5db",
    "gray-200": "#e5e7eb",
    "gray-100": "#f3f4f6",
    "gray-50": "#f9fafb",
  };

  return colorMap[color.toLowerCase()] || color;
};

/**
 * Get the CSS variable name for a variant color
 */
const getVariantColorVar = (
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
): string => {
  if (!variant) return "var(--color-primary)";

  const variantMap = {
    primary: "var(--color-primary)",
    secondary: "var(--color-secondary)",
    success: "var(--color-success)",
    warning: "var(--color-warning)",
    danger: "var(--color-danger)",
    info: "var(--color-info)",
  };

  return variantMap[variant];
};

/**
 * Get the actual color value for a variant (for gradients)
 * This reads the CSS variable value from the computed styles
 */
const getVariantColorValue = (
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"
): string => {
  if (!variant) return "#007aff"; // default primary color

  const variantColorMap = {
    primary: "#007aff",
    secondary: "#6b7280",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#06b6d4",
  };

  return variantColorMap[variant];
};

export interface RoadMapStage {
  /**
   * Name of the stage
   */
  name: string;
  /**
   * Optional description shown below the name
   */
  description?: string;
  /**
   * Optional FontAwesome 5 icon class (e.g., "fa-check", "fa-user")
   */
  icon?: string;
  /**
   * Whether the stage is disabled (shown with 0.5 opacity)
   */
  disabled?: boolean;
  /**
   * Color variant for the stage circle
   */
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  /**
   * Custom background color (hexadecimal, rgb, or color name)
   * Takes precedence over variant if provided
   */
  bg?: string;
}

export interface RoadMapProps {
  /**
   * Array of stages to display
   */
  stages: RoadMapStage[];
  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * RoadMap component displays a series of stages like metro stations
 * 
 * @example
 * // Basic usage
 * <RoadMap stages={[
 *   { name: "Start", variant: "primary" },
 *   { name: "Middle", variant: "success" },
 *   { name: "End", variant: "info" }
 * ]} />
 * 
 * @example
 * // With icons and descriptions
 * <RoadMap stages={[
 *   { name: "Planning", description: "Define requirements", icon: "fa-clipboard", variant: "primary" },
 *   { name: "Development", description: "Build the feature", icon: "fa-code", variant: "success" },
 *   { name: "Testing", description: "Test thoroughly", icon: "fa-check-circle", variant: "warning" }
 * ]} />
 */
export const RoadMap: React.FC<RoadMapProps> = ({
  stages,
  className = "",
}) => {
  if (!stages || stages.length === 0) {
    return null;
  }

  /**
   * Get the background color for a stage
   */
  const getStageBgColor = (stage: RoadMapStage): string => {
    if (stage.bg) {
      return getColorValue(stage.bg) || stage.bg;
    }
    return getVariantColorVar(stage.variant || "primary");
  };

  /**
   * Get the color value for gradient calculations
   */
  const getStageColorValue = (stage: RoadMapStage): string => {
    if (stage.bg) {
      return getColorValue(stage.bg) || stage.bg;
    }
    return getVariantColorValue(stage.variant || "primary");
  };

  /**
   * Create a gradient string for the connector line
   * The line transitions smoothly from the source color to the destination color
   */
  const getConnectorGradient = (
    fromStage: RoadMapStage,
    toStage: RoadMapStage
  ): string => {
    const fromColor = getStageColorValue(fromStage);
    const toColor = getStageColorValue(toStage);
    // Create a smooth gradient that transitions from source to destination
    return `linear-gradient(to bottom, ${fromColor}, ${toColor})`;
  };

  return (
    <div className={`roadmap-container ${className}`}>
      {stages.map((stage, index) => {
        const isLast = index === stages.length - 1;
        const isDisabled = stage.disabled;
        const bgColor = getStageBgColor(stage);
        const connectorGradient = !isLast
          ? getConnectorGradient(stage, stages[index + 1])
          : null;

        return (
          <div key={index} className="relative flex items-start gap-3">
            {/* Stage Circle and Connector */}
            <div className="flex flex-col items-center">
              {/* Stage Circle */}
              <div
                className={`
                  w-6 h-6 rounded-full
                  flex items-center justify-center
                  flex-shrink-0
                  ${isDisabled ? "opacity-50" : ""}
                `}
                style={{
                  backgroundColor: bgColor,
                  color: "#ffffff",
                }}
              >
                {stage.icon ? (
                  <i className={`${normalizeIconClass(stage.icon)} text-xs`} />
                ) : null}
              </div>

              {/* Connector Line - connects directly from circle to circle */}
              {!isLast && (
                <div
                  className="w-0.5 h-4 flex-shrink-0"
                  style={{
                    background: connectorGradient || undefined,
                  }}
                />
              )}
            </div>

            {/* Stage Content */}
            <div
              className={`
                flex-1
                ${isDisabled ? "opacity-50" : ""}
              `}
            >
              <h3
                className="text-sm font-semibold font-[var(--font-default)] mb-0.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                {stage.name}
              </h3>
              {stage.description && (
                <p
                  className="text-xs font-[var(--font-default)]"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {stage.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

RoadMap.displayName = "RoadMap";

