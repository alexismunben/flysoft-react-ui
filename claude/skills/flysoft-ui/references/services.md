<!-- Generado desde los tipos de flysoft-react-ui@1.4.3. No editar a mano. -->
<!-- Regenerar con: npm run docs:skill -->

# apiClient, helpers e interfaces

Cliente HTTP, funciones utilitarias y las interfaces compartidas.

## Tipos auxiliares

### `apiClient`

| Método | Devuelve | Descripción |
|---|---|---|
| `setTokenProvider(provider: TokenProvider \| undefined)` | `void` | Establece el proveedor de token que se usará en todas las peticiones |
| `clearTokenProvider()` | `void` | Limpia el proveedor de token |
| `updateDefaults(config: ApiClientConfig)` | `void` | Actualiza la configuración por defecto del cliente |
| `get<T = unknown>(options: GetRequestOptions)` | `Promise<T>` | Realiza una petición GET |
| `post<T = unknown>(options: PostRequestOptions)` | `Promise<T>` | Realiza una petición POST |
| `put<T = unknown>(options: PutRequestOptions)` | `Promise<T>` | Realiza una petición PUT |
| `patch<T = unknown>(options: PatchRequestOptions)` | `Promise<T>` | Realiza una petición PATCH |
| `del<T = unknown>(options: DeleteRequestOptions)` | `Promise<T>` | Realiza una petición DELETE |
| `getFile(options: FileRequestOptions)` | `Promise<FileResponse>` | Obtiene un archivo como Blob |
| `getFileAsUrl(options: FileRequestOptions)` | `Promise<string>` | Obtiene un archivo y retorna su URL como objeto |
| `openFile(options: FileRequestOptions)` | `Promise<void>` | Abre un archivo en una nueva ventana |
| `downloadFile(options: FileRequestOptions)` | `Promise<void>` | Descarga un archivo |
| `uploadFile<T = unknown>(options: UploadFileOptions)` | `Promise<T>` | Sube uno o más archivos usando FormData |

**Formas de los parámetros**

`ApiClientConfig`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `baseURL` | `string` |  | — |  |
| `timeout` | `number` |  | — |  |
| `headers` | `Record<string, string>` |  | — |  |

`DeleteRequestOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `url` | `string` | **sí** | — |  |
| `headers` | `Record<string, string>` |  | — |  |

`FileRequestOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `url` | `string` | **sí** | — |  |
| `headers` | `Record<string, string>` |  | — |  |

`GetRequestOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `url` | `string` | **sí** | — |  |
| `params` | `Record<string, unknown>` |  | — |  |
| `headers` | `Record<string, string>` |  | — |  |

`PatchRequestOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `url` | `string` | **sí** | — |  |
| `body` | `unknown` |  | — |  |
| `headers` | `Record<string, string>` |  | — |  |

`PostRequestOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `url` | `string` | **sí** | — |  |
| `body` | `unknown` |  | — |  |
| `headers` | `Record<string, string>` |  | — |  |

`PutRequestOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `url` | `string` | **sí** | — |  |
| `body` | `unknown` |  | — |  |
| `headers` | `Record<string, string>` |  | — |  |

`UploadFileOptions`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `url` | `string` | **sí** | — |  |
| `files` | `FileList \| File[]` | **sí** | — |  |
| `headers` | `{ paramName?: string; [key: string]: unknown; }` |  | — |  |

### `ApiClientConfig`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `baseURL` | `string` |  | — |  |
| `timeout` | `number` |  | — |  |
| `headers` | `Record<string, string>` |  | — |  |

### `clearApiClientTokenProvider`

Limpia el proveedor de token global

```ts
clearApiClientTokenProvider: () => void
```

### `createApiClient`

Crea una nueva instancia del cliente de API

```ts
createApiClient: (config?: ApiClientConfig) => ApiClientService
```

### `currencyFormat`

```ts
currencyFormat: (value: number) => string
```

### `getErrorMessage`

```ts
getErrorMessage: (error: any) => string
```

### `getInitialLetters`

```ts
getInitialLetters: (text: string) => string
```

### `getQueryString`

```ts
getQueryString: (params: URLSearchParams, newParams: any) => string
```

### `nameValueArrayToObject`

```ts
nameValueArrayToObject: <T>(nameValueArray: Array<NameValueInterface<T>>) => {}
```

### `NameValueInterface`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `name` | `string` | **sí** | — |  |
| `value` | `T` | **sí** | — |  |
| `extras` | `any` |  | — |  |

### `objectToQueryString`

```ts
objectToQueryString: (source: any) => string
```

### `PaginationInterface`

| Prop | Tipo | Req. | Default | Descripción |
|---|---|---|---|---|
| `list` | `Array<T>` | **sí** | — |  |
| `limit` | `number` | **sí** | — |  |
| `page` | `number` | **sí** | — |  |
| `pages` | `number` | **sí** | — |  |
| `total` | `number` | **sí** | — |  |

### `promiseMapper`

```ts
promiseMapper: <T, K>(promise: Promise<any>, mapperFunction: (object: T) => K) => Promise<K | K[] | PaginationInterface<K>>
```

### `queryStringToObject`

```ts
queryStringToObject: (params: string) => {}
```

### `RegularExpressions`

```ts
RegularExpressions: { email: RegExp; dateString: RegExp; password: ({ minLength, lowerCaseMin, upperCaseMin, digitsMin, specialCharMin }: { minLength?: number | undefined; lowerCaseMin?: number | undefined; upperCaseMin?: number | undefined; digitsMin?: number | undefined; specialCharMin?: number | undefined; }) => RegExp; }
```

### `setApiClientTokenProvider`

Establece el proveedor de token global para el cliente compartido

```ts
setApiClientTokenProvider: (provider: TokenProvider | undefined) => void
```
