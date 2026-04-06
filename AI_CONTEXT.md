# Flysoft React UI - AI Context & Documentation

This document serves as the source of truth for AI models (Gemini, Claude, GPT, etc.) when generating code that consumes the `flysoft-react-ui` library.

## Library Philosophy

`flysoft-react-ui` is a React component library built with TypeScript. It emphasizes a consistent look and feel, ease of use, and "premium" aesthetics out of the box. All components use CSS variables for theming and FontAwesome 5 (light/outlined style) for icons.

## Critical Rules for AI

1. **Top-Level Imports Only**: Always import from `'flysoft-react-ui'`.
   - CORRECT: `import { Button, Card } from 'flysoft-react-ui';`
   - INCORRECT: `import { Button } from 'flysoft-react-ui/components/Button';`
2. **TypeScript First**: Use the exported types (e.g., `ButtonProps`, `DataTableColumn<T>`) to ensure type safety.
3. **Style Import at App Root Only**: Add `import 'flysoft-react-ui/styles';` once at the app root. Never import CSS in individual components.
4. **Do Not Use Docs Internals**: Never import or reference anything from `docs/*` or `src/docs/*`.
5. **FontAwesome 5 Only**: Use `fa-*` icon classes. Components normalize to light style (`fal`) automatically. Never use other icon libraries.
6. **Theme CSS Variables**: Use `var(--color-*)`, `var(--shadow-*)`, `var(--radius-*)`, `var(--font-*)` for custom styling. Never hardcode colors.

---

## Form Controls

### Button

Customizable button with variants, colors, icons, and ripple effect.

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";           // default: "primary"
  size?: "sm" | "md" | "lg";                           // default: "md"
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info"; // default: "primary"
  bg?: string;                   // Custom background color (hex, rgb, rgba, hsl, or color name)
  textColor?: string;            // Custom text color
  icon?: string;                 // FontAwesome icon class (e.g. "fa-save")
  iconPosition?: "left" | "right";  // default: "left"
  loading?: boolean;             // Shows spinner, disables button. default: false
  children?: React.ReactNode;
}
```

```tsx
<Button variant="primary" icon="fa-save" loading={isLoading} onClick={handleSave}>
  Guardar
</Button>
<Button variant="outline" color="danger" icon="fa-trash">Eliminar</Button>
<Button variant="ghost" size="sm">Cancelar</Button>
<Button bg="#8b5cf6" textColor="#fff">Custom Color</Button>
```

### LinkButton

Anchor-styled button that uses React Router `<Link>` for internal routes and `<a>` for external URLs.

```typescript
interface LinkButtonProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;                    // Route or URL (required)
  target?: string;
  variant?: "primary" | "outline" | "ghost";           // default: "primary"
  size?: "sm" | "md" | "lg";                           // default: "md"
  color?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  bg?: string;
  textColor?: string;
  icon?: string;
  iconPosition?: "left" | "right";  // default: "left"
  children?: React.ReactNode;
}
```

```tsx
<LinkButton to="/users" icon="fa-users">Ver Usuarios</LinkButton>
<LinkButton to="https://example.com" target="_blank">Sitio Externo</LinkButton>
```

### Input

Text input with labels, icons, error states, and ref forwarding.

```typescript
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;                // Label text above input
  error?: string;                // Error message below input
  icon?: string;                 // FontAwesome icon class
  iconPosition?: "left" | "right";  // default: "left"
  size?: "sm" | "md" | "lg";        // default: "md"
  children?: React.ReactNode;
  onIconClick?: (event: React.MouseEvent<HTMLElement>) => void;  // Makes icon clickable
  readOnly?: boolean;            // Read-only without disabled appearance
}
```

```tsx
<Input label="Email" type="email" icon="fa-envelope" placeholder="usuario@email.com" />
<Input label="Búsqueda" icon="fa-search" iconPosition="right" onIconClick={handleSearch} />
<Input label="Nombre" error="Campo requerido" />
```

### AutocompleteInput

Searchable dropdown with single and multiple selection support.

```typescript
interface AutocompleteOption {
  label: string;
  value: string;
  description?: string | number;
  icon?: string;
}

interface AutocompleteInputProps<T = AutocompleteOption, K = string>
  extends Omit<InputProps, "onChange" | "value" | "ref"> {
  options: T[];                  // Options array (required)
  value?: string | string[];     // String for single, array for multiple
  onChange?: ((value: string | string[]) => void) | React.ChangeEventHandler<HTMLInputElement>;
  onSelectOption?: (option: T, value: K) => void;
  noResultsText?: string;       // default: "Sin resultados"
  getOptionLabel?: (item: T) => string;
  getOptionValue?: (item: T) => K;
  getOptionDescription?: (item: T) => string | number | undefined;
  renderOption?: (item: T) => React.ReactNode;
  readOnly?: boolean;
  multiple?: boolean;            // Multi-select with checkboxes. default: false
}
```

```tsx
// Single selection
<AutocompleteInput
  label="País"
  options={[{ label: "Argentina", value: "AR" }, { label: "Brasil", value: "BR" }]}
  value={selectedCountry}
  onChange={setSelectedCountry}
/>

// Multiple selection
<AutocompleteInput
  label="Categorías"
  options={categories}
  multiple
  value={selectedCategories}
  onChange={setSelectedCategories}
/>

