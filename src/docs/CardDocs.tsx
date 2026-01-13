import React from "react";
import { Card, Button, DropdownMenu } from "../index";

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
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente Card soporta acciones en el header usando la
              propiedad <code>headerActions</code>. Puedes pasar cualquier
              ReactNode que se mostrará directamente en el header, alineado a la
              derecha.
            </p>
            <div className="space-y-4">
              <Card
                title="Card con múltiples acciones"
                subtitle="Ejemplo con botones en el header"
                headerActions={
                  <div>
                    <DropdownMenu
                      options={[
                        {
                          label: "Editar",
                          icon: "fa-edit",
                        },
                        {
                          label: "Eliminar",
                          icon: "fa-trash",
                        },
                        {
                          label: "Compartir",
                          icon: "fa-share",
                        },
                      ]}
                      onOptionSelected={(item) => {
                        console.log(item.label);
                      }}
                      renderOption={(item) => (
                        <Button size="sm" variant="ghost" icon={item.icon}>
                          {item.label}
                        </Button>
                      )}
                      renderNode={
                        <Button
                          size="sm"
                          variant="ghost"
                          icon="fa-ellipsis-h"
                          aria-label="Acciones"
                        />
                      }
                    />
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
                  Card con múltiples acciones en el header. Puedes pasar
                  cualquier ReactNode, como botones, iconos, o componentes
                  personalizados.
                </p>
              </Card>

              <Card
                title="Card con una sola acción"
                subtitle="Se muestra directamente"
                headerActions={
                  <Button
                    size="sm"
                    variant="ghost"
                    icon="fa-search"
                    onClick={() => console.log("Ver detalles")}
                  />
                }
              >
                <p style={{ color: "var(--flysoft-text-secondary)" }}>
                  Puedes pasar un solo botón o cualquier otro componente
                  directamente en <code>headerActions</code>.
                </p>
              </Card>
            </div>
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
                  <i className="fal fa-user-circle" />
                  <span>Usuario Personalizado</span>
                </div>
              }
              subtitle={
                <div className="flex items-center gap-2">
                  <i className="fal fa-envelope" />
                  <span>usuario@ejemplo.com</span>
                </div>
              }
            >
              <p style={{ color: "var(--flysoft-text-secondary)" }}>
                El título y subtítulo pueden ser ReactNode, permitiendo incluir
                iconos, badges, o cualquier componente personalizado.
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
              <Card title="Card con bg-blue-50" className="bg-blue-50">
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

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Características
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <ul
                  className="list-disc list-inside space-y-2 text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  <li>
                    <strong>Variantes:</strong> Soporta tres variantes: default,
                    elevated (con sombra) y outlined (con borde destacado)
                  </li>
                  <li>
                    <strong>HeaderActions:</strong> Usa la propiedad{" "}
                    <code>headerActions</code> para mostrar cualquier ReactNode
                    en el header, alineado a la derecha. Puedes pasar botones,
                    iconos, o cualquier componente personalizado.
                  </li>
                  <li>
                    <strong>Title y Subtitle flexibles:</strong> Pueden ser
                    strings o ReactNode, permitiendo incluir iconos, badges u
                    otros componentes.
                  </li>
                  <li>
                    <strong>Background personalizado:</strong> El componente
                    detecta automáticamente las clases de background (bg-*) y
                    las aplica correctamente.
                  </li>
                  <li>
                    <strong>Footer opcional:</strong> Puedes agregar contenido
                    en el footer de la card.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props
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
                      Requerido
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
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      children
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Sí
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Contenido principal de la card.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      title
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      string | ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Título de la card. Puede ser un string o un ReactNode.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      subtitle
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      string | ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Subtítulo de la card. Se muestra debajo del título.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      headerActions
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Contenido que se mostrará en el header de la card,
                      alineado a la derecha. Puede ser cualquier ReactNode, como
                      botones, iconos, o componentes personalizados.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      footer
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Contenido del footer de la card.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      variant
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      "default" | "elevated" | "outlined"
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Variante visual de la card. Por defecto es "default".
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      className
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      string
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Clases CSS adicionales. Las clases de background (bg-*) se
                      aplican automáticamente al background de la card.
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

export default CardDocs;
