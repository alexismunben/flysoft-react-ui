<!-- Generado desde los tipos de flysoft-react-ui@1.4.3. No editar a mano. -->
<!-- Regenerar con: npm run docs:skill -->

# Tema, densidad y variables CSS

Los nombres de las variables CSS salen del bloque `@theme` de `src/index.css` y de los mapas de tokens de `src/contexts/`, no de los tipos.

## Cómo se importa la hoja de estilos

Desde el CSS de la app y **dentro de una capa**:

```css
@layer flysoft, base, components, utilities;

@import "flysoft-react-ui/styles" layer(flysoft);
@import "tailwindcss";
```

La librería importa `tailwindcss/theme` y `tailwindcss/utilities` por separado para saltear Preflight, y con eso pierde la asignación de capa que Tailwind hace en su `index.css`: sus utilities se publican **sin capa**, y en CSS lo que no está en ninguna capa le gana a todo lo que sí. Sin `layer(flysoft)`, los estilos de la librería pisan los de la app. Ver `../SKILL.md` para el detalle.

## Cómo leer las variables

Hay dos namespaces y no son intercambiables:

- **`--flysoft-*`** — lo que `ThemeProvider` escribe en `document.documentElement` en runtime cuando cambiás de tema o de densidad.
- **`--color-*`, `--shadow-*`, `--radius-*`, `--spacing-*`, `--font-*`** — los tokens de Tailwind v4 declarados en el `@theme`, cada uno apuntando a su `--flysoft-*`. **Estos son los que se usan en `className`**, por ejemplo `text-[var(--color-text-primary)]`.

## Tokens de Tailwind (66)

| Token | Apunta a |
|---|---|
| `--font-default` | `var(--flysoft-font-default)` |
| `--font-size-default` | `var(--flysoft-font-size-default)` |
| `--font-color-default` | `var(--flysoft-font-color-default)` |
| `--color-primary` | `var(--flysoft-primary)` |
| `--color-primary-contrast` | `var(--flysoft-primary-contrast)` |
| `--color-primary-dark` | `var(--flysoft-primary-dark)` |
| `--color-primary-light` | `var(--flysoft-primary-light)` |
| `--color-primary-soft` | `var(--flysoft-primary-soft)` |
| `--color-secondary` | `var(--flysoft-secondary)` |
| `--color-secondary-contrast` | `var(--flysoft-secondary-contrast)` |
| `--color-secondary-dark` | `var(--flysoft-secondary-dark)` |
| `--color-secondary-light` | `var(--flysoft-secondary-light)` |
| `--color-success` | `var(--flysoft-success)` |
| `--color-success-contrast` | `var(--flysoft-success-contrast)` |
| `--color-success-dark` | `var(--flysoft-success-dark)` |
| `--color-success-light` | `var(--flysoft-success-light)` |
| `--color-warning` | `var(--flysoft-warning)` |
| `--color-warning-contrast` | `var(--flysoft-warning-contrast)` |
| `--color-warning-dark` | `var(--flysoft-warning-dark)` |
| `--color-warning-light` | `var(--flysoft-warning-light)` |
| `--color-danger` | `var(--flysoft-danger)` |
| `--color-danger-contrast` | `var(--flysoft-danger-contrast)` |
| `--color-danger-dark` | `var(--flysoft-danger-dark)` |
| `--color-danger-light` | `var(--flysoft-danger-light)` |
| `--color-info` | `var(--flysoft-info)` |
| `--color-info-contrast` | `var(--flysoft-info-contrast)` |
| `--color-info-dark` | `var(--flysoft-info-dark)` |
| `--color-info-light` | `var(--flysoft-info-light)` |
| `--color-accent` | `var(--flysoft-accent)` |
| `--color-accent-contrast` | `var(--flysoft-accent-contrast)` |
| `--color-accent-dark` | `var(--flysoft-accent-dark)` |
| `--color-accent-light` | `var(--flysoft-accent-light)` |
| `--color-gray-50` | `var(--flysoft-gray50)` |
| `--color-gray-100` | `var(--flysoft-gray100)` |
| `--color-gray-200` | `var(--flysoft-gray200)` |
| `--color-gray-300` | `var(--flysoft-gray300)` |
| `--color-gray-400` | `var(--flysoft-gray400)` |
| `--color-gray-500` | `var(--flysoft-gray500)` |
| `--color-gray-600` | `var(--flysoft-gray600)` |
| `--color-gray-700` | `var(--flysoft-gray700)` |
| `--color-gray-800` | `var(--flysoft-gray800)` |
| `--color-gray-900` | `var(--flysoft-gray900)` |
| `--color-border-default` | `var(--flysoft-border-default)` |
| `--color-border-focus` | `var(--flysoft-border-focus)` |
| `--color-border-error` | `var(--flysoft-border-error)` |
| `--color-bg-default` | `var(--flysoft-bg-default)` |
| `--color-bg-secondary` | `var(--flysoft-bg-secondary)` |
| `--color-bg-disabled` | `var(--flysoft-bg-disabled)` |
| `--color-bg-hover` | `var(--flysoft-bg-hover)` |
| `--color-text-primary` | `var(--flysoft-text-primary)` |
| `--color-text-secondary` | `var(--flysoft-text-secondary)` |
| `--color-text-muted` | `var(--flysoft-text-muted)` |
| `--color-text-disabled` | `var(--flysoft-text-disabled)` |
| `--shadow-sm` | `var(--flysoft-shadow-sm)` |
| `--shadow-md` | `var(--flysoft-shadow-md)` |
| `--shadow-lg` | `var(--flysoft-shadow-lg)` |
| `--shadow-xl` | `var(--flysoft-shadow-xl)` |
| `--radius-sm` | `var(--flysoft-radius-sm)` |
| `--radius-md` | `var(--flysoft-radius-md)` |
| `--radius-lg` | `var(--flysoft-radius-lg)` |
| `--radius-full` | `var(--flysoft-radius-full)` |
| `--spacing-xs` | `var(--flysoft-spacing-xs)` |
| `--spacing-sm` | `var(--flysoft-spacing-sm)` |
| `--spacing-md` | `var(--flysoft-spacing-md)` |
| `--spacing-lg` | `var(--flysoft-spacing-lg)` |
| `--spacing-xl` | `var(--flysoft-spacing-xl)` |

