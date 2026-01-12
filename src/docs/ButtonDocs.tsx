import React from "react";
import { Card, Button } from "../index";

const ButtonDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Button - Variantes y Ejemplos">
        <div className="space-y-8">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Variantes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <Button variant="primary" icon="fa-check">
                  Primario
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  botón primario
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Button variant="outline" icon="fa-pen">
                  Outline
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  botón outline
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Button variant="ghost" icon="fa-trash">
                  Ghost
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  botón ghost
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <Button size="sm" variant="primary">
                  Pequeño
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  botón pequeño
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Button size="md" variant="primary">
                  Mediano
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  botón mediano
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Button size="lg" variant="primary">
                  Grande
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  botón grande
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Colores
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes especificar diferentes colores usando la propiedad{" "}
              <code>color</code>. Los colores disponibles son: primary,
              secondary, success, warning, danger e info.
            </p>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Primary
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" color="primary">
                    Primary
                  </Button>
                  <Button variant="primary" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="primary" color="success">
                    Success
                  </Button>
                  <Button variant="primary" color="warning">
                    Warning
                  </Button>
                  <Button variant="primary" color="danger">
                    Danger
                  </Button>
                  <Button variant="primary" color="info">
                    Info
                  </Button>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Outline
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" color="primary">
                    Primary
                  </Button>
                  <Button variant="outline" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="outline" color="success">
                    Success
                  </Button>
                  <Button variant="outline" color="warning">
                    Warning
                  </Button>
                  <Button variant="outline" color="danger">
                    Danger
                  </Button>
                  <Button variant="outline" color="info">
                    Info
                  </Button>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Ghost
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" color="primary">
                    Primary
                  </Button>
                  <Button variant="ghost" color="secondary">
                    Secondary
                  </Button>
                  <Button variant="ghost" color="success">
                    Success
                  </Button>
                  <Button variant="ghost" color="warning">
                    Warning
                  </Button>
                  <Button variant="ghost" color="danger">
                    Danger
                  </Button>
                  <Button variant="ghost" color="info">
                    Info
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con ícono
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <Button variant="primary" icon="fa-download">
                  Con ícono (izquierda)
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  botón con ícono
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Button
                  variant="outline"
                  icon="fa-arrow-right"
                  iconPosition="right"
                >
                  Ícono a la derecha
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  ícono a la derecha
                </p>
              </div>
              <div className="flex flex-col items-start gap-2">
                <Button variant="ghost" loading icon="fa-spinner">
                  Cargando
                </Button>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  estado de carga
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Colores personalizados
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes especificar colores personalizados usando las propiedades{" "}
              <code>bg</code> y <code>textColor</code>. Acepta códigos hex, rgb,
              rgba, hsl, o nombres de colores comunes (white, black, gray-50,
              gray-100, etc.).
            </p>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Primary con colores personalizados
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" bg="#8b5cf6" textColor="white">
                    Púrpura
                  </Button>
                  <Button variant="primary" bg="#ec4899" textColor="white">
                    Rosa
                  </Button>
                  <Button variant="primary" bg="#14b8a6" textColor="white">
                    Turquesa
                  </Button>
                  <Button
                    variant="primary"
                    bg="rgb(239, 68, 68)"
                    textColor="white"
                  >
                    Rojo RGB
                  </Button>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Outline con colores personalizados
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" bg="#8b5cf6" textColor="#8b5cf6">
                    Púrpura
                  </Button>
                  <Button variant="outline" bg="#ec4899" textColor="#ec4899">
                    Rosa
                  </Button>
                  <Button variant="outline" bg="#14b8a6" textColor="#14b8a6">
                    Turquesa
                  </Button>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Variante Ghost con colores personalizados
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" bg="#8b5cf6" textColor="#8b5cf6">
                    Púrpura
                  </Button>
                  <Button variant="ghost" bg="#ec4899" textColor="#ec4899">
                    Rosa
                  </Button>
                  <Button variant="ghost" bg="#14b8a6" textColor="#14b8a6">
                    Turquesa
                  </Button>
                </div>
              </div>
              <div>
                <h4
                  className="text-md font-semibold mb-3"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Con nombres de colores
                </h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="primary" bg="gray-800" textColor="white">
                    Gray-800
                  </Button>
                  <Button variant="primary" bg="gray-700" textColor="white">
                    Gray-700
                  </Button>
                  <Button variant="outline" bg="gray-600" textColor="gray-600">
                    Gray-600
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ButtonDocs;
