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
                <Collection direction="column" gap="sm">
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
              Tamaño (prop <code>size</code>)
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              La prop <code>size</code> permite bajar un nivel completo en la
              escala tipográfica del DataField, sin afectar la densidad global
              ni a otros componentes. Útil para listas densas dentro de cards
              con densidad <code>comfortable</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="size = md (default)">
                <Collection direction="column" gap="md">
                  <DataField label="CUIL" value="20-17990271-1" />
                  <DataField label="Edad" value={59} />
                  <DataField label="F Nac" value="23/06/1966" />
                </Collection>
              </Card>
              <Card title="size = sm (más compacto)">
                <Collection direction="column" gap="sm">
                  <DataField label="CUIL" value="20-17990271-1" size="sm" />
                  <DataField label="Edad" value={59} size="sm" />
                  <DataField label="F Nac" value="23/06/1966" size="sm" />
                </Collection>
              </Card>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Gap label/value (prop <code>gap</code>)
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              En modo stack (no inline), controla la separación entre label y
              value: <code>"tight"</code> (0px), <code>"sm"</code> o{" "}
              <code>"md"</code> (default). Lee de la variable CSS{" "}
              <code>--flysoft-density-gap-sm</code> según la densidad activa.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card title='gap="tight"' compact>
                <DataField label="CUIL" value="20-17990271-1" gap="tight" />
                <DataField label="Edad" value={59} gap="tight" />
              </Card>
              <Card title='gap="sm"' compact>
                <DataField label="CUIL" value="20-17990271-1" gap="sm" />
                <DataField label="Edad" value={59} gap="sm" />
              </Card>
              <Card title='gap="md" (default)' compact>
                <DataField label="CUIL" value="20-17990271-1" />
                <DataField label="Edad" value={59} />
              </Card>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ocultar dos puntos (prop <code>hideColon</code>)
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              En modo inline, el label se renderiza por defecto con
              &quot;Label:&quot;. Para ocultar el &quot;:&quot; pasá{" "}
              <code>hideColon</code>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Default (con dos puntos)">
                <DataField label="Estado" value="Activo" inline />
                <DataField label="Tipo" value="Titular" inline />
              </Card>
              <Card title="hideColon">
                <DataField label="Estado" value="Activo" inline hideColon />
                <DataField label="Tipo" value="Titular" inline hideColon />
              </Card>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Caso real: datos personales densos
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo combinando <code>Card compact</code> +{" "}
              <code>Collection</code> en row con wrap +{" "}
              <code>DataField size=&quot;sm&quot;</code> para máxima densidad.
            </p>
            <Card title="Datos personales" compact>
              <Collection direction="row" wrap gap="md">
                <DataField label="CUIL" value="20-17990271-1" size="sm" />
                <DataField label="Edad" value={59} size="sm" />
                <DataField label="F Nac" value="23/06/1966" size="sm" />
                <DataField label="Sexo" value="M" size="sm" />
                <DataField label="Nacionalidad" value="ARGENTINA" size="sm" />
                <DataField label="Estado civil" value="Convivencia" size="sm" />
              </Collection>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con Link
            </h3>
            <div className="space-y-6">
              <DataField
                label="Perfil"
                value="Ver perfil completo"
                link="/usuarios/123/perfil"
              />
              <DataField
                label="Documento"
                value="Ver documento"
                link="https://example.com/document.pdf"
              />
              <DataField
                label="Detalle"
                value="Ver orden #1024"
                inline={true}
                link="/ordenes/1024"
              />
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
              <DataField label="Total" value="$1,234.56" align="left" />
              <DataField label="Total" value="$1,234.56" align="center" />
              <DataField label="Total" value="$1,234.56" align="right" />
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
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Prop
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Tipo
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Default
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">label</td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Etiqueta del campo (arriba en stack, izquierda en inline).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">value</td>
                    <td className="px-4 py-2 text-sm">
                      string | number | ReactNode
                    </td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">Valor a mostrar.</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">inline</td>
                    <td className="px-4 py-2 text-sm">boolean</td>
                    <td className="px-4 py-2 text-sm">false</td>
                    <td className="px-4 py-2 text-sm">
                      Si es true, muestra label y value en la misma línea.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">size</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;sm&quot; | &quot;md&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">&quot;md&quot;</td>
                    <td className="px-4 py-2 text-sm">
                      Override local de tipografía. <code>sm</code> baja un
                      nivel completo (label =
                      <code>--flysoft-density-font-xs</code>, value =
                      <code>--flysoft-density-font-sm</code>).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">gap</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;tight&quot; | &quot;sm&quot; | &quot;md&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">&quot;md&quot;</td>
                    <td className="px-4 py-2 text-sm">
                      Separación entre label y value en modo stack.{" "}
                      <code>tight</code> = 0,{" "}
                      <code>sm</code>/<code>md</code> = var de densidad.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">hideColon</td>
                    <td className="px-4 py-2 text-sm">boolean</td>
                    <td className="px-4 py-2 text-sm">false</td>
                    <td className="px-4 py-2 text-sm">
                      Oculta el &quot;:&quot; después del label en modo inline.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">align</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;left&quot; | &quot;right&quot; | &quot;center&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">&quot;left&quot;</td>
                    <td className="px-4 py-2 text-sm">
                      Alineación horizontal del contenido.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">title</td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Tooltip que aparece al hacer hover.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">link</td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Si está presente, se renderiza un botón con flecha que
                      navega a esa URL.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">className</td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Clases adicionales para el contenedor.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">
                      labelClassName
                    </td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Clases adicionales para el label.
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

export default DataFieldDocs;
