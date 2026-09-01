<!-- Generado desde los tipos de flysoft-react-ui@1.4.2. No editar a mano. -->
<!-- Regenerar con: npm run docs:skill -->

# Componentes de formulario

Controles de entrada. Todos se importan desde `'flysoft-react-ui'`.

Los que declaran `extends` heredan además todos los atributos nativos del elemento HTML correspondiente (`onFocus`, `placeholder`, `name`, `required`, etc.); acá sólo se listan las props propias de la librería.

## Button

Extiende `React.ButtonHTMLAttributes<HTMLButtonElement>` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `variant` | `"primary" \| "outline" \| "ghost"` |  | `"primary"` |  |
| `size` | `"sm" \| "md" \| "lg"` |  | `"md"` |  |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"` |  | `"primary"` |  |
| `bg` | `string` |  | — |  |
| `textColor` | `string` |  | — |  |
| `icon` | `string` |  | — |  |
| `iconPosition` | `"left" \| "right"` |  | `"left"` |  |
| `loading` | `boolean` |  | `false` |  |
| `children` | `React.ReactNode` |  | — |  |

## LinkButton

Extiende `Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `to` | `string` | **sí** | — |  |
| `target` | `string` |  | — |  |
| `variant` | `"primary" \| "outline" \| "ghost"` |  | `"primary"` |  |
| `size` | `"sm" \| "md" \| "lg"` |  | `"md"` |  |
| `color` | `"primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"` |  | `"primary"` |  |
| `bg` | `string` |  | — |  |
| `textColor` | `string` |  | — |  |
| `icon` | `string` |  | — |  |
| `iconPosition` | `"left" \| "right"` |  | `"left"` |  |
| `children` | `React.ReactNode` |  | — |  |

## Input

Extiende `Omit< React.InputHTMLAttributes<HTMLInputElement>, "size" >` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `label` | `string` |  | — |  |
| `error` | `string` |  | — |  |
| `icon` | `string` |  | — |  |
| `iconPosition` | `"left" \| "right"` |  | `"left"` |  |
| `size` | `"sm" \| "md" \| "lg"` |  | `"md"` |  |
| `children` | `React.ReactNode` |  | — |  |
| `onIconClick` | `(event: React.MouseEvent<HTMLElement>) => void` |  | — | Callback cuando se hace click en el ícono. Si está definido, el ícono será clickeable. |
| `readOnly` | `boolean` |  | `false` | Si es true, el input será de solo lectura. No se podrá modificar pero no se verá como disabled. Por defecto es false. |

## AutocompleteInput\<T, K\>

Extiende `Omit<InputProps, "onChange" \| "value" \| "ref">` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `options` | `T[]` | **sí** | — |  |
| `value` | `string \| string[]` |  | — |  |
| `onChange` | `\| React.ChangeEventHandler<HTMLInputElement> \| ((value: string \| string[]) => void)` |  | — | Valor de texto del input (controlado) Puede ser un ChangeEventHandler (de register) o una función que recibe string (API personalizada) |
| `onSelectOption` | `(option: T, value: K) => void` |  | — | Callback al seleccionar una opción. Devuelve el item completo (T) y el valor mapeado (K) |
| `noResultsText` | `string` |  | `"Sin resultados"` |  |
| `getOptionLabel` | `(item: T) => string` |  | — | Obtiene el label que se muestra para cada opción. Por defecto usa la propiedad "label". |
| `getOptionValue` | `(item: T) => K` |  | — | Obtiene el valor que se devuelve al seleccionar una opción. Por defecto usa la propiedad "value". |
| `getOptionDescription` | `(item: T) => string \| number \| undefined` |  | — | Obtiene la descripción opcional para cada opción. Por defecto usa la propiedad "description". |
| `renderOption` | `(item: T) => React.ReactNode` |  | — | Renderizado personalizado de cada opción. Si se define, se ignora el render por defecto. |
| `readOnly` | `boolean` |  | `false` | Si es true, el input será de solo lectura. No se podrá modificar ni desplegar las opciones. Por defecto es false. |
| `multiple` | `boolean` |  | `false` | Si es true, permite seleccionar múltiples opciones usando Checkboxes. El valor será un array con los valores (K) de las opciones seleccionadas. |

## SearchSelectInput\<T, K\>

Extiende `Omit<InputProps, "onChange" \| "value" \| "ref">` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `value` | `T \| K \| string` |  | — |  |
| `onChange` | `\| ((value: T \| K) => void) \| React.ChangeEventHandler<HTMLInputElement>` |  | — | Callback cuando cambia el valor del input. Recibe la opción completa (T) si no hay getOptionValue, o el valor extraído (K) si hay getOptionValue. También es compatible con react-hook-form: acepta el onChange estándar de HTML. |
| `onSearchPromiseFn` | `(text: string) => Promise<Array<T> \| PaginationInterface<T>>` | **sí** | — | Función que realiza la búsqueda y devuelve un Promise con los resultados |
| `onSingleSearchPromiseFn` | `(value: K) => Promise<T \| undefined>` | **sí** | — | Función que busca un elemento individual usando su valor (K). Se usa cuando hay un valor por defecto que no está presente en las opciones cargadas. Recibe el valor (K) y devuelve una Promise con el objeto completo (T) o undefined si no se encuentra. |
| `onSelectOption` | `(option: T, value: K) => void` |  | — | Callback al seleccionar una opción. Devuelve el item completo (T) y el valor mapeado (K) |
| `dialogTitle` | `string` |  | `"Seleccione una opción"` | Título del dialog de selección. Por defecto "Seleccione una opción" |
| `icon` | `string` |  | `"fa-search"` | Posición del botón de búsqueda. Por defecto "right" |
| `iconPosition` | `"left" \| "right"` |  | `"right"` |  |
| `noResultsText` | `string` |  | `"Sin resultados"` | Texto a mostrar cuando no hay resultados |
| `getOptionLabel` | `(item: T) => string` |  | — | Obtiene el label que se muestra para cada opción. Por defecto usa la propiedad "label". |
| `getOptionValue` | `(item: T) => K` |  | — | Obtiene el valor que se devuelve al seleccionar una opción. Por defecto usa la propiedad "value". |
| `getOptionDescription` | `(item: T) => string \| number \| undefined` |  | — | Obtiene la descripción opcional para cada opción. Por defecto usa la propiedad "description". |
| `renderOption` | `(item: T) => React.ReactNode` |  | — | Renderizado personalizado de cada opción. Si se define, se ignora el render por defecto. |
| `readOnly` | `boolean` |  | `false` | Si es true, el input será de solo lectura. No se podrá modificar ni abrir el diálogo de selección. Por defecto es false. |

## DateInput

Extiende `Omit<InputProps, "type" \| "value" \| "onChange" \| "ref">` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `value` | `Dayjs \| null \| string` |  | — | Valor de la fecha. En modo register con FormProvider: Dayjs \| null (se guarda como Dayjs en el formulario) En modo register sin FormProvider: string ISO (se guarda como ISO string, se puede parsear a Dayjs) En modo Controller: Dayjs \| null |
| `onChange` | `\| ((date: Dayjs \| null) => void) \| React.ChangeEventHandler<HTMLInputElement>` |  | — | Callback cuando cambia la fecha. En modo register: ChangeEventHandler (de register) En modo Controller: (date: Dayjs \| null) => void NOTA: Para usar Dayjs directamente con register, el formulario debe estar envuelto en FormProvider. Sin FormProvider, el valor se guarda como ISO string y se puede parsear de vuelta a Dayjs usando normalizeToDayjs. |
| `format` | `"dd/mm/yyyy" \| "mm/dd/yyyy"  (DateInputFormat)` |  | `"dd/mm/yyyy"` |  |
| `datePickerProps` | `Omit<DatePickerProps, "value" \| "onChange">` |  | — |  |
| `readOnly` | `boolean` |  | `false` | Si es true, el input será de solo lectura. No se podrá modificar ni desplegar el DatePicker. Por defecto es false. |

## DatePicker

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `value` | `Dayjs \| null` |  | — |  |
| `onChange` | `(date: Dayjs) => void` |  | — |  |
| `initialViewDate` | `Dayjs` |  | — |  |
| `startWeekOn` | `"monday" \| "sunday"` |  | `"sunday"` |  |
| `className` | `string` |  | `""` |  |

## Checkbox

Extiende `Omit< React.InputHTMLAttributes<HTMLInputElement>, "type" \| "size" >` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `label` | `string` |  | — |  |
| `labelPosition` | `"left" \| "right"` |  | `"right"` |  |
| `error` | `string` |  | — |  |
| `size` | `"sm" \| "md" \| "lg"` |  | `"md"` |  |
| `readOnly` | `boolean` |  | `false` | Si es true, el checkbox será de solo lectura. No se podrá modificar pero se verá igual visualmente. Por defecto es false. |

## RadioButtonGroup

Extiende `Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" \| "children">` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `options` | `RadioOption[]` | **sí** | — | Array de opciones para renderizar radios automáticamente |
| `value` | `string \| number` |  | — | Valor seleccionado (controlado) |
| `onChange` | `\| ((value: string \| number) => void) \| React.ChangeEventHandler<HTMLInputElement>` |  | — | Callback cuando cambia la selección Puede recibir un valor directo o un evento (para compatibilidad con react-hook-form) |
| `labelPosition` | `"left" \| "right"` |  | `"right"` | Posición del label para todas las opciones |
| `size` | `"sm" \| "md" \| "lg"` |  | `"md"` | Tamaño de los radio buttons |
| `error` | `string` |  | — | Mensaje de error a mostrar |
| `direction` | `"vertical" \| "horizontal"` |  | `"vertical"` | Dirección del layout: vertical (columna) o horizontal (fila) |
| `gap` | `"sm" \| "md" \| "lg"` |  | `"md"` | Espaciado entre opciones |
| `name` | `string` |  | — | Nombre del campo (para react-hook-form) |
| `disabled` | `boolean` |  | — | Estado deshabilitado |
| `onBlur` | `(() => void) \| React.FocusEventHandler<HTMLInputElement>` |  | — | Callback cuando pierde el foco Puede recibir un evento (para compatibilidad con react-hook-form) o ser una función sin parámetros |
| `readOnly` | `boolean` |  | `false` | Si es true, el radio group será de solo lectura. Las opciones no seleccionadas se verán deshabilitadas y la seleccionada se verá igual, pero no se podrá cambiar el valor. Por defecto es false. |

