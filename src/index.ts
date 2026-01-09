// Import styles
import "./index.css";

// Component exports
export { Button } from "./components/form-controls/Button";
export type { ButtonProps } from "./components/form-controls/Button";

export { Input } from "./components/form-controls/Input";
export type { InputProps } from "./components/form-controls/Input";

export { AutocompleteInput } from "./components/form-controls/AutocompleteInput";
export type {
  AutocompleteInputProps,
  AutocompleteOption,
} from "./components/form-controls/AutocompleteInput";

export { SearchSelectInput } from "./components/form-controls/SearchSelectInput";
export type {
  SearchSelectInputProps,
  SearchSelectOption,
} from "./components/form-controls/SearchSelectInput";

export { DatePicker } from "./components/form-controls/DatePicker";
export type { DatePickerProps } from "./components/form-controls/DatePicker";

export { DateInput } from "./components/form-controls/DateInput";
export type {
  DateInputProps,
  DateInputFormat,
} from "./components/form-controls/DateInput";

export { Pagination } from "./components/form-controls/Pagination";
export type {
  PaginationProps,
  PaginationInterface,
} from "./components/form-controls/Pagination";

export { Checkbox } from "./components/form-controls/Checkbox";
export type { CheckboxProps } from "./components/form-controls/Checkbox";

export { RadioButtonGroup } from "./components/form-controls/RadioButtonGroup";
export type {
  RadioButtonGroupProps,
  RadioOption,
} from "./components/form-controls/RadioButtonGroup";

export { Card } from "./components/layout/Card";
export type { CardProps } from "./components/layout/Card";

export { AppLayout } from "./components/layout/AppLayout";
export type { AppLayoutProps } from "./components/layout/AppLayout";

export { Collection } from "./components/layout/Collection";
export type { CollectionProps } from "./components/layout/Collection";

export { DataField } from "./components/layout/DataField";
export type { DataFieldProps } from "./components/layout/DataField";

export { TabsGroup } from "./components/layout/TabsGroup";
export type { TabsGroupProps, Tab } from "./components/layout/TabsGroup";

export { TabPanel } from "./components/layout/TabPanel";
export type { TabPanelProps } from "./components/layout/TabPanel";
export { DataTable } from "./components/layout/DataTable";
export type {
  DataTableProps,
  DataTableColumn,
} from "./components/layout/DataTable";

export { Badge } from "./components/utils/Badge";
export type { BadgeProps } from "./components/utils/Badge";
export { Avatar } from "./components/utils/Avatar";
export type { AvatarProps } from "./components/utils/Avatar";
export { RoadMap } from "./components/utils/RoadMap";
export type { RoadMapProps, RoadMapStage } from "./components/utils/RoadMap";
export { Dialog } from "./components/utils/Dialog";
export type { DialogProps } from "./components/utils/Dialog";
export { Loader } from "./components/utils/Loader";
export type { LoaderProps } from "./components/utils/Loader";
export { DropdownMenu } from "./components/utils/DropdownMenu";
export type { DropdownMenuProps } from "./components/utils/DropdownMenu";
export { Filter } from "./components/utils/Filter";
export type { FilterProps } from "./components/utils/Filter";
export { FiltersDialog } from "./components/utils/FiltersDialog";
export type {
  FiltersDialogProps,
  FilterConfig,
} from "./components/utils/FiltersDialog";
export { Snackbar } from "./components/utils/Snackbar";
export type { SnackbarProps } from "./components/utils/Snackbar";
export { SnackbarContainer } from "./components/utils/SnackbarContainer";
export type { SnackbarContainerProps } from "./components/utils/SnackbarContainer";

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
