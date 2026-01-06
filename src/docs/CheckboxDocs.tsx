import React from "react";
import { Card, Checkbox, Button } from "../index";

const CheckboxDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Checkbox - Variantes y Ejemplos">
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
                <Checkbox label="Acepto los términos y condiciones" />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  checkbox estándar con label a la derecha (por defecto)
                </p>
              </div>
              <div className="space-y-3">
                <Checkbox
                  label="Acepto los términos y condiciones"
                  labelPosition="left"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  checkbox con label a la izquierda
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
                <Checkbox label="Tamaño pequeño" size="sm" />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño compacto
                </p>
              </div>
              <div className="space-y-3">
                <Checkbox label="Tamaño mediano" size="md" />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño por defecto
                </p>
              </div>
              <div className="space-y-3">
                <Checkbox label="Tamaño grande" size="lg" />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  tamaño amplio
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Posiciones de label
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Checkbox label="Label a la derecha" labelPosition="right" />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  posición por defecto
                </p>
              </div>
              <div className="space-y-3">
                <Checkbox label="Label a la izquierda" labelPosition="left" />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  label antes del checkbox
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
                <Checkbox
                  label="Con error"
                  error="Debes aceptar los términos y condiciones"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  utiliza el prop error para mostrar mensajes y estilos
                </p>
              </div>
              <div className="space-y-3">
                <Checkbox label="Deshabilitado" disabled />
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
              Estados checked
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Checkbox label="No seleccionado" checked={false} />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  estado inicial sin seleccionar
                </p>
              </div>
              <div className="space-y-3">
                <Checkbox label="Seleccionado" checked={true} />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  checkbox marcado
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo de uso
            </h3>
            <Card
              title="Formulario con Checkbox"
              subtitle="Ejemplo práctico de uso de Checkbox en un formulario"
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="outline" icon="fa-times">
                    Cancelar
                  </Button>
                  <Button variant="primary" icon="fa-check">
                    Enviar
                  </Button>
                </div>
              }
            >
              <div className="space-y-4">
                <Checkbox label="Acepto los términos y condiciones" />
                <Checkbox
                  label="Deseo recibir notificaciones por email"
                  labelPosition="left"
                />
                <Checkbox
                  label="Acepto la política de privacidad"
                  error="Debes aceptar la política de privacidad"
                />
              </div>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default CheckboxDocs;



