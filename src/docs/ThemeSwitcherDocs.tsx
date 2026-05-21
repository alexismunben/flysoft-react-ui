import React from "react";
import {
  Card,
  Button,
  Input,
  ThemeSwitcher,
  useTheme,
  type Density,
} from "../index";

const ThemePreview: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Card
      title="Vista previa del tema actual"
      subtitle={`Tema activo: ${theme.name}`}
      className="space-y-4"
    >
      <p className="text-sm" style={{ color: "var(--flysoft-text-secondary)" }}>
        Los componentes de Flysoft usan automáticamente las variables del tema
        activo. Cambia el tema con el ThemeSwitcher para ver los estilos
        actualizados.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button variant="primary" icon="fa-moon">
          Acción primaria
        </Button>
        <Button variant="outline" icon="fa-sun">
          Acción secundaria
        </Button>
        <Button variant="ghost" icon="fa-adjust">
          Acción fantasma
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Input label="Nombre" placeholder="Ingresa tu nombre" icon="fa-user" />
        <Input
          label="Correo"
          type="email"
          placeholder="correo@empresa.com"
          icon="fa-envelope"
        />
      </div>
    </Card>
  );
};

const DensitySwitcher: React.FC = () => {
  const { density, setDensity } = useTheme();
  const options: Density[] = ["comfortable", "compact", "dense"];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span
        className="text-sm font-medium"
        style={{ color: "var(--flysoft-text-secondary)" }}
      >
        Densidad activa:
      </span>
      {options.map((option) => (
        <Button
          key={option}
          size="sm"
          variant={density === option ? "primary" : "outline"}
          onClick={() => setDensity(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

const DensityPreview: React.FC = () => {
  const { density } = useTheme();

  return (
    <Card
      title="Vista previa de densidad"
      subtitle={`Densidad activa: ${density}`}
    >
      <div className="space-y-4">
        <DensitySwitcher />
        <p
          className="text-sm"
          style={{ color: "var(--flysoft-text-secondary)" }}
        >
          La densidad es un eje global del tema. Al cambiarla, todos los
          componentes que consumen las variables{" "}
          <code>--flysoft-density-*</code> se reajustan sin necesidad de pasar
          <code> compact</code> o <code>size</code> por componente.
        </p>
        <div
          className="grid gap-3 text-xs font-mono p-3 rounded border"
          style={{
            borderColor: "var(--flysoft-border-default)",
            backgroundColor: "var(--flysoft-bg-secondary)",
            gridTemplateColumns: "auto 1fr",
          }}
        >
          <span>--flysoft-density-padding-x-md</span>
          <span style={{ color: "var(--flysoft-text-secondary)" }}>
            var(--flysoft-density-padding-x-md)
          </span>
          <span>--flysoft-density-font-base</span>
          <span style={{ color: "var(--flysoft-text-secondary)" }}>
            var(--flysoft-density-font-base)
          </span>
          <span>--flysoft-density-control-height-md</span>
          <span style={{ color: "var(--flysoft-text-secondary)" }}>
            var(--flysoft-density-control-height-md)
          </span>
          <span>--flysoft-density-datatable-row</span>
          <span style={{ color: "var(--flysoft-text-secondary)" }}>
            var(--flysoft-density-datatable-row)
          </span>
        </div>
      </div>
    </Card>
  );
};

const ThemeSwitcherDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="ThemeSwitcher - Guía y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              ThemeSwitcher permite alternar entre los temas configurados en la
              librería. Se integra automáticamente con `ThemeProvider` y aplica
              los cambios a todos los componentes sin recargar la página.
            </p>
            <Card title="Switcher integrado">
              <div className="flex flex-col gap-4">
                <ThemeSwitcher />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Este ejemplo usa el ThemeSwitcher directamente, ideal para
                  colocarlo en headers o barras laterales.
                </p>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Vista previa de tema
            </h3>
            <ThemePreview />
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Densidad global ({"“comfortable”"} / {"“compact”"} /{" "}
              {"“dense”"})
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El <code>ThemeProvider</code> acepta una prop{" "}
              <code>density</code> y persiste el valor elegido en localStorage.
              También podés cambiarla en tiempo de ejecución usando{" "}
              <code>useTheme().setDensity(&quot;dense&quot;)</code>. Esto inyecta
              las variables CSS <code>--flysoft-density-*</code> que los
              componentes consumen para padding, gaps, tipografía, alturas de
              controles y altura de filas en DataTable.
            </p>
            <DensityPreview />
            <Card
              title="Configuración en el provider"
              compact
              className="mt-4"
            >
              <pre
                className="text-xs p-3 rounded overflow-x-auto"
                style={{
                  backgroundColor: "var(--flysoft-bg-secondary)",
                  color: "var(--flysoft-text-primary)",
                }}
              >
{`<ThemeProvider initialTheme="light" density="dense">
  <App />
</ThemeProvider>

// O dinámicamente:
const { density, setDensity } = useTheme();
setDensity("compact");`}
              </pre>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Integración en layouts
            </h3>
            <Card
              title="Recomendaciones"
              subtitle="Buenas prácticas para colocar ThemeSwitcher"
            >
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>
                  Ubícalo en lugares visibles como el header o el menú lateral.
                </li>
                <li>
                  Combina el ThemeSwitcher con información del tema actual para
                  mejorar la experiencia del usuario.
                </li>
                <li>
                  Recuerda envolver tu aplicación con `ThemeProvider` y aplicar
                  los estilos globales con `useGlobalThemeStyles` cuando sea
                  necesario.
                </li>
                <li>
                  Para apps con mucha información en pantalla, considerá usar{" "}
                  <code>density=&quot;compact&quot;</code> o{" "}
                  <code>density=&quot;dense&quot;</code> a nivel del provider.
                </li>
              </ul>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props de ThemeProvider
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Prop
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Tipo
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Default
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">
                      initialTheme
                    </td>
                    <td className="px-4 py-2 text-sm">string | Theme</td>
                    <td className="px-4 py-2 text-sm">&quot;light&quot;</td>
                    <td className="px-4 py-2 text-sm">
                      Tema inicial (light, dark, blue, green o un objeto Theme
                      custom).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">density</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;comfortable&quot; | &quot;compact&quot; |
                      &quot;dense&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">
                      &quot;comfortable&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">
                      Densidad inicial. Controla padding, gap, tipografía y
                      alturas de controles globalmente. Se persiste por defecto
                      en localStorage bajo la clave{" "}
                      <code>flysoft-density</code>.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">
                      densityStorageKey
                    </td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;flysoft-density&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">
                      Clave de localStorage usada para persistir la densidad
                      elegida.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">
                      forceInitialDensity
                    </td>
                    <td className="px-4 py-2 text-sm">boolean</td>
                    <td className="px-4 py-2 text-sm">false</td>
                    <td className="px-4 py-2 text-sm">
                      Si es true, ignora el valor guardado y siempre usa la prop{" "}
                      <code>density</code> al inicio.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">
                      onDensityChange
                    </td>
                    <td className="px-4 py-2 text-sm">
                      (density: Density) =&gt; void
                    </td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Callback que se dispara cada vez que cambia la densidad,
                      útil para sincronizarla con persistencia externa.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">storageKey</td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;flysoft-theme&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">
                      Clave de localStorage para el tema (colores).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">
                      onThemeChange
                    </td>
                    <td className="px-4 py-2 text-sm">
                      (theme: Theme) =&gt; void
                    </td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Callback al cambiar el tema.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ThemeSwitcherDocs;
