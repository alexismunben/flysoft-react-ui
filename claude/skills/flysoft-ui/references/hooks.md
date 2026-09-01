<!-- Generado desde los tipos de flysoft-react-ui@1.4.3. No editar a mano. -->
<!-- Regenerar con: npm run docs:skill -->

# Providers, hooks y context types

Los providers montan el contexto; los hooks lo leen. Para cada hook se incluye la forma de lo que devuelve, porque es la mitad de su API.

## ThemeProvider

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `ReactNode` | **sí** | — |  |
| `initialTheme` | `string \| Theme` |  | `"light"` |  |
| `storageKey` | `string` |  | `"flysoft-theme"` |  |
| `forceInitialTheme` | `boolean` |  | `false` |  |
| `onThemeChange` | `(theme: Theme) => void` |  | — |  |
| `density` | `"comfortable" \| "compact" \| "dense"  (Density)` |  | — | Densidad global inicial. Controla padding, tipografía y altura de los controles de toda la librería sin necesidad de pasar `compact`/`size` por componente. |
| `densityStorageKey` | `string` |  | `"flysoft-density"` | Clave separada para persistir la densidad en localStorage. |
| `forceInitialDensity` | `boolean` |  | `false` | Si es true, ignora el valor guardado en localStorage y fuerza `density`. |
| `onDensityChange` | `(density: Density) => void` |  | — |  |

## AppLayoutProvider

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `ReactNode` | **sí** | — |  |
| `initialTheme` | `string \| Theme` |  | `"light"` |  |
| `storageKey` | `string` |  | `"flysoft-theme"` |  |
| `forceInitialTheme` | `boolean` |  | `false` |  |
| `density` | `"comfortable" \| "compact" \| "dense"  (Density)` |  | — |  |
| `densityStorageKey` | `string` |  | — |  |
| `forceInitialDensity` | `boolean` |  | — |  |
| `onDensityChange` | `(density: Density) => void` |  | — |  |
| `initialNavbar` | `NavbarInterface` |  | — |  |
| `initialLeftDrawer` | `LeftDrawerInterface` |  | — |  |
| `initialContentFooter` | `ReactNode` |  | — |  |
| `className` | `string` |  | `""` |  |

## AuthProvider

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `React.ReactNode` | **sí** | — |  |
| `getToken` | `(username: string, password: string) => Promise<AuthTokenInterface>` | **sí** | — |  |
| `getUserData` | `(auth: AuthTokenInterface) => Promise<AuthContextUserInterface>` | **sí** | — |  |
| `refreshToken` | `(auth: AuthTokenInterface) => Promise<AuthTokenInterface>` |  | — |  |
| `removeToken` | `(auth: AuthTokenInterface) => Promise<void>` |  | — |  |
| `showLog` | `boolean` |  | `false` |  |

## CrudProvider\<T\>

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `ReactNode` | **sí** | — |  |
| `getPromise` | `\| ((params?: Record<string, any>) => Promise<Array<T> \| PaginationInterface<T> \| undefined>) \| PromiseWithOptions< Array<T> \| PaginationInterface<T> \| undefined, [params?: Record<string, any>] >` |  | — |  |
| `getItemPromise` | `\| ((id: string \| number) => Promise<T \| undefined>) \| PromiseWithOptions<T \| undefined, [id: string \| number]>` |  | — |  |
| `postPromise` | `\| ((item: T) => Promise<T \| undefined \| null>) \| PromiseWithOptions<T \| undefined \| null, [item: T]>` |  | — |  |
| `putPromise` | `\| ((item: T) => Promise<T \| undefined \| null>) \| PromiseWithOptions<T \| undefined \| null, [item: T]>` |  | — |  |
| `deletePromise` | `\| ((item: T) => Promise<void>) \| PromiseWithOptions<void, [item: T]>` |  | — |  |
| `urlParams` | `Array<string>` |  | `[]` |  |
| `limit` | `number` |  | `15` |  |
| `pageParam` | `string` |  | `"pagina"` |  |
| `singleItemId` | `string \| number` |  | — |  |
| `extraData` | `Record<string, any>` |  | — |  |

## SnackbarProvider

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `children` | `ReactNode` | **sí** | — |  |

## Tipos auxiliares

### `AppLayoutContextType`

Extiende `ThemeContextType`.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `navbar` | `NavbarInterface \| undefined` | **sí** | — |  |
| `leftDrawer` | `LeftDrawerInterface \| undefined` | **sí** | — |  |
| `contentFooter` | `ReactNode \| undefined` | **sí** | — |  |
| `className` | `string` | **sí** | — |  |
| `setNavbar` | `Dispatch<SetStateAction<NavbarInterface \| undefined>>` | **sí** | — |  |
| `setLeftDrawer` | `Dispatch<SetStateAction<LeftDrawerInterface \| undefined>>` | **sí** | — |  |
| `setContentFooter` | `(node: ReactNode \| undefined) => void` | **sí** | — |  |
| `setClassName` | `(className: string) => void` | **sí** | — |  |
| `setNavBarLeftNode` | `(node: string \| ReactNode \| undefined) => void` | **sí** | — |  |
| `setNavbarRightNode` | `(node: string \| ReactNode \| undefined) => void` | **sí** | — |  |
| `isLeftDrawerOpen` | `boolean` | **sí** | — |  |
| `openLeftDrawer` | `() => void` | **sí** | — |  |
| `closeLeftDrawer` | `() => void` | **sí** | — |  |
| `toggleLeftDrawer` | `() => void` | **sí** | — |  |

