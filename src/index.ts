// Import styles
import "./index.css";

// Component exports
export * from "./components";

// Theme system exports
export * from "./contexts";

// Hooks exports
export * from "./hooks";

// Services exports
export * from "./services";

// Interfaces exports
export * from "./interfaces";

// Helpers exports
export * from "./helpers";



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
