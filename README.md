# Flysoft React UI

Una biblioteca de componentes React moderna y accesible construida con TypeScript, Tailwind CSS y FontAwesome 5. Incluye formularios, layouts, temas y templates para desarrollo rápido.

## 🚀 Características

- **TypeScript First**: Completamente tipado con TypeScript
- **Tailwind CSS**: Utiliza Tailwind CSS para estilos consistentes y personalizables
- **FontAwesome 5**: Iconos vectoriales de alta calidad integrados
- **Accesible**: Componentes que siguen las mejores prácticas de accesibilidad
- **Personalizable**: Fácil de personalizar con clases de Tailwind
- **Tree-shakable**: Solo importa los componentes que uses
- **🎨 Sistema de Temas**: Sistema completo de temas personalizables con Context API
- **📋 Templates Listos**: Formularios y layouts pre-construidos
- **🤖 Cursor AI Ready**: Optimizado para uso con Cursor AI
- **📦 Publicación limpia**: Los archivos de `src/docs` son solo para demo local y no forman parte de la API pública

## 📦 Instalación

```bash
npm install flysoft-react-ui
```

## ⚡ Quick Start

### 1. Configuración Básica

```tsx
import { ThemeProvider } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

function App() {
  return (
    <ThemeProvider initialTheme="light">
      {/* Tu aplicación aquí */}
    </ThemeProvider>
  );
}
```

### 2. Formulario de Login Rápido

```tsx
import { LoginForm } from "flysoft-react-ui";

function LoginPage() {
  const handleLogin = (data) => {
    console.log("Login data:", data);
  };

  return <LoginForm onSubmit={handleLogin} />;
}
```

### 3. Dashboard Básico

```tsx
import { DashboardLayout } from "flysoft-react-ui";

function Dashboard() {
  const stats = [
    {
      title: "Usuarios",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Ventas",
      value: "$45,678",
      change: "+8%",
      changeType: "positive",
    },
  ];

  return (
    <DashboardLayout title="Mi Dashboard" stats={stats}>
      <div>Contenido del dashboard</div>
    </DashboardLayout>
  );
}
```

### 4. Integración con IA (proyectos cliente)

Para que agentes de IA prioricen estos componentes en proyectos cliente, crea un archivo de instrucciones (`.cursorrules`, `AGENTS.md` o `copilot-instructions.md`) en ese proyecto:

```markdown
# Priorizar flysoft-react-ui

SIEMPRE usa los componentes de flysoft-react-ui antes de crear nuevos:

## Componentes Disponibles:

- Layouts: AppLayout, DashboardLayout, SidebarLayout, Card, Menu, TabsGroup
- Forms: Button, Input, AutocompleteInput, DatePicker, Checkbox
- Data: DataTable, DataField, Pagination
- Templates: LoginForm, RegistrationForm, ContactForm

## Para formularios:

- SIEMPRE usar Input y Button de flysoft-react-ui
- SIEMPRE usar Card como contenedor
- SIEMPRE usar FontAwesome 5 para iconos (fa fa-\*)

## Importación requerida:

import "flysoft-react-ui/styles";
```

Ver [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md) y [AI_INTEGRATION_GUIDE.md](./AI_INTEGRATION_GUIDE.md) para configuración completa.

## 🔧 Configuración

### Tailwind CSS

Asegúrate de que Tailwind CSS esté configurado en tu proyecto:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### FontAwesome

La librería incluye FontAwesome 5. Si quieres usar tu propia instalación, puedes sobrescribir los estilos.

## 🎨 Sistema de Temas

Flysoft React UI incluye un sistema completo de temas personalizables que permite cambiar dinámicamente la apariencia de todos los componentes.

### Configuración Básica

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

### Uso del Hook useTheme

```tsx
import { useTheme } from "flysoft-react-ui";

function MyComponent() {
  const { theme, setTheme, currentThemeName, isDark } = useTheme();

  return (
    <div>
      <p>Tema actual: {currentThemeName}</p>
      <button onClick={() => setTheme("dark")}>Cambiar a Dark</button>
    </div>
  );
}
```

### Temas Predefinidos

- **Light**: Tema claro por defecto
- **Dark**: Tema oscuro elegante
- **Blue**: Variación azul profesional
- **Green**: Variación verde natural

### Override de Variables CSS

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

### Variables CSS Disponibles

El sistema proporciona variables CSS con prefijo `--flysoft-`:

```css
--flysoft-primary          /* Color primario */
--flysoft-secondary        /* Color secundario */
--flysoft-success          /* Color de éxito */
--flysoft-warning          /* Color de advertencia */
--flysoft-danger           /* Color de peligro */
--flysoft-bg-default       /* Fondo por defecto */
--flysoft-text-primary     /* Texto principal */
--flysoft-border-default   /* Borde por defecto */
--flysoft-shadow-md        /* Sombra mediana */
--flysoft-radius-md        /* Radio de borde mediano */
```

Para más detalles sobre el sistema de temas, consulta [THEME_SYSTEM.md](./THEME_SYSTEM.md).

## 📚 Uso

### Importar componentes

