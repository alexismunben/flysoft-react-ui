import React from "react";
import { Card, Button, Input, ThemeSwitcher, useTheme } from "../index";

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
              </ul>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ThemeSwitcherDocs;
