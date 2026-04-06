# AI Integration Guide (Consumer Projects)

This file is designed to be copied into any client project that consumes `flysoft-react-ui`. It helps AI agents understand the complete API surface and generate correct code.

## 1) Install

```bash
npm install flysoft-react-ui
```

## 2) Required Runtime Setup

At app root:

```tsx
import { ThemeProvider } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

export function AppRoot() {
  return <ThemeProvider initialTheme="light">{/* app */}</ThemeProvider>;
}
```

For full app layout with navbar, sidebar, and snackbars:

```tsx
import { AppLayoutProvider } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

export function AppRoot() {
  return (
    <AppLayoutProvider
      initialTheme="light"
      initialNavbar={{ navBarLeftNode: <h1>Mi App</h1>, fullWidthNavbar: true }}
    >
      {/* routes */}
    </AppLayoutProvider>
  );
}
```

## 3) Copy-paste prompt for AI agents

Copy the following block into `.cursorrules`, `AGENTS.md`, `copilot-instructions.md`, `CLAUDE.md`, or your AI system prompt:

---

```md
This project uses `flysoft-react-ui` as the default UI library.

## Rules
1. Always import from `flysoft-react-ui` (top-level only). Never from internal paths.
2. Prefer existing library components before creating custom UI. Never duplicate Button, Input, Card, Badge, Dialog, etc.
3. Use exported TypeScript types for type safety (e.g. ButtonProps, DataTableColumn<T>).
4. Keep style import at app root only: `import "flysoft-react-ui/styles";`
5. Wrap app with `ThemeProvider` (or `AppLayoutProvider` for full layout).
6. Use FontAwesome 5 icon classes (`fa-*`). Components auto-normalize to light style (fal). Never use other icon libraries.
7. Use theme CSS variables for custom styling: `var(--color-primary)`, `var(--color-bg-default)`, etc.

## Available Components

### Form Controls
- `Button` — variant: "primary"|"outline"|"ghost", size: "sm"|"md"|"lg", color: "primary"|"secondary"|"success"|"warning"|"danger"|"info", icon, loading, bg, textColor
- `LinkButton` — Same as Button but renders as link. Props: to (route/URL), target, variant, size, color, icon
- `Input` — label, error, icon, iconPosition, size, onIconClick, readOnly. Extends HTML input attributes
- `AutocompleteInput<T,K>` — Searchable dropdown. Props: options, value, onChange, multiple, getOptionLabel, getOptionValue, renderOption, noResultsText
- `SearchSelectInput<T,K>` — Dialog-based async search. Props: onSearchPromiseFn, onSingleSearchPromiseFn, dialogTitle, getOptionLabel, getOptionValue
- `DatePicker` — Standalone calendar. Props: value (Dayjs), onChange, startWeekOn
- `DateInput` — Input with DatePicker dropdown. Props: value (Dayjs|string), onChange, format ("dd/mm/yyyy"|"mm/dd/yyyy")
- `Checkbox` — Props: label, labelPosition, error, size, readOnly
- `RadioButtonGroup` — Props: options ({label,value,disabled}[]), value, onChange, direction ("vertical"|"horizontal"), gap, size
- `CurrencyInput` — Numeric input formatted as currency (es-AR: 1.234,56). Props: value (number), onChange
- `Pagination` — URL-based pagination. Props: page, pages, total, isLoading, fieldName

### Layout & Data
- `Card` — Props: title, subtitle, headerActions, footer, variant ("default"|"elevated"|"outlined"), compact, alwaysDisplayHeaderActions
- `AppLayout` — Main layout. Props: navbar (NavbarInterface), leftDrawer (LeftDrawerInterface), children
- `Collection` — Flex container. Props: gap, direction, wrap
- `DataField` — Label+value pair. Props: label, value, inline, align, link
- `TabsGroup` + `TabPanel` — Tabbed interface. TabsGroup: tabs ({id,label}[]), paramName (URL sync). TabPanel: tabId
- `DataTable<T>` — Data table. Props: columns (DataTableColumn<T>[]), rows, maxRows, isLoading, loadingRows, compact, locale
  - DataTableColumn: header, value (key or function), type ("text"|"numeric"|"currency"|"date"), actions, width, align, tooltip, footer
- `Accordion` — Collapsible section. Props: title, icon, rightNode, defaultOpen, variant, onToggle
- `Menu<T>` — Simple menu list. Props: options, onOptionSelected, getOptionLabel, renderOption
- `DropdownMenu<T>` — Portal dropdown. Props: options, onOptionSelected, renderNode, openOnHover, replaceOnSingleOption
- `DropdownPanel` — Portal dropdown with arbitrary content. Props: children, renderNode, openOnHover
- `Filter` — Versatile filter by type. filterType: "text"|"number"|"date"|"autocomplete"|"search"|"searchSelect". Props: paramName (URL sync), label, value, onChange

### Utility & Feedback
- `Badge` — Props: variant, size, rounded, icon, iconPosition, bg, textColor, onClick
- `Avatar` — Props: text (for initials), image, bgColor, textColor, size
- `RoadMap` — Stage visualization. Props: stages ({name, description?, icon?, variant?, bg?, disabled?}[])
- `Dialog` — Modal. Props: isOpen, title, children, footer, onClose, closeOnOverlayClick, compact
- `Loader` — Loading indicator. Props: isLoading, text, keepContentWhileLoading, contentLoadingNode, overlayClassName
- `FiltersDialog` — Groups multiple filters in dialog. Props: filters (FilterConfig[])
- `Snackbar` — (Used internally) Toast notification
- `SnackbarContainer` — Place at root. Props: position, maxSnackbars
- `Skeleton` — Pulse placeholder. Props: className
- `ThemeSwitcher` — No props. Self-contained theme toggle

### Templates
- `LoginForm` — Props: onSubmit, loading, error, className
- `RegistrationForm` — Props: onSubmit, loading, error, className
- `ContactForm` — Props: onSubmit, loading, success, error, className
- `DashboardLayout` — Props: title, subtitle, stats (DashboardStat[]), actions, children
- `SidebarLayout` — Props: title, menuItems (MenuItem[]), user (User), onLogout, children
- `FormPattern` — Dynamic form builder. Props: title, fields (FormField[]), onSubmit, gridCols, submitText, submitIcon, loading, error, success
- `ListPattern<T>` — List page with Card + search + filters + pagination + DataTable. Props: title, columns, rows, searchParamName, onAdd, addButtonText, filtersNode, page, pages, total, isLoading, compact

### Contexts & Hooks
- `ThemeProvider` — initialTheme, storageKey, forceInitialTheme, onThemeChange
- `useTheme()` — Returns: theme, setTheme, updateTheme, currentThemeName, availableThemes, isDark, resetToDefault
- `AuthProvider` — getToken, getUserData, refreshToken, removeToken
- `AuthContext` — user, login, logout, isAuthenticated, isLoading
- `CrudProvider<T>` — getPromise, getItemPromise, postPromise, putPromise, deletePromise, urlParams, limit, pageParam
- `useCrud<T>()` — Returns: list, item, isLoading, pagination, fetchItems, fetchItem, createItem, updateItem, deleteItem, params, page, pages, total
- `SnackbarProvider` + `useSnackbar()` — showSnackbar(message, variant?, options?), removeSnackbar(id)
- `AppLayoutProvider` — Combines Theme + Snackbar + AppLayout. useAppLayout() to set navbar/drawer dynamically
- `useAsyncRequest(options)` — Returns: execute(fn), isLoading. Options: successMessage, errorMessage, onSuccess, onError
- `useBreakpoint()` — Returns: breakpoint, windowSize, isMobile, isTablet, isDesktop
- `useThemeOverride(options)` — Returns: applyOverride, revertOverride, revertAllOverrides
- `useElementScroll(ref)` — Returns: scrollY, scrollDirection
- `useEnum(enum)` — Returns: getArray(), getInstance(id)

### Services
- `apiClient` — HTTP client. Methods: get<T>, post<T>, put<T>, del<T>, getFile, downloadFile, uploadFile, openFile
- `setApiClientTokenProvider(fn)` — Set auth token globally
- `createApiClient(config)` — Create isolated API client instance

### Helpers
- `currencyFormat(n)` → "1.234,56"
- `getErrorMessage(error)` → user-friendly error string
- `getInitialLetters(text)` → "JP" from "Juan Pérez"
- `objectToQueryString(obj)` → "a=1&b=2"
- `queryStringToObject(str)` → {a: "1", b: "2"}
- `promiseMapper(promise, mapperFn)` — Maps paginated/array/single results
- `RegularExpressions` — .email, .dateString, .password(config)

### Interfaces
- `NameValueInterface<T>` — { name: string; value: T; extras?: any }
- `PaginationInterface<T>` — { list: T[]; limit: number; page: number; pages: number; total: number }

## Common Patterns

### CRUD List Page
​```tsx
<CrudProvider<User>
  getPromise={(params) => apiClient.get({ url: "/api/users", params })}
  deletePromise={{ execute: (u) => apiClient.del({ url: `/api/users/${u.id}` }), successMessage: "Eliminado" }}
  urlParams={["nombre"]}
