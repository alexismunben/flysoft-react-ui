# Flysoft React UI - AI Rules for Consumer Projects

> **Copia este archivo** en tu proyecto como `.cursorrules`, `CLAUDE.md`, `.github/copilot-instructions.md`, o el sistema de instrucciones de tu AI favorita.

Este proyecto usa `flysoft-react-ui` como librería de UI principal. **SIEMPRE** priorizar los componentes de esta librería antes de crear componentes personalizados.

## Reglas Fundamentales

1. **Importar siempre desde `'flysoft-react-ui'`** (top-level). Nunca desde rutas internas.
2. **Nunca crear** componentes que ya existen (Button, Input, Card, Badge, Dialog, etc.).
3. **Usar tipos TypeScript** exportados (`ButtonProps`, `DataTableColumn<T>`, etc.).
4. **Estilos en el root** solamente: `import 'flysoft-react-ui/styles';`
5. **Envolver la app** con `ThemeProvider` o `AppLayoutProvider`.
6. **FontAwesome 5 únicamente** para íconos (`fa-*`). Se normalizan automáticamente al estilo light.
7. **Variables CSS del tema** para estilos personalizados: `var(--color-primary)`, `var(--color-bg-default)`, etc.

---

## Referencia Completa de Componentes

### Button

Botón con variantes, colores, íconos y efecto ripple.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `"primary" \| "outline" \| "ghost"` | `"primary"` | Estilo visual |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"` | `"primary"` | Color semántico |
| `bg` | `string` | — | Color de fondo personalizado (hex, rgb) |
| `textColor` | `string` | — | Color de texto personalizado |
| `icon` | `string` | — | Clase FontAwesome (`"fa-save"`) |
| `iconPosition` | `"left" \| "right"` | `"left"` | Posición del ícono |
| `loading` | `boolean` | `false` | Muestra spinner y deshabilita |

Extiende todos los atributos nativos de `<button>`.

```tsx
<Button variant="primary" icon="fa-save" loading={saving} onClick={save}>Guardar</Button>
<Button variant="outline" color="danger" icon="fa-trash">Eliminar</Button>
<Button variant="ghost" size="sm">Cancelar</Button>
```

### LinkButton

Igual que Button pero renderiza como enlace. Usa React Router `<Link>` para rutas internas y `<a>` para URLs externas.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `to` | `string` | — | **Requerido**. Ruta o URL |
| `target` | `string` | — | Target del enlace |

Hereda: `variant`, `size`, `color`, `bg`, `textColor`, `icon`, `iconPosition`.

```tsx
<LinkButton to="/users" icon="fa-users">Usuarios</LinkButton>
<LinkButton to="https://example.com" target="_blank">Sitio externo</LinkButton>
```

### Input

Campo de entrada con label, ícono, error y soporte de ref forwarding.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto de la etiqueta |
| `error` | `string` | — | Mensaje de error (muestra borde rojo) |
| `icon` | `string` | — | Clase FontAwesome |
| `iconPosition` | `"left" \| "right"` | `"left"` | Posición del ícono |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño |
| `onIconClick` | `(event) => void` | — | Hace el ícono clickeable |
| `readOnly` | `boolean` | `false` | Solo lectura sin apariencia disabled |

Extiende atributos nativos de `<input>` (excepto `size`).

```tsx
<Input label="Email" type="email" icon="fa-envelope" placeholder="usuario@mail.com" />
<Input label="Búsqueda" icon="fa-search" iconPosition="right" onIconClick={buscar} />
<Input label="Nombre" error="Campo requerido" />
```

### AutocompleteInput\<T, K\>

Dropdown con búsqueda, selección simple o múltiple.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `options` | `T[]` | — | **Requerido**. Array de opciones |
| `value` | `string \| string[]` | — | Valor actual (string para simple, array para múltiple) |
| `onChange` | `(value) => void` | — | Callback al cambiar |
| `multiple` | `boolean` | `false` | Selección múltiple con checkboxes |
| `getOptionLabel` | `(item: T) => string` | `item.label` | Extraer texto de opción |
| `getOptionValue` | `(item: T) => K` | `item.value` | Extraer valor de opción |
| `getOptionDescription` | `(item: T) => string` | `item.description` | Extraer descripción |
| `renderOption` | `(item: T) => ReactNode` | — | Render personalizado |
| `onSelectOption` | `(option: T, value: K) => void` | — | Callback al seleccionar |
| `noResultsText` | `string` | `"Sin resultados"` | Texto sin resultados |