// Custom objects
<AutocompleteInput<User, number>
  label="Usuario"
  options={users}
  getOptionLabel={(u) => u.fullName}
  getOptionValue={(u) => u.id}
  getOptionDescription={(u) => u.email}
/>
```

### SearchSelectInput

Opens a dialog modal for selecting from async search results. Ideal for large datasets.

```typescript
interface SearchSelectOption {
  label: string;
  value?: string;
  description?: string | number;
  icon?: string;
}

interface SearchSelectInputProps<T = SearchSelectOption, K = string>
  extends Omit<InputProps, "onChange" | "value" | "ref"> {
  value?: T | K | string;
  onChange?: ((value: T | K) => void) | React.ChangeEventHandler<HTMLInputElement>;
  onSearchPromiseFn: (text: string) => Promise<Array<T> | PaginationInterface<T>>;  // required
  onSingleSearchPromiseFn: (value: K) => Promise<T | undefined>;  // required
  onSelectOption?: (option: T, value: K) => void;
  dialogTitle?: string;          // default: "Seleccione una opción"
  icon?: string;                 // default: "fa-search"
  iconPosition?: "left" | "right";  // default: "right"
  noResultsText?: string;       // default: "Sin resultados"
  getOptionLabel?: (item: T) => string;
  getOptionValue?: (item: T) => K;
  getOptionDescription?: (item: T) => string | number | undefined;
  renderOption?: (item: T) => React.ReactNode;
  readOnly?: boolean;
}
```

```tsx
<SearchSelectInput<Product, number>
  label="Producto"
  onSearchPromiseFn={(text) => apiClient.get({ url: `/api/products?q=${text}` })}
  onSingleSearchPromiseFn={(id) => apiClient.get({ url: `/api/products/${id}` })}
  getOptionLabel={(p) => p.name}
  getOptionValue={(p) => p.id}
  getOptionDescription={(p) => `$${p.price}`}
  onChange={(value) => setProductId(value)}
/>
```

### DatePicker

Standalone calendar component for date selection.

```typescript
interface DatePickerProps {
  value?: Dayjs | null;
  onChange?: (date: Dayjs) => void;
  initialViewDate?: Dayjs;       // Initial month/year when value is null
  startWeekOn?: "monday" | "sunday";  // default: "sunday"
  className?: string;
}
```

### DateInput

Input field with integrated DatePicker dropdown. Accepts manual text and Dayjs objects.

```typescript
type DateInputFormat = "dd/mm/yyyy" | "mm/dd/yyyy";

interface DateInputProps extends Omit<InputProps, "type" | "value" | "onChange" | "ref"> {
  value?: Dayjs | null | string;
  onChange?: ((date: Dayjs | null) => void) | React.ChangeEventHandler<HTMLInputElement>;
  format?: DateInputFormat;      // default: "dd/mm/yyyy"
  datePickerProps?: Omit<DatePickerProps, "value" | "onChange">;
  readOnly?: boolean;
}
```

```tsx
<DateInput label="Fecha de nacimiento" value={birthDate} onChange={setBirthDate} />
<DateInput label="Start Date" format="mm/dd/yyyy" />
```

### Checkbox

Boolean checkbox with label and error support. Ref forwarding supported.

```typescript
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  labelPosition?: "left" | "right";  // default: "right"
  error?: string;
  size?: "sm" | "md" | "lg";        // default: "md"
  readOnly?: boolean;
}
```

```tsx
<Checkbox label="Acepto los términos" checked={accepted} onChange={handleChange} />
<Checkbox label="Activo" size="lg" readOnly />
```

### RadioButtonGroup

Single selection from a group of radio options.

```typescript
interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface RadioButtonGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  options: RadioOption[];        // required
  value?: string | number;
  onChange?: ((value: string | number) => void) | React.ChangeEventHandler<HTMLInputElement>;
  labelPosition?: "left" | "right";  // default: "right"
  size?: "sm" | "md" | "lg";        // default: "md"
  error?: string;
  direction?: "vertical" | "horizontal";  // default: "vertical"
  gap?: "sm" | "md" | "lg";         // default: "md"
  name?: string;
  disabled?: boolean;
  onBlur?: (() => void) | React.FocusEventHandler<HTMLInputElement>;
  readOnly?: boolean;
}
```

```tsx
<RadioButtonGroup
  options={[
    { label: "Masculino", value: "M" },
    { label: "Femenino", value: "F" },
    { label: "Otro", value: "O" },
  ]}
  value={gender}
  onChange={setGender}
  direction="horizontal"
/>
```

### CurrencyInput

Numeric input with currency formatting (Argentine locale: 1.234,56). Ref forwarding supported.

```typescript
interface CurrencyInputProps extends Omit<InputProps, "value" | "onChange" | "type"> {
  value?: number | null;
  onChange?: (value: any) => void;  // Receives parsed numeric value
}
```

```tsx
<CurrencyInput label="Monto" value={amount} onChange={setAmount} icon="fa-dollar-sign" />
```

### Pagination

URL-based pagination controls using react-router-dom's `useSearchParams`.

```typescript
interface PaginationProps {
  fieldName?: string;            // URL param name. default: "pagina"
  page?: number;                 // default: 1
  pages?: number;                // default: 1
  total?: number;                // default: 0
  isLoading?: boolean;           // default: false
}
```

```tsx
<Pagination page={currentPage} pages={totalPages} total={totalItems} />
```

---

## Layout Components

### Card

Generic container with header, content, footer, and variants.

```typescript
interface CardProps {
  title?: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  headerActions?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";  // default: "default"
  alwaysDisplayHeaderActions?: boolean;  // default: false (shows on hover on lg+)
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  compact?: boolean;             // Reduced padding. default: false
}
```

```tsx
<Card title="Usuarios" headerActions={<Button size="sm" icon="fa-plus">Nuevo</Button>}>
  <p>Contenido</p>
