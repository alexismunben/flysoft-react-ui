import React, { useState } from "react";

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
 * Helper function to extract initials from text
 * Returns first letter of first word and first letter of last word (if multiple words)
 */
const getInitials = (text: string): string => {
  if (!text || text.trim().length === 0) return "";

  const words = text.trim().split(/\s+/);
  if (words.length === 0) return "";

  const firstLetter = words[0].charAt(0).toUpperCase();
  
  if (words.length === 1) {
    return firstLetter;
  }

  const lastLetter = words[words.length - 1].charAt(0).toUpperCase();
  return `${firstLetter}${lastLetter}`;
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
  const initials = getInitials(text);
  const showImage = image && !imageError;

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
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
    ${sizeClasses[size]}
    ${className}
  `;

  // Inline styles for colors (only if no image or image failed to load)
  const inlineStyles: React.CSSProperties = showImage
    ? {}
    : {
        backgroundColor: getColorValue(bgColor) || bgColor || "#4b5563",
        color: getColorValue(textColor) || textColor || "#ffffff",
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

