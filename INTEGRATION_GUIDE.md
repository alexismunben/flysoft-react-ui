# Guía de Integración para Proyectos Cliente

Esta guía resume qué configurar en los proyectos que consumen `flysoft-react-ui`, incluyendo agentes de IA.

## 1) Instalar la librería

```bash
npm install flysoft-react-ui
```

## 2) Configuración mínima en la app cliente

```tsx
import { ThemeProvider } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

export function AppRoot() {
  return <ThemeProvider initialTheme="light">{/* app */}</ThemeProvider>;
}
```

## 3) Qué crear en el proyecto cliente para IA

Crear uno de estos archivos en la raíz (según herramienta):
- `.cursorrules` (Cursor)
- `AGENTS.md` (agentes tipo Claude Code / Codex / terminal agents)
- `copilot-instructions.md` (GitHub Copilot)

Contenido recomendado:

```md
El proyecto usa `flysoft-react-ui` como librería UI principal.

Reglas:
1. Importar siempre desde `flysoft-react-ui` (nunca rutas internas).
2. Priorizar componentes existentes antes de crear componentes nuevos.
3. Usar tipos exportados por la librería para TypeScript.
4. Mantener `import "flysoft-react-ui/styles";` en el root de la app.
5. No usar ni referenciar `docs/*` del paquete (es interno de desarrollo).

Componentes preferidos:
- Formularios: Button, Input, AutocompleteInput, SearchSelectInput, DatePicker, DateInput, Checkbox, RadioButtonGroup, CurrencyInput.
- Estructura/datos: Card, AppLayout, DataTable, TabsGroup, TabPanel, Collection, DataField, Pagination.
- Utilidades: Dialog, Snackbar, Loader, Badge, Avatar, Skeleton, RoadMap, Filter, FiltersDialog.
```

## 4) Convenciones recomendadas para prompts

Cuando pidas UI al agente, incluye:
- objetivo funcional ("formulario de login", "tabla con filtros"),
- restricción de librería ("usar flysoft-react-ui"),
- nivel de reutilización ("evitar componentes custom salvo wrappers de negocio").

Ejemplo:
`Construye una pantalla de usuarios con DataTable, filtros y Dialog usando flysoft-react-ui.`

## 5) Importante sobre carpeta `docs`

`src/docs/**` en esta librería es solo para demo local y no forma parte de la API pública.  
Los proyectos cliente no deben importar ni depender de elementos de `docs`.