</Card>
<Card variant="elevated" compact footer={<Button variant="primary">Guardar</Button>}>
  <Input label="Nombre" />
</Card>
```

### AppLayout

Main application layout with responsive navbar and sidebar drawer.

```typescript
interface AppLayoutProps {
  navbar?: NavbarInterface;
  leftDrawer?: LeftDrawerInterface;
  contentFooter?: React.ReactNode;
  children: React.ReactNode;     // required
  className?: string;
}

interface NavbarInterface {
  navBarLeftNode?: React.ReactNode;
  navBarRightNode?: React.ReactNode;
  fullWidthNavbar?: boolean;     // Fixed full-width (true) or relative (false)
  height?: string;               // default: "64px"
  className?: string;
}

interface LeftDrawerInterface {
  headerNode?: React.ReactNode;
  contentNode?: React.ReactNode;
  footerNode?: React.ReactNode;
  className?: string;
  width?: string;                // default: "256px"
}
```

```tsx
<AppLayout
  navbar={{
    navBarLeftNode: <h1>Mi App</h1>,
    navBarRightNode: <Avatar text="Admin" />,
    fullWidthNavbar: true,
  }}
  leftDrawer={{
    headerNode: <h2>Menú</h2>,
    contentNode: <nav>...</nav>,
  }}
>
  <main>Contenido</main>
</AppLayout>
```

**Behaviors**: Navbar auto-hides/shows on scroll. Mobile drawer with overlay. Responsive breakpoints.

### Collection

Flex container for rendering lists of items.

```typescript
interface CollectionProps {
  children: React.ReactNode;     // required
  gap?: string;                  // CSS gap value. default: "1rem"
  direction?: "column" | "row";  // default: "column"
  wrap?: boolean;                // default: false
  className?: string;
}
```

### DataField

Label + value pair display for detail views.

```typescript
interface DataFieldProps {
  label?: string;
  value?: string | number | React.ReactNode;
  inline?: boolean;              // Horizontal layout. default: false
  align?: "left" | "right" | "center";  // default: "left"
  title?: string;                // HTML title tooltip
  link?: string;                 // Opens URL in new tab
  className?: string;
  labelClassName?: string;
}
```

```tsx
<DataField label="Nombre" value="Juan Pérez" />
<DataField label="Email" value="juan@email.com" link="mailto:juan@email.com" inline />
```

### TabsGroup / TabPanel

Tabbed interfaces with optional URL persistence.

```typescript
interface Tab {
  id: string | number;
  label: string;
}

interface TabsGroupProps {
  children?: React.ReactNode;
  tabs: Tab[];                   // required
  paramName?: string;            // URL search param for persistence
  headerNode?: React.ReactNode;  // Right-aligned header content
  onChangeTab?: (selectedTab: string) => void;
}

interface TabPanelProps {
  children?: React.ReactNode;
  tabId: string | number;        // Must match a Tab.id (required)
}
```

```tsx
<TabsGroup tabs={[{ id: "info", label: "Información" }, { id: "history", label: "Historial" }]}>
  <TabPanel tabId="info">
    <p>Información del usuario</p>
  </TabPanel>
  <TabPanel tabId="history">
    <p>Historial de actividad</p>
  </TabPanel>
</TabsGroup>
```

### DataTable\<T\>

High-performance data table with sorting, formatting, actions, and skeleton loading.

```typescript
interface DataTableColumn<T> {
  align?: "left" | "right" | "center";  // Auto-set for date/currency/numeric
  width?: string;
  header?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  value?: string | number | ((row: T) => string | React.ReactNode);
  tooltip?: (row: T) => string | React.ReactNode;
  type?: "text" | "numeric" | "currency" | "date";
  actions?: (row: T) => Array<React.ReactNode>;
  headerActions?: () => Array<React.ReactNode>;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[]; // required
  rows: T[];                     // required
  className?: string;
  maxRows?: number;              // Enables sticky header with scroll
  locale?: string;               // default: "es-AR"
  isLoading?: boolean;           // Shows skeleton rows. default: false
  loadingRows?: number;          // default: 5
  rowClassName?: (row: T) => string;
  headerClassName?: string;
  footerClassName?: string;
  headerCellClassName?: string;
  footerCellClassName?: string;
  cellClassName?: string | ((row: T, column: DataTableColumn<T>) => string);
  compact?: boolean;             // default: false
}
```

```tsx
interface User { id: number; name: string; salary: number; createdAt: string; }

const columns: DataTableColumn<User>[] = [
  { header: "ID", value: "id", width: "60px" },
  { header: "Nombre", value: (row) => row.name },
  { header: "Salario", value: "salary", type: "currency" },
  { header: "Fecha", value: "createdAt", type: "date" },
  {
    header: "Acciones",
    actions: (row) => [
      <Button key="edit" variant="ghost" size="sm" icon="fa-edit" onClick={() => edit(row)}>Editar</Button>,
      <Button key="del" variant="ghost" size="sm" icon="fa-trash" color="danger" onClick={() => del(row)}>Eliminar</Button>,
    ],
  },
];