## CurrencyInput

Componente de entrada para valores monetarios. Muestra el valor formateado con separadores de miles (puntos) y decimales (comas). Al recibir el foco, quita los puntos para facilitar la edición.

Extiende `Omit< InputProps, "value" \| "onChange" \| "type" >` — hereda además sus atributos nativos.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `value` | `number \| null` |  | — | Valor numérico del input. |
| `onChange` | `(value: any) => void` |  | — | Callback que se ejecuta al perder el foco, devolviendo el valor numérico actualizado. Si se usa con react-hook-form (register), este callback será el de register. |

## Pagination

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `fieldName` | `string` |  | `"pagina"` |  |
| `page` | `number` |  | `1` |  |
| `pages` | `number` |  | `1` |  |
| `total` | `number` |  | `0` |  |
| `isLoading` | `boolean` |  | `false` |  |

## Tipos auxiliares

### `AutocompleteOption`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `label` | `string` | **sí** | — |  |
| `value` | `string` | **sí** | — |  |
| `description` | `string \| number` |  | — |  |
| `icon` | `string` |  | — |  |

### `DateInputFormat`

```ts
type DateInputFormat = "dd/mm/yyyy" | "mm/dd/yyyy"
```

### `RadioOption`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `label` | `string` | **sí** | — |  |
| `value` | `string \| number` | **sí** | — |  |
| `disabled` | `boolean` |  | — |  |

### `SearchSelectOption`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `label` | `string` | **sí** | — |  |
| `value` | `string` |  | — |  |
| `description` | `string \| number` |  | — |  |
| `icon` | `string` |  | — |  |
