import React from "react";
import { Card, DataField, Collection } from "../index";

const DataFieldDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="DataField - Campo de Datos">
        <div className="space-y-8">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Modo Vertical (por defecto)
            </h3>
            <div className="space-y-6">
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Campo básico con label y value
                </p>
                <DataField label="Nombre" value="Juan Pérez" />
              </div>
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Campo con número
                </p>
                <DataField label="Edad" value={28} />
              </div>
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Campo con ReactNode como value
                </p>
                <DataField
                  label="Estado"
                  value={
                    <span style={{ color: "var(--color-success)" }}>
                      Activo
                    </span>
                  }
                />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Modo Inline
            </h3>
            <div className="space-y-6">
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Label y value en la misma línea
                </p>
                <DataField label="Email" value="juan@example.com" inline={true} />
              </div>
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Múltiples campos inline
                </p>
                <Collection direction="column" gap="0.5rem">
                  <DataField label="Teléfono" value="+1 234 567 890" inline={true} />
                  <DataField label="Dirección" value="123 Main St" inline={true} />
                  <DataField label="Ciudad" value="New York" inline={true} />
                </Collection>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con Link
            </h3>
            <div className="space-y-6">
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Campo con link (modo vertical)
                </p>
                <DataField
                  label="Perfil"
                  value="Ver perfil completo"
                  link="https://example.com/profile"
                />
              </div>
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Campo con link (modo inline)
                </p>
                <DataField
                  label="Documento"
                  value="Ver documento"
                  inline={true}
                  link="https://example.com/document.pdf"
                />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Alineación
            </h3>
            <div className="space-y-6">
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Alineación izquierda (por defecto)
                </p>
                <DataField label="Total" value="$1,234.56" align="left" />
              </div>
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Alineación centrada
                </p>
                <DataField label="Total" value="$1,234.56" align="center" />
              </div>
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Alineación derecha
                </p>
                <DataField label="Total" value="$1,234.56" align="right" />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con Title (Tooltip)
            </h3>
            <div className="space-y-6">
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Pasa el mouse sobre el campo para ver el tooltip
                </p>
                <DataField
                  label="ID de Usuario"
                  value="USR-12345"
                  title="Este es el identificador único del usuario en el sistema"
                />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplos Prácticos
            </h3>
            <div className="space-y-6">
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Perfil de usuario
                </p>
                <Card>
                  <Collection direction="column" gap="1rem">
                    <DataField label="Nombre completo" value="Juan Pérez" />
                    <DataField label="Email" value="juan@example.com" />
                    <DataField
                      label="Teléfono"
                      value="+1 234 567 890"
                      inline={true}
                    />
                    <DataField
                      label="Perfil público"
                      value="Ver perfil"
                      link="https://example.com/profile/juan"
                    />
                  </Collection>
                </Card>
              </div>
              <div>
                <p
                  className="text-sm mb-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Información de facturación
                </p>
                <Card>
                  <Collection direction="column" gap="0.75rem">
                    <DataField
                      label="Número de factura"
                      value="INV-2024-001"
                      align="left"
                    />
                    <DataField
                      label="Fecha"
                      value="15 de Enero, 2024"
                      align="left"
                    />
                    <DataField
                      label="Total"
                      value="$1,234.56"
                      align="right"
                      className="text-lg"
                      labelClassName="font-bold"
                    />
                    <DataField
                      label="Estado"
                      value={
                        <span style={{ color: "var(--color-success)" }}>
                          Pagado
                        </span>
                      }
                      inline={true}
                    />
                  </Collection>
                </Card>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Propiedades
            </h3>
            <div className="space-y-4">
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  label (string) - Opcional
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Etiqueta del campo que se muestra arriba (modo vertical) o a
                  la izquierda (modo inline)
                </p>
              </div>
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  value (string | number | ReactNode) - Opcional
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Valor a mostrar. Puede ser texto, número o cualquier elemento
                  React
                </p>
              </div>
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  inline (boolean) - Opcional, default: false
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Si es true, muestra el label y value en la misma línea. Si es
                  false, muestra el label arriba y el value abajo
                </p>
              </div>
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  align ("left" | "right" | "center") - Opcional, default:
                  "left"
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Alineación del contenido del campo (tanto label como value)
                </p>
              </div>
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  title (string) - Opcional
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Título que se muestra como tooltip al pasar el mouse sobre el
                  campo
                </p>
              </div>
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  link (string) - Opcional
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  URL que se abre en una nueva ventana al hacer clic en el botón
                  de flecha
                </p>
              </div>
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  className (string) - Opcional
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Clases CSS adicionales para el contenedor del campo
                </p>
              </div>
              <div>
                <p
                  className="font-medium mb-1"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  labelClassName (string) - Opcional
                </p>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Clases CSS adicionales para el label del campo
                </p>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DataFieldDocs;

