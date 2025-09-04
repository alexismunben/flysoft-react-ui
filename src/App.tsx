import {
  Button,
  Input,
  Card,
  Badge,
  ThemeProvider,
  ThemeSwitcher,
  useTheme,
  useGlobalThemeStyles,
} from "./index";
import "./index.css";

// Componente para probar la funcionalidad de resetToDefault
const ResetToDefaultButton: React.FC = () => {
  const { resetToDefault, theme } = useTheme();

  return (
    <div className="space-y-2">
      <p className="text-sm" style={{ color: "var(--flysoft-text-secondary)" }}>
        Tema actual: <strong>{theme.name}</strong>
      </p>
      <Button onClick={resetToDefault} variant="outline" icon="fa-undo">
        Resetear al Tema Inicial
      </Button>
    </div>
  );
};

// Componente que demuestra el uso de useGlobalThemeStyles
const GlobalThemeDemo: React.FC = () => {
  // Este hook aplica automáticamente los estilos del tema al body/html
  useGlobalThemeStyles();

  return (
    <div
      className="p-4 rounded-lg border"
      style={{
        borderColor: "var(--flysoft-border-default)",
        backgroundColor: "var(--flysoft-bg-secondary)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-2"
        style={{ color: "var(--flysoft-text-primary)" }}
      >
        Hook useGlobalThemeStyles
      </h3>
      <p className="text-sm" style={{ color: "var(--flysoft-text-secondary)" }}>
        Este componente usa el hook useGlobalThemeStyles que aplica
        automáticamente los colores del tema al body y html de la página.
      </p>
    </div>
  );
};

function App() {
  return (
    <ThemeProvider initialTheme={"light"} forceInitialTheme={false}>
      <div
        className="min-h-screen p-8"
        style={{ backgroundColor: "var(--flysoft-bg-secondary)" }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1
              className="text-4xl font-bold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Flysoft React UI
            </h1>
            <p
              className="text-xl"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Biblioteca de componentes React moderna con Tailwind CSS,
              FontAwesome y sistema de temas personalizable
            </p>
          </div>

          {/* Theme Switcher */}
          <div className="mb-8">
            <ThemeSwitcher />
          </div>

          {/* Test Reset Button */}
          <div className="mb-8 text-center">
            <ResetToDefaultButton />
          </div>

          {/* Global Theme Styles Demo */}
          <div className="mb-8">
            <GlobalThemeDemo />
          </div>

          {/* Button Examples */}
          <Card
            title="Botones"
            subtitle="Diferentes variantes y tamaños de botones"
            className="mb-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" icon="fa-heart">
                  Botón Primario
                </Button>
                <Button variant="outline" icon="fa-download">
                  Botón Outline
                </Button>
                <Button variant="ghost" icon="fa-edit">
                  Botón Ghost
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button size="sm" icon="fa-plus">
                  Pequeño
                </Button>
                <Button size="md" icon="fa-check">
                  Mediano
                </Button>
                <Button size="lg" icon="fa-arrow-right">
                  Grande
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button loading>Cargando...</Button>
                <Button disabled>Deshabilitado</Button>
                <Button icon="fa-arrow-right" iconPosition="right">
                  Con Icono Derecha
                </Button>
              </div>
            </div>
          </Card>

          {/* Input Examples */}
          <Card
            title="Campos de Entrada"
            subtitle="Diferentes tipos de inputs con iconos"
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Nombre completo"
                placeholder="Ingresa tu nombre"
                icon="fa-user"
              />
              <Input
                label="Email"
                type="email"
                placeholder="tu@email.com"
                icon="fa-envelope"
              />
              <Input
                label="Contraseña"
                type="password"
                placeholder="••••••••"
                icon="fa-lock"
              />
              <Input
                label="Búsqueda"
                placeholder="Buscar..."
                icon="fa-search"
                iconPosition="right"
              />
              <Input
                label="Con error"
                placeholder="Campo con error"
                error="Este campo es requerido"
                icon="fa-exclamation-triangle"
              />
            </div>
          </Card>

          {/* Badge Examples */}
          <Card
            title="Badges"
            subtitle="Diferentes variantes de badges"
            className="mb-8"
          >
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge size="sm">Small</Badge>
                <Badge size="md">Medium</Badge>
                <Badge size="lg">Large</Badge>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge rounded>Rounded</Badge>
                <Badge variant="success" rounded>
                  Success Rounded
                </Badge>
                <Badge variant="warning" rounded>
                  Warning Rounded
                </Badge>
              </div>
            </div>
          </Card>

          {/* Card Examples */}
          <Card
            title="Tarjetas"
            subtitle="Diferentes variantes de tarjetas"
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                title="Tarjeta Simple"
                subtitle="Sin acciones ni footer"
                variant="default"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Esta es una tarjeta simple con contenido básico.
                </p>
              </Card>

              <Card
                title="Con Acciones"
                subtitle="Incluye botones en el header"
                variant="elevated"
                headerActions={
                  <Button size="sm" variant="outline" icon="fa-edit">
                    Editar
                  </Button>
                }
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Tarjeta con botones de acción en el header.
                </p>
              </Card>

              <Card
                title="Con Footer"
                subtitle="Incluye sección de footer"
                variant="outlined"
                footer={
                  <div className="flex justify-between items-center">
                    <span
                      className="text-sm"
                      style={{ color: "var(--flysoft-text-muted)" }}
                    >
                      Última actualización: hoy
                    </span>
                    <Button size="sm" variant="primary" icon="fa-save">
                      Guardar
                    </Button>
                  </div>
                }
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Tarjeta con footer personalizado y botones.
                </p>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
