<!-- Generado desde los tipos de flysoft-react-ui@1.4.2. No editar a mano. -->
<!-- Regenerar con: npm run docs:skill -->

# Componentes de display

Componentes de presentación de datos, estado y avatares.

## DataTable\<T\>

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `columns` | `DataTableColumn<T>[]` | **sí** | — |  |
| `fixedColumn` | `DataTableColumn<T>` |  | — |  |
| `rows` | `T[]` | **sí** | — |  |
| `className` | `string` |  | `""` |  |
| `maxRows` | `number` |  | — |  |
| `locale` | `string` |  | `"es-AR"` |  |
| `isLoading` | `boolean` |  | `false` |  |
| `loadingRows` | `number` |  | `5` |  |
| `rowClassName` | `(row: T) => string` |  | — | Función opcional para aplicar clases CSS a una fila específica basada en sus datos. |
| `headerClassName` | `string` |  | `""` |  |
| `footerClassName` | `string` |  | `""` |  |
| `headerCellClassName` | `string` |  | `""` |  |
| `footerCellClassName` | `string` |  | `""` |  |
| `cellClassName` | `string \| ((row: T, column: DataTableColumn<T>) => string)` |  | `""` |  |
| `compact` | `boolean` |  | `false` |  |

## DataField

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `label` | `string` |  | — |  |
| `value` | `string \| number \| React.ReactNode` |  | — |  |
| `inline` | `boolean` |  | `false` |  |
| `align` | `"left" \| "right" \| "center"` |  | `"left"` |  |
| `title` | `string` |  | — |  |
| `link` | `string` |  | — |  |
| `className` | `string` |  | `""` |  |
| `labelClassName` | `string` |  | `""` |  |
| `size` | `"sm" \| "md"` |  | `"md"` | Tamaño relativo a la densidad activa. - "md" (default): label = font-sm, value = font-base. - "sm": override local que baja un nivel — label = font-xs, value = font-sm. Útil para listas densas dentro de cards no-densas. |
| `gap` | `"tight" \| "sm" \| "md"` |  | `"md"` | Gap entre label y value en modo stack (no inline). - "tight": pegado, 0px (label sobre value sin separación). - "sm": gap chico — usa --flysoft-density-gap-sm. - "md" (default): usa --flysoft-density-gap-sm también pero respeta densidad. |
| `hideColon` | `boolean` |  | `false` | Si es true, oculta el ":" después del label en modo inline. Útil para campos donde el label ya es lo suficientemente claro por contexto. |

## Badge

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `React.ReactNode` | **sí** | — |  |
| `variant` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"` |  | `"primary"` |  |
| `size` | `"sm" \| "md" \| "lg"` |  | `"md"` |  |
| `rounded` | `boolean` |  | `false` |  |
| `className` | `string` |  | `""` |  |
| `icon` | `string` |  | — |  |
| `iconPosition` | `"left" \| "right"` |  | `"left"` |  |
| `iconLabel` | `string` |  | — |  |
| `bg` | `string` |  | — |  |
| `textColor` | `string` |  | — |  |
| `onClick` | `(event: React.MouseEvent<HTMLElement>) => void` |  | — |  |

## Avatar

Avatar component displays a circular avatar with initials or an image

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `text` | `string` | **sí** | — | Text to extract initials from The component will show the first letter of the first word and the first letter of the last word if there are multiple words |
| `image` | `string` |  | — | Optional image URL to display instead of initials |
| `bgColor` | `string` |  | `"gray-600"` | Optional background color (hexadecimal, rgb, or color name) Default: gray-600 (#4b5563) |
| `textColor` | `string` |  | `"white"` | Optional text color (hexadecimal, rgb, or color name) Default: white (#ffffff) |
| `size` | `"sm" \| "md" \| "lg"` |  | `"md"` | Optional size variant Default: md |
| `className` | `string` |  | `""` | Optional additional CSS classes |

```tsx
// Basic usage with text
<Avatar text="John Doe" />
```

```tsx
// With image
<Avatar text="John Doe" image="https://example.com/avatar.jpg" />
```

```tsx
// Custom colors
<Avatar text="Jane Smith" bgColor="#3b82f6" textColor="#ffffff" />
```

## RoadMap

RoadMap component displays a series of stages like metro stations

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `stages` | `RoadMapStage[]` | **sí** | — | Array of stages to display |
| `className` | `string` |  | `""` | Optional additional CSS classes |

```tsx
// Basic usage
<RoadMap stages={[
  { name: "Start", variant: "primary" },
  { name: "Middle", variant: "success" },
  { name: "End", variant: "info" }
]} />
```

```tsx
// With icons and descriptions
<RoadMap stages={[
  { name: "Planning", description: "Define requirements", icon: "fa-clipboard", variant: "primary" },
  { name: "Development", description: "Build the feature", icon: "fa-code", variant: "success" },
  { name: "Testing", description: "Test thoroughly", icon: "fa-check-circle", variant: "warning" }
]} />
```

## Loader

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `isLoading` | `boolean` |  | `false` |  |
| `text` | `string` |  | — |  |
| `children` | `React.ReactNode` |  | — |  |
| `keepContentWhileLoading` | `boolean` |  | — |  |
| `contentLoadingNode` | `React.ReactNode` |  | — |  |
| `overlayClassName` | `string` |  | — |  |

## Skeleton

Componente Skeleton para mostrar estados de carga. Consiste en un div con una animación de pulso y un fondo grisáceo por defecto.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `className` | `string` |  | — | Clases adicionales de Tailwind para personalizar el skeleton (medidas, bordes, etc.) La animación y el fondo base se mantendrán a menos que se sobreescriban explícitamente. |

## ThemeSwitcher

Sin props.

## Tipos auxiliares

### `DataTableColumn`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `align` | `"left" \| "right" \| "center"` |  | — |  |
| `width` | `string` |  | — |  |
| `header` | `string \| React.ReactNode` |  | — |  |
| `footer` | `string \| React.ReactNode` |  | — |  |
| `value` | `string \| number \| ((row: T) => string \| React.ReactNode)` |  | — |  |
| `tooltip` | `(row: T) => string \| React.ReactNode` |  | — |  |
| `type` | `"text" \| "numeric" \| "currency" \| "date"` |  | — |  |
| `actions` | `(row: T) => Array<React.ReactNode>` |  | — | Acciones para cada fila. Retorna un array de ReactNode que se mostrarán en un DropdownMenu. |
| `headerActions` | `() => Array<React.ReactNode>` |  | — | Acciones para el header de la columna. Retorna un array de ReactNode que se mostrarán en un DropdownMenu. |

### `RoadMapStage`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `name` | `string` | **sí** | — | Name of the stage |
| `description` | `string` |  | — | Optional description shown below the name |
| `icon` | `string` |  | — | Optional FontAwesome 5 icon class (e.g., "fa-check", "fa-user") |
| `disabled` | `boolean` |  | — | Whether the stage is disabled (shown with 0.5 opacity) |
| `variant` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"` |  | — | Color variant for the stage circle |
| `bg` | `string` |  | — | Custom background color (hexadecimal, rgb, or color name) Takes precedence over variant if provided |
