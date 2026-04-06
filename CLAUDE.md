# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**flysoft-react-ui** is a TypeScript-first React UI component library published to npm. It provides themed components, context providers, hooks, helpers, and pre-built templates. Documentation and comments are in Spanish; code identifiers are in English.

## Commands

```bash
npm run dev            # Dev server on port 3112
npm run build          # Clean dist, Vite build, then emit TS declarations
npm run build:types    # Emit type declarations only (tsc -p tsconfig.lib.json)
npm run lint           # ESLint (v9 flat config)
npm run validate-docs  # Validate docs consistency
npm run update-docs    # Auto-update documentation from component metadata
npm run publish:patch  # Bump patch version and publish to npm
npm run publish:minor  # Bump minor version and publish to npm
```

No test framework is configured — there are no test files or test runner.

## Architecture

### Build & Exports

- **Vite library mode** — ES module only, single CSS file output, sourcemaps enabled.
- **Package exports:** `"."` → `dist/index.js` + types; `"./styles"` → `dist/index.css`.
- **Peer deps:** react 18/19, react-dom 18/19, dayjs.
- **Key deps:** Tailwind CSS v4, tailwind-merge, axios.
- All public API is re-exported from `src/index.ts` — consumers import only from `'flysoft-react-ui'`, never from internal paths.

### Source Layout

- `src/components/form-controls/` — Button, Input, AutocompleteInput, SearchSelectInput, DatePicker, DateInput, Checkbox, RadioButtonGroup, CurrencyInput, Pagination
- `src/components/layout/` — Card, AppLayout, DataTable, TabsGroup, TabPanel, Accordion, Menu, DropdownMenu, DropdownPanel, Filter, Collection, DataField
- `src/components/utils/` — Badge, Avatar, RoadMap, Dialog, Loader, FiltersDialog, Snackbar, SnackbarContainer, Skeleton
- `src/contexts/` — ThemeContext, AuthContext, CrudContext (generic `<T>`), SnackbarContext, AppLayoutContext, presets, types
- `src/hooks/` — useThemeOverride, useAsyncRequest, useBreakpoint, useElementScroll, useEnum, useGlobalThemeStyles
- `src/services/apiClient.ts` — Axios-based HTTP client
- `src/helpers/` — currencyFormat, getErrorMessage, getInitialLetters, queryStringToObject, objectToQueryString, regularExpressions, mappers
- `src/templates/` — Pre-built forms (Login, Registration, Contact), layouts (Dashboard, Sidebar), patterns (FormPattern)
- `src/docs/` — Dev-only; not exported in the package

### Theming System

All components use `--color-*`, `--font-*`, `--shadow-*`, `--radius-*` CSS variables (no `--flysoft-` prefix inside source). Theme presets (light, dark, blue, green) are defined in `src/contexts/presets.ts`. `ThemeProvider` injects CSS variables and persists selection to localStorage. Use `useTheme()` to read/set theme.

### Icons

FontAwesome 5 exclusively, **light style (fal)** by default. Components accept `icon="fa-*"` and internally normalize via `normalizeIconClass()` to `fal fa-*`. Never use other icon libraries.

### Component Conventions

- Props interfaces exported as `ComponentNameProps`
- Standard prop names: `variant`, `size` (`sm`/`md`/`lg`), `disabled`, `loading`, `icon`, `iconPosition`, `className`
- Components use Tailwind classes with CSS variable references (e.g., `text-[var(--color-text-primary)]`)
- Generic typing for DataTable<T> and CrudContext<T>

## Exported Components Quick Reference

### Form Controls (11)
Button, LinkButton, Input, AutocompleteInput\<T,K\>, SearchSelectInput\<T,K\>, DatePicker, DateInput, Checkbox, RadioButtonGroup, CurrencyInput, Pagination

### Layout (12)
Card, AppLayout, Collection, DataField, TabsGroup, TabPanel, DataTable\<T\>, Accordion, Menu\<T\>, DropdownMenu\<T\>, DropdownPanel, Filter

### Utility (10)
Badge, Avatar, RoadMap, Dialog, Loader, FiltersDialog, Snackbar, SnackbarContainer, Skeleton, ThemeSwitcher

### Contexts
ThemeProvider/useTheme, AuthProvider/AuthContext, CrudProvider\<T\>/useCrud\<T\>, SnackbarProvider/useSnackbar, AppLayoutProvider/useAppLayout

### Hooks
useThemeOverride, useTemporaryOverride, useGlobalThemeStyles, useBreakpoint, useElementScroll, useAsyncRequest, useEnum

### Services
apiClient (get/post/put/del/downloadFile/uploadFile), createApiClient, setApiClientTokenProvider

### Templates
LoginForm, RegistrationForm, ContactForm, DashboardLayout, SidebarLayout, FormPattern

### Helpers
currencyFormat, getErrorMessage, getInitialLetters, getQueryString, objectToQueryString, queryStringToObject, nameValueArrayToObject, promiseMapper, RegularExpressions

### Interfaces
NameValueInterface\<T\>, PaginationInterface\<T\>

## Standard Prop Patterns

- `variant`: `"primary" | "outline" | "ghost"` (buttons), `"default" | "elevated" | "outlined"` (cards/accordion)
- `size`: `"sm" | "md" | "lg"`
- `color`: `"primary" | "secondary" | "success" | "warning" | "danger" | "info"`
- `icon`: FontAwesome 5 class (e.g. `"fa-save"`), auto-normalized to light style
- Common: `disabled`, `loading`, `readOnly`, `className`, `compact`

## When Creating or Modifying Components

After creating a new component, update all of these:
1. `src/index.ts` — add export for component and its props type
2. `docs/component-metadata.json` — add component metadata
3. `flysoft-ui.config.ts` — add to COMPONENTS array
4. `.cursorrules` — add usage rules
5. `README.md` — add documentation
6. `AI_CONTEXT.md` — add complete props interface documentation
7. `CONSUMER_AI_RULES.md` — add to consumer reference
8. `AI_INTEGRATION_GUIDE.md` — add to component list in copy-paste prompt
9. `AGENT_INSTRUCTIONS.md` — add to component catalog tables

Place new components in the correct category folder (`form-controls/`, `layout/`, or `utils/`). Include a `COMPONENT_METADATA` export and JSDoc with `@example`. Always use theme CSS variables, never hardcoded colors.

After changes, run: `npm run validate-docs && npm run update-docs && npm run lint`

## AI Documentation Files

- `AI_CONTEXT.md` — Complete API reference with all prop interfaces, types, and usage examples (source of truth for AI models)
- `AGENT_INSTRUCTIONS.md` — Rules for AI agents maintaining this library (component creation checklist, naming conventions, CSS variables)
- `CONSUMER_AI_RULES.md` — Ready-to-copy reference for consumer projects (tables with all props, examples in Spanish)
- `AI_INTEGRATION_GUIDE.md` — Quick-start guide for consumer projects with copy-paste AI prompt
- `.cursorrules` — Cursor AI rules for this project
