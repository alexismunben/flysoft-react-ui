// Component exports
export { Button } from "./components/form-controls/Button";
export type { ButtonProps } from "./components/form-controls/Button";

export { Input } from "./components/form-controls/Input";
export type { InputProps } from "./components/form-controls/Input";

export { Card } from "./components/layout/Card";
export type { CardProps } from "./components/layout/Card";

export { Badge } from "./components/utils/Badge";
export type { BadgeProps } from "./components/utils/Badge";

// Theme system exports
export * from "./contexts";

// Theme Switcher component
export { ThemeSwitcher } from "./components/ThemeSwitcher";

// Styles export
export * from "./styles";

// Re-export React for convenience
export { default as React } from "react";
export type { ReactElement, ReactNode, FC, ComponentProps } from "react";