Hereda todas las props de `Input` excepto `onChange`, `value`, `ref`.

```tsx
<AutocompleteInput
  label="País"
  options={[{ label: "Argentina", value: "AR" }, { label: "Brasil", value: "BR" }]}
  value={country}
  onChange={setCountry}
/>

<AutocompleteInput<User, number>
  label="Usuario"
  options={users}
  multiple
  getOptionLabel={(u) => u.fullName}
  getOptionValue={(u) => u.id}
/>
```

**Tipo auxiliar**: `AutocompleteOption { label: string; value: string; description?: string; icon?: string }`

### SearchSelectInput\<T, K\>

Selección con búsqueda asíncrona en dialog modal. Ideal para datasets grandes.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `onSearchPromiseFn` | `(text: string) => Promise<T[] \| PaginationInterface<T>>` | — | **Requerido**. Función de búsqueda async |
| `onSingleSearchPromiseFn` | `(value: K) => Promise<T \| undefined>` | — | **Requerido**. Cargar opción individual por valor |
| `value` | `T \| K \| string` | — | Valor actual |
| `onChange` | `(value) => void` | — | Callback al cambiar |
| `dialogTitle` | `string` | `"Seleccione una opción"` | Título del diálogo |
| `getOptionLabel` | `(item: T) => string` | `item.label` | Extraer texto |
| `getOptionValue` | `(item: T) => K` | `item.value` | Extraer valor |
| `onSelectOption` | `(option: T, value: K) => void` | — | Callback al seleccionar |

Hereda props de `Input` excepto `onChange`, `value`, `ref`.

```tsx
<SearchSelectInput<Product, number>
  label="Producto"
  onSearchPromiseFn={(text) => apiClient.get({ url: `/api/products?q=${text}` })}
  onSingleSearchPromiseFn={(id) => apiClient.get({ url: `/api/products/${id}` })}
  getOptionLabel={(p) => p.name}
  getOptionValue={(p) => p.id}
  onChange={setProductId}
/>
```

**Tipo auxiliar**: `SearchSelectOption { label: string; value?: string; description?: string; icon?: string }`

### DateInput

Input con DatePicker dropdown integrado. Acepta texto manual y objetos Dayjs.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `Dayjs \| null \| string` | — | Fecha actual |
| `onChange` | `(date: Dayjs \| null) => void` | — | Callback al cambiar |
| `format` | `"dd/mm/yyyy" \| "mm/dd/yyyy"` | `"dd/mm/yyyy"` | Formato de visualización |
| `datePickerProps` | `Partial<DatePickerProps>` | — | Props adicionales para DatePicker |

```tsx
<DateInput label="Fecha de nacimiento" value={birthDate} onChange={setBirthDate} />
```

### DatePicker

Calendario standalone para selección de fechas.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `Dayjs \| null` | — | Fecha seleccionada |
| `onChange` | `(date: Dayjs) => void` | — | Callback al seleccionar |
| `startWeekOn` | `"monday" \| "sunday"` | `"sunday"` | Día de inicio de semana |
| `initialViewDate` | `Dayjs` | — | Mes/año inicial cuando value es null |

### Checkbox

Checkbox con label y error. Soporta ref forwarding.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Texto del label |
| `labelPosition` | `"left" \| "right"` | `"right"` | Posición del label |
| `error` | `string` | — | Mensaje de error |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño |
| `readOnly` | `boolean` | `false` | Solo lectura |

```tsx
<Checkbox label="Acepto los términos" checked={accepted} onChange={handleChange} />
```

### RadioButtonGroup

