# Guía de Integración con Cursor AI

Esta guía te ayudará a configurar Cursor AI para que priorice automáticamente los componentes de `flysoft-react-ui` en lugar de crear nuevos componentes.

## 🎯 Objetivo

Cuando le digas a Cursor AI "necesito un formulario de login", automáticamente usará los componentes `Input` y `Button` de flysoft-react-ui en lugar de crear nuevos componentes desde cero.

## 📋 Configuración Paso a Paso

### 1. Instalar la Librería

```bash
npm install flysoft-react-ui
```

### 2. Configurar Cursor AI

Crea un archivo `.cursorrules` en la raíz de tu proyecto con el siguiente contenido:

```markdown
# Priorizar flysoft-react-ui

SIEMPRE usa los componentes de flysoft-react-ui antes de crear nuevos:

## Componentes Disponibles:

- Layouts: AppLayout, DashboardLayout, SidebarLayout, Card, Accordion, Menu, DropdownMenu, TabsGroup
- Forms: Button, Input, AutocompleteInput, DatePicker, Checkbox, RadioButtonGroup, ThemeSwitcher
- Data: DataTable, DataField, Pagination, Collection
- Feedback: Badge, Dialog, Snackbar, Loader, Avatar, RoadMap
- Templates: LoginForm, RegistrationForm, ContactForm, FormPattern

## Para formularios:

- SIEMPRE usar Input y Button de flysoft-react-ui
- SIEMPRE usar Card como contenedor
- SIEMPRE usar FontAwesome 5 para iconos (fa fa-\*)

## Importación requerida:

import "flysoft-react-ui/styles";

## Ejemplos:

- Login: Input + Button + Card
- Registro: Input + Button + Card
- Contacto: Input + Button + Card
- Dashboard: Card + Badge + Button

NUNCA crear componentes Button, Input, Card, Badge personalizados.
```

### 3. Configurar Tailwind CSS

Asegúrate de que Tailwind CSS esté configurado en tu proyecto:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Configurar FontAwesome

La librería incluye FontAwesome 5. Si quieres usar tu propia instalación, puedes sobrescribir los estilos.

### 5. Configurar el Sistema de Temas

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

## 🚀 Ejemplos de Uso con Cursor AI

### Ejemplo 1: Formulario de Login

**Prompt para Cursor AI:**

```
"Crear un formulario de login con validación"
```

**Resultado esperado:**

```tsx
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

function LoginForm() {
  return (
    <Card title="Iniciar Sesión">
      <Input label="Email" type="email" icon="fa-envelope" />
      <Input label="Contraseña" type="password" icon="fa-lock" />
      <Button variant="primary" icon="fa-sign-in-alt">
        Iniciar Sesión
      </Button>
    </Card>
  );
}
```

### Ejemplo 2: Dashboard

**Prompt para Cursor AI:**

```
"Crear un dashboard con estadísticas y tarjetas"
```

**Resultado esperado:**

```tsx
import { Card, Badge, Button } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

function Dashboard() {
  return (
    <div>
      <Card title="Estadísticas" variant="elevated">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <h3>Usuarios</h3>
            <p>1,234</p>
            <Badge variant="success">+12%</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

### Ejemplo 3: Formulario de Contacto

**Prompt para Cursor AI:**

```
"Crear un formulario de contacto con textarea"
```

**Resultado esperado:**

```tsx
import { Button, Input, Card } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

function ContactForm() {
  return (
    <Card title="Contáctanos">
      <Input label="Nombre" icon="fa-user" />
      <Input label="Email" type="email" icon="fa-envelope" />
      <Input label="Mensaje" multiline icon="fa-comment" />
      <Button variant="primary" icon="fa-paper-plane">
        Enviar
      </Button>
    </Card>
  );
}
```

## 📚 Templates Disponibles

### Formularios

- `LoginForm` - Formulario de login completo
- `RegistrationForm` - Formulario de registro
- `ContactForm` - Formulario de contacto

### Layouts

- `DashboardLayout` - Layout de dashboard
- `SidebarLayout` - Layout con sidebar

### Patrones

- `FormPattern` - Patrón reutilizable para formularios

## 🎨 Sistema de Temas

### Cambiar Tema

```tsx
import { useTheme } from "flysoft-react-ui";

function MyComponent() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme("dark")}>Cambiar a tema oscuro</button>
  );
}
```

### Temas Disponibles

- `light` - Tema claro (por defecto)
- `dark` - Tema oscuro
- `blue` - Variación azul
- `green` - Variación verde

## 🔧 Configuración Avanzada

### Variables CSS Personalizadas

```css
:root {
  --color-primary: #your-color;
  --color-secondary: #your-color;
  --color-success: #your-color;
  --color-warning: #your-color;
  --color-danger: #your-color;
}
```

### Override de Tema

```tsx
import { useThemeOverride } from "flysoft-react-ui";

function MyComponent() {
  const { applyOverride } = useThemeOverride();

  const handleHover = () => {
    applyOverride({ primary: "#ff0000" });
  };

  return <div onMouseEnter={handleHover}>Hover me!</div>;
}
```

## 📝 Mejores Prácticas

### 1. Siempre Importar Estilos

```tsx
import "flysoft-react-ui/styles";
```

### 2. Usar FontAwesome 5

```tsx
// ✅ Correcto
<i className="fa fa-user" />

// ❌ Incorrecto
<i className="lucide-user" />
```

### 3. Usar el Sistema de Temas

```tsx
// ✅ Correcto
<Button variant="primary">Botón</Button>

// ❌ Incorrecto
<button className="bg-blue-500">Botón</button>
```

### 4. Usar Componentes de la Librería

```tsx
// ✅ Correcto
import { Button, Input, Card } from "flysoft-react-ui";

// ❌ Incorrecto
const Button = ({ children }) => <button>{children}</button>;
```

## 🐛 Solución de Problemas

### Problema: Los estilos no se aplican

**Solución:** Asegúrate de importar los estilos:

```tsx
import "flysoft-react-ui/styles";
```

### Problema: Los iconos no aparecen

**Solución:** Usa FontAwesome 5 con clases `fa fa-*`:

```tsx
<i className="fa fa-user" />
```

### Problema: Los temas no funcionan

**Solución:** Envuelve tu app con ThemeProvider:

```tsx
<ThemeProvider initialTheme="light">
  <App />
</ThemeProvider>
```

### Problema: Cursor AI no usa los componentes

**Solución:** Verifica que el archivo `.cursorrules` esté en la raíz del proyecto y contenga las reglas correctas.

## 📞 Soporte

Si tienes problemas con la integración:

1. Verifica que el archivo `.cursorrules` esté configurado correctamente
2. Asegúrate de que los estilos estén importados
3. Revisa que FontAwesome 5 esté disponible
4. Consulta los ejemplos en `examples/common-patterns.tsx`

## 🔄 Actualizaciones

Para mantener la configuración actualizada:

1. Ejecuta `npm update flysoft-react-ui` regularmente
2. Revisa las nuevas versiones para nuevos componentes
3. Actualiza el archivo `.cursorrules` si se añaden nuevos componentes

## 📖 Recursos Adicionales

- [README.md](./README.md) - Documentación completa
- [THEME_SYSTEM.md](./THEME_SYSTEM.md) - Sistema de temas
- [examples/common-patterns.tsx](./examples/common-patterns.tsx) - Ejemplos completos
- [flysoft-ui.config.ts](./flysoft-ui.config.ts) - Configuración centralizada
