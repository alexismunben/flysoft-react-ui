import React from "react";
import { Card, Input, Button } from "../index";

const InputDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Input - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Input
                  label="Nombre completo"
                  placeholder="Ingresa tu nombre"
                  icon="fa-user"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  campo de texto estándar con ícono a la izquierda
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  label="Correo electrónico"
                  type="email"
                  placeholder="usuario@ejemplo.com"
                  icon="fa-envelope"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  soporta tipos de entrada nativos de HTML
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tamaños
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Input
                  size="sm"
                  label="Tamaño pequeño"
                  placeholder="sm"
                  icon="fa-compress-alt"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño compacto ideal para barras de herramientas
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  size="md"
                  label="Tamaño mediano"
                  placeholder="md"
                  icon="fa-arrows-alt-h"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño por defecto, balanceado para formularios
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  size="lg"
                  label="Tamaño grande"
                  placeholder="lg"
                  icon="fa-expand-alt"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño amplio ideal para formularios destacados
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Íconos y posiciones
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Input
                  label="Ícono a la izquierda"
                  placeholder="Buscar..."
                  icon="fa-search"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  ícono alineado a la izquierda por defecto
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  label="Ícono a la derecha"
                  placeholder="Código de verificación"
                  icon="fa-key"
                  iconPosition="right"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  iconPosition permite mover el ícono a la derecha
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Estados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Input
                  label="Con error"
                  placeholder="Usuario"
                  error="Este campo es obligatorio"
                  icon="fa-exclamation-circle"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  utiliza el prop error para mostrar mensajes y estilos
                </p>
              </div>
              <div className="space-y-3">
                <Input
                  label="Deshabilitado"
                  placeholder="Solo lectura"
                  disabled
                  icon="fa-lock"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  el estado disabled aplica estilos y bloqueo de interacción
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Formulario completo
            </h3>
            <Card
              title="Ejemplo de formulario con Input"
              subtitle="Combinación de Input y Button para captura de datos"
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="outline" icon="fa-times">
                    Cancelar
                  </Button>
                  <Button variant="primary" icon="fa-paper-plane">
                    Enviar
                  </Button>
                </div>
              }
            >
              <div className="space-y-4">
                <Input
                  label="Nombre"
                  placeholder="Nombre y apellido"
                  icon="fa-id-card"
                />
                <Input
                  label="Correo"
                  type="email"
                  placeholder="correo@empresa.com"
                  icon="fa-at"
                />
                <Input
                  label="Teléfono"
                  type="tel"
                  placeholder="+34 600 000 000"
                  icon="fa-phone"
                />
              </div>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default InputDocs;