Selección única de un grupo de opciones.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `options` | `RadioOption[]` | — | **Requerido**. `{label, value, disabled?}[]` |
| `value` | `string \| number` | — | Valor seleccionado |
| `onChange` | `(value) => void` | — | Callback al cambiar |
| `direction` | `"vertical" \| "horizontal"` | `"vertical"` | Dirección del layout |
| `gap` | `"sm" \| "md" \| "lg"` | `"md"` | Espaciado entre opciones |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Tamaño |
| `error` | `string` | — | Mensaje de error |
| `disabled` | `boolean` | `false` | Deshabilitar grupo completo |

```tsx
<RadioButtonGroup
  options={[{ label: "Activo", value: 1 }, { label: "Inactivo", value: 0 }]}
  value={status}
  onChange={setStatus}
  direction="horizontal"
/>
```

### CurrencyInput

Input numérico con formato de moneda (locale es-AR: 1.234,56). Ref forwarding.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `value` | `number \| null` | — | Valor numérico |
| `onChange` | `(value: number) => void` | — | Callback con valor numérico |

Hereda props de `Input` excepto `value`, `onChange`, `type`.

```tsx
<CurrencyInput label="Monto" value={amount} onChange={setAmount} icon="fa-dollar-sign" />
```

### Pagination

Controles de paginación basados en URL (react-router-dom).

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `page` | `number` | `1` | Página actual |
| `pages` | `number` | `1` | Total de páginas |
| `total` | `number` | `0` | Total de registros |
| `isLoading` | `boolean` | `false` | Estado de carga |
| `fieldName` | `string` | `"pagina"` | Nombre del parámetro URL |

---

### Card

Contenedor con header, contenido, footer y variantes.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string \| ReactNode` | — | Título del card |
| `subtitle` | `string \| ReactNode` | — | Subtítulo |
| `headerActions` | `ReactNode` | — | Acciones en el header (botones, etc.) |
| `footer` | `ReactNode` | — | Contenido del footer |
| `variant` | `"default" \| "elevated" \| "outlined"` | `"default"` | Estilo visual |
| `compact` | `boolean` | `false` | Override local de densidad: fuerza preset compact en `--flysoft-density-*` para esta Card y descendientes |
| `alwaysDisplayHeaderActions` | `boolean` | `false` | Mostrar siempre (no solo en hover) |
| `headerClassName` | `string` | — | Clases CSS del header |
| `contentClassName` | `string` | — | Clases CSS del contenido |
| `footerClassName` | `string` | — | Clases CSS del footer |

```tsx
<Card title="Usuarios" headerActions={<Button size="sm" icon="fa-plus">Nuevo</Button>}>
  <DataTable ... />
