# Integration Guide: Using Flysoft React UI with AI Agents

When using this library in another project (the "Consumer Project"), you need to inform your AI assistant (Cursor, Windsurf, Copilot, etc.) about how to use `flysoft-react-ui`.

## 1. Installation in Consumer Project
Ensure the library is installed in your consumer project:
```bash
npm install flysoft-react-ui
# or
npm install ../path/to/flysoft-react-ui # for local development
```

## 2. Configuring the AI
To ensure the AI understands the library and prioritizes its components, follow these steps based on your tool.

### Option A: Cursor IDE (.cursorrules)
Create a file named `.cursorrules` in the root of your **Consumer Project** and paste the content below.

### Option B: General Usage (System Prompt/Context)
If you are using a chat interface (ChatGPT, Claude, Gemini), paste the content below into the chat or upload it as a "Project Knowledge" file.

---

### 📋 Copy Content Below This Line 📋

You are working on a project that uses the `flysoft-react-ui` component library.
Use this library for all UI elements unless minimal HTML/CSS is strictly better.

# Flysoft React UI Documentation

## Import Rules
- **ALWAYS** import from `flysoft-react-ui`.
  - `import { Button, Card, AppLayout } from 'flysoft-react-ui';`
- **NEVER** import from subpaths like `flysoft-react-ui/dist/...`.

## Preferred Components
When the user asks for:
- **Layouts/Pages**: Use `AppLayout` or `DashboardLayout`.
- **Tables/Grids**: Use `DataTable`.
- **Forms**: Use `Input`, `AutocompleteInput` (for selects), `DatePicker`, `Checkbox`.
- **Containers**: Use `Card`.
- **Buttons**: Use `Button` (supports `variant="primary"|"secondary"|"danger"`).

## Usage Examples

**Page Layout:**
```tsx
import { AppLayout } from 'flysoft-react-ui';

export default function MyPage() {
  return (
    <AppLayout navbar={{ title: "Page Title" }}>
      {/* Page Content */}
    </AppLayout>
  );
}
```

**Form:**
```tsx
import { Button, Input, Card } from 'flysoft-react-ui';

<Card className="max-w-md mx-auto p-4">
  <Input label="Username" placeholder="Enter user" />
  <Button variant="primary" className="mt-4">Login</Button>
</Card>
```
