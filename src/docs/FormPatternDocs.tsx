import React, { useState } from "react";
import { Card, Checkbox } from "../index";
import { FormPattern } from "../templates/patterns/FormPattern";
import type { FormField } from "../templates/patterns/FormPattern";

const sampleFields: FormField[] = [
  { name: "name", label: "Nombre", type: "text", icon: "fa-user", required: true, placeholder: "Tu nombre completo" },
  { name: "email", label: "Email", type: "email", icon: "fa-envelope", required: true, placeholder: "tu@email.com" },
  { name: "phone", label: "Teléfono", type: "tel", icon: "fa-phone", placeholder: "+54 11 1234-5678" },
  { name: "company", label: "Empresa", type: "text", icon: "fa-building", placeholder: "Nombre de tu empresa" },
  {
    name: "message",
    label: "Mensaje",
    icon: "fa-comment",
    required: true,
    multiline: true,
    rows: 4,
    placeholder: "Escribe tu mensaje aquí...",
  },
];

const FormPatternDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [showError, setShowError] = useState(false);
  const [twoColumns, setTwoColumns] = useState(true);
  const [isCompact, setIsCompact] = useState(false);

  const handleSubmit = (data: Record<string, string>) => {
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      if (showError) {
        setError("Error al procesar el formulario. Intenta nuevamente.");
      } else {
        setSuccess(true);
        console.log("FormPattern data:", data);
      }
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="FormPattern - Template de Patrón de Formulario Reutilizable">
        <div className="space-y-8">
          <section>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Patrón reutilizable para construir formularios dinámicos. Define los campos
              como un array de configuración y el template se encarga de la validación,
              estados de carga, errores y éxito. Soporta campos de texto, multiline y
              layout en 1 o 2 columnas.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Demo interactiva
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <Checkbox
                label="Simular error"
                checked={showError}
                onChange={(e) => setShowError(e.target.checked)}
              />
              <Checkbox
                label="2 columnas"
                checked={twoColumns}
                onChange={(e) => setTwoColumns(e.target.checked)}
              />
              <Checkbox
                label="Modo compacto"
                checked={isCompact}
                onChange={(e) => setIsCompact(e.target.checked)}
              />
            </div>
            <div className="max-w-2xl mx-auto">
              <FormPattern
                title="Formulario de Ejemplo"
                subtitle="Completa los datos del formulario"
                fields={sampleFields}
                onSubmit={handleSubmit}
                submitText="Enviar Datos"
                submitIcon="fa-paper-plane"
                loading={loading}
                error={error}
                success={success}
                gridCols={twoColumns ? 2 : 1}
                compact={isCompact}
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`import { FormPattern } from "flysoft-react-ui";

const fields = [
  { name: "name", label: "Nombre", type: "text", icon: "fa-user", required: true },
  { name: "email", label: "Email", type: "email", icon: "fa-envelope", required: true },
  { name: "message", label: "Mensaje", multiline: true, rows: 4, required: true },
];

<FormPattern
  title="Mi Formulario"
  fields={fields}
  onSubmit={(data) => console.log(data)}
  submitText="Guardar"
  gridCols={2}
/>`}</code>
            </pre>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props - FormPattern
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Prop</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Default</th>
                    <th className="text-left p-2">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code>title</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Título del formulario (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>subtitle</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Subtítulo del formulario</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>fields</code></td>
                    <td className="p-2"><code>FormField[]</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Configuración de los campos (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>onSubmit</code></td>
                    <td className="p-2"><code>{"(data: Record<string, string>) => void"}</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Callback al enviar el formulario (requerido)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>submitText</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2"><code>"Enviar"</code></td>
                    <td className="p-2">Texto del botón de envío</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>submitIcon</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2"><code>"fa-paper-plane"</code></td>
                    <td className="p-2">Icono del botón de envío</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>loading</code></td>
                    <td className="p-2"><code>boolean</code></td>
                    <td className="p-2"><code>false</code></td>
                    <td className="p-2">Estado de carga</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>error</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Mensaje de error a mostrar</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>success</code></td>
                    <td className="p-2"><code>boolean</code></td>
                    <td className="p-2"><code>false</code></td>
                    <td className="p-2">Muestra vista de éxito</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>className</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2"><code>""</code></td>
                    <td className="p-2">Clases CSS adicionales</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>gridCols</code></td>
                    <td className="p-2"><code>1 | 2</code></td>
                    <td className="p-2"><code>1</code></td>
                    <td className="p-2">Número de columnas del grid</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Interface - FormField
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Campo</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2"><code>name</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Identificador único del campo</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>label</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Etiqueta visible del campo</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>type</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Tipo de input (text, email, tel, etc.)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>placeholder</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Texto placeholder</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>icon</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">Icono FontAwesome</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>required</code></td>
                    <td className="p-2"><code>boolean</code></td>
                    <td className="p-2">Si el campo es obligatorio</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>validation</code></td>
                    <td className="p-2"><code>{"(value: string) => string | undefined"}</code></td>
                    <td className="p-2">Función de validación personalizada</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>multiline</code></td>
                    <td className="p-2"><code>boolean</code></td>
                    <td className="p-2">Renderiza como textarea</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>rows</code></td>
                    <td className="p-2"><code>number</code></td>
                    <td className="p-2">Filas del textarea (default: 4)</td>
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

export default FormPatternDocs;
