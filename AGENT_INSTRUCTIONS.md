# Instrucciones para el Agente de Cursor AI

Este archivo contiene reglas específicas para que el agente de Cursor AI mantenga y actualice automáticamente la librería flysoft-react-ui.

## 🎯 Objetivo Principal

**SIEMPRE** priorizar los componentes de `flysoft-react-ui` antes de crear nuevos componentes o usar otras librerías.

## 📋 Reglas Generales

### 1. Prioridad de Componentes

- **SIEMPRE** usar `Button`, `Input`, `Card`, `Badge`, `ThemeSwitcher` de flysoft-react-ui
- **NUNCA** crear componentes personalizados que ya existen en la librería
- **SIEMPRE** usar FontAwesome 5 para iconos (clases `fa fa-*`)
- **SIEMPRE** usar el sistema de temas de flysoft-react-ui

### 2. Importaciones Requeridas

```tsx
import { Button, Input, Card, Badge, ThemeSwitcher } from "flysoft-react-ui";
import "flysoft-react-ui/styles";
```

### 3. Sistema de Temas

```tsx
import { ThemeProvider } from "flysoft-react-ui";

// Envolver la app
<ThemeProvider initialTheme="light">
  <App />
</ThemeProvider>;
```

## 🔧 Reglas para Crear Nuevos Componentes

### Estructura Obligatoria

1. **Ubicación**: Crear en la carpeta apropiada:

   - `src/components/form-controls/` - Para controles de formulario
   - `src/components/layout/` - Para componentes de layout
   - `src/components/utils/` - Para componentes utilitarios

2. **Archivo de Tipos**: Incluir interfaz TypeScript con JSDoc completo

3. **Comentarios JSDoc**: Incluir ejemplos de uso en comentarios

4. **Metadatos**: Incluir `COMPONENT_METADATA` para documentación automática

### Actualizaciones Automáticas Requeridas

Cuando se cree un nuevo componente, **SIEMPRE** actualizar:

1. **src/index.ts**:

   ```tsx
   export { ComponentName } from "./components/category/ComponentName";
   export type { ComponentNameProps } from "./components/category/ComponentName";
   ```

2. **docs/component-metadata.json**:

   - Añadir metadatos del componente
   - Actualizar estadísticas

3. **flysoft-ui.config.ts**:

   - Añadir configuración del componente
   - Actualizar arrays de componentes

4. **.cursorrules**:

   - Añadir reglas para el nuevo componente
   - Actualizar ejemplos de uso

5. **README.md**:

   - Añadir documentación del componente
   - Actualizar lista de componentes

6. **Crear template si es apropiado**:
   - Si el componente es común, crear template en `templates/`

### Formato Estándar

Usar el template de `templates/new-component-template.tsx`:

```tsx
import React from "react";

export interface ComponentNameProps {
  // Props con JSDoc completo
}

export const ComponentName: React.FC<ComponentNameProps> = (
  {
    // Props con valores por defecto
  }
) => {
  // Implementación usando variables CSS del sistema de temas
  const baseClasses = `
    font-[var(--font-default)] text-[var(--color-text-primary)]
    bg-[var(--color-bg-default)] border-[var(--color-border-default)]
  `;

  // Lógica del componente
  return <div className={baseClasses}>{/* Contenido */}</div>;
};

// Metadatos para documentación automática
export const COMPONENT_METADATA = {
  name: "ComponentName",
  category: "form-controls",
  // ... resto de metadatos
};
```

### Convenciones de Naming

- **Componentes**: PascalCase (ej: `Button`, `Input`, `Card`)
- **Props**: camelCase (ej: `iconPosition`, `isLoading`)
- **Variantes**: lowercase (ej: `primary`, `outline`, `ghost`)
- **Iconos**: FontAwesome 5 (ej: `fa-user`, `fa-save`, `fa-envelope`)

### Variables CSS del Sistema de Temas

**SIEMPRE** usar estas variables CSS:

```css
/* Colores */
--color-primary
--color-secondary
--color-success
--color-warning
--color-danger
--color-bg-default
--color-bg-secondary
--color-text-primary
--color-text-secondary
--color-text-muted
--color-border-default
--color-border-focus
--color-border-error

/* Tipografía */
--font-default

/* Sombras */
--shadow-sm
--shadow-md
--shadow-lg

/* Radios */
--radius-sm
--radius-md
--radius-lg
```

## 🔄 Reglas para Modificar Componentes Existentes

### Actualizaciones Requeridas

1. **Documentación**: Actualizar JSDoc si cambian props
2. **Ejemplos**: Actualizar ejemplos si cambia la API
3. **Templates**: Actualizar templates que usen el componente
4. **Metadatos**: Actualizar `docs/component-metadata.json`
5. **Configuración**: Actualizar `flysoft-ui.config.ts`

