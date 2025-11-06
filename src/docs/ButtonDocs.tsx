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
        </div>
      </Card>
    </div>
  );
};

export default ButtonDocs;