>
  <UserList />
</CrudProvider>

function UserList() {
  const { list, isLoading, pagination, deleteItem } = useCrud<User>();
  const columns: DataTableColumn<User>[] = [
    { header: "Nombre", value: "name" },
    { header: "Email", value: "email" },
    { actions: (row) => [
      <Button key="del" variant="ghost" size="sm" icon="fa-trash" color="danger"
        loading={deleteItem.isLoading} onClick={() => deleteItem.execute(row)}>
        Eliminar
      </Button>
    ]}
  ];
  return (
    <Card title="Usuarios">
      <Filter filterType="text" paramName="nombre" label="Nombre" />
      <DataTable columns={columns} rows={list ?? []} isLoading={isLoading} />
      {pagination}
    </Card>
  );
}
​```

### Form with Async Save
​```tsx
const { execute, isLoading } = useAsyncRequest({
  successMessage: "Guardado exitosamente",
  errorMessage: (err) => getErrorMessage(err),
});

<Card title="Nuevo Usuario">
  <Input label="Nombre" value={name} onChange={(e) => setName(e.target.value)} icon="fa-user" />
  <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="fa-envelope" />
  <Button variant="primary" icon="fa-save" loading={isLoading}
    onClick={() => execute(() => apiClient.post({ url: "/api/users", body: { name, email } }))}>
    Guardar
  </Button>