### Compatibilidad

- **Mantener retrocompatibilidad** cuando sea posible
- **Documentar breaking changes** claramente
- **Actualizar todos los ejemplos** afectados
- **Actualizar templates** que usen el componente

## 📁 Reglas para Añadir Nuevas Categorías

### Crear Subcarpeta en Templates

1. Crear subcarpeta en `templates/` (ej: `templates/navigation/`)
2. Actualizar `docs/component-registry.ts`
3. Actualizar `INTEGRATION_GUIDE.md`
4. Actualizar `flysoft-ui.config.ts`

### Actualizar Configuración

```typescript
// En flysoft-ui.config.ts
export const TEMPLATES: TemplateConfig[] = [
  // ... templates existentes
  {
    name: "NewTemplate",
    category: "navigation", // Nueva categoría
    description: "Descripción del template",
    components: ["Button", "Badge"],
    useCases: ["Navigation", "Menu"],
    file: "templates/navigation/NewTemplate.tsx",
  },
];
```

## 🎨 Reglas para Iconos

### FontAwesome 5 Exclusivamente - Estilo Light (Outlined) por Defecto

Los iconos en este proyecto usan el estilo **light (fal)** por defecto, que proporciona un aspecto outlined/ligero. Los componentes normalizan automáticamente las clases de iconos.

```tsx
// ✅ Correcto - Los componentes normalizan automáticamente a "fal"
<Button icon="fa-user" />
<Input icon="fa-envelope" />
<Badge icon="fa-lock" />

// ✅ También funciona con prefijos explícitos
<Button icon="fas fa-user" /> // Se normaliza a "fal fa-user"
<Button icon="far fa-user" /> // Se normaliza a "fal fa-user"

// ✅ Para uso directo en JSX, usar "fal" explícitamente
<i className="fal fa-user" />

// ❌ Incorrecto - No usar otras librerías de iconos
<i className="lucide-user" />
<Icon name="user" />
```

**Nota:** Los componentes internos usan la función `normalizeIconClass()` que convierte automáticamente cualquier prefijo de estilo (fa, fas, far, fal) a "fal" (light/outlined) por defecto.

### Categorías de Iconos Disponibles

```typescript
const ICON_CATEGORIES = {
  user: ["fa-user", "fa-user-circle", "fa-user-friends"],
  forms: ["fa-edit", "fa-keyboard", "fa-mouse-pointer"],
  navigation: ["fa-home", "fa-arrow-left", "fa-arrow-right"],
  actions: ["fa-save", "fa-trash", "fa-edit", "fa-plus"],
  communication: ["fa-envelope", "fa-phone", "fa-comment"],
  security: ["fa-lock", "fa-unlock", "fa-shield-alt"],
  status: ["fa-check-circle", "fa-times-circle", "fa-exclamation-triangle"],
};
```

## 📝 Reglas para Documentación

### JSDoc Obligatorio

````tsx
/**
 * ComponentName - Descripción breve
 *
 * Descripción detallada del componente.
 *
 * @example
 * ```tsx
 * <ComponentName variant="primary">Contenido</ComponentName>
 * ```
 *
 * @param props - Props del componente
 * @returns Elemento JSX del componente
 */
````

### Metadatos Completos

```typescript
export const COMPONENT_METADATA = {
  name: "ComponentName",
  category: "form-controls",
  description: "Descripción del componente",
  props: [
    {
      name: "variant",
      type: "'primary' | 'secondary'",
      required: false,
      defaultValue: "primary",
      description: "Variante del componente",
    },
  ],
  variants: [
    {
      name: "primary",
      description: "Variante primaria",
      example: '<ComponentName variant="primary">Contenido</ComponentName>',
    },
  ],
  examples: [
    {
      name: "Ejemplo básico",
      description: "Uso básico del componente",
      code: "<ComponentName>Contenido</ComponentName>",
      category: "basic",
    },
  ],
  useCases: ["Formularios", "Navegación"],
  icon: "fa-component",
};
```

## 🚫 Prohibiciones

### NUNCA Hacer

1. **Crear componentes que ya existen**:

   - No crear `Button`, `Input`, `Card`, `Badge` personalizados
   - Usar siempre los de flysoft-react-ui

2. **Usar otras librerías de iconos**:

   - No usar Lucide, Heroicons, etc.
   - Solo FontAwesome 5

3. **Usar otros sistemas de temas**:

   - No crear sistemas de temas personalizados
   - Usar siempre el de flysoft-react-ui

4. **Crear formularios sin los componentes de la librería**:

   - Siempre usar `Input` y `Button` de flysoft-react-ui
   - Siempre usar `Card` como contenedor

5. **Olvidar importar estilos**:
   - Siempre incluir `import "flysoft-react-ui/styles";`

## ✅ Mejores Prácticas

### SIEMPRE Hacer

