import { AppLayout } from "./components";
import { Routes, Route, Link } from "react-router-dom";
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
import { DocsMenu } from "./docs/DocsMenu";
import DocsRouter from "./docs/DocsRouter";

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
        automáticamente los estilos del tema actual al body y html.
      </p>
    </div>
  );
};

function HomeContent() {
  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
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

        {/* Global Theme Demo */}
        <div className="mb-8">
          <GlobalThemeDemo />
        </div>

        {/* Form Controls */}
        <div className="mb-8">
          <Card title="Form Controls" className="mb-6">
            <div className="space-y-6">
              {/* Buttons */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Botones
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" icon="fa-save">
                    Primary
                  </Button>
                  <Button variant="outline" icon="fa-edit">
                    Outline
                  </Button>
                  <Button variant="ghost" icon="fa-trash">
                    Ghost
                  </Button>
                  <Button size="sm" variant="primary">
                    Small
                  </Button>
                  <Button size="lg" variant="outline">
                    Large
                  </Button>
                </div>
              </div>

              {/* Inputs */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Campos de Entrada
                </h3>
                <div className="space-y-4">
                  <Input
                    label="Nombre"
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
                    label="Mensaje"
                    placeholder="Escribe tu mensaje aquí..."
                    icon="fa-comment"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Utility Components */}
        <div className="mb-8">
          <Card title="Utility Components">
            <div className="space-y-6">
              {/* Badges */}
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Badges
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary">Primary</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="danger">Danger</Badge>
                  <Badge variant="info">Info</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Layout Components */}
        <div className="mb-8">
          <Card title="Layout Components">
            <div className="space-y-6">
              <div>
                <h3
                  className="text-lg font-semibold mb-4"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Cards con Diferentes Variantes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card variant="default" title="Card Default">
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Esta es una tarjeta con variante por defecto.
                    </p>
                  </Card>
                  <Card variant="elevated" title="Card Elevated">
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Esta es una tarjeta con sombra elevada.
                    </p>
                  </Card>
                  <Card variant="outlined" title="Card Outlined">
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Esta es una tarjeta con borde destacado.
                    </p>
                  </Card>
                  <Card
                    title="Card con Footer"
                    footer={
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          Cancelar
                        </Button>
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
              </div>
            </div>
          </Card>
        </div>

        {/* Contenido adicional para asegurar scroll */}
        <div className="mt-8 space-y-8">
          <div className="h-96 bg-blue-100 rounded p-4">
            <h3 className="text-lg font-bold mb-4">Sección 1</h3>
            <p>Contenido adicional para hacer scroll...</p>
          </div>
          <div className="h-96 bg-green-100 rounded p-4">
            <h3 className="text-lg font-bold mb-4">Sección 2</h3>
            <p>Más contenido para probar el comportamiento del navbar...</p>
          </div>
          <div className="h-96 bg-yellow-100 rounded p-4">
            <h3 className="text-lg font-bold mb-4">Sección 3</h3>
            <p>Contenido final para asegurar que hay suficiente altura...</p>
          </div>
          <div className="h-96 bg-red-100 rounded p-4">
            <h3 className="text-lg font-bold mb-4">Sección 4</h3>
            <p>Última sección para completar la prueba de scroll...</p>
          </div>
        </div>
      </div>
      {/* Link a documentación del Button */}
      <div className="mb-8 text-center">
        <Link to="/docs/button" className="inline-block">
          <Button variant="outline" icon="fa-book">
            Ver Documentación de Button
          </Button>
        </Link>
      </div>
      <div className="mb-8 text-center">
        <Link to="/docs/card" className="inline-block">
          <Button variant="outline" icon="fa-book">
            Ver Documentación de Card
          </Button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider initialTheme={"light"} forceInitialTheme={false}>
      <AppLayout
        navBarDrawer={
          <h2>
            <Link to="/">Flysoft React UI</Link>
          </h2>
        }
        leftDrawer={<DocsMenu />}
      >
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/docs/*" element={<DocsRouter />} />
        </Routes>
      </AppLayout>
    </ThemeProvider>
  );
}

export default App;