### `AsyncRequestOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `successMessage` | `string` |  | — |  |
| `errorMessage` | `string \| ((error: any) => string)` |  | — |  |
| `successVariant` | `\| "primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"  (SnackbarVariant)` |  | — |  |
| `errorVariant` | `\| "primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"  (SnackbarVariant)` |  | — |  |
| `onSuccess` | `(data: any) => void` |  | — |  |
| `onError` | `(error: any) => void` |  | — |  |
| `onFinally` | `() => void` |  | — |  |

### `AuthContext`

```ts
AuthContext: import("D:/development/flysoft-react-ui/node_modules/@types/react/index").Context<AuthContextType>
```

### `AuthContextType`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `user` | `AuthContextUserInterface \| null` | **sí** | — |  |
| `login` | `(username: string, password: string) => Promise<void>` | **sí** | — |  |
| `logout` | `() => void` | **sí** | — |  |
| `isAuthenticated` | `boolean` | **sí** | — |  |
| `isLoading` | `boolean` | **sí** | — |  |

### `AuthContextUserInterface`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `id` | `number \| string` |  | — |  |
| `name` | `string` |  | — |  |
| `aditionalData` | `any` |  | — |  |
| `token` | `AuthTokenInterface` |  | — |  |

### `AuthTokenInterface`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `accessToken` | `string` |  | — |  |
| `expires` | `string` |  | — |  |
| `tokenType` | `string` |  | — |  |
| `refreshToken` | `string` |  | — |  |
| `aditionalData` | `any` |  | — |  |

### `Breakpoint`

```ts
type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
```

### `BreakpointInfo`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `breakpoint` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"  (Breakpoint)` | **sí** | — |  |
| `windowSize` | `WindowSize` | **sí** | — |  |
| `isMobile` | `boolean` | **sí** | — |  |
| `isTablet` | `boolean` | **sí** | — |  |
| `isDesktop` | `boolean` | **sí** | — |  |

### `CrudContext`

```ts
CrudContext: import("D:/development/flysoft-react-ui/node_modules/@types/react/index").Context<CrudContextType<any> | undefined>
```

### `CrudContextType`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `list` | `Array<T> \| undefined` | **sí** | — |  |
| `item` | `T \| undefined` | **sí** | — |  |
| `page` | `number` | **sí** | — |  |
| `pages` | `number` | **sí** | — |  |
| `total` | `number` | **sí** | — |  |
| `limit` | `number` | **sí** | — |  |
| `isLoading` | `boolean` | **sí** | — |  |
| `pagination` | `ReactNode` | **sí** | — |  |
| `params` | `Record<string, any>` | **sí** | — |  |
| `extraData` | `Record<string, any>` |  | — |  |
| `setExtraData` | `Dispatch<SetStateAction<Record<string, any> \| undefined>>` | **sí** | — |  |
| `fetchItems` | `{ execute: (params?: Record<string, any>) => Promise<void>; isLoading: boolean; }` | **sí** | — |  |
| `fetchItem` | `{ execute: (params?: Record<string, any> \| string \| number) => Promise<T \| undefined>; isLoading: boolean; }` | **sí** | — |  |
| `createItem` | `{ execute: (item: T) => Promise<T \| undefined \| null>; isLoading: boolean; }` | **sí** | — |  |
| `updateItem` | `{ execute: (item: T) => Promise<T \| undefined \| null>; isLoading: boolean; }` | **sí** | — |  |
| `deleteItem` | `{ execute: (item: T) => Promise<void>; isLoading: boolean; }` | **sí** | — |  |

### `LeftDrawerContext`

```ts
LeftDrawerContext: import("D:/development/flysoft-react-ui/node_modules/@types/react/index").Context<LeftDrawerContextType | undefined>
```

### `LeftDrawerContextType`

Comandos para controlar el drawer izquierdo del AppLayout. En resoluciones grandes el drawer está siempre visible, por lo que `closeLeftDrawer()` no produce ningún cambio visual. En móvil/tablet el drawer se muestra como panel flotante con overlay y estos comandos lo abren o cierran.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `isLeftDrawerOpen` | `boolean` | **sí** | — | Indica si el drawer móvil está abierto |
| `isLeftDrawerCollapsible` | `boolean` | **sí** | — | Indica si el drawer se está mostrando como panel colapsable con overlay (móvil/tablet con contenido en el drawer). En desktop es `false`. |
| `openLeftDrawer` | `() => void` | **sí** | — | Abre el drawer |
| `closeLeftDrawer` | `() => void` | **sí** | — | Cierra el drawer |
| `toggleLeftDrawer` | `() => void` | **sí** | — | Alterna el estado del drawer |