1. **Usar componentes de flysoft-react-ui** para formularios
2. **Usar FontAwesome 5** para iconos
3. **Usar el sistema de temas** de flysoft-react-ui
4. **Importar los estilos** de flysoft-react-ui
5. **Seguir los patrones** documentados
6. **Actualizar documentación** cuando se modifiquen componentes
7. **Mantener retrocompatibilidad** cuando sea posible
8. **Usar variables CSS** del sistema de temas

## 🔍 Validación Automática

### Scripts de Validación

Ejecutar estos scripts después de cambios:

```bash
# Validar documentación
npm run validate-docs

# Actualizar documentación
npm run update-docs

# Verificar linting
npm run lint
```

### Verificaciones Requeridas

1. **Todos los componentes** estén documentados
2. **Todos los exports** estén en `src/index.ts`
3. **Todos los componentes** estén en `.cursorrules`
4. **Todos los componentes** estén en `flysoft-ui.config.ts`
5. **Todos los templates** estén actualizados

## 📚 Recursos de Referencia

- **Configuración**: `flysoft-ui.config.ts`
- **Registro**: `docs/component-registry.ts`
- **Metadatos**: `docs/component-metadata.json`
- **Templates**: `templates/new-component-template.tsx`
- **Ejemplos**: `examples/common-patterns.tsx`
- **Guía de Integración**: `INTEGRATION_GUIDE.md`
- **Documentación completa de API**: `AI_CONTEXT.md`
- **Instrucciones para proyectos consumidores**: `CONSUMER_AI_RULES.md`

## 📦 Catálogo Completo de Componentes Exportados

### Form Controls (11 componentes)

| Componente | Props clave | Descripción |
|------------|-------------|-------------|
| `Button` | variant, size, color, icon, loading, bg, textColor | Botón con variantes, colores personalizados y efecto ripple |
| `LinkButton` | to, target, variant, size, color, icon | Botón como enlace (React Router o `<a>`) |
| `Input` | label, error, icon, iconPosition, size, onIconClick, readOnly | Campo de entrada con ref forwarding |
| `AutocompleteInput<T,K>` | options, value, onChange, multiple, getOptionLabel, getOptionValue | Dropdown con búsqueda y selección múltiple |
| `SearchSelectInput<T,K>` | onSearchPromiseFn, onSingleSearchPromiseFn, dialogTitle | Selección async en modal dialog |
| `DatePicker` | value (Dayjs), onChange, startWeekOn | Calendario standalone |
| `DateInput` | value, onChange, format | Input con DatePicker dropdown |
| `Checkbox` | label, labelPosition, error, size, readOnly | Checkbox con ref forwarding |
| `RadioButtonGroup` | options, value, onChange, direction, gap, size | Selección única de grupo |
| `CurrencyInput` | value (number), onChange | Input numérico formato moneda (es-AR) |
| `Pagination` | page, pages, total, isLoading, fieldName | Paginación basada en URL |

### Layout Components (12 componentes)

| Componente | Props clave | Descripción |
|------------|-------------|-------------|
| `Card` | title, subtitle, headerActions, footer, variant, compact | Contenedor con header/footer |
| `AppLayout` | navbar, leftDrawer, children, contentFooter | Layout principal con navbar y sidebar |
| `Collection` | gap, direction, wrap | Contenedor flex |
| `DataField` | label, value, inline, align, link | Par label+valor para vistas de detalle |
| `TabsGroup` | tabs, paramName, headerNode, onChangeTab | Contenedor de pestañas |
| `TabPanel` | tabId | Panel individual de pestaña |
| `DataTable<T>` | columns, rows, isLoading, maxRows, compact, locale | Tabla de datos con formateo y skeleton |
| `Accordion` | title, icon, rightNode, defaultOpen, variant, onToggle | Sección colapsable |
| `Menu<T>` | options, onOptionSelected, getOptionLabel, renderOption | Lista de menú simple |
| `DropdownMenu<T>` | options, onOptionSelected, renderNode, openOnHover | Dropdown portal con posicionamiento auto |
| `DropdownPanel` | children, renderNode, openOnHover | Dropdown portal con contenido libre |
| `Filter` | filterType, paramName, label, value, onChange | Filtro versátil (text/number/date/autocomplete/search/searchSelect) |

### Utility Components (10 componentes)

