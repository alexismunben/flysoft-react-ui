import React from "react";
import { Card, DropdownPanel, Button } from "../index";

const DropdownPanelDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="DropdownPanel - Panel Flotante Genérico">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente DropdownPanel muestra un panel flotante con
              contenido arbitrario (children). A diferencia de DropdownMenu, no
              maneja una lista de opciones, sino que renderiza lo que le pases.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <DropdownPanel>
                  <div className="p-4 w-64">
                    <h4 className="font-bold mb-2">Contenido del panel</h4>
                    <p className="text-sm">
                      Aquí puedes poner cualquier cosa: texto, imágenes,
                      componentes, formularios, etc.
                    </p>
                  </div>
                </DropdownPanel>
                <div className="text-sm text-[var(--flysoft-text-secondary)]">
                  &lt;- Click en los tres puntos para ver el panel
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con renderNode personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes personalizar el disparador (trigger) usando la prop{" "}
              <code>renderNode</code>.
            </p>
            <div className="space-y-4">
              <DropdownPanel
                renderNode={
                  <Button variant="primary" icon="fa-filter">
                    Filtros Avanzados
                  </Button>
                }
              >
                <div className="p-4 w-80 space-y-4">
                  <h4 className="font-bold border-b pb-2">
                    Configuración de Filtros
                  </h4>
                  <div>
                    <label className="block text-sm mb-1">
                      Buscar por nombre
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border rounded"
                      placeholder="Escribe..."
                    />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button variant="primary" size="sm">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </DropdownPanel>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Abrir al pasar el mouse (openOnHover)
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Al igual que DropdownMenu, puedes usar <code>openOnHover</code>{" "}
              para que el panel se despliegue automáticamente al pasar el
              cursor.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <DropdownPanel openOnHover={true}>
                  <div className="p-4 w-64">
                    <h4 className="font-bold mb-2">Panel con Hover</h4>
                    <p className="text-sm">
                      Este panel se abrió sin hacer clic. Es ideal para tooltips
                      complejos o menús de información rápida.
                    </p>
                  </div>
                </DropdownPanel>
                <div className="text-sm text-[var(--flysoft-text-secondary)]">
                  &lt;- Pasa el mouse por aquí
                </div>
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
                      Contenido a mostrar dentro del panel flotante.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      renderNode
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
                      Elemento personalizado que activa el panel. Si no se
                      proporciona, se muestra un botón ghost con tres puntos.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      openOnHover
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      boolean
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
                      Si es <code>true</code>, el panel se abre al pasar el
                      mouse por encima del trigger. Por defecto es{" "}
                      <code>false</code>.
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

export default DropdownPanelDocs;