<DataTable<User> columns={columns} rows={users} isLoading={loading} maxRows={10} />
```

**Type formatting**: `currency` → thousands separator, no symbol. `numeric` → locale formatting. `date` → DD/MM/YYYY.

### Accordion

Collapsible content section with smooth animation.

```typescript
interface AccordionProps {
  title: string | React.ReactNode;  // required
  children: React.ReactNode;        // required
  icon?: string;                 // FontAwesome icon
  rightNode?: React.ReactNode;
  defaultOpen?: boolean;         // default: false
  className?: string;
  variant?: "default" | "elevated" | "outlined";  // default: "default"
  onToggle?: (isOpen: boolean) => void;
}
```

```tsx
<Accordion title="Detalles" icon="fa-info-circle" defaultOpen>
  <p>Contenido colapsable</p>
</Accordion>
```

### Menu

Simple menu list for displaying options.

```typescript
interface MenuProps<T = { label: string }> {
  options: T[];                  // required
  onOptionSelected: (item: T) => void;  // required
  getOptionLabel?: (item: T) => string;
  renderOption?: (item: T) => React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  itemClassName?: string;
}
```

### DropdownMenu

Portal-based dropdown menu triggered by a button. Auto-positions above/below.

```typescript
interface DropdownMenuProps<T = { label: string }> {
  options: T[];                  // required
  onOptionSelected: (item: T) => void;  // required
  renderNode?: React.ReactNode;  // Custom trigger (default: ellipsis icon button)
  getOptionLabel?: (item: T) => string;
  renderOption?: (item: T) => React.ReactNode;
  replaceOnSingleOption?: boolean;  // Show single option inline. default: false
  openOnHover?: boolean;         // default: false
}
```

```tsx
<DropdownMenu
  options={[{ label: "Editar" }, { label: "Eliminar" }]}
  onOptionSelected={(item) => handleAction(item.label)}
  renderNode={<Button variant="ghost" icon="fa-cog" size="sm" />}
/>
```

### DropdownPanel

Portal-based dropdown that renders arbitrary content (not a list).

```typescript
interface DropdownPanelProps {
  renderNode?: React.ReactNode;  // Custom trigger (default: ellipsis icon button)
  children: React.ReactNode;     // required
  openOnHover?: boolean;         // default: false
}
```

### Filter

Versatile filtering component with multiple filter types and optional URL persistence.

```typescript
// Discriminated union by filterType
type FilterProps =
  | TextFilterProps        // filterType?: "text" (default)
  | NumberFilterProps      // filterType: "number" (+ min?, max?)
  | DateFilterProps        // filterType: "date"
  | AutocompleteFilterProps // filterType: "autocomplete" (+ options, multiple?)
  | SearchFilterProps      // filterType: "search"
  | SearchSelectFilterProps // filterType: "searchSelect" (+ onSearchPromiseFn, onSingleSearchPromiseFn)

// Common props for all filter types:
interface BaseFilterProps {
  paramName?: string;            // URL search param for persistence
  label?: string;
  staticOptions?: Array<{ text: string; value: string }>;
  inputWidth?: string;
  value?: string;                // Controlled value
  onChange?: (value: string | undefined) => void;
  hideEmpty?: boolean;           // default: false
  disabled?: boolean;            // default: false
}
```

```tsx
<Filter filterType="text" paramName="nombre" label="Nombre" />
<Filter filterType="number" paramName="edad" label="Edad" min={0} max={120} />
<Filter filterType="date" paramName="fecha" label="Fecha" />
<Filter
  filterType="autocomplete"
  paramName="estado"
  label="Estado"
  options={[{ label: "Activo", value: "1" }, { label: "Inactivo", value: "0" }]}
/>
<Filter
  filterType="searchSelect"
  paramName="cliente"
  label="Cliente"
  onSearchPromiseFn={(text) => apiClient.get({ url: `/api/clients?q=${text}` })}
  onSingleSearchPromiseFn={(id) => apiClient.get({ url: `/api/clients/${id}` })}
/>
```

---

## Utility Components

### Badge

Status/category label with variants and custom colors.

```typescript
interface BadgeProps {
  children: React.ReactNode;     // required
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";  // default: "primary"
  size?: "sm" | "md" | "lg";    // default: "md"
  rounded?: boolean;             // Full border radius. default: false
  className?: string;
  icon?: string;
  iconPosition?: "left" | "right";  // default: "left"
  iconLabel?: string;            // aria-label for icon
  bg?: string;                   // Custom background color
  textColor?: string;            // Custom text color
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}
```

```tsx
<Badge variant="success" icon="fa-check">Activo</Badge>
<Badge variant="danger" rounded>3</Badge>
<Badge bg="#8b5cf6" textColor="#fff">Custom</Badge>
```

### Avatar

User profile display with initials fallback when image fails.

```typescript
interface AvatarProps {
  text: string;                  // Name for initials extraction (required)
  image?: string;                // Image URL
  bgColor?: string;              // default: "#4b5563"
  textColor?: string;            // default: "#ffffff"
  size?: "sm" | "md" | "lg";    // default: "md" (sm=32px, md=40px, lg=48px)
  className?: string;
}
```

```tsx
<Avatar text="Juan Pérez" image="/avatars/juan.jpg" />
<Avatar text="Admin User" bgColor="#3b82f6" size="lg" />
```

### RoadMap

Progress/stage visualization with connected circles and gradient lines.

```typescript
interface RoadMapStage {
  name: string;                  // required
  description?: string;
  icon?: string;
  disabled?: boolean;            // Grayed out at 50% opacity
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  bg?: string;                   // Custom color (overrides variant)
}