```tsx
import { Button, Input, Card, Badge } from "flysoft-react-ui";
```

### Importar estilos

```tsx
import "flysoft-react-ui/styles";
```

### Ejemplo básico

```tsx
import React from "react";
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

function App() {
  return (
    <div className="p-8">
      <Card title="Mi Formulario" subtitle="Ejemplo de uso">
        <div className="space-y-4">
          <Input label="Nombre" placeholder="Tu nombre" icon="fa-user" />
          <Button variant="primary" icon="fa-save">
            Guardar
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

## 📋 Templates Disponibles

### Formularios

- **LoginForm**: Formulario de login completo con validación
- **RegistrationForm**: Formulario de registro con validación de contraseñas
- **ContactForm**: Formulario de contacto con textarea y validación

### Layouts

- **DashboardLayout**: Layout de dashboard con estadísticas y métricas
- **SidebarLayout**: Layout con sidebar de navegación y contenido principal

### Patrones

- **FormPattern**: Patrón reutilizable para cualquier formulario

### Ejemplo de Uso de Templates

```tsx
import { LoginForm, DashboardLayout, SidebarLayout } from "flysoft-react-ui";

// Formulario de login
<LoginForm onSubmit={handleLogin} loading={isLoading} />

// Dashboard con estadísticas
<DashboardLayout title="Mi App" stats={stats}>
  <div>Contenido del dashboard</div>
</DashboardLayout>

// Layout con sidebar
<SidebarLayout
  title="Mi App"
  menuItems={menuItems}
  user={user}
>
  <div>Contenido principal</div>
</SidebarLayout>
```

## 🧩 Componentes

### Button

Botón personalizable con múltiples variantes, tamaños y soporte para iconos.

```tsx
<Button variant="primary" size="md" icon="fa-heart" loading={false}>
  Me gusta
</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost'
- `size`: 'sm' | 'md' | 'lg'
- `icon`: Clase de FontAwesome (ej: 'fa-heart')
- `iconPosition`: 'left' | 'right'
- `loading`: Estado de carga
- `disabled`: Estado deshabilitado

### Input

Campo de entrada con soporte para labels, iconos y estados de error.

```tsx
<Input
  label="Email"
  type="email"
  placeholder="tu@email.com"
  icon="fa-envelope"
  error="Email inválido"
/>
```

**Props:**

- `label`: Texto del label
- `error`: Mensaje de error
- `icon`: Clase de FontAwesome
- `iconPosition`: 'left' | 'right'
- `size`: 'sm' | 'md' | 'lg'

### Card

Contenedor de tarjeta con header, contenido y footer opcionales.

```tsx
<Card
  title="Título"
  subtitle="Subtítulo"
  variant="elevated"
  headerActions={<Button>Acción</Button>}
  footer={<div>Footer</div>}
>
  Contenido de la tarjeta
</Card>
```

**Props:**

- `title`: Título del header
- `subtitle`: Subtítulo del header
- `variant`: 'default' | 'elevated' | 'outlined'
- `headerActions`: Elementos de acción en el header
- `footer`: Contenido del footer

### Badge

Etiqueta pequeña para mostrar estados o categorías.

```tsx
<Badge variant="success" size="md" rounded>
  Activo
</Badge>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
- `size`: 'sm' | 'md' | 'lg'
- `rounded`: Aplicar bordes redondeados

## 🎨 Personalización

### Colores

Puedes personalizar los colores sobrescribiendo las clases de Tailwind CSS:

```css
/* En tu CSS */
.btn-primary {
  @apply bg-purple-600 hover:bg-purple-700;
}
```

### Tema

La librería incluye un tema personalizado con colores primarios y animaciones. Puedes extenderlo en tu configuración de Tailwind:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: "#your-color",
          // ... más variantes
        },
      },
    },
  },
};
```

## 🚀 Desarrollo

### Instalar dependencias

```bash
npm install
```

### Ejecutar en modo desarrollo

```bash
npm run dev
```

### Construir librería

```bash
npm run build
```

### Generar tipos TypeScript

```bash
npm run build:types
```

## 📝 Licencia

MIT

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request.

## 📚 Recursos Adicionales

- **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)**: Guía completa de integración con Cursor AI
- **[AI_INTEGRATION_GUIDE.md](./AI_INTEGRATION_GUIDE.md)**: Prompt base para agentes en proyectos cliente
- **[THEME_SYSTEM.md](./THEME_SYSTEM.md)**: Documentación detallada del sistema de temas
- **[examples/common-patterns.tsx](./examples/common-patterns.tsx)**: Ejemplos completos de uso
- **[flysoft-ui.config.ts](./flysoft-ui.config.ts)**: Configuración centralizada de la librería
- **[docs/component-metadata.json](./docs/component-metadata.json)**: Metadatos de todos los componentes

## 🔧 Scripts de Mantenimiento

```bash
# Actualizar documentación automáticamente
npm run update-docs

# Validar que toda la documentación esté sincronizada
npm run validate-docs

# Ver ejemplos completos
npm run dev
```

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda, abre un issue en el repositorio.