</Card>
​```

### Dialog Confirmation
​```tsx
<Dialog isOpen={showConfirm} title="Confirmar eliminación" onClose={() => setShowConfirm(false)}
  footer={<>
    <Button variant="ghost" onClick={() => setShowConfirm(false)}>Cancelar</Button>
    <Button variant="primary" color="danger" icon="fa-trash" onClick={handleDelete}>Eliminar</Button>
  </>}
>
  <p>¿Está seguro?</p>
</Dialog>
​```

### List Page (without CrudContext)
Full implementation of Card + search + filters + pagination + DataTable. Uses URL query params for filters and pagination.
​```tsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Card, Button, Collection, Filter, Pagination, DataTable, Dialog,
} from "flysoft-react-ui";
import type { DataTableColumn } from "flysoft-react-ui";

interface User { id: number; name: string; email: string; role: string; }

function UserListPage() {
  const [searchParams] = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>();

  // Read filters from URL
  const search = searchParams.get("buscar") || "";
  const role = searchParams.get("rol") || "";
  const currentPage = Number(searchParams.get("pagina") || "1");

  useEffect(() => {
    setIsLoading(true);
    fetchUsers({ search, role, page: currentPage }).then((res) => {
      setUsers(res.list);
      setPage(res.page);
      setPages(res.pages);
      setTotal(res.total);
      setIsLoading(false);
    });
  }, [search, role, currentPage]);

  const columns: DataTableColumn<User>[] = [
    { header: "Nombre", value: (row) => row.name },
    { header: "Email", value: (row) => row.email },
    { header: "Rol", value: (row) => row.role },
    {
      align: "center",
      actions: (row) => [
        <Button key="edit" size="sm" variant="ghost" icon="fa-edit"
          onClick={() => handleEdit(row)}>Editar</Button>,
        <Button key="del" size="sm" variant="ghost" icon="fa-trash"
          onClick={() => { setSelectedUser(row); setShowDeleteDialog(true); }}>
          Eliminar
        </Button>,
      ],
    },
  ];

  return (
    <>
      <Card
        title="Usuarios"
        alwaysDisplayHeaderActions
        headerActions={
          <Button icon="fa-plus" onClick={() => handleAdd()}>
            Nuevo Usuario
          </Button>
        }
      >
        <div className="flex justify-between items-center my-2">
          <Collection direction="row" wrap>
            <Filter paramName="buscar" label="Buscar" filterType="search" />
            <Filter paramName="rol" label="Rol" filterType="autocomplete"
              options={[
                { label: "Admin", value: "admin" },
                { label: "Editor", value: "editor" },
              ]}
            />
          </Collection>
          <Collection direction="row" wrap>
            <Pagination page={page} pages={pages} total={total}
              fieldName="pagina" isLoading={isLoading} />
          </Collection>
        </div>
        <DataTable columns={columns} rows={users}
          isLoading={isLoading} loadingRows={10} maxRows={10} />
      </Card>

      <Dialog isOpen={showDeleteDialog} title="Eliminar usuario"
        onClose={() => setShowDeleteDialog(false)}
        footer={<>
          <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancelar</Button>
          <Button variant="primary" color="danger" icon="fa-trash"
            onClick={() => handleDelete(selectedUser)}>Eliminar</Button>
        </>}
      >
        <p>¿Está seguro de eliminar a {selectedUser?.name}?</p>
      </Dialog>
    </>
  );
}
​```

### List Page (using ListPattern template)
Same pattern as above but using the `ListPattern` template component for less boilerplate:
​```tsx
import { ListPattern, Filter } from "flysoft-react-ui";
import type { DataTableColumn } from "flysoft-react-ui";

const columns: DataTableColumn<User>[] = [
  { header: "Nombre", value: (row) => row.name },
  { header: "Email", value: (row) => row.email },
  { actions: (row) => [
    <Button key="edit" size="sm" variant="ghost" icon="fa-edit" onClick={() => edit(row)}>Editar</Button>,
  ]},
];

<ListPattern<User>
  title="Usuarios"
  columns={columns}
  rows={users}
  searchParamName="buscar"
  addButtonText="Nuevo"
  onAdd={() => setShowForm(true)}
  filtersNode={
    <Filter paramName="rol" label="Rol" filterType="autocomplete"
      options={[{ label: "Admin", value: "admin" }]} />
  }
  page={page} pages={pages} total={total}
  isLoading={isLoading}
/>
​```
```

---

## 4) Notes for library maintainers

- `src/docs/**` is local demo/dev-only and is not part of public API.
- Public API must be exported from `src/index.ts`.
- See `AI_CONTEXT.md` for complete prop interfaces and detailed documentation.