interface RoadMapProps {
  stages: RoadMapStage[];        // required
  className?: string;
}
```

```tsx
<RoadMap stages={[
  { name: "Creado", icon: "fa-plus", variant: "info" },
  { name: "En Proceso", icon: "fa-cog", variant: "warning" },
  { name: "Completado", icon: "fa-check", variant: "success" },
  { name: "Archivado", icon: "fa-archive", disabled: true },
]} />
```

### Dialog

Modal window with overlay, escape-to-close, and scroll lock.

```typescript
interface DialogProps {
  isOpen: boolean;               // required
  title: React.ReactNode;       // required
  children: React.ReactNode;    // required
  footer?: React.ReactNode;
  onClose?: () => void;
  closeOnOverlayClick?: boolean; // default: false
  compact?: boolean;             // default: false
}
```

```tsx
<Dialog isOpen={showDialog} title="Confirmar" onClose={() => setShowDialog(false)}
  footer={
    <>
      <Button variant="ghost" onClick={() => setShowDialog(false)}>Cancelar</Button>
      <Button variant="primary" color="danger" onClick={handleDelete}>Eliminar</Button>
    </>
  }
>
  <p>¿Está seguro que desea eliminar este registro?</p>
</Dialog>
```

### Loader

Loading indicator with progress bar. Can wrap content with overlay.

```typescript
interface LoaderProps {
  isLoading?: boolean;           // default: false
  text?: string;                 // Text below progress bar
  children?: React.ReactNode;
  keepContentWhileLoading?: boolean;  // Show content faded at 50% opacity
  contentLoadingNode?: React.ReactNode;  // Custom loading content
  overlayClassName?: string;     // default: "bg-black/50 backdrop-blur-sm"
}
```

```tsx
<Loader isLoading={loading} text="Cargando datos...">
  <DataTable ... />
</Loader>
<Loader isLoading={loading} keepContentWhileLoading>
  <Card>...</Card>
</Loader>
```

### FiltersDialog

Dialog that groups multiple Filter components. Syncs values from/to URL search params.

```typescript
interface FilterConfig {
  filterType: "text" | "number" | "date" | "autocomplete";
  paramName: string;             // required
  label?: string;
  staticOptions?: Array<{ text: string; value: string }>;
  inputWidth?: string;
  min?: number;                  // For number filters
  max?: number;                  // For number filters
  options?: any[];               // For autocomplete
  getOptionLabel?: (item: any) => string;
  getOptionValue?: (item: any) => any;
  renderOption?: (item: any) => React.ReactNode;
  noResultsText?: string;
}

interface FiltersDialogProps {
  filters: FilterConfig[];       // required
}
```

```tsx
<FiltersDialog filters={[
  { filterType: "text", paramName: "nombre", label: "Nombre" },
  { filterType: "number", paramName: "edad", label: "Edad", min: 0, max: 120 },
  { filterType: "date", paramName: "fecha", label: "Fecha" },
  { filterType: "autocomplete", paramName: "estado", label: "Estado",
    options: [{ label: "Activo", value: "1" }, { label: "Inactivo", value: "0" }] },
]} />
```

### Snackbar / SnackbarContainer

Toast notification system. SnackbarContainer must be at the app root.

```typescript
interface SnackbarContainerProps {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left" | "top-center" | "bottom-center";  // default: "top-right"
  maxSnackbars?: number;         // default: 5
}

// Usage via hook (not direct Snackbar component):
const { showSnackbar } = useSnackbar();
showSnackbar("Operación exitosa", "success");
showSnackbar("Error al guardar", "danger", { duration: 5000, icon: "fa-exclamation" });
```

**Variants**: `"primary"` | `"secondary"` | `"success"` | `"warning"` | `"danger"` | `"info"`
**Default icons**: success=fa-check-circle, danger=fa-times-circle, warning=fa-exclamation-triangle, info/primary/secondary=fa-info-circle

### Skeleton

Loading placeholder with pulse animation. Fully customizable via className.

```typescript
interface SkeletonProps {
  className?: string;  // Tailwind classes to control width, height, shape
}
```

```tsx
<Skeleton className="h-4 w-3/4" />      {/* Text line */}
<Skeleton className="h-10 w-full" />     {/* Input placeholder */}
<Skeleton className="h-32 w-32 rounded-full" />  {/* Avatar placeholder */}
```

### ThemeSwitcher

Self-contained theme toggle. No props. Displays available themes with switch buttons and current theme info.

```tsx
<ThemeSwitcher />
```

---

## Contexts & State Management

### ThemeProvider / useTheme

Manages application theme with CSS variable injection, presets, and localStorage persistence.

```typescript
// Provider props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string | Theme;  // default: "light"
  storageKey?: string;            // localStorage key. default: "flysoft-theme"
  forceInitialTheme?: boolean;    // Ignore localStorage. default: false
  onThemeChange?: (theme: Theme) => void;
}

