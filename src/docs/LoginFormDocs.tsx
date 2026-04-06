import React, { useState } from "react";
import { Card, Checkbox } from "../index";
import { LoginForm } from "../templates/forms/LoginForm";

const LoginFormDocs: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [showError, setShowError] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  const handleSubmit = (data: { email: string; password: string }) => {
    setLoading(true);
    setError(undefined);
    setTimeout(() => {
      setLoading(false);
      if (showError) {
        setError("Credenciales incorrectas. Intenta nuevamente.");
      } else {
        alert(`Login exitoso!\nEmail: ${data.email}`);
      }
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="LoginForm - Template de Formulario de Login">
        <div className="space-y-8">
          <section>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Template pre-construido para formularios de inicio de sesión. Incluye
              validación de email y contraseña, estados de carga y manejo de errores.
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
                label="Simular error en login"
                checked={showError}
                onChange={(e) => setShowError(e.target.checked)}
              />
              <Checkbox
                label="Modo compacto"
                checked={isCompact}
                onChange={(e) => setIsCompact(e.target.checked)}
              />
            </div>
            <LoginForm
              compact={isCompact}
              onSubmit={handleSubmit}
              loading={loading}
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
              <code>{`import { LoginForm } from "flysoft-react-ui";

<LoginForm
  onSubmit={(data) => console.log(data)}
  loading={false}
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
                    <td className="p-2"><code>{"(data: { email: string; password: string }) => void"}</code></td>
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
                    <td className="p-2"><code>error</code></td>
                    <td className="p-2"><code>string</code></td>
                    <td className="p-2">-</td>
                    <td className="p-2">Mensaje de error a mostrar (ej. credenciales incorrectas)</td>
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

export default LoginFormDocs;