### `SnackbarActionsType`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `showSnackbar` | `(message: string, variant?: SnackbarVariant, options?: { duration?: number; icon?: string; iconLabel?: string; }) => void` | **sí** | — |  |
| `removeSnackbar` | `(id: string) => void` | **sí** | — |  |

### `SnackbarContextType`

Extiende `SnackbarActionsType`.

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `snackbars` | `SnackbarMessage[]` | **sí** | — |  |

### `SnackbarMessage`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `id` | `string` | **sí** | — |  |
| `message` | `string` | **sí** | — |  |
| `variant` | `\| "primary" \| "secondary" \| "success" \| "warning" \| "danger" \| "info"  (SnackbarVariant)` | **sí** | — |  |
| `duration` | `number` |  | — |  |
| `icon` | `string` |  | — |  |
| `iconLabel` | `string` |  | — |  |

### `SnackbarVariant`

```ts
type SnackbarVariant = | "primary" | "secondary" | "success" | "warning" | "danger" | "info"
```

### `ThemeContextType`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `theme` | `Theme` | **sí** | — |  |
| `setTheme` | `(theme: Theme \| string) => void` | **sí** | — |  |
| `updateTheme` | `(updates: Partial<Theme> \| ((prev: Theme) => Theme)) => void` | **sí** | — |  |
| `currentThemeName` | `string` | **sí** | — |  |
| `availableThemes` | `string[]` | **sí** | — |  |
| `resetToDefault` | `() => void` | **sí** | — |  |
| `isDark` | `boolean` | **sí** | — |  |
| `density` | `"comfortable" \| "compact" \| "dense"  (Density)` | **sí** | — |  |
| `setDensity` | `(density: Density) => void` | **sí** | — |  |

### `useAppLayout`

```ts
useAppLayout: () => AppLayoutContextType
```

### `useAppLayoutContext`

```ts
useAppLayoutContext: () => boolean
```

### `useAsyncRequest`

```ts
useAsyncRequest: (options?: AsyncRequestOptions) => UseAsyncRequestReturn
```

### `UseAsyncRequestReturn`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `isLoading` | `boolean` | **sí** | — |  |
| `execute` | `<T>(requestFn: () => Promise<T>) => Promise<T \| undefined>` | **sí** | — |  |
| `setLoading` | `(loading: boolean) => void` | **sí** | — |  |

### `useBreakpoint`

```ts
useBreakpoint: () => BreakpointInfo
```

### `useCrud`

```ts
useCrud: <T>() => CrudContextType<T>
```

### `useElementScroll`

```ts
useElementScroll: (elementRef: React.RefObject<HTMLElement | null>) => { scrollY: number; scrollDirection: "up" | "down" | null; }
```

### `useEnum`

```ts
useEnum: (baseEnum: any) => { getArray: () => NameValueInterface<number>[]; getInstance: (id: number) => NameValueInterface<number> | undefined; }
```

### `useGlobalThemeStyles`

Hook que aplica estilos globales del tema al body y html Útil para aplicaciones host que quieren que el tema afecte toda la página

```ts
useGlobalThemeStyles: () => void
```

### `useLeftDrawer`

Hook para controlar el drawer izquierdo desde cualquier componente renderizado dentro de `AppLayout` (contenido del drawer, navbar, footer o children).

```ts
useLeftDrawer: () => LeftDrawerContextType
```

```tsx
const { closeLeftDrawer } = useLeftDrawer();

<LinkButton to="/inicio" onClick={closeLeftDrawer}>Inicio</LinkButton>
```

### `useOptionalLeftDrawer`

Igual que `useLeftDrawer` pero devuelve `undefined` en lugar de lanzar error cuando el componente se usa fuera de un `AppLayout`. Útil para componentes reutilizables que pueden renderizarse dentro o fuera del layout.

```ts
useOptionalLeftDrawer: () => LeftDrawerContextType | undefined
```

### `useSnackbar`

```ts
useSnackbar: () => SnackbarActionsType
```

### `useSnackbarState`

```ts
useSnackbarState: () => SnackbarMessage[]
```

### `useTemporaryOverride`

Hook para aplicar overrides temporales que se revierten automáticamente

```ts
useTemporaryOverride: (overrides: ThemeOverride, duration?: number, options?: UseThemeOverrideOptions) => { applyTemporaryOverride: () => () => void; }
```

### `useTheme`

```ts
useTheme: () => ThemeContextType
```

### `useThemeContext`

```ts
useThemeContext: () => boolean
```

### `useThemeOverride`

Hook para aplicar overrides directos a variables CSS del tema Permite personalización granular sin cambiar el tema completo

```ts
useThemeOverride: (options?: UseThemeOverrideOptions) => { applyOverride: (overrides: ThemeOverride) => void; revertOverride: (keys: string[]) => void; revertAllOverrides: () => void; getCSSVariable: (key: string) => string | null; isOverrideApplied: (key: string) => boolean; appliedOverridesCount: number; }
```

### `WindowSize`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `width` | `number` | **sí** | — |  |
| `height` | `number` | **sí** | — |  |