## Variables de densidad

Las escribe `ThemeProvider` según la densidad activa. No se usan directo en `className` salvo que estés construyendo un componente nuevo que deba escalar.

- `--flysoft-density-card-gap`
- `--flysoft-density-container-padding-x`
- `--flysoft-density-container-padding-y`
- `--flysoft-density-control-height-lg`
- `--flysoft-density-control-height-md`
- `--flysoft-density-control-height-sm`
- `--flysoft-density-control-indicator-lg`
- `--flysoft-density-control-indicator-md`
- `--flysoft-density-control-indicator-sm`
- `--flysoft-density-datatable-header`
- `--flysoft-density-datatable-row`
- `--flysoft-density-font-base`
- `--flysoft-density-font-lg`
- `--flysoft-density-font-sm`
- `--flysoft-density-font-xl`
- `--flysoft-density-font-xs`
- `--flysoft-density-gap-lg`
- `--flysoft-density-gap-md`
- `--flysoft-density-gap-sm`
- `--flysoft-density-input-radius`
- `--flysoft-density-padding-x-lg`
- `--flysoft-density-padding-x-md`
- `--flysoft-density-padding-x-sm`
- `--flysoft-density-padding-y-lg`
- `--flysoft-density-padding-y-md`
- `--flysoft-density-padding-y-sm`

Además `ThemeProvider` escribe estos marcadores de identidad, útiles para escribir selectores CSS condicionales: `--flysoft-density-name`, `--flysoft-theme-name`.

## Valores de cada densidad

| Token | `comfortable` | `compact` | `dense` |
|---|---|---|---|
| `paddingX.sm` | `0.75rem` | `0.5rem` | `0.375rem` |
| `paddingX.md` | `1rem` | `0.75rem` | `0.5rem` |
| `paddingX.lg` | `1.5rem` | `1rem` | `0.75rem` |
| `paddingY.sm` | `0.375rem` | `0.25rem` | `0.125rem` |
| `paddingY.md` | `0.5rem` | `0.375rem` | `0.25rem` |
| `paddingY.lg` | `0.75rem` | `0.5rem` | `0.375rem` |
| `containerPaddingX` | `1.5rem` | `1rem` | `0.75rem` |
| `containerPaddingY` | `1rem` | `0.5rem` | `0.375rem` |
| `gap.sm` | `0.5rem` | `0.375rem` | `0.25rem` |
| `gap.md` | `1rem` | `0.75rem` | `0.5rem` |
| `gap.lg` | `1.5rem` | `1rem` | `0.75rem` |
| `fontXs` | `0.75rem` | `0.6875rem` | `0.625rem` |
| `fontSm` | `0.875rem` | `0.8125rem` | `0.75rem` |
| `fontBase` | `1rem` | `0.875rem` | `0.8125rem` |
| `fontLg` | `1.125rem` | `1rem` | `0.9375rem` |
| `fontXl` | `1.25rem` | `1.125rem` | `1rem` |
| `controlHeight.sm` | `2rem` | `1.75rem` | `1.5rem` |
| `controlHeight.md` | `2.5rem` | `2.125rem` | `1.75rem` |
| `controlHeight.lg` | `3rem` | `2.5rem` | `2.125rem` |
| `controlIndicator.sm` | `1rem` | `0.875rem` | `0.75rem` |
| `controlIndicator.md` | `1.25rem` | `1.125rem` | `1rem` |
| `controlIndicator.lg` | `1.5rem` | `1.375rem` | `1.25rem` |
| `inputRadius` | `0.5rem` | `0.375rem` | `0.25rem` |
| `dataTableRow` | `3rem` | `2.25rem` | `1.75rem` |
| `dataTableHeader` | `3rem` | `2.25rem` | `1.75rem` |
| `cardGap` | `1rem` | `0.75rem` | `0.5rem` |

