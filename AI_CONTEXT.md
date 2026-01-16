# Flysoft React UI - AI Context & Documentation

This document serves as the source of truth for AI models (Gemini, Claude, GPT, etc.) when generating code that consumes the `flysoft-react-ui` library.

## Library Philosophy
`flysoft-react-ui` is a React component library built with TypeScript. It emphasizes a consistent look and feel, ease of use, and "premium" aesthetics out of the box.

## 🚨 Critical Rules for AI
1. **Top-Level Imports Only**: Always import components from the root package `flysoft-react-ui`.
   - **CORRECT**: `import { Button, Card } from 'flysoft-react-ui';`
   - **INCORRECT**: `import { Button } from 'flysoft-react-ui/components/Button';`
2. **TypeScript First**: Use the exported types (e.g., `ButtonProps`, `DataTableColumn`) to ensure type safety.
3. **No Direct Style Imports**: Do not import CSS files from the library (like `flysoft-react-ui/dist/index.css`) in components. This is handled at the app root.

## Component Categorization

### 1. Layouts & Structure
- **AppLayout**: The main wrapper for applications.
  - **Props**: `navbar` (NavbarInterface), `leftDrawer` (LeftDrawerInterface), `children`.
- **Card**: Generic container with shadow and rounded corners.
- **Accordion**: Collapsible content sections.
- **Collection**: Renders a list of items using a render prop or component.
- **TabsGroup / TabPanel**: Tabbed interfaces.
- **Menu**: Menu component.
- **DropdownMenu / DropdownPanel**: Components for building drop-down menus.
- **DashboardLayout**: Specialized layout for dashboard views with statistics.
- **SidebarLayout**: Layout with a persistent sidebar.

### 2. Form Controls
- **Button / LinkButton**: Standard buttons. Supports `variant` ('primary' | 'secondary' | 'danger' | 'ghost') and `icon`.
- **Input**: Text inputs.
- **AutocompleteInput**: Searchable dropdown.
- **SearchSelectInput**: Specialized input for selecting from search results.
- **DatePicker / DateInput**: Date picking and input.
- **Checkbox**: Boolean selection.
- **RadioButtonGroup**: Single selection from a group.
- **ThemeSwitcher**: Component to toggle theme (light/dark).
- **FormPattern**: Template pattern for building forms.

### 3. Data Display
- **DataTable<T>**: High-performance table.
  - **Props**: `columns` (array of definitions), `rows` (data), `isLoading`.
- **DataField**: Displays a Label + Value pair, useful for detail views.
- **Pagination**: Pagination controls.

### 4. Utilities & Feedback
- **Dialog**: Modal windows for confirmation or complex forms.
- **Filter / FiltersDialog**: Components for filtering lists/tables.
- **Snackbar**: Toast notifications. Requires `SnackbarContainer` at the app root.
- **Loader**: Visual loading indicator.
- **Badge**: Status indicators.
- **Avatar**: User profile images.
- **RoadMap**: Progress or stage visualization.

### 5. Ready-to-use Templates
- **LoginForm**
- **RegistrationForm**
- **ContactForm**

## Common Patterns

### Basic Page Usage (Simple Card)
Use this pattern for simple pages that do not require the full `AppLayout` wrapper or when inserting into an existing structure.
```tsx
import { Card, Button } from 'flysoft-react-ui';

export default function SimplePage() {
  return (
    <div className="p-4">
      <Card>
        <h2 className="text-xl font-bold mb-4">Content Title</h2>
        <p className="mb-4">This is the content within a basic card.</p>
        <Button variant="primary" onClick={() => console.log('Clicked')}>
          Action
        </Button>
      </Card>
    </div>
  );
}
```

### Full Page Layout
```tsx
import { AppLayout } from 'flysoft-react-ui';

export default function Page() {
  return (
    <AppLayout
      navbar={{ title: "My Page" }}
    >
      {/* Children content goes here */}
    </AppLayout>
  );
}
```

### Data Table Usage
```tsx
import { DataTable, DataTableColumn } from 'flysoft-react-ui';

interface User { id: number; name: string; }

const columns: DataTableColumn<User>[] = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Name', accessorKey: 'name' },
];

<DataTable columns={columns} rows={users} />
```

## Contexts & State Management

### 1. AuthContext
Manages user authentication state.
- **Provider**: `AuthProvider`
- **Hook**: `useContext(AuthContext)`
- **Key Features**: `user`, `login`, `logout`, `isAuthenticated`.
```tsx
import { AuthProvider, AuthContext } from 'flysoft-react-ui';

// Wrap app
<AuthProvider
  getToken={async (user, pass) => ({ token: '...' })}
  getUserData={async (token) => ({ id: 1, name: 'User' })}
>
  <App />
</AuthProvider>

// Use
const { login, user } = useContext(AuthContext);
```

### 2. CrudContext<T>
Powerful context for managing standard CRUD operations with pagination, filtering, and loading states.
- **Provider**: `CrudProvider<T>`
- **Hook**: `useCrud<T>()`
- **Key Features**: Auto-fetching, `list`, `item`, `pagination` node, `isLoading`, CRUD actions (`createItem`, `updateItem`, `deleteItem`).

**Usage:**
```tsx
import { CrudProvider, useCrud, DataTable } from 'flysoft-react-ui';

function UserList() {
  const { list, isLoading, pagination } = useCrud<User>();
  return (
    <div>
      <DataTable rows={list} isLoading={isLoading} ... />
      {pagination}
    </div>
  );
}

// Wrapper
<CrudProvider
  getPromise={userApi.getAll}
  postPromise={userApi.create}
  putPromise={userApi.update}
  deletePromise={userApi.delete}
>
  <UserList />
</CrudProvider>
```

### 3. AppLayoutContext
Controls the global layout state (navbar, visual settings). usually handled internally by `AppLayout` but accessible if needed.
- **Provider**: `AppLayoutProvider`
- **Hook**: `useAppLayout()`

### 4. ThemeContext
Manages the visual theme of the application.
- **Provider**: `ThemeProvider`
- **Hook**: `useTheme()`
- **Features**: Switch between `light`, `dark`, `blue`, `green` themes or custom themes.

```tsx
## Hooks & Services

### 1. apiClient (Service)
A singleton wrapper around Axios with built-in token management and simplified methods.
- **Methods**: `get`, `post`, `put`, `del`, `getFile`, `downloadFile`, `uploadFile`.
- **Configuration**: Use `setApiClientTokenProvider(() => token)` to handle auth globally.

```tsx
import { apiClient } from 'flysoft-react-ui';

// GET request
const users = await apiClient.get<User[]>({ url: '/api/users' });

// POST request with body
const result = await apiClient.post({ url: '/api/users', body: newUser });

// Download file (handles blob and filename automatically)
await apiClient.downloadFile({ url: '/api/report/pdf' });
```

### 2. useAsyncRequest (Hook)
Simplifies handling async operations (loading states, success/error messages via Snackbar).
- **Props**: `successMessage`, `errorMessage`, `onSuccess`, `onError`.
- **Returns**: `execute(promiseFn)`, `isLoading`.

```tsx
import { useAsyncRequest, apiClient } from 'flysoft-react-ui';

function UserForm() {
  const { execute, isLoading } = useAsyncRequest({
    successMessage: "User created successfully!",
    errorMessage: "Failed to create user."
  });

  const handleSubmit = async (data) => {
    await execute(async () => {
      await apiClient.post({ url: '/api/users', body: data });
    });
  };

  return <Button loading={isLoading} onClick={handleSubmit}>Save</Button>;
}