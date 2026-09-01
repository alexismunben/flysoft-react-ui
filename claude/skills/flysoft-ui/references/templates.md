<!-- Generado desde los tipos de flysoft-react-ui@1.4.0. No editar a mano. -->
<!-- Regenerar con: npm run docs:skill -->

# Templates

Componentes de página pre-armados. Resuelven un caso completo; si necesitás desviarte del caso, componé con los de `layout` y `forms` en vez de peleárselo.

## LoginForm

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `onSubmit` | `(data: { email: string; password: string }) => void` |  | — |  |
| `loading` | `boolean` |  | `false` |  |
| `error` | `string` |  | — |  |
| `className` | `string` |  | `""` |  |
| `compact` | `boolean` |  | `false` |  |

## RegistrationForm

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `onSubmit` | `(data: { firstName: string; lastName: string; email: string; password: string; confirmPassword: string; }) => void` |  | — |  |
| `loading` | `boolean` |  | `false` |  |
| `error` | `string` |  | — |  |
| `className` | `string` |  | `""` |  |
| `compact` | `boolean` |  | `false` |  |

## ContactForm

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `onSubmit` | `(data: { name: string; email: string; subject: string; message: string; }) => void` |  | — |  |
| `loading` | `boolean` |  | `false` |  |
| `success` | `boolean` |  | `false` |  |
| `error` | `string` |  | — |  |
| `className` | `string` |  | `""` |  |
| `compact` | `boolean` |  | `false` |  |

## DashboardLayout

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `title` | `string` | **sí** | — |  |
| `subtitle` | `string` |  | — |  |
| `stats` | `DashboardStat[]` |  | `[]` |  |
| `actions` | `React.ReactNode` |  | — |  |
| `children` | `React.ReactNode` | **sí** | — |  |
| `className` | `string` |  | `""` |  |
| `compact` | `boolean` |  | `false` |  |

## SidebarLayout

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `title` | `string` | **sí** | — |  |
| `menuItems` | `MenuItem[]` | **sí** | — |  |
| `user` | `User` | **sí** | — |  |
| `children` | `React.ReactNode` | **sí** | — |  |
| `className` | `string` |  | `""` |  |
| `onLogout` | `() => void` |  | — |  |
| `compact` | `boolean` |  | `false` |  |

## FormPattern

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `title` | `string` | **sí** | — |  |
| `subtitle` | `string` |  | — |  |
| `fields` | `FormField[]` | **sí** | — |  |
| `onSubmit` | `(data: Record<string, string>) => void` | **sí** | — |  |
| `submitText` | `string` |  | `"Enviar"` |  |
| `submitIcon` | `string` |  | `"fa-paper-plane"` |  |
| `loading` | `boolean` |  | `false` |  |
| `error` | `string` |  | — |  |
| `success` | `boolean` |  | `false` |  |
| `className` | `string` |  | `""` |  |
| `gridCols` | `1 \| 2` |  | `1` |  |
| `compact` | `boolean` |  | `false` |  |

## ListPattern\<T\>

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `title` | `string` | **sí** | — | Título de la card |
| `subtitle` | `string` |  | — | Subtítulo opcional |
| `columns` | `DataTableColumn<T>[]` | **sí** | — | Columnas de la DataTable |
| `rows` | `T[]` | **sí** | — | Filas de datos |
| `addButtonText` | `string` |  | — | Texto del botón de agregar. Si no se pasa, no se muestra el botón |
| `addButtonIcon` | `string` |  | `"fa-plus"` | Icono del botón de agregar |
| `onAdd` | `() => void` |  | — | Callback al presionar el botón de agregar |
| `searchParamName` | `string` |  | — | Nombre del query parameter para el buscador. Si no se pasa, no se muestra el buscador |
| `searchLabel` | `string` |  | `"Buscar"` | Label del buscador |
| `filtersNode` | `React.ReactNode` |  | — | Nodo adicional para agregar filtros extra junto al buscador |
| `page` | `number` |  | — | Página actual (para el paginador) |
| `pages` | `number` |  | — | Total de páginas |
| `total` | `number` |  | — | Total de elementos |
| `pageParamName` | `string` |  | — | Nombre del query parameter para la página |
| `isLoading` | `boolean` |  | `false` | Indica si los datos están cargando |
| `loadingRows` | `number` |  | `10` | Cantidad de filas skeleton mientras carga |
| `maxRows` | `number` |  | — | Máximo de filas visibles antes de activar scroll |
| `compact` | `boolean` |  | `false` | Modo compacto: reduce paddings y usa size="sm" en componentes internos |
| `className` | `string` |  | `""` | Clases CSS adicionales para la Card |
| `headerActionsNode` | `React.ReactNode` |  | — | Nodo adicional en el header junto al botón de agregar |
| `locale` | `string` |  | — | Locale para formateo de números en la DataTable |
| `rowClassName` | `(row: T) => string` |  | — | Función para aplicar clases CSS a una fila |

## Tipos auxiliares

### `DashboardStat`

Template de Layout de Dashboard Ejemplo de uso: ```tsx import { DashboardLayout } from "flysoft-react-ui/templates/layouts/DashboardLayout"; function App() { return ( <DashboardLayout title="Mi Dashboard" stats={stats} actions={<Button>Nueva Acción</Button>} > <div>Contenido del dashboard</div> </DashboardLayout> ); } ```

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `title` | `string` | **sí** | — |  |
| `value` | `string \| number` | **sí** | — |  |
| `change` | `string` |  | — |  |
| `changeType` | `"positive" \| "negative" \| "neutral"` |  | — |  |
| `icon` | `string` |  | — |  |

### `FormField`

Template de Patrón de Formulario Reutilizable Este patrón proporciona una estructura base para cualquier formulario con validación, estados de carga y manejo de errores. Ejemplo de uso: ```tsx import { FormPattern } from "flysoft-react-ui/templates/patterns/FormPattern"; function MyForm() { const fields = [ { name: "name", label: "Nombre", type: "text", icon: "fa-user", required: true }, { name: "email", label: "Email", type: "email", icon: "fa-envelope", required: true }, ]; return ( <FormPattern title="Mi Formulario" fields={fields} onSubmit={handleSubmit} submitText="Guardar" /> ); } ```

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `name` | `string` | **sí** | — |  |
| `label` | `string` | **sí** | — |  |
| `type` | `string` |  | — |  |
| `placeholder` | `string` |  | — |  |
| `icon` | `string` |  | — |  |
| `required` | `boolean` |  | — |  |
| `validation` | `(value: string) => string \| undefined` |  | — |  |
| `multiline` | `boolean` |  | — |  |
| `rows` | `number` |  | — |  |

### `MenuItem`

Template de Layout con Sidebar Ejemplo de uso: ```tsx import { SidebarLayout } from "flysoft-react-ui/templates/layouts/SidebarLayout"; function App() { const menuItems = [ { label: "Dashboard", icon: "fa-home", href: "/" }, { label: "Usuarios", icon: "fa-users", href: "/users" }, ]; return ( <SidebarLayout title="Mi App" menuItems={menuItems} user={{ name: "Juan Pérez", avatar: "fa-user" }} > <div>Contenido principal</div> </SidebarLayout> ); } ```

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `label` | `string` | **sí** | — |  |
| `icon` | `string` | **sí** | — |  |
| `href` | `string` | **sí** | — |  |
| `badge` | `string \| number` |  | — |  |
| `children` | `MenuItem[]` |  | — |  |

### `User`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `name` | `string` | **sí** | — |  |
| `email` | `string` |  | — |  |
| `avatar` | `string` |  | — |  |