// Hook return
interface ThemeContextType {
  theme: Theme;                   // Current theme object
  setTheme: (theme: Theme | string) => void;  // Switch theme by name or object
  updateTheme: (updates: Partial<Theme> | ((prev: Theme) => Theme)) => void;
  currentThemeName: string;
  availableThemes: string[];      // ["light", "dark", "blue", "green"]
  resetToDefault: () => void;
  isDark: boolean;
}
```

```tsx
// App root
<ThemeProvider initialTheme="light">
  <App />
</ThemeProvider>

// In components
const { theme, setTheme, isDark } = useTheme();
<Button onClick={() => setTheme(isDark ? "light" : "dark")}>Toggle Theme</Button>
```

**Preset themes**: `lightTheme`, `darkTheme`, `blueTheme`, `greenTheme` (importable).

### AuthProvider / AuthContext

Manages authentication with automatic token validation and refresh.

```typescript
interface AuthProviderProps {
  children: React.ReactNode;
  getToken: (username: string, password: string) => Promise<AuthTokenInterface>;  // required
  getUserData: (auth: AuthTokenInterface) => Promise<AuthContextUserInterface>;   // required
  refreshToken?: (auth: AuthTokenInterface) => Promise<AuthTokenInterface>;
  removeToken?: (auth: AuthTokenInterface) => Promise<void>;
  showLog?: boolean;             // default: false
}

