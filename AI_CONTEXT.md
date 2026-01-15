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

### 1. Layouts (Priority for Page Structure)
- **AppLayout**: The main wrapper for applications.
  - **Props**: `navbar` (NavbarInterface), `leftDrawer` (LeftDrawerInterface), `children`.
  - **Usage**: Use this as the root component for your page routes.
- **DashboardLayout**: Specialized layout for dashboard views with statistics.
- **SidebarLayout**: Layout with a persistent sidebar.

### 2. Form Controls
- **Button / LinkButton**: Standard buttons. Supports `variant` ('primary' | 'secondary' | 'danger' | 'ghost') and `icon`.
- **Input**: Text inputs.
- **AutocompleteInput**: Searchable dropdown. Critical for foreign key selection.
- **DateInput / DatePicker**: Date handling.
- **Checkbox / RadioButtonGroup**: Boolean and option selection.
- **ThemeSwitcher**: Toggle between light/dark modes.

### 3. Data Display & Containers
- **DataTable<T>**: High-performance table.
  - **Props**: `columns` (array of definitions), `rows` (data), `isLoading`.
- **Card**: Generic container with shadow and rounded corners.
- **DataField**: Displays a Label + Value pair, useful for detail views.
- **Accordion**: Collapsible content sections.
- **Collection**: Renders a list of items using a render prop or component.
- **TabsGroup / TabPanel**: Tabbed interfaces.

### 4. Utilities & Feedback
- **Dialog**: Modal windows for confirmation or complex forms.
- **Snackbar**: Toast notifications. Requires `SnackbarContainer` at the app root.
- **Loader**: Visual loading indicator.
- **Badge / Avatar**: status indicators and user images.

## Common Patterns

### Basic Page Structure
```tsx
import { AppLayout, Card, Button } from 'flysoft-react-ui';

export default function Page() {
  return (
    <AppLayout
      navbar={{ title: "My Page" }}
    >
      <div className="p-4 space-y-4">
        <Card>
          <h2>Content</h2>
          <Button variant="primary" onClick={() => {}}>Action</Button>
        </Card>
      </div>
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

## Icons
The library is agnostic but pairs well with `lucide-react`. Pass icons as ReactNodes to props like `icon`, `startIcon`, or `endIcon`.
