# Sistema de Temas Personalizables - Flysoft React UI

## Descripción General

El sistema de temas personalizables de Flysoft React UI proporciona una solución completa para gestionar y personalizar la apariencia de los componentes. Está construido con TypeScript, utiliza la Context API de React y se integra perfectamente con Tailwind CSS.

## Características Principales

- ✅ **Context API de React con TypeScript** - Gestión de estado robusta y tipada
- ✅ **Variables CSS personalizables** - Prefijo `--flysoft-` para evitar conflictos
- ✅ **Temas predefinidos** - Light, Dark, Blue y Green incluidos
- ✅ **Hook personalizado para override** - Personalización granular sin cambiar el tema completo
- ✅ **Integración con Tailwind CSS** - Compatibilidad total con clases de Tailwind
- ✅ **Persistencia en localStorage** - Los temas se mantienen entre sesiones
- ✅ **Sistema de fallbacks** - Valores por defecto para casos de error

## Estructura de Archivos

```
src/
├── contexts/
│   ├── types.ts              # Interfaces Theme y ThemeContextType
│   ├── ThemeContext.tsx      # Provider y hook useTheme
│   ├── presets.ts            # Temas predefinidos
│   └── index.ts              # Exportaciones del contexto
├── hooks/
│   └── useThemeOverride.ts   # Hook para override directo
└── styles.css                # Variables CSS con prefijo flysoft-
```

## Uso Básico

### 1. Configurar el ThemeProvider

```tsx
import { ThemeProvider } from "flysoft-react-ui";

function App() {
  return (
    <ThemeProvider initialTheme="light">
      {/* Tu aplicación aquí */}
    </ThemeProvider>
  );
}
```

### 2. Usar el hook useTheme

```tsx
import { useTheme } from "flysoft-react-ui";

function MyComponent() {
  const { theme, setTheme, currentThemeName, isDark } = useTheme();

  return (
    <div>
      <p>Tema actual: {currentThemeName}</p>
      <p>Es modo oscuro: {isDark ? "Sí" : "No"}</p>
      <button onClick={() => setTheme("dark")}>Cambiar a Dark</button>
    </div>
  );
}
```

### 3. Cambiar temas

```tsx
const { setTheme } = useTheme();

// Cambiar a tema predefinido
setTheme("dark");
setTheme("blue");
setTheme("green");

// Cambiar a tema personalizado
setTheme({
  name: "custom",
  colors: {
    /* ... */
  },
  // ... resto de propiedades
});
```

## Temas Predefinidos

### Light Theme (por defecto)

- Colores claros y modernos
- Ideal para aplicaciones empresariales
- Contraste optimizado para legibilidad

### Dark Theme

- Paleta oscura elegante
- Perfecto para aplicaciones nocturnas
- Reduce la fatiga visual

### Blue Theme

- Variación azul del tema light
- Ideal para aplicaciones técnicas
- Profesional y confiable

### Green Theme

- Variación verde del tema light
- Perfecto para aplicaciones ecológicas
- Fresco y natural

## Hook useThemeOverride

### Uso Básico

```tsx
import { useThemeOverride } from "flysoft-react-ui";

function MyComponent() {
  const { applyOverride, revertOverride } = useThemeOverride();

  const handleHover = () => {
    applyOverride({ primary: "#ff0000" });
  };

  const handleLeave = () => {
    revertOverride(["primary"]);
  };

  return (
    <div onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      Hover me!
    </div>
  );
}
```

### Override Temporal

```tsx
import { useTemporaryOverride } from "flysoft-react-ui";

function MyComponent() {
  const { applyTemporaryOverride } = useTemporaryOverride(
    { primary: "#ff0000" },
    2000 // 2 segundos
  );

  return (
    <button onClick={applyTemporaryOverride}>Aplicar override temporal</button>
  );
}
```

## Variables CSS Disponibles

### Colores

```css
--flysoft-primary          /* Color primario */
--flysoft-primary-contrast /* Contraste del primario */
--flysoft-primary-dark     /* Versión oscura del primario */
--flysoft-primary-light    /* Versión clara del primario */
--flysoft-secondary        /* Color secundario */
--flysoft-success          /* Color de éxito */
--flysoft-warning          /* Color de advertencia */
--flysoft-danger           /* Color de peligro */
--flysoft-info             /* Color informativo */
--flysoft-gray-50          /* Gris muy claro */
--flysoft-gray-900         /* Gris muy oscuro */
--flysoft-border-default   /* Color de borde por defecto */
--flysoft-border-focus     /* Color de borde en foco */
--flysoft-border-error     /* Color de borde de error */
--flysoft-bg-default       /* Color de fondo por defecto */
--flysoft-bg-secondary     /* Color de fondo secundario */
--flysoft-bg-disabled      /* Color de fondo deshabilitado */
--flysoft-text-primary     /* Color de texto principal */
--flysoft-text-secondary   /* Color de texto secundario */
--flysoft-text-muted       /* Color de texto atenuado */
--flysoft-text-disabled    /* Color de texto deshabilitado */
```

### Sombras

```css
--flysoft-shadow-sm        /* Sombra pequeña */
--flysoft-shadow-md        /* Sombra mediana */
--flysoft-shadow-lg        /* Sombra grande */
```

### Bordes

