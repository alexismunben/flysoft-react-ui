import React from "react";
import { Card, Collection, DataField, Badge } from "../index";

const CollectionDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Collection - Layout flex con densidad">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              <code>Collection</code> es un wrapper flex (vertical u horizontal)
              que respeta la densidad activa para el gap entre items.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title="Vertical (default)">
                <Collection>
                  <DataField label="Nombre" value="Juan Pérez" />
                  <DataField label="Email" value="juan@example.com" />
                  <DataField label="Teléfono" value="+54 11 1234-5678" />
                </Collection>
              </Card>
              <Card title="Horizontal con wrap">
                <Collection direction="row" wrap>
                  <Badge>Activo</Badge>
                  <Badge color="info">Verificado</Badge>
                  <Badge color="warning">Pendiente</Badge>
                  <Badge color="success">Premium</Badge>
                </Collection>
              </Card>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Presets de gap (<code>tight</code> / <code>sm</code> /{" "}
              <code>md</code> / <code>lg</code>)
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El prop <code>gap</code> acepta presets semánticos que leen de las
              variables CSS <code>--flysoft-density-gap-*</code>, o cualquier
              valor CSS arbitrario (<code>"0.5rem"</code>, <code>"8px"</code>)
              para casos especiales.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card title='gap="tight"' compact>
                <Collection gap="tight">
                  <DataField label="Item 1" value="A" />
                  <DataField label="Item 2" value="B" />
                  <DataField label="Item 3" value="C" />
                </Collection>
              </Card>
              <Card title='gap="sm"' compact>
                <Collection gap="sm">
                  <DataField label="Item 1" value="A" />
                  <DataField label="Item 2" value="B" />
                  <DataField label="Item 3" value="C" />
                </Collection>
              </Card>
              <Card title='gap="md" (default)' compact>
                <Collection gap="md">
                  <DataField label="Item 1" value="A" />
                  <DataField label="Item 2" value="B" />
                  <DataField label="Item 3" value="C" />
                </Collection>
              </Card>
              <Card title='gap="lg"' compact>
                <Collection gap="lg">
                  <DataField label="Item 1" value="A" />
                  <DataField label="Item 2" value="B" />
                  <DataField label="Item 3" value="C" />
                </Collection>
              </Card>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Override local de densidad (prop <code>density</code>)
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Al pasar <code>density</code>, la Collection redefine las
              variables CSS <code>--flysoft-density-*</code> para sí misma y sus
              descendientes. Sirve para tener una sección densa dentro de un
              layout cómodo, sin tocar el ThemeProvider.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card title="density = comfortable">
                <Collection density="comfortable">
                  <DataField label="CUIL" value="20-17990271-1" />
                  <DataField label="Edad" value={59} />
                  <DataField label="F Nac" value="23/06/1966" />
                </Collection>
              </Card>
              <Card title="density = compact">
                <Collection density="compact">
                  <DataField label="CUIL" value="20-17990271-1" />
                  <DataField label="Edad" value={59} />
                  <DataField label="F Nac" value="23/06/1966" />
                </Collection>
              </Card>
              <Card title="density = dense">
                <Collection density="dense">
                  <DataField label="CUIL" value="20-17990271-1" />
                  <DataField label="Edad" value={59} />
                  <DataField label="F Nac" value="23/06/1966" />
                </Collection>
              </Card>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Caso real: datos personales horizontales con wrap
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Combinación típica en pantallas densas: row con wrap y gap medio.
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
                    <td className="px-4 py-2 text-sm font-mono">children</td>
                    <td className="px-4 py-2 text-sm">ReactNode</td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">Items a apilar.</td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">gap</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;tight&quot; | &quot;sm&quot; | &quot;md&quot; |
                      &quot;lg&quot; | string
                    </td>
                    <td className="px-4 py-2 text-sm">&quot;md&quot;</td>
                    <td className="px-4 py-2 text-sm">
                      Espacio entre items. Presets leen{" "}
                      <code>--flysoft-density-gap-*</code>; un string acepta
                      cualquier valor CSS (<code>"0.5rem"</code>,{" "}
                      <code>"8px"</code>).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">direction</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;column&quot; | &quot;row&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">&quot;column&quot;</td>
                    <td className="px-4 py-2 text-sm">
                      Dirección del flex.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">wrap</td>
                    <td className="px-4 py-2 text-sm">boolean</td>
                    <td className="px-4 py-2 text-sm">false</td>
                    <td className="px-4 py-2 text-sm">
                      Si los items pueden saltar de línea.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">density</td>
                    <td className="px-4 py-2 text-sm">
                      &quot;comfortable&quot; | &quot;compact&quot; |
                      &quot;dense&quot;
                    </td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Override local de densidad: redefine{" "}
                      <code>--flysoft-density-*</code> para esta Collection y
                      descendientes. Si se omite, hereda del ThemeProvider o de
                      un wrapper superior (p. ej. <code>Card compact</code>).
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">className</td>
                    <td className="px-4 py-2 text-sm">string</td>
                    <td className="px-4 py-2 text-sm">—</td>
                    <td className="px-4 py-2 text-sm">
                      Clases CSS adicionales.
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

export default CollectionDocs;
