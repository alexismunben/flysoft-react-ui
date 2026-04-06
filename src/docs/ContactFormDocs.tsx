import React, { useState } from "react";
import { Card, Checkbox } from "../index";
import { ContactForm } from "../templates/forms/ContactForm";

const ContactFormDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [showError, setShowError] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      if (showError) {
        setError("Error al enviar el mensaje. Intenta nuevamente.");
      } else {
        setSuccess(true);
      }
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="ContactForm - Template de Formulario de Contacto">
        <div className="space-y-8">
          <section>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Template pre-construido para formularios de contacto. Incluye campos de
              nombre, email, asunto y mensaje con validaciones, estado de éxito y manejo de errores.
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
                label="Simular error en envío"
                checked={showError}
                onChange={(e) => setShowError(e.target.checked)}
              />
              <Checkbox
                label="Modo compacto"
                checked={isCompact}
                onChange={(e) => setIsCompact(e.target.checked)}
              />
            </div>
            <ContactForm
              compact={isCompact}
              onSubmit={handleSubmit}
              loading={loading}
              success={success}
              error={error}
            />
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso
            </h3>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
              <code>{`import { ContactForm } from "flysoft-react-ui";

<ContactForm
  onSubmit={(data) => console.log(data)}
  loading={false}
  success={false}
  error="Mensaje de error opcional"
/>`}</code>
            </pre>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props
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
                    <td className="p-2"><code>onSubmit</code></td>
                    <td className="p-2"><code>{"(data: { name, email, subject, message }) => void"}</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Callback al enviar el formulario con los datos válidos</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>loading</code></td>
                    <td className="p-2"><code>boolean</code></td>
                    <td className="p-2"><code>false</code></td>
                    <td className="p-2">Muestra estado de carga en el botón y deshabilita inputs</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>success</code></td>
                    <td className="p-2"><code>boolean</code></td>
                    <td className="p-2"><code>false</code></td>
                    <td className="p-2">Muestra vista de éxito con mensaje de confirmación</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>error</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Mensaje de error a mostrar</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2"><code>className</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2"><code>""</code></td>
                    <td className="p-2">Clases CSS adicionales para el contenedor</td>
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

export default ContactFormDocs;