</Card>
```

### DataTable\<T\>

Tabla de datos con formateo automático, acciones por fila y loading skeleton.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `columns` | `DataTableColumn<T>[]` | — | **Requerido**. Definición de columnas |
| `rows` | `T[]` | — | **Requerido**. Datos |
| `isLoading` | `boolean` | `false` | Muestra skeleton rows |
| `loadingRows` | `number` | `5` | Cantidad de skeleton rows |
| `maxRows` | `number` | — | Activa scroll con header sticky |
| `compact` | `boolean` | `false` | Override local de densidad: fuerza preset compact en `--flysoft-density-*` dentro de la tabla y los DropdownMenu de acciones |
| `locale` | `string` | `"es-AR"` | Locale para formateo de números |
| `rowClassName` | `(row: T) => string` | — | Clases CSS por fila |

**DataTableColumn\<T\>:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `header` | `string \| ReactNode` | Encabezado de columna |
| `value` | `string \| number \| (row: T) => ReactNode` | Accessor o función |
| `type` | `"text" \| "numeric" \| "currency" \| "date"` | Tipo para formateo automático |
| `width` | `string` | Ancho CSS |
| `align` | `"left" \| "right" \| "center"` | Alineación (auto para currency/numeric/date) |
| `actions` | `(row: T) => ReactNode[]` | Botones de acción por fila |
| `headerActions` | `() => ReactNode[]` | Acciones en el encabezado |
| `footer` | `string \| ReactNode` | Contenido del pie de columna |
| `tooltip` | `(row: T) => ReactNode` | Tooltip al hacer hover |

**Formateo automático por type**: `currency` → separador de miles, sin símbolo. `numeric` → formateo locale. `date` → DD/MM/YYYY.

```tsx
const columns: DataTableColumn<User>[] = [
  { header: "Nombre", value: "name" },
  { header: "Salario", value: "salary", type: "currency" },
  { header: "Fecha", value: "createdAt", type: "date" },
  { actions: (row) => [
    <Button key="e" variant="ghost" size="sm" icon="fa-edit" onClick={() => edit(row)}>Editar</Button>,
    <Button key="d" variant="ghost" size="sm" icon="fa-trash" color="danger" onClick={() => del(row)}>Eliminar</Button>,
  ]},
];
<DataTable<User> columns={columns} rows={users} isLoading={loading} />
```

### TabsGroup / TabPanel

Interfaz de pestañas con persistencia URL opcional.

| Prop (TabsGroup) | Tipo | Descripción |
|------|------|-------------|
| `tabs` | `{id: string\|number, label: string}[]` | **Requerido**. Pestañas |
| `paramName` | `string` | Parámetro URL para persistencia |
| `headerNode` | `ReactNode` | Contenido extra en el header |
| `onChangeTab` | `(tab: string) => void` | Callback al cambiar |

| Prop (TabPanel) | Tipo | Descripción |
|------|------|-------------|
| `tabId` | `string \| number` | **Requerido**. Debe coincidir con un `Tab.id` |

```tsx
<TabsGroup tabs={[{ id: "info", label: "Info" }, { id: "history", label: "Historial" }]}>
  <TabPanel tabId="info"><p>Info</p></TabPanel>
  <TabPanel tabId="history"><p>Historial</p></TabPanel>
</TabsGroup>
```

### Accordion

Sección colapsable con animación suave.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `title` | `string \| ReactNode` | — | **Requerido** |
| `icon` | `string` | — | Ícono FontAwesome |
| `rightNode` | `ReactNode` | — | Contenido a la derecha del título |
| `defaultOpen` | `boolean` | `false` | Abierto inicialmente |
| `variant` | `"default" \| "elevated" \| "outlined"` | `"default"` | Estilo visual |
| `onToggle` | `(isOpen: boolean) => void` | — | Callback al abrir/cerrar |

### AppLayout

Layout principal con navbar responsive y sidebar drawer.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `navbar` | `NavbarInterface` | Configuración del navbar |
| `leftDrawer` | `LeftDrawerInterface` | Configuración del sidebar |
| `children` | `ReactNode` | **Requerido**. Contenido principal |
| `contentFooter` | `ReactNode` | Footer del área de contenido |

**NavbarInterface**: `{ navBarLeftNode?, navBarRightNode?, fullWidthNavbar?, height? ("64px"), className? }`
**LeftDrawerInterface**: `{ headerNode?, contentNode?, footerNode?, className?, width? ("256px") }`

### Collection

Wrapper flex con gap semántico ligado a densidad.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `gap` | `"tight" \| "sm" \| "md" \| "lg" \| string` | `"md"` | Presets leen `--flysoft-density-gap-*`; string acepta valor CSS arbitrario |
| `direction` | `"column" \| "row"` | `"column"` | Dirección del flex |
| `wrap` | `boolean` | `false` | Habilita wrap |
| `density` | `"comfortable" \| "compact" \| "dense"` | — | Override local: redefine `--flysoft-density-*` para esta Collection y descendientes |

```tsx
<Collection direction="row" wrap gap="sm">
  <Badge>Activo</Badge><Badge color="info">Verificado</Badge>
</Collection>

// Sección densa dentro de layout cómodo
<Collection density="dense">
  <DataField label="CUIL" value="..." />
  <DataField label="Edad" value={59} />
