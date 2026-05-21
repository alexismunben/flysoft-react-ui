import React, { useState } from "react";
import { getInitialLetters } from "../../helpers";

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

export interface AvatarProps {
  /**
   * Text to extract initials from
   * The component will show the first letter of the first word
   * and the first letter of the last word if there are multiple words
   */
  text: string;
  /**
   * Optional image URL to display instead of initials
   */
  image?: string;
  /**
   * Optional background color (hexadecimal, rgb, or color name)
   * Default: gray-600 (#4b5563)
   */
  bgColor?: string;
  /**
   * Optional text color (hexadecimal, rgb, or color name)
   * Default: white (#ffffff)
   */
  textColor?: string;
  /**
   * Optional size variant
   * Default: md
   */
  size?: "sm" | "md" | "lg";
  /**
   * Optional additional CSS classes
   */
  className?: string;
}

/**
 * Avatar component displays a circular avatar with initials or an image
 *
 * @example
 * // Basic usage with text
 * <Avatar text="John Doe" />
 *
 * @example
 * // With image
 * <Avatar text="John Doe" image="https://example.com/avatar.jpg" />
 *
 * @example
 * // Custom colors
 * <Avatar text="Jane Smith" bgColor="#3b82f6" textColor="#ffffff" />
 */
export const Avatar: React.FC<AvatarProps> = ({
  text,
  image,
  bgColor = "gray-600",
  textColor = "white",
  size = "md",
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);
  const initials = getInitialLetters(text);
  const showImage = image && !imageError;

  const sizeVarBySize: Record<"sm" | "md" | "lg", string> = {
    sm: "var(--flysoft-density-control-height-sm)",
    md: "var(--flysoft-density-control-height-md)",
    lg: "var(--flysoft-density-control-height-lg)",
  };
  const fontVarBySize: Record<"sm" | "md" | "lg", string> = {
    sm: "var(--flysoft-density-font-xs)",
    md: "var(--flysoft-density-font-sm)",
    lg: "var(--flysoft-density-font-base)",
  };

  const baseClasses = `
    rounded-full
    flex
    items-center
    justify-center
    font-semibold
    font-[var(--font-default)]
    overflow-hidden
    flex-shrink-0
    ${className}
  `;

  // Inline styles: tamaño y tipografía leen de la densidad activa.
  const inlineStyles: React.CSSProperties = {
    width: sizeVarBySize[size],
    height: sizeVarBySize[size],
    fontSize: fontVarBySize[size],
    ...(showImage
      ? {}
      : {
          backgroundColor: getColorValue(bgColor) || bgColor || "#4b5563",
          color: getColorValue(textColor) || textColor || "#ffffff",
        }),
  };

  return (
    <div
      className={baseClasses}
      style={inlineStyles}
      title={text}
      role="img"
      aria-label={text}
    >
      {showImage ? (
        <img
          src={image}
          alt={text}
          className="w-full h-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

Avatar.displayName = "Avatar";