```css
--flysoft-radius-sm        /* Radio de borde pequeño */
--flysoft-radius-md        /* Radio de borde mediano */
--flysoft-radius-lg        /* Radio de borde grande */
--flysoft-radius-full      /* Radio de borde completo */
```

### Espaciado

```css
--flysoft-spacing-xs       /* Espaciado extra pequeño */
--flysoft-spacing-sm       /* Espaciado pequeño */
--flysoft-spacing-md       /* Espaciado mediano */
--flysoft-spacing-lg       /* Espaciado grande */
--flysoft-spacing-xl       /* Espaciado extra grande */
```

### Fuentes

```css
--flysoft-font-default     /* Familia de fuente por defecto */
--flysoft-font-size-default /* Tamaño de fuente por defecto */
--flysoft-font-color-default /* Color de fuente por defecto */
```

## Integración con Tailwind CSS

El sistema es completamente compatible con Tailwind CSS. Puedes usar las variables CSS en combinación con las clases de Tailwind:

```tsx
<div
  className="p-4 rounded-lg shadow-md"
  style={{
    backgroundColor: "var(--flysoft-bg-default)",
    color: "var(--flysoft-text-primary)",
    borderColor: "var(--flysoft-border-default)",
  }}
>
  Contenido con tema personalizado
</div>
```

## Casos de Uso Avanzados

### 1. Tema Personalizado

```tsx
const customTheme = {
  name: "brand",
  colors: {
    primary: "#1a365d",
    primaryContrast: "#ffffff",
    // ... resto de colores
  },
  // ... resto de propiedades
};

setTheme(customTheme);
```

### 2. Override por Componente

```tsx
function SpecialButton() {
  const { applyOverride, revertOverride } = useThemeOverride({
    scope: "local",
    element: buttonRef.current,
  });

  useEffect(() => {
    applyOverride({ primary: "#ff6b6b" });
    return () => revertOverride(["primary"]);
  }, []);

  return <button ref={buttonRef}>Botón especial</button>;
}
```

### 3. Detección de Tema del Sistema

```tsx
function App() {
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return (
    <ThemeProvider initialTheme={systemTheme}>
      {/* Tu aplicación */}
    </ThemeProvider>
  );
}
```

## API de Temas

### ThemeProvider Props

```tsx
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: string | Theme; // Tema inicial (default: 'light')
  storageKey?: string; // Clave para localStorage (default: 'flysoft-theme')
}
```

### useTheme Hook

```tsx
interface ThemeContextType {
  theme: Theme; // Tema actual
  setTheme: (theme: Theme | string) => void; // Función para cambiar tema
  currentThemeName: string; // Nombre del tema actual
  availableThemes: string[]; // Temas disponibles
  resetToDefault: () => void; // Resetear al tema por defecto
  isDark: boolean; // Si el tema actual es oscuro
}
```

### useThemeOverride Hook

```tsx
interface UseThemeOverrideOptions {
  scope?: 'global' | 'local';       // Alcance del override
  element?: HTMLElement | null;     // Elemento para override local
  prefix?: string;                  // Prefijo de variables CSS
}

// Retorna:
{
  applyOverride: (overrides: ThemeOverride) => void;
  revertOverride: (keys: string[]) => void;
  revertAllOverrides: () => void;
  getCSSVariable: (key: string) => string | null;
  isOverrideApplied: (key: string) => boolean;
  appliedOverridesCount: number;
}
```

## Migración desde Versiones Anteriores

Si estás migrando desde una versión anterior que usaba las variables CSS sin prefijo:

1. **Reemplaza las variables antiguas**:

   ```css
   /* Antes */
   color: var(--color-primary);

   /* Ahora */
   color: var(--flysoft-primary);
   ```

2. **Mantén compatibilidad**:
   Las variables antiguas siguen funcionando como alias de las nuevas.

3. **Actualiza gradualmente**:
   Puedes migrar componente por componente sin romper la funcionalidad.

## Mejores Prácticas

1. **Usa el ThemeProvider en el nivel más alto** de tu aplicación
2. **Aprovecha las variables CSS** en lugar de colores hardcodeados
3. **Utiliza useThemeOverride** para personalizaciones temporales
4. **Mantén consistencia** en el uso de colores del tema
5. **Prueba en diferentes temas** para asegurar accesibilidad

## Solución de Problemas

### El tema no se aplica

- Verifica que el componente esté dentro del ThemeProvider
- Revisa la consola del navegador para errores
- Confirma que las variables CSS se están aplicando en el DOM

### Variables CSS no se actualizan

- Asegúrate de que el tema se esté cambiando correctamente
- Verifica que las propiedades del tema tengan los nombres correctos
- Revisa que no haya CSS externo sobrescribiendo las variables

### Problemas de rendimiento

- Evita cambiar temas en renderizados frecuentes
- Usa useThemeOverride para cambios temporales
- Considera memoizar componentes que dependen del tema

## Contribución

Para contribuir al sistema de temas:

1. Mantén la compatibilidad con Tailwind CSS
2. Sigue el patrón de nomenclatura establecido
3. Agrega tests para nuevas funcionalidades
4. Documenta nuevos temas o características
5. Mantén la compatibilidad hacia atrás

## Licencia

MIT License - Ver archivo LICENSE para más detalles.
