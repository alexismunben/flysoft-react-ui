import React from "react";
import { Badge, Card } from "../index";

const BadgeDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Badge - Variantes y Estados">
        <div className="space-y-8">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Variantes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Badge variant="primary">Primario</Badge>
              <Badge variant="secondary">Secundario</Badge>
              <Badge variant="success" icon="fa-check-circle">
                Éxito
              </Badge>
              <Badge variant="warning" icon="fa-exclamation-triangle">
                Advertencia
              </Badge>
              <Badge variant="danger" icon="fa-times-circle">
                Error
              </Badge>
              <Badge variant="info" icon="fa-info-circle">
                Información
              </Badge>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tamaños
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <Badge size="sm" icon="fa-circle" iconLabel="Indicador pequeño">
                Pequeño
              </Badge>
              <Badge size="md" icon="fa-circle">
                Mediano
              </Badge>
              <Badge size="lg" icon="fa-circle">
                Grande
              </Badge>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Íconos y diseño
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              <Badge icon="fa-bell" rounded>
                Notificación
              </Badge>
              <Badge icon="fa-arrow-right" iconPosition="right">
                Acción
              </Badge>
              <Badge icon="fa-shield-alt" iconLabel="Estado protegido">
                Accesible
              </Badge>
            </div>
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usa <code>icon</code> con clases FontAwesome 5 (ej.{" "}
              <code>fa-check</code>) y combina <code>rounded</code> para badges
              tipo pills.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default BadgeDocs;


