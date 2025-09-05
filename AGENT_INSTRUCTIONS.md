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

### FontAwesome 5 Exclusivamente

```tsx
// ✅ Correcto
<i className="fa fa-user" />
<i className="fa fa-envelope" />
<i className="fa fa-lock" />

// ❌ Incorrecto
<i className="lucide-user" />
<Icon name="user" />
```

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

## 🎯 Objetivos de Mantenimiento

1. **Consistencia**: Mantener consistencia en el diseño y API
2. **Documentación**: Mantener documentación actualizada
3. **Compatibilidad**: Mantener retrocompatibilidad
4. **Automatización**: Automatizar actualizaciones de documentación
5. **Calidad**: Mantener alta calidad de código y documentación

---

**IMPORTANTE**: Estas reglas deben seguirse estrictamente para mantener la integridad y consistencia de la librería flysoft-react-ui.
