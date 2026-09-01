---
name: flysoft-ui
description: Catálogo y referencia de API de flysoft-react-ui — componentes React themeados, hooks, providers, apiClient y templates. Usar al construir o modificar cualquier UI (formularios, listados, tablas, diálogos, filtros) en una app que tenga flysoft-react-ui como dependencia, y antes de escribir a mano un control que la librería probablemente ya tenga.
---

# flysoft-react-ui

Librería de componentes React con tema y densidad centralizados. Todo se importa
desde el paquete raíz — nunca desde rutas internas:

```tsx
import { Card, DataTable, Input, Button, useAsyncRequest } from "flysoft-react-ui";
```

## Cómo entran los estilos

Los estilos entran una sola vez. **Importalos desde el CSS de la app, dentro de
una capa**, no con un `import "flysoft-react-ui/styles"` en el entry de JS:

```css
/* index.css de la app — el orden de capas va antes que cualquier @import */
@layer flysoft, base, components, utilities;

@import "flysoft-react-ui/styles" layer(flysoft);
@import "tailwindcss";
```

El motivo importa, porque el modo de fallar es silencioso. La librería importa
`tailwindcss/theme` y `tailwindcss/utilities` por separado para saltear
Preflight, y al hacerlo pierde la asignación de capa que Tailwind hace en su
`index.css`: **sus utilities se publican sin capa**. En CSS, lo que no está en
ninguna capa le gana a todo lo que sí — así que sin este `layer(flysoft)` los
estilos de la librería pisan los de la app aunque la app tenga más
especificidad, y no hay forma de ganarles salvo con `!important`.

Declarando `flysoft` como la primera capa, la librería queda con la prioridad
más baja y la app la puede sobreescribir normalmente.

Si la app no usa capas para nada, `import "flysoft-react-ui/styles"` en el entry
alcanza. En cuanto la app pone algo en una capa —lo hace cualquier proyecto con
Tailwind v4— necesita la forma de arriba.

Los componentes se pintan con variables CSS del tema (`--color-*`, `--radius-*`)
y escalan con la densidad activa. No lleva colores hardcodeados y no hace falta
configurarle nada por componente: el tema y la densidad se setean una vez en el
provider.

## Antes de escribir un componente, fijate si ya existe

Cuando te pidan "un formulario con un buscador de clientes y una fecha", la
respuesta no es escribir un `<select>` con búsqueda ni un calendario. Casi
siempre ya hay un componente para eso, y uno hecho a mano queda fuera del tema,
fuera de la densidad y sin el comportamiento de teclado y accesibilidad que el
de la librería ya tiene.

| Si necesitás | Usá | No escribas |
|---|---|---|
| Un desplegable con búsqueda sobre una lista que ya tenés en memoria | `AutocompleteInput` | `<select>`, combobox propio |
| Lo mismo pero el dataset es grande y se busca contra el backend | `SearchSelectInput` | fetch + lista propia |
| Un campo de fecha | `DateInput` | `<input type="date">`, calendario propio |
| Un calendario suelto, sin input | `DatePicker` | — |
| Un importe en pesos | `CurrencyInput` | `<input>` + formateo a mano |
| Una tabla con datos, orden y acciones por fila | `DataTable` | `<table>` |
| Filtros que viven en la URL | `Filter` | `useSearchParams` + inputs sueltos |
| Paginación | `Pagination` | controles propios |
| Un modal | `Dialog` | portal propio |
| Un toast / notificación | `useSnackbar()` | librería de toasts |
| Mostrar un par etiqueta-valor | `DataField` | `<div><label>` |
| Apilar o alinear elementos con separación | `Collection` | `<div className="flex gap-4">` |
| Un contenedor con título, acciones y footer | `Card` | `<div>` con bordes |
| Estado de carga | `Loader` o `Skeleton` | spinner propio |

Antes de dar por hecho que algo no existe, buscalo en la referencia de abajo:
son 33 componentes más 7 templates, y hay bastante más de lo que parece.

Si de verdad no existe, componelo con los que sí (`Card` + `Collection` +
`Input`) antes de escribir CSS nuevo, y usá siempre las variables del tema
(`references/theming.md`), nunca colores literales.

## Dónde está cada cosa

Las referencias se cargan sueltas: leé sólo la que necesites.

| Necesitás | Leé |
|---|---|
| Inputs, botones, selects, fechas, importes, paginación | `references/forms.md` |
| Tablas, campos de datos, badges, avatares, loaders, skeletons | `references/display.md` |
| Cards, layout de página, tabs, acordeones, diálogos, menús, filtros | `references/layout.md` |
| Providers, hooks y lo que devuelve cada uno | `references/hooks.md` |
| `apiClient`, helpers, interfaces compartidas | `references/services.md` |
| Formularios y páginas pre-armadas | `references/templates.md` |
| Variables CSS de tema y densidad | `references/theming.md` |
| **Cuándo usar qué, patrones de página, densidad, contratos de los genéricos** | **`patterns.md`** |

Los archivos bajo `references/` se generan desde los tipos de la librería en
cada build. Si una tabla no coincide con el código, el que está mal es el tipo,
no la tabla.

`patterns.md` es lo escrito a mano: empezá por ahí si la pregunta es "cómo se
arma una página de listado" y no "qué props tiene `DataTable`".
