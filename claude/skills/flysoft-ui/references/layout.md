<!-- Generado desde los tipos de flysoft-react-ui@1.4.2. No editar a mano. -->
<!-- Regenerar con: npm run docs:skill -->

# Layout, overlay y navegación

Estructura de página, contenedores, modales, menús y filtros.

## AppLayout

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `navbar` | `NavbarInterface` |  | — |  |
| `leftDrawer` | `LeftDrawerInterface` |  | — |  |
| `contentFooter` | `React.ReactNode` |  | — |  |
| `children` | `React.ReactNode` | **sí** | — |  |
| `className` | `string` |  | `""` |  |
| `isLeftDrawerOpen` | `boolean` |  | — | Estado controlado del drawer móvil. Si se define, el AppLayout deja de manejar el estado internamente y hay que actualizarlo desde `onLeftDrawerOpenChange`. |
| `onLeftDrawerOpenChange` | `(isOpen: boolean) => void` |  | — | Se dispara cada vez que el drawer móvil debe abrirse o cerrarse |

## Card

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `title` | `string \| React.ReactNode` |  | — |  |
| `subtitle` | `string \| React.ReactNode` |  | — |  |
| `children` | `React.ReactNode` |  | — |  |
| `className` | `string` |  | `""` |  |
| `headerActions` | `React.ReactNode` |  | — | Acciones para el header de la tarjeta. Se muestra directamente el ReactNode proporcionado. |
| `footer` | `React.ReactNode` |  | — |  |
| `variant` | `"default" \| "elevated" \| "outlined"` |  | `"default"` |  |
| `alwaysDisplayHeaderActions` | `boolean` |  | `false` | Si es true, las headerActions siempre se muestran. Si es false, solo se muestran al hacer hover (en pantallas grandes). En resoluciones md e inferiores, siempre se muestran sin importar este valor. |
| `headerClassName` | `string` |  | `""` |  |
| `contentClassName` | `string` |  | `""` |  |
| `footerClassName` | `string` |  | `""` |  |
| `compact` | `boolean` |  | `false` | Override local de densidad: cuando es true, fuerza el preset "compact" para los paddings, gaps y tipografía DE ESTA CARD (y sus hijos que consuman las variables --flysoft-density-*), independientemente de la densidad global del ThemeProvider. |

## Collection

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `React.ReactNode` | **sí** | — |  |
| `gap` | `"tight" \| "sm" \| "md" \| "lg" \| string  (CollectionGap)` |  | `"md"` | Tamaño del gap entre items. Acepta presets semánticos que respetan la densidad activa o cualquier valor CSS arbitrario (p. ej. "0.5rem", "8px"). - "tight" → 0 - "sm" → var(--flysoft-density-gap-sm) - "md" → var(--flysoft-density-gap-md) (default) - "lg" → var(--flysoft-density-gap-lg) |
| `direction` | `"column" \| "row"` |  | `"column"` |  |
| `wrap` | `boolean` |  | `false` |  |
| `className` | `string` |  | `""` |  |
| `density` | `"comfortable" \| "compact" \| "dense"  (Density)` |  | — | Override local de densidad: redefine las variables CSS --flysoft-density-* para esta Collection y sus descendientes. Útil para crear secciones densas dentro de un layout con densidad global "comfortable". |

## Accordion

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `title` | `string \| React.ReactNode` | **sí** | — |  |
| `children` | `React.ReactNode` | **sí** | — |  |
| `icon` | `string` |  | — |  |
| `rightNode` | `React.ReactNode` |  | — |  |
| `defaultOpen` | `boolean` |  | `false` |  |
| `className` | `string` |  | `""` |  |
| `headerClassName` | `string` |  | `""` | Clases adicionales para el header (el botón que despliega/colapsa el acordeón). |
| `contentClassName` | `string` |  | `""` | Clases adicionales para el contenedor del contenido (children). |
| `variant` | `"default" \| "elevated" \| "outlined"` |  | `"default"` |  |
| `onToggle` | `(isOpen: boolean) => void` |  | — |  |
| `compact` | `boolean` |  | `false` |  |