interface AuthContextType {
  user: AuthContextUserInterface | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextUserInterface {
  id?: number | string;
  name?: string;
  aditionalData?: any;
  token?: AuthTokenInterface;
}

interface AuthTokenInterface {
  accessToken?: string;
  expires?: string;              // ISO 8601
  tokenType?: string;
  refreshToken?: string;
  aditionalData?: any;
}
```

```tsx
<AuthProvider
  getToken={async (user, pass) => {
    const res = await apiClient.post({ url: "/auth/login", body: { user, pass } });
    return res.token;
  }}
  getUserData={async (auth) => {
    return await apiClient.get({ url: "/auth/me" });
  }}
  refreshToken={async (auth) => {
    return await apiClient.post({ url: "/auth/refresh", body: { token: auth.refreshToken } });
  }}
>
  <App />
</AuthProvider>

// In components
const { user, login, logout, isAuthenticated } = useContext(AuthContext);
```

**Behaviors**: Validates token on mount. Checks expiration every 60s. Auto-refreshes if `refreshToken` provided. Stores in localStorage as `"auth"`.

### CrudProvider / useCrud\<T\>

Generic CRUD context with automatic pagination, URL parameter sync, and snackbar notifications.

```typescript
interface CrudProviderProps<T> {
  children: ReactNode;
  getPromise?: Function | { execute: Function; successMessage?: string; errorMessage?: string | ((error: any) => string) };
  getItemPromise?: Function | { execute: Function; successMessage?: string; errorMessage?: string | ((error: any) => string) };
  postPromise?: Function | { execute: Function; successMessage?: string; errorMessage?: string | ((error: any) => string) };
  putPromise?: Function | { execute: Function; successMessage?: string; errorMessage?: string | ((error: any) => string) };
  deletePromise?: Function | { execute: Function; successMessage?: string; errorMessage?: string | ((error: any) => string) };
  urlParams?: Array<string>;     // URL params to watch. default: []
  limit?: number;                // Items per page. default: 15
  pageParam?: string;            // URL page param. default: "pagina"
  singleItemId?: string | number;
  extraData?: Record<string, any>;
}

interface CrudContextType<T> {
  list: Array<T> | undefined;
  item: T | undefined;
  page: number;
  pages: number;
  total: number;
  limit: number;
  isLoading: boolean;
  pagination: ReactNode;         // Pre-built Pagination component
  params: Record<string, any>;
  extraData?: Record<string, any>;
  setExtraData: Dispatch<SetStateAction<Record<string, any> | undefined>>;
  fetchItems: { execute: (params?: Record<string, any>) => Promise<void>; isLoading: boolean };
  fetchItem: { execute: (params?: Record<string, any> | string | number) => Promise<T | undefined>; isLoading: boolean };
  createItem: { execute: (item: T) => Promise<T | undefined | null>; isLoading: boolean };
  updateItem: { execute: (item: T) => Promise<T | undefined | null>; isLoading: boolean };
  deleteItem: { execute: (item: T) => Promise<void>; isLoading: boolean };
}
```

```tsx
<CrudProvider<User>
  getPromise={(params) => apiClient.get({ url: "/api/users", params })}
  getItemPromise={(id) => apiClient.get({ url: `/api/users/${id}` })}
  postPromise={{ execute: (item) => apiClient.post({ url: "/api/users", body: item }), successMessage: "Usuario creado" }}
  putPromise={{ execute: (item) => apiClient.put({ url: `/api/users/${item.id}`, body: item }), successMessage: "Usuario actualizado" }}
  deletePromise={{ execute: (item) => apiClient.del({ url: `/api/users/${item.id}` }), successMessage: "Usuario eliminado" }}
  urlParams={["nombre", "estado"]}
  limit={20}
>
  <UserList />
</CrudProvider>

// In child components
const { list, isLoading, pagination, createItem, deleteItem } = useCrud<User>();
```

**Behaviors**: Auto-fetches when URL params change. Resets pagination on filter change. Shows snackbar on success/error.

### SnackbarProvider / useSnackbar

Manages toast notifications.

```typescript
interface SnackbarActionsType {
  showSnackbar: (
    message: string,
    variant?: SnackbarVariant,
    options?: { duration?: number; icon?: string; iconLabel?: string }
  ) => void;
  removeSnackbar: (id: string) => void;
}
```

```tsx
// App root
<SnackbarProvider>
  <SnackbarContainer position="bottom-right" maxSnackbars={3} />
  <App />
</SnackbarProvider>

// In components
const { showSnackbar } = useSnackbar();
showSnackbar("Guardado exitosamente", "success");
showSnackbar("Error de conexión", "danger", { duration: 5000 });
```

### AppLayoutProvider / useAppLayout

Combines ThemeProvider + SnackbarProvider + AppLayout into a single provider.

```typescript
interface AppLayoutProviderProps {
  children: ReactNode;
  initialTheme?: string | Theme;
  storageKey?: string;
  forceInitialTheme?: boolean;
  initialNavbar?: NavbarInterface;
  initialLeftDrawer?: LeftDrawerInterface;
  initialContentFooter?: ReactNode;
  className?: string;
}

interface AppLayoutContextType extends ThemeContextType {
  navbar: NavbarInterface | undefined;
  leftDrawer: LeftDrawerInterface | undefined;
  contentFooter: ReactNode | undefined;
  className: string;
  setNavbar: Dispatch<SetStateAction<NavbarInterface | undefined>>;
  setLeftDrawer: Dispatch<SetStateAction<LeftDrawerInterface | undefined>>;
  setContentFooter: (node: ReactNode | undefined) => void;
  setClassName: (className: string) => void;
  setNavBarLeftNode: (node: ReactNode | undefined) => void;
  setNavbarRightNode: (node: ReactNode | undefined) => void;
}
```

```tsx
<AppLayoutProvider
  initialTheme="light"
  initialNavbar={{ navBarLeftNode: <h1>Mi App</h1>, fullWidthNavbar: true }}
  initialLeftDrawer={{ contentNode: <nav>...</nav> }}
>
  <Routes />
</AppLayoutProvider>

// In pages - dynamically update layout
const { setNavBarLeftNode, setNavbarRightNode } = useAppLayout();
useEffect(() => {
  setNavBarLeftNode(<h1>Dashboard</h1>);
}, []);
```

---

## Hooks

### useThemeOverride

Applies granular CSS variable overrides without changing the entire theme.

```typescript
function useThemeOverride(options?: {
  scope?: "global" | "local";    // default: "global"
  element?: HTMLElement | null;
  prefix?: string;               // default: "flysoft"
}): {
  applyOverride: (overrides: Record<string, string | number>) => void;
  revertOverride: (keys: string[]) => void;
  revertAllOverrides: () => void;
  getCSSVariable: (key: string) => string | null;
  isOverrideApplied: (key: string) => boolean;
  appliedOverridesCount: number;
}
```

### useTemporaryOverride

Applies CSS variable overrides that auto-revert after a duration.

```typescript
function useTemporaryOverride(
  overrides: Record<string, string | number>,
  duration?: number,             // default: 3000
  options?: { scope?: "global" | "local"; element?: HTMLElement | null; prefix?: string }
): { applyTemporaryOverride: () => Function }
```

### useBreakpoint

Returns current viewport breakpoint and device type.

```typescript
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

function useBreakpoint(): {
  breakpoint: Breakpoint;
  windowSize: { width: number; height: number };
  isMobile: boolean;             // xs or sm
  isTablet: boolean;             // md
  isDesktop: boolean;            // lg, xl, or 2xl
}
```

### useElementScroll

Tracks scroll position and direction with requestAnimationFrame optimization.

```typescript
function useElementScroll(elementRef: React.RefObject<HTMLElement | null>): {
  scrollY: number;
  scrollDirection: "up" | "down" | null;
}
```

### useAsyncRequest

Manages async operations with loading state and snackbar notifications.

```typescript
interface AsyncRequestOptions {
  successMessage?: string;
  errorMessage?: string | ((error: any) => string);
  successVariant?: SnackbarVariant;  // default: "success"
  errorVariant?: SnackbarVariant;    // default: "danger"
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  onFinally?: () => void;
}

function useAsyncRequest(options?: AsyncRequestOptions): {
  isLoading: boolean;
  execute: <T>(requestFn: () => Promise<T>) => Promise<T | undefined>;
  setLoading: (loading: boolean) => void;
}
```

```tsx
const { execute, isLoading } = useAsyncRequest({
  successMessage: "Guardado exitosamente",
  errorMessage: (err) => getErrorMessage(err),
});
await execute(() => apiClient.post({ url: "/api/data", body: formData }));
```

### useEnum

Converts TypeScript enums to arrays for form select options.

```typescript
function useEnum(baseEnum: any): {
  getArray: () => Array<NameValueInterface<number>>;
  getInstance: (id: number) => NameValueInterface<number> | undefined;
}
```

### useGlobalThemeStyles

Applies theme colors to `<body>` and `<html>` for full-page theming. No return value.

```tsx
function useGlobalThemeStyles(): void;
```

---

## Services

### apiClient

Singleton HTTP client (Axios-based) with automatic Bearer token injection.

```typescript
// Main methods
apiClient.get<T>(options: { url: string; params?: Record<string, unknown>; headers?: Record<string, string> }): Promise<T>;
apiClient.post<T>(options: { url: string; body?: unknown; headers?: Record<string, string> }): Promise<T>;
apiClient.put<T>(options: { url: string; body?: unknown; headers?: Record<string, string> }): Promise<T>;
apiClient.del<T>(options: { url: string; headers?: Record<string, string> }): Promise<T>;

// File operations
apiClient.getFile(options): Promise<{ data: Blob; headers: any }>;
apiClient.getFileAsUrl(options): Promise<string>;
apiClient.openFile(options): Promise<void>;
apiClient.downloadFile(options): Promise<void>;
apiClient.uploadFile<T>(options: { url: string; files: FileList | File[]; headers?: { paramName?: string } }): Promise<T>;

// Token management
setApiClientTokenProvider(provider?: () => string | undefined): void;
clearApiClientTokenProvider(): void;

// Create isolated instances
createApiClient(config?: { baseURL?: string; timeout?: number; headers?: Record<string, string> }): ApiClientService;
```

```tsx
// Setup token globally
setApiClientTokenProvider(() => user?.token?.accessToken);

// API calls
const users = await apiClient.get<User[]>({ url: "/api/users", params: { page: 1 } });
await apiClient.post({ url: "/api/users", body: { name: "Juan" } });
await apiClient.downloadFile({ url: "/api/reports/pdf" });
await apiClient.uploadFile({ url: "/api/upload", files: fileInput.files });
```

---

## Helpers

| Function | Signature | Description |
|----------|-----------|-------------|
| `currencyFormat` | `(value: number) => string` | Formats as `"1.234,56"` (es-AR locale) |
| `getErrorMessage` | `(error: any) => string` | Extracts message from AxiosError. Default: `"Ha ocurrido un error"` |
| `getInitialLetters` | `(text: string) => string` | `"Juan Pérez"` → `"JP"` |
| `getQueryString` | `(params: URLSearchParams, newParams: any) => string` | Merges params, returns `"?key=value"` |
| `objectToQueryString` | `(source: any) => string` | Object to `"a=1&b=2"` (no leading `?`) |
| `queryStringToObject` | `(params: string) => Record<string, string>` | `"a=1&b=2"` → `{a: "1", b: "2"}` |
| `nameValueArrayToObject` | `<T>(arr: NameValueInterface<T>[]) => Record<string, T>` | Array of {name, value} to object |
| `promiseMapper` | `<T, K>(promise, mapper) => Promise<K \| K[] \| PaginationInterface<K>>` | Maps promise results (arrays, pagination, single) |
| `RegularExpressions` | Object | `.email`, `.dateString`, `.password(config)` regex patterns |

## Interfaces

```typescript
interface NameValueInterface<T> {
  name: string;
  value: T;
  extras?: any;
}

interface PaginationInterface<T> {
  list: Array<T>;
  limit: number;
  page: number;
  pages: number;
  total: number;
}
```

---

## Templates

### LoginForm

```typescript
interface LoginFormProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  loading?: boolean;
  error?: string;
  className?: string;
}
```

### RegistrationForm

```typescript
interface RegistrationFormProps {
  onSubmit?: (data: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string }) => void;
  loading?: boolean;
  error?: string;
  className?: string;
}
```

### ContactForm

```typescript
interface ContactFormProps {
  onSubmit?: (data: { name: string; email: string; subject: string; message: string }) => void;
  loading?: boolean;
  success?: boolean;
  error?: string;
  className?: string;
}
```

### DashboardLayout

```typescript
interface DashboardStat {
  title: string;
  value: string | number;
  change?: string;               // e.g. "+12%"
  changeType?: "positive" | "negative" | "neutral";
  icon?: string;
}