## Tipos

### `blueTheme`

```ts
blueTheme: Theme
```

### `comfortableDensity`

```ts
comfortableDensity: DensityTokens
```

### `compactDensity`

```ts
compactDensity: DensityTokens
```

### `darkTheme`

```ts
darkTheme: Theme
```

### `defaultTheme`

```ts
defaultTheme: Theme
```

### `denseDensity`

```ts
denseDensity: DensityTokens
```

### `Density`

```ts
type Density = "comfortable" | "compact" | "dense"
```

### `densityPresets`

```ts
densityPresets: Record<"comfortable" | "compact" | "dense", DensityTokens>
```

### `DensityTokens`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `paddingX` | `{ sm: string; md: string; lg: string }` | **sí** | — |  |
| `paddingY` | `{ sm: string; md: string; lg: string }` | **sí** | — |  |
| `containerPaddingX` | `string` | **sí** | — | Padding horizontal para containers (Card, Dialog, Filter panel). |
| `containerPaddingY` | `string` | **sí** | — | Padding vertical para containers (Card header/footer/content). |
| `gap` | `{ sm: string; md: string; lg: string }` | **sí** | — |  |
| `fontXs` | `string` | **sí** | — |  |
| `fontSm` | `string` | **sí** | — |  |
| `fontBase` | `string` | **sí** | — |  |
| `fontLg` | `string` | **sí** | — |  |
| `fontXl` | `string` | **sí** | — |  |
| `controlHeight` | `{ sm: string; md: string; lg: string }` | **sí** | — |  |
| `controlIndicator` | `{ sm: string; md: string; lg: string }` | **sí** | — | Tamaño (ancho/alto) del indicator de Checkbox (cuadrado) y RadioButton (círculo). Se reduce en compact/dense para no abrumar visualmente cuando el resto de la UI es más chica. |
| `inputRadius` | `string` | **sí** | — | Border-radius para inputs, badges del filter, botones — escala con densidad. |
| `dataTableRow` | `string` | **sí** | — |  |
| `dataTableHeader` | `string` | **sí** | — |  |
| `cardGap` | `string` | **sí** | — |  |

### `greenTheme`

```ts
greenTheme: Theme
```

### `lightTheme`

```ts
lightTheme: Theme
```

### `Theme`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `name` | `string` | **sí** | — |  |
| `colors` | `{ primary: string; primaryContrast: string; primaryDark: string; primaryLight: string; secondary: string; secondaryContrast: string; secondaryDark: string; secondaryLight: string; success: string; successContrast: string; successDark: string; successLight: string; warning: string; warningContrast: string; warningDark: string; warningLight: string; danger: string; dangerContrast: string; dangerDark: string; dangerLight: string; info: string; infoContrast: string; infoDark: string; infoLight: string; accent: string; accentContrast: string; accentDark: string; accentLight: string; gray50: string; gray100: string; gray200: string; gray300: string; gray400: string; gray500: string; gray600: string; gray700: string; gray800: string; gray900: string; borderDefault: string; borderFocus: string; borderError: string; bgDefault: string; bgSecondary: string; bgDisabled: string; textPrimary: string; textSecondary: string; textMuted: string; textDisabled: string; }` | **sí** | — |  |
| `shadows` | `{ sm: string; md: string; lg: string; }` | **sí** | — |  |
| `radius` | `{ sm: string; md: string; lg: string; full: string; }` | **sí** | — |  |
| `spacing` | `{ xs: string; sm: string; md: string; lg: string; xl: string; }` | **sí** | — |  |
| `fonts` | `{ default: string; sizeDefault: string; colorDefault: string; }` | **sí** | — |  |
| `density` | `"comfortable" \| "compact" \| "dense"  (Density)` |  | — |  |
| `densityTokens` | `DensityTokens` |  | — |  |

### `ThemeOverride`

```ts
interface ThemeOverride { [key: string]: string | number; }
```

### `themes`

```ts
themes: Record<string, Theme>
```
