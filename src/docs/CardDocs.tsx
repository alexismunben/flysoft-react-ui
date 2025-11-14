import React from "react";
import { Card, Button } from "../index";

const CardDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Card - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Variantes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default" title="Default">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  card por defecto
                </p>
              </Card>
              <Card variant="elevated" title="Elevated">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  card con sombra elevada
                </p>
              </Card>
              <Card variant="outlined" title="Outlined">
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  card con borde destacado
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Header y Footer
            </h3>
            <Card
              title="Card con Acciones"
              subtitle="Ejemplo de header y footer"
              headerActions={
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" icon="fa-edit">
                    Editar
                  </Button>
                  <Button size="sm" variant="primary" icon="fa-save">
                    Guardar
                  </Button>
                </div>
              }
              footer={
                <div className="flex justify-end gap-2">
                  <Button size="sm" variant="outline">
                    Cancelar
                  </Button>
                  <Button size="sm" variant="primary" icon="fa-check">
                    Aceptar
                  </Button>
                </div>
              }
            >
              <p style={{ color: "var(--flysoft-text-secondary)" }}>
                card con acciones en header y contenido descriptivo
              </p>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Title y Subtitle como ReactNode
            </h3>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <i className="fa fa-user-circle" />
                  <span>Usuario Personalizado</span>
                </div>
              }
              subtitle={
                <div className="flex items-center gap-2">
                  <i className="fa fa-envelope" />
                  <span>usuario@ejemplo.com</span>
                </div>
              }
            >
              <p style={{ color: "var(--flysoft-text-secondary)" }}>
                El título y subtítulo pueden ser ReactNode, permitiendo
                incluir iconos, badges, o cualquier componente personalizado.
              </p>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Background Personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente detecta automáticamente las clases de background
              (bg-*) desde la prop className y las aplica al background de la
              card. Las demás clases se aplican normalmente al contenedor.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card
                title="Card con bg-blue-50"
                className="bg-blue-50"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Card con background personalizado usando clases de Tailwind
                </p>
              </Card>
              <Card
                title="Card con bg-gradient"
                className="bg-gradient-to-br from-purple-100 to-pink-100"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Card con gradiente personalizado
                </p>
              </Card>
              <Card
                title="Card con bg y otras clases"
                className="bg-green-50 p-8"
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Puedes combinar clases de background con otras clases de
                  Tailwind
                </p>
              </Card>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default CardDocs;