</Collection>
```

### DataField

Campo label + value, density-aware.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `label` | `string` | — | Etiqueta |
| `value` | `string \| number \| ReactNode` | — | Valor a mostrar |
| `inline` | `boolean` | `false` | Label y value en la misma línea |
| `size` | `"sm" \| "md"` | `"md"` | `sm` baja un nivel completo de tipografía |
| `gap` | `"tight" \| "sm" \| "md"` | `"md"` | Separación label/value en modo stack |
| `hideColon` | `boolean` | `false` | Oculta `:` después del label en inline |
| `align` | `"left" \| "right" \| "center"` | `"left"` | Alineación |
| `title` | `string` | — | Tooltip |
| `link` | `string` | — | URL; agrega botón con flecha |

```tsx
<DataField label="Nombre" value="Juan Pérez" />
<DataField label="CUIL" value="20-17990271-1" size="sm" />
<DataField label="Estado" value="Activo" inline hideColon />
```

### Menu, DropdownMenu, DropdownPanel

Ver sección correspondiente en `AI_CONTEXT.md` para props completos.

### Filter

Componente de filtrado versátil con múltiples tipos.

| filterType | Props adicionales |
|------------|-------------------|
| `"text"` | (base) |
| `"number"` | `min?`, `max?` |
| `"date"` | (base) |
| `"autocomplete"` | `options`, `getOptionLabel?`, `getOptionValue?`, `multiple?` |
| `"search"` | (base) |
| `"searchSelect"` | `onSearchPromiseFn`, `onSingleSearchPromiseFn`, `dialogTitle?` |

**Props base**: `paramName?` (sync URL), `label?`, `value?`, `onChange?`, `hideEmpty?`, `disabled?`, `compact?`, `staticOptions?`, `inputWidth?`, `bgColor?`

> `bgColor?: string` — color de fondo del badge e input del filtro (no del panel flotante). Útil cuando el filtro va sobre una superficie del mismo color que el fondo por defecto (ej. dentro de una `Card` blanca). Acepta cualquier color CSS o variable del tema: `bgColor="var(--color-bg-secondary)"` o `bgColor="#f5f5f5"`.
>
> **Cambiar el fondo de los form-controls** (Input, CurrencyInput, DateInput, AutocompleteInput, SearchSelectInput, etc.): pasales un `className` con un `bg-*`; combinan clases con `twMerge`, así que pisa el fondo por defecto de forma confiable. Ej: `<Input className="bg-[var(--color-bg-secondary)]" />`.

---

### Dialog

Ventana modal con overlay, escape-to-close y scroll lock.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `isOpen` | `boolean` | — | **Requerido** |
| `title` | `ReactNode` | — | **Requerido** |
| `children` | `ReactNode` | — | **Requerido** |
| `footer` | `ReactNode` | — | Botones del footer |
| `onClose` | `() => void` | — | Callback para cerrar |
| `closeOnOverlayClick` | `boolean` | `false` | Cerrar al clickear overlay |
| `compact` | `boolean` | `false` | Override local de densidad: fuerza preset compact en `--flysoft-density-*` dentro del Dialog |
| `bodyWidth` | `string \| number` | — | Ancho personalizado (ej: `"800px"`, `"80vw"`, `600`). Si no se especifica usa `max-w-lg` |

```tsx
<Dialog isOpen={show} title="Confirmar" onClose={() => setShow(false)}
  footer={<>
    <Button variant="ghost" onClick={() => setShow(false)}>Cancelar</Button>
    <Button color="danger" onClick={handleDelete}>Eliminar</Button>
  </>}
>
  <p>¿Está seguro?</p>
