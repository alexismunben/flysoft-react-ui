// Import styles
import "./index.css";

// Component exports
export { Button } from "./components/form-controls/Button";
export type { ButtonProps } from "./components/form-controls/Button";

export { Input } from "./components/form-controls/Input";
export type { InputProps } from "./components/form-controls/Input";

export { Card } from "./components/layout/Card";
export type { CardProps } from "./components/layout/Card";

export { AppLayout } from "./components/layout/AppLayout";
export type { AppLayoutProps } from "./components/layout/AppLayout";

export { Collection } from "./components/layout/Collection";
export type { CollectionProps } from "./components/layout/Collection";

export { DataField } from "./components/layout/DataField";
export type { DataFieldProps } from "./components/layout/DataField";

export { Badge } from "./components/utils/Badge";
export type { BadgeProps } from "./components/utils/Badge";

// Theme system exports
export * from "./contexts";

// Hooks exports
export * from "./hooks";

// Services exports
export {
  apiClient,
  createApiClient,
  setApiClientTokenProvider,
  clearApiClientTokenProvider,
} from "./services/apiClient";
export type { ApiClientConfig } from "./services/apiClient";

// Theme Switcher component
export { ThemeSwitcher } from "./components/ThemeSwitcher";

// Template exports
export { LoginForm } from "./templates/forms/LoginForm";
export type { LoginFormProps } from "./templates/forms/LoginForm";

export { RegistrationForm } from "./templates/forms/RegistrationForm";
export type { RegistrationFormProps } from "./templates/forms/RegistrationForm";

export { ContactForm } from "./templates/forms/ContactForm";
export type { ContactFormProps } from "./templates/forms/ContactForm";

export { DashboardLayout } from "./templates/layouts/DashboardLayout";
export type {
  DashboardLayoutProps,
  DashboardStat,
} from "./templates/layouts/DashboardLayout";

export { SidebarLayout } from "./templates/layouts/SidebarLayout";
export type {
  SidebarLayoutProps,
  MenuItem,
  User,
} from "./templates/layouts/SidebarLayout";

export { FormPattern } from "./templates/patterns/FormPattern";
export type {
  FormPatternProps,
  FormField,
} from "./templates/patterns/FormPattern";

// Styles are available via package exports: import 'flysoft-react-ui/styles'

// Re-export React for convenience
export { default as React } from "react";
export type { ReactElement, ReactNode, FC, ComponentProps } from "react";
