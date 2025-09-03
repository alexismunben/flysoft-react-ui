# Estructura de Componentes - Flysoft React UI

## Organización de Carpetas

La librería está organizada en tres categorías principales de componentes:

### 📝 `components/form-controls/`

Componentes diseñados para formularios y controles de entrada:

- **Button** - Botones con múltiples variantes y estados
- **Input** - Campos de entrada con soporte para iconos y validación

### 🎨 `components/layout/`

Componentes para estructurar y organizar el contenido:

- **Card** - Contenedores con encabezado, cuerpo y pie opcionales

### 🛠️ `components/utils/`

Componentes utilitarios y de presentación:

- **Badge** - Etiquetas con diferentes variantes de color

## Variables CSS

Todos los componentes utilizan las variables CSS definidas en `src/styles.css`:

### Colores Principales

- `--color-primary` - Color principal de la aplicación
- `--color-secondary` - Color secundario
- `--color-success`, `--color-warning`, `--color-danger`, `--color-info` - Estados

### Colores de Texto

- `--color-text-primary` - Texto principal
- `--color-text-secondary` - Texto secundario
- `--color-text-muted` - Texto atenuado

### Colores de Borde y Fondo

- `--color-border-default` - Bordes por defecto
- `--color-border-focus` - Bordes en foco
- `--color-bg-default` - Fondo por defecto
- `--color-bg-secondary` - Fondo secundario

### Tipografía

- `--font-default` - Fuente principal (Instrument Sans)

## Uso

```tsx
import { Button, Input, Card, Badge } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

// Los componentes automáticamente usan las variables CSS
<Button variant="primary">Botón Principal</Button>
<Input label="Email" icon="fa-envelope" />
<Card title="Mi Tarjeta">Contenido</Card>
<Badge variant="success">Éxito</Badge>
```

## Agregando Nuevos Componentes

### Para Form Controls:

1. Crear el componente en `src/components/form-controls/`
2. Agregar la exportación en `src/components/form-controls/index.ts`
3. Actualizar `src/components/index.ts` si es necesario

### Para Layout:

1. Crear el componente en `src/components/layout/`
2. Agregar la exportación en `src/components/layout/index.ts`

### Para Utils:

1. Crear el componente en `src/components/utils/`
2. Agregar la exportación en `src/components/utils/index.ts`

## Ventajas de esta Estructura

- **Organización clara** por tipo de componente
- **Mantenibilidad** mejorada con separación de responsabilidades
- **Escalabilidad** para futuros componentes
- **Consistencia** en estilos usando variables CSS centralizadas
- **Reutilización** de estilos y temas