</Dialog>
```

### Badge

Etiqueta de estado/categoría.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `variant` | `"primary"\|"secondary"\|"success"\|"warning"\|"danger"\|"info"` | `"primary"` | Color |
| `size` | `"sm"\|"md"\|"lg"` | `"md"` | Tamaño |
| `rounded` | `boolean` | `false` | Bordes completamente redondos |
| `icon` | `string` | — | Ícono FontAwesome |
| `bg` | `string` | — | Color de fondo personalizado |
| `textColor` | `string` | — | Color de texto personalizado |
| `onClick` | `(event) => void` | — | Handler de click |

```tsx
<Badge variant="success" icon="fa-check">Activo</Badge>
<Badge variant="danger" rounded>3</Badge>
```

### Avatar

Imagen de perfil con fallback a iniciales.

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `text` | `string` | — | **Requerido**. Nombre para iniciales |
| `image` | `string` | — | URL de imagen |
| `size` | `"sm"\|"md"\|"lg"` | `"md"` | sm=32px, md=40px, lg=48px |
| `bgColor` | `string` | `"#4b5563"` | Color de fondo |
| `textColor` | `string` | `"#ffffff"` | Color de texto |

### RoadMap

Visualización de etapas/progreso con círculos conectados.

| Prop | Tipo | Descripción |
|------|------|-------------|
| `stages` | `RoadMapStage[]` | **Requerido** |

**RoadMapStage**: `{ name, description?, icon?, variant?, bg?, disabled? }`

### Loader, Skeleton, FiltersDialog, Snackbar/SnackbarContainer, ThemeSwitcher

Ver sección correspondiente en `AI_CONTEXT.md` para props completos.

---

## Contexts & Hooks

### ThemeProvider + useTheme()

```tsx
// Densidad por defecto (comfortable)
<ThemeProvider initialTheme="light">{/* app */}</ThemeProvider>

// Apps con mucha información en pantalla (CRUDs, dashboards)
<ThemeProvider initialTheme="light" density="dense">{/* app */}</ThemeProvider>

const {
  theme, setTheme, isDark, currentThemeName, availableThemes, resetToDefault,
  density, setDensity,
} = useTheme();
```

Temas disponibles: `"light"`, `"dark"`, `"blue"`, `"green"`.
Densidades disponibles: `"comfortable"` (default), `"compact"`, `"dense"`.

La densidad ajusta padding, gaps, tipografía y alturas de controles globalmente
vía variables CSS `--flysoft-density-*`. Los props locales `compact` y `size`
siguen funcionando como override.

**Componentes density-aware** (consumen `--flysoft-density-*` automáticamente):
**Toda la librería**. Card, DataField, Collection, Button, LinkButton, Input,
AutocompleteInput, SearchSelectInput, DateInput, CurrencyInput, DatePicker,
DataTable, Dialog, Filter (incluye los paneles flotantes que se abren al
hacer click), FiltersDialog, Accordion, Menu, DropdownMenu, DropdownPanel,
TabsGroup, Badge, Checkbox, RadioButtonGroup, Pagination, Avatar, RoadMap,
Snackbar, Skeleton, Loader. El default `comfortable` preserva el aspecto
previo de cada componente, así que cambiar a este sistema no rompe
consumidores existentes hasta que activan `density="compact"` o
`density="dense"`.

**Tipografía global**: dentro del wrapper `.flysoft-theme-reset` (cualquier
ThemeProvider/AppLayoutProvider lo crea), `h1`-`h6`, `p`, `small` y los
elementos que heredan font-size (span, div) escalan con la densidad activa.
Specificity baja → cualquier clase de Tailwind (`text-lg`, etc.) o `style`
inline la pisa.

**Componentes con prop `compact` como override local** (fuerzan preset compact
dentro de sí y descendientes, ignorando la densidad global): Card, DataTable,
Dialog, Filter, Accordion, Menu, DropdownMenu, DropdownPanel, TabsGroup.

### AuthProvider + AuthContext

```tsx
<AuthProvider
  getToken={async (user, pass) => resultado.token}
  getUserData={async (auth) => resultado.user}
  refreshToken={async (auth) => nuevoToken}  // opcional
>
  {/* app */}
</AuthProvider>

const { user, login, logout, isAuthenticated, isLoading } = useContext(AuthContext);
```

### CrudProvider\<T\> + useCrud\<T\>()

```tsx
<CrudProvider<User>
  getPromise={(params) => apiClient.get({ url: "/api/users", params })}
  postPromise={{ execute: (item) => apiClient.post({ url: "/api/users", body: item }), successMessage: "Creado" }}
  putPromise={{ execute: (item) => apiClient.put({ url: `/api/users/${item.id}`, body: item }), successMessage: "Actualizado" }}
  deletePromise={{ execute: (item) => apiClient.del({ url: `/api/users/${item.id}` }), successMessage: "Eliminado" }}
  urlParams={["nombre", "estado"]}
  limit={20}