## TabsGroup

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `React.ReactNode` |  | — |  |
| `tabs` | `Tab[]` | **sí** | — |  |
| `paramName` | `string` |  | — |  |
| `headerNode` | `React.ReactNode` |  | — |  |
| `onChangeTab` | `(selectedTab: string) => void` |  | — |  |
| `compact` | `boolean` |  | `false` |  |

## TabPanel

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `React.ReactNode` |  | — |  |
| `tabId` | `string \| number` | **sí** | — |  |

## Menu\<T\>

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `options` | `T[]` | **sí** | — |  |
| `onOptionSelected` | `(item: T) => void` | **sí** | — |  |
| `getOptionLabel` | `(item: T) => string` |  | — | Obtiene el label que se muestra para cada opción. Por defecto usa la propiedad "label". |
| `renderOption` | `(item: T) => React.ReactNode` |  | — | Renderizado personalizado de cada opción. Si se define, se ignora el render por defecto. |
| `className` | `string` |  | — | Clases adicionales para el contenedor del menú. Permite sobreescribir los estilos por defecto. |
| `style` | `React.CSSProperties` |  | — | Estilos adicionales para el contenedor del menú. |
| `itemClassName` | `string` |  | — | Clases adicionales para cada opción del menú. |
| `compact` | `boolean` |  | `false` |  |

## DropdownMenu\<T\>

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `options` | `T[]` | **sí** | — |  |
| `onOptionSelected` | `(item: T) => void` | **sí** | — |  |
| `renderNode` | `React.ReactNode` |  | — |  |
| `getOptionLabel` | `(item: T) => string` |  | — | Obtiene el label que se muestra para cada opción. Por defecto usa la propiedad "label". |
| `renderOption` | `(item: T) => React.ReactNode` |  | — | Renderizado personalizado de cada opción. Si se define, se ignora el render por defecto. |
| `replaceOnSingleOption` | `boolean` |  | `false` | Si es true y hay una sola opción, muestra directamente la opción en lugar del trigger. Por defecto es false. |
| `openOnHover` | `boolean` |  | `false` | Si es true, el menú se abre al pasar el mouse por encima. Por defecto es false. |
| `compact` | `boolean` |  | `false` |  |

## DropdownPanel

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `renderNode` | `React.ReactNode` |  | — |  |
| `children` | `React.ReactNode` | **sí** | — |  |
| `openOnHover` | `boolean` |  | `false` | Si es true, el panel se abre al pasar el mouse por encima. Por defecto es false. |
| `compact` | `boolean` |  | `false` |  |

## Filter

**Props base** (comunes a todas las variantes):

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `paramName` | `string` |  | — |  |
| `label` | `string` |  | — |  |
| `staticOptions` | `StaticOption[]` |  | — |  |
| `inputWidth` | `string` |  | — |  |
| `value` | `string` |  | — |  |
| `onChange` | `(value: string \| undefined) => void` |  | — |  |
| `hideEmpty` | `boolean` |  | — | Si es true, el componente solo se renderiza si tiene un valor o existe el queryParam asociado con un valor. Por defecto es false. |
| `disabled` | `boolean` |  | — | Si es true, el componente se muestra con opacidad y no permite interacciones. Si el panel está abierto, se cerrará automáticamente. |
| `compact` | `boolean` |  | — |  |
| `bgColor` | `string` |  | — | Color de fondo del filtro (badge e input interno). Útil cuando el filtro se coloca sobre una superficie del mismo color que el fondo por defecto (por ej. dentro de una Card blanca). Acepta cualquier valor CSS de color o una variable del tema, p. ej. `"#f5f5f5"` o `"var(--color-bg-secondary)"`. El panel flotante mantiene el fondo por defecto (es un popover). |

Después, según `filterType` — la unión es discriminada, así que el tipo exige las props de su variante:

**`filterType: "text"`**

Sólo las props base.

**`filterType: "number"`**

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `min` | `number` |  | — |  |
| `max` | `number` |  | — |  |

**`filterType: "date"`**

Sólo las props base.