| Componente | Props clave | Descripción |
|------------|-------------|-------------|
| `Badge` | variant, size, rounded, icon, bg, textColor, onClick | Etiqueta de estado/categoría |
| `Avatar` | text, image, size, bgColor, textColor | Imagen de perfil con fallback a iniciales |
| `RoadMap` | stages (RoadMapStage[]) | Visualización de etapas/progreso |
| `Dialog` | isOpen, title, children, footer, onClose, closeOnOverlayClick, compact | Ventana modal |
| `Loader` | isLoading, text, keepContentWhileLoading, contentLoadingNode | Indicador de carga con overlay |
| `FiltersDialog` | filters (FilterConfig[]) | Diálogo agrupando múltiples filtros |
| `Snackbar` | id, message, variant, duration, onClose | Notificación toast (uso interno) |
| `SnackbarContainer` | position, maxSnackbars | Contenedor de notificaciones |
| `Skeleton` | className | Placeholder de carga con animación pulse |
| `ThemeSwitcher` | (sin props) | Toggle de tema autocontenido |

### Contexts (5)

| Context | Provider | Hook | Descripción |
|---------|----------|------|-------------|
| Theme | `ThemeProvider` | `useTheme()` | Gestión de temas con CSS variables y localStorage |
| Auth | `AuthProvider` | `useContext(AuthContext)` | Autenticación con validación y refresh de tokens |
| CRUD | `CrudProvider<T>` | `useCrud<T>()` | Operaciones CRUD con paginación y sync URL |
| Snackbar | `SnackbarProvider` | `useSnackbar()` | Notificaciones toast |
| AppLayout | `AppLayoutProvider` | `useAppLayout()` | Combina Theme + Snackbar + Layout |

### Hooks (7)

| Hook | Retorno | Descripción |
|------|---------|-------------|
| `useThemeOverride` | applyOverride, revertOverride, revertAllOverrides | Override granular de CSS variables |
| `useTemporaryOverride` | applyTemporaryOverride | Override temporal con auto-revert |
| `useGlobalThemeStyles` | void | Aplica tema a body/html |
| `useBreakpoint` | breakpoint, isMobile, isTablet, isDesktop | Detección de breakpoint responsive |
| `useElementScroll` | scrollY, scrollDirection | Tracking de scroll con RAF |
| `useAsyncRequest` | execute, isLoading, setLoading | Operaciones async con snackbar |
| `useEnum` | getArray, getInstance | Enum a array para selects |

### Services

| Servicio | Métodos | Descripción |
|----------|---------|-------------|
| `apiClient` | get, post, put, del, getFile, downloadFile, uploadFile, openFile | Cliente HTTP singleton con token Bearer |
| `createApiClient` | — | Crea instancia aislada |
| `setApiClientTokenProvider` | — | Configura provider de token global |

### Helpers (9)

| Función | Descripción |
|---------|-------------|
| `currencyFormat(n)` | Formato moneda es-AR: `1234.56` → `"1.234,56"` |
| `getErrorMessage(error)` | Extrae mensaje de AxiosError |
| `getInitialLetters(text)` | `"Juan Pérez"` → `"JP"` |
| `getQueryString(params, newParams)` | Merge de params URL |
| `objectToQueryString(obj)` | Objeto a query string |
| `queryStringToObject(str)` | Query string a objeto |
| `nameValueArrayToObject(arr)` | Array {name,value} a objeto |
| `promiseMapper(promise, mapper)` | Mapea resultados paginados/array/single |
| `RegularExpressions` | Patrones: .email, .dateString, .password(config) |

### Templates (6)

| Template | Props principales |
|----------|-------------------|
| `LoginForm` | onSubmit({email, password}), loading, error |
| `RegistrationForm` | onSubmit({firstName, lastName, email, password, confirmPassword}), loading, error |
| `ContactForm` | onSubmit({name, email, subject, message}), loading, success, error |
| `DashboardLayout` | title, stats (DashboardStat[]), actions, children |
| `SidebarLayout` | title, menuItems (MenuItem[]), user (User), onLogout, children |
| `FormPattern` | title, fields (FormField[]), onSubmit, gridCols, submitText, loading, error, success |

### Interfaces

| Interface | Campos |
|-----------|--------|
| `NameValueInterface<T>` | name: string, value: T, extras?: any |
| `PaginationInterface<T>` | list: T[], limit: number, page: number, pages: number, total: number |

## 🎯 Objetivos de Mantenimiento

1. **Consistencia**: Mantener consistencia en el diseño y API
2. **Documentación**: Mantener documentación actualizada
3. **Compatibilidad**: Mantener retrocompatibilidad
4. **Automatización**: Automatizar actualizaciones de documentación
5. **Calidad**: Mantener alta calidad de código y documentación

### Al agregar/modificar componentes, actualizar TAMBIÉN:
- `AI_CONTEXT.md` — Documentación completa de props e interfaces
- `CONSUMER_AI_RULES.md` — Referencia para proyectos consumidores
- `AI_INTEGRATION_GUIDE.md` — Prompt copy-paste para AI agents
- `CLAUDE.md` — Instrucciones para Claude Code

---

**IMPORTANTE**: Estas reglas deben seguirse estrictamente para mantener la integridad y consistencia de la librería flysoft-react-ui.