interface DashboardLayoutProps {
  title: string;                 // required
  subtitle?: string;
  stats?: DashboardStat[];
  actions?: React.ReactNode;
  children: React.ReactNode;     // required
  className?: string;
}
```

### SidebarLayout

```typescript
interface MenuItem {
  label: string;
  icon: string;
  href: string;
  badge?: string | number;
  children?: MenuItem[];
}

interface User {
  name: string;
  email?: string;
  avatar?: string;
}

interface SidebarLayoutProps {
  title: string;                 // required
  menuItems: MenuItem[];         // required
  user: User;                    // required
  children: React.ReactNode;     // required
  className?: string;
  onLogout?: () => void;
}
```

### FormPattern

```typescript
interface FormField {
  name: string;
  label: string;
  type?: string;                 // default: "text"
  placeholder?: string;
  icon?: string;
  required?: boolean;
  validation?: (value: string) => string | undefined;
  multiline?: boolean;
  rows?: number;                 // default: 4
}

interface FormPatternProps {
  title: string;                 // required
  subtitle?: string;
  fields: FormField[];           // required
  onSubmit: (data: Record<string, string>) => void;  // required
  submitText?: string;           // default: "Enviar"
  submitIcon?: string;           // default: "fa-paper-plane"
  loading?: boolean;
  error?: string;
  success?: boolean;
  className?: string;
  gridCols?: 1 | 2;             // default: 1
}
```