>
  <UserPage />
</CrudProvider>

const { list, item, isLoading, pagination, fetchItems, fetchItem, createItem, updateItem, deleteItem, page, pages, total } = useCrud<User>();
```

### SnackbarProvider + useSnackbar()

```tsx
<SnackbarProvider>
  <SnackbarContainer position="bottom-right" />
  {/* app */}
</SnackbarProvider>

const { showSnackbar } = useSnackbar();
showSnackbar("Guardado", "success");
showSnackbar("Error", "danger", { duration: 5000 });
```

### AppLayoutProvider + useAppLayout()

Combina ThemeProvider + SnackbarProvider + AppLayout en un solo provider. Acepta las mismas props de densidad que `ThemeProvider` (`density`, `densityStorageKey`, `forceInitialDensity`, `onDensityChange`) y las propaga automáticamente.

```tsx
<AppLayoutProvider initialTheme="light" density="dense" initialNavbar={{ fullWidthNavbar: true }}>
  {/* routes */}
</AppLayoutProvider>

const {
  setNavBarLeftNode, setNavbarRightNode, setLeftDrawer,
  setTheme, isDark,
  density, setDensity,
} = useAppLayout();
```

### useAsyncRequest

```tsx
const { execute, isLoading } = useAsyncRequest({
  successMessage: "Guardado",
  errorMessage: (err) => getErrorMessage(err),
});
await execute(() => apiClient.post({ url: "/api/data", body: data }));
```

### useBreakpoint

```tsx
const { breakpoint, isMobile, isTablet, isDesktop, windowSize } = useBreakpoint();
```

---

## apiClient (Servicio HTTP)

```tsx
import { apiClient, setApiClientTokenProvider } from "flysoft-react-ui";

// Configurar token global
setApiClientTokenProvider(() => user?.token?.accessToken);

// Métodos
const data = await apiClient.get<User[]>({ url: "/api/users", params: { page: 1 } });
await apiClient.post({ url: "/api/users", body: newUser });
await apiClient.put({ url: `/api/users/${id}`, body: updatedUser });
await apiClient.del({ url: `/api/users/${id}` });

// Archivos
await apiClient.downloadFile({ url: "/api/report.pdf" });
await apiClient.uploadFile({ url: "/api/upload", files: fileInput.files });
const url = await apiClient.getFileAsUrl({ url: "/api/image/1" });
```

## Helpers

| Función | Firma | Ejemplo |
|---------|-------|---------|
| `currencyFormat` | `(n: number) => string` | `1234.56` → `"1.234,56"` |
| `getErrorMessage` | `(error: any) => string` | Extrae mensaje de AxiosError |
| `getInitialLetters` | `(text: string) => string` | `"Juan Pérez"` → `"JP"` |
| `objectToQueryString` | `(obj: any) => string` | `{a:1}` → `"a=1"` |
| `queryStringToObject` | `(str: string) => Record` | `"a=1"` → `{a:"1"}` |
| `promiseMapper` | `(promise, mapper) => Promise` | Mapea resultados paginados/array |
| `RegularExpressions` | objeto | `.email`, `.dateString`, `.password(config)` |

## Interfaces

```typescript
interface NameValueInterface<T> { name: string; value: T; extras?: any; }
interface PaginationInterface<T> { list: T[]; limit: number; page: number; pages: number; total: number; }
```

## Templates Disponibles

| Template | Props principales |
|----------|-------------------|
| `LoginForm` | `onSubmit({email, password})`, `loading`, `error` |
| `RegistrationForm` | `onSubmit({firstName, lastName, email, password, confirmPassword})`, `loading`, `error` |
| `ContactForm` | `onSubmit({name, email, subject, message})`, `loading`, `success`, `error` |
| `DashboardLayout` | `title`, `stats (DashboardStat[])`, `actions`, `children` |
| `SidebarLayout` | `title`, `menuItems (MenuItem[])`, `user (User)`, `onLogout`, `children` |
| `FormPattern` | `title`, `fields (FormField[])`, `onSubmit`, `gridCols`, `submitText`, `loading`, `error`, `success` |
