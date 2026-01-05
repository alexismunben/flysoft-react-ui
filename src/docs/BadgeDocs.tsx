import React, { useState } from "react";
import { Badge, Card } from "../index";

const BadgeDocs: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [iconClickCount, setIconClickCount] = useState(0);

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
              <Badge variant="primary" icon="fa-star" iconPosition="right">
                Primario
              </Badge>
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
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Iconos a la izquierda (por defecto)
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge icon="fa-bell" rounded>
                    Notificación
                  </Badge>
                  <Badge variant="primary" icon="fa-star">
                    Primario
                  </Badge>
                  <Badge variant="success" icon="fa-check-circle">
                    Éxito
                  </Badge>
                  <Badge icon="fa-shield-alt" iconLabel="Estado protegido">
                    Accesible
                  </Badge>
                </div>
              </div>

              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Iconos a la derecha (iconPosition="right")
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge variant="primary" icon="fa-star" iconPosition="right">
                    Primario
                  </Badge>
                  <Badge
                    variant="secondary"
                    icon="fa-circle"
                    iconPosition="right"
                  >
                    Secundario
                  </Badge>
                  <Badge variant="success" icon="fa-check" iconPosition="right">
                    Éxito
                  </Badge>
                  <Badge
                    variant="warning"
                    icon="fa-exclamation"
                    iconPosition="right"
                  >
                    Advertencia
                  </Badge>
                  <Badge variant="danger" icon="fa-times" iconPosition="right">
                    Error
                  </Badge>
                  <Badge variant="info" icon="fa-info" iconPosition="right">
                    Información
                  </Badge>
                  <Badge icon="fa-arrow-right" iconPosition="right" rounded>
                    Acción
                  </Badge>
                </div>
              </div>
            </div>
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usa <code>icon</code> con clases FontAwesome 5 (ej.{" "}
              <code>fa-check</code>). El prop <code>iconPosition</code> puede
              ser <code>"left"</code> (por defecto) o <code>"right"</code> para
              posicionar el icono. Combina <code>rounded</code> para badges tipo
              pills.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Interactividad con onClick
            </h3>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Badge sin iconos (todo el badge es clickeable)
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge
                    variant="primary"
                    onClick={() => setClickCount((prev) => prev + 1)}
                  >
                    Click aquí ({clickCount})
                  </Badge>
                  <Badge
                    variant="success"
                    onClick={() => alert("Badge clickeado!")}
                  >
                    Alerta
                  </Badge>
                  <Badge
                    variant="info"
                    rounded
                    onClick={() => console.log("Badge info clickeado")}
                  >
                    Ver en consola
                  </Badge>
                </div>
                <p
                  className="text-sm mt-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Cuando no hay iconos, el <code>onClick</code> afecta a todo el
                  badge y muestra cursor pointer.
                </p>
              </div>

              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Badge con iconos (solo los iconos son clickeables)
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge
                    variant="warning"
                    icon="fa-times-circle"
                    onClick={() => setIconClickCount((prev) => prev + 1)}
                  >
                    Cerrar ({iconClickCount})
                  </Badge>
                  <Badge
                    variant="danger"
                    icon="fa-trash"
                    iconPosition="right"
                    onClick={() => alert("Eliminar item")}
                  >
                    Eliminar
                  </Badge>
                  <Badge
                    variant="info"
                    icon="fa-edit"
                    rounded
                    onClick={() => console.log("Editar clickeado")}
                  >
                    Editar
                  </Badge>
                  <Badge
                    variant="success"
                    icon="fa-check"
                    iconPosition="right"
                    onClick={() => alert("Aceptar")}
                  >
                    Aceptar
                  </Badge>
                </div>
                <p
                  className="text-sm mt-2"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Cuando hay iconos, el <code>onClick</code> solo afecta a los
                  iconos (tienen cursor pointer). El texto del badge no es
                  clickeable.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Background personalizado
            </h3>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Colores personalizados (hex, rgb, nombres)
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge bg="#ff6b6b" textColor="white">
                    Rojo personalizado
                  </Badge>
                  <Badge bg="#4ecdc4" textColor="white">
                    Turquesa
                  </Badge>
                  <Badge bg="#ffe66d" textColor="#1f2937">
                    Amarillo claro
                  </Badge>
                  <Badge bg="rgb(138, 43, 226)" textColor="white">
                    Violeta RGB
                  </Badge>
                  <Badge bg="#95e1d3" textColor="#1f2937">
                    Verde menta
                  </Badge>
                  <Badge bg="#f38181" textColor="white">
                    Coral
                  </Badge>
                </div>
              </div>

              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Con iconos y rounded
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge bg="#6c5ce7" textColor="white" icon="fa-star" rounded>
                    Premium
                  </Badge>
                  <Badge
                    bg="#00b894"
                    textColor="white"
                    icon="fa-check-circle"
                    iconPosition="right"
                  >
                    Verificado
                  </Badge>
                  <Badge bg="#e17055" textColor="white" icon="fa-fire" rounded>
                    Popular
                  </Badge>
                  <Badge
                    bg="#0984e3"
                    textColor="white"
                    icon="fa-bolt"
                    iconPosition="right"
                    rounded
                  >
                    Rápido
                  </Badge>
                </div>
              </div>

              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Con onClick y background personalizado
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  <Badge
                    bg="#a29bfe"
                    textColor="white"
                    onClick={() => alert("Badge personalizado clickeado!")}
                  >
                    Click aquí
                  </Badge>
                  <Badge
                    bg="#fd79a8"
                    textColor="white"
                    icon="fa-heart"
                    onClick={() => alert("Me gusta!")}
                    rounded
                  >
                    Me gusta
                  </Badge>
                  <Badge
                    bg="#55efc4"
                    textColor="#1f2937"
                    icon="fa-share"
                    iconPosition="right"
                    onClick={() => console.log("Compartir")}
                  >
                    Compartir
                  </Badge>
                </div>
              </div>

              <p
                className="text-sm mt-3"
                style={{ color: "var(--flysoft-text-secondary)" }}
              >
                Usa <code>bg</code> para definir un color de fondo personalizado
                (hex, rgb, nombres de colores CSS como "white", "black", o
                valores Tailwind como "gray-800") y <code>textColor</code> para
                personalizar el color del texto. Si no especificas{" "}
                <code>textColor</code>, se usa gris oscuro por defecto.
              </p>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default BadgeDocs;
