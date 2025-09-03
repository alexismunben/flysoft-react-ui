import React from "react";
import { Button, Input, Card, Badge } from "flysoft-react-ui";
import "flysoft-react-ui/styles";

// Ejemplo de uso de la librería Flysoft React UI
function ExampleApp() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ejemplo de Uso
          </h1>
          <p className="text-gray-600">
            Demostración de la librería Flysoft React UI
          </p>
        </div>

        <Card
          title="Formulario de Contacto"
          subtitle="Ejemplo de formulario usando los componentes"
          variant="elevated"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nombre completo"
              placeholder="Ingresa tu nombre"
              icon="fa-user"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
            />

            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              icon="fa-envelope"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
            />

            <Input
              label="Mensaje"
              placeholder="Escribe tu mensaje..."
              icon="fa-comment"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <Badge variant="info">Formulario</Badge>
                <Badge variant="success" rounded>
                  Activo
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="outline" icon="fa-times">
                  Cancelar
                </Button>
                <Button type="submit" variant="primary" icon="fa-paper-plane">
                  Enviar
                </Button>
              </div>
            </div>
          </form>
        </Card>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Características" variant="outlined">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <i className="fa fa-check text-green-500"></i>
                <span>TypeScript completo</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa fa-check text-green-500"></i>
                <span>Tailwind CSS integrado</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa fa-check text-green-500"></i>
                <span>Iconos FontAwesome</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa fa-check text-green-500"></i>
                <span>Totalmente personalizable</span>
              </div>
            </div>
          </Card>

          <Card title="Estados" variant="outlined">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Botón normal:</span>
                <Button size="sm" variant="primary">
                  Normal
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Botón cargando:</span>
                <Button size="sm" variant="primary" loading>
                  Cargando
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Botón deshabilitado:</span>
                <Button size="sm" variant="primary" disabled>
                  Deshabilitado
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ExampleApp;