**`filterType: "autocomplete"`**

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `options` | `T[]` | **sí** | — |  |
| `getOptionLabel` | `(item: T) => string` |  | — |  |
| `getOptionValue` | `(item: T) => K` |  | — |  |
| `renderOption` | `(item: T) => React.ReactNode` |  | — |  |
| `noResultsText` | `string` |  | — |  |
| `multiple` | `boolean` |  | — |  |

**`filterType: "search"`**

Sólo las props base.

**`filterType: "searchSelect"`**

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `onSearchPromiseFn` | `(text: string) => Promise<Array<T> \| PaginationInterface<T>>` | **sí** | — |  |
| `onSingleSearchPromiseFn` | `(value: K) => Promise<T \| undefined>` | **sí** | — |  |
| `getOptionLabel` | `(item: T) => string` |  | — |  |
| `getOptionValue` | `(item: T) => K` |  | — |  |
| `renderOption` | `(item: T) => React.ReactNode` |  | — |  |
| `dialogTitle` | `string` |  | — |  |
| `noResultsText` | `string` |  | — |  |

## FiltersDialog

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `filters` | `FilterConfig[]` | **sí** | — |  |

## Dialog

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `isOpen` | `boolean` | **sí** | — |  |
| `title` | `React.ReactNode` | **sí** | — |  |
| `children` | `React.ReactNode` | **sí** | — |  |
| `footer` | `React.ReactNode` |  | — |  |
| `onClose` | `() => void` |  | — |  |
| `closeOnOverlayClick` | `boolean` |  | `false` |  |
| `compact` | `boolean` |  | `false` |  |
| `bodyWidth` | `string \| number` |  | — |  |

## Snackbar

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `id` | `string` | **sí** | — |  |
| `message` | `string` | **sí** | — |  |
| `variant` | `\| "primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"  (SnackbarVariant)` | **sí** | — |  |
| `duration` | `number` |  | `3000` |  |
| `icon` | `string` |  | — |  |
| `iconLabel` | `string` |  | — |  |
| `onClose` | `(id: string) => void` | **sí** | — |  |

## SnackbarContainer

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `position` | `\| "top-right" \| "top-left" \| "bottom-right" \| "bottom-left" \| "top-center" \| "bottom-center"` |  | `"top-right"` |  |
| `maxSnackbars` | `number` |  | `5` |  |

## Tipos auxiliares

### `FilterConfig`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `filterType` | `FilterProps["filterType"]` | **sí** | — |  |
| `paramName` | `string` | **sí** | — |  |
| `label` | `string` |  | — |  |
| `staticOptions` | `FilterProps["staticOptions"]` |  | — |  |
| `inputWidth` | `string` |  | — |  |
| `min` | `number` |  | — |  |
| `max` | `number` |  | — |  |
| `options` | `any[]` |  | — |  |
| `getOptionLabel` | `(item: any) => string` |  | — |  |
| `getOptionValue` | `(item: any) => any` |  | — |  |
| `renderOption` | `(item: any) => React.ReactNode` |  | — |  |
| `noResultsText` | `string` |  | — |  |

### `LeftDrawerInterface`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `headerNode` | `ReactNode` |  | — |  |
| `contentNode` | `ReactNode` |  | — |  |
| `footerNode` | `ReactNode` |  | — |  |
| `className` | `string` |  | — | Clases del contenedor del drawer (header, contenido y footer). |
| `width` | `string` |  | `"16rem"` | Ancho del drawer. Pisa cualquier clase de ancho que venga en `className`. Si no se pasa, el drawer usa la clase `w-64`. |

### `NavbarInterface`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `navBarLeftNode` | `string \| ReactNode` |  | — |  |
| `navBarRightNode` | `string \| ReactNode` |  | — |  |
| `fullWidthNavbar` | `boolean` | **sí** | — |  |
| `height` | `string` |  | `"64px"` | Altura del navbar. |
| `className` | `string` |  | — | Clases del contenedor del navbar (incluye el botón). |

### `Tab`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `id` | `string \| number` | **sí** | — |  |
| `label` | `string` | **sí** | — |  |
