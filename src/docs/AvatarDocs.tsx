import React from "react";
import { Avatar, Card } from "../index";

const AvatarDocs: React.FC = () => {

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Avatar - Iniciales e Imágenes">
        <div className="space-y-8">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso Básico con Iniciales
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar text="John Doe" />
              <Avatar text="Jane Smith" />
              <Avatar text="María García" />
              <Avatar text="Pedro" />
              <Avatar text="Ana María López" />
            </div>
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente muestra las iniciales del texto. Si hay una sola palabra,
              muestra la primera letra. Si hay múltiples palabras, muestra la primera
              letra de la primera palabra y la primera letra de la última palabra.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tamaños
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex flex-col items-center gap-2">
                <Avatar text="Small" size="sm" />
                <span
                  className="text-xs"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  sm
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar text="Medium" size="md" />
                <span
                  className="text-xs"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  md (default)
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar text="Large" size="lg" />
                <span
                  className="text-xs"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  lg
                </span>
              </div>
            </div>
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usa la propiedad <code>size</code> para cambiar el tamaño del avatar.
              Los tamaños disponibles son: <code>sm</code>, <code>md</code> (por defecto),
              y <code>lg</code>.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con Imágenes
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar
                text="Usuario con Imagen"
                image="https://i.pravatar.cc/150?img=1"
              />
              <Avatar
                text="Otra Imagen"
                image="https://i.pravatar.cc/150?img=12"
              />
              <Avatar
                text="Tercera Imagen"
                image="https://i.pravatar.cc/150?img=33"
              />
            </div>
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cuando se proporciona una imagen mediante la propiedad <code>image</code>,
              el avatar muestra la imagen en lugar de las iniciales. Si la imagen falla
              al cargar, automáticamente se mostrarán las iniciales como fallback.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Colores Personalizados
            </h3>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Colores Hexadecimales
                </h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <Avatar text="Azul" bgColor="#3b82f6" textColor="#ffffff" />
                  <Avatar text="Verde" bgColor="#10b981" textColor="#ffffff" />
                  <Avatar text="Rojo" bgColor="#ef4444" textColor="#ffffff" />
                  <Avatar text="Amarillo" bgColor="#f59e0b" textColor="#000000" />
                  <Avatar text="Púrpura" bgColor="#8b5cf6" textColor="#ffffff" />
                  <Avatar text="Rosa" bgColor="#ec4899" textColor="#ffffff" />
                </div>
              </div>

              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Colores RGB
                </h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <Avatar
                    text="RGB"
                    bgColor="rgb(59, 130, 246)"
                    textColor="rgb(255, 255, 255)"
                  />
                  <Avatar
                    text="RGBA"
                    bgColor="rgba(16, 185, 129, 0.9)"
                    textColor="rgb(255, 255, 255)"
                  />
                </div>
              </div>

              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Nombres de Colores
                </h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <Avatar text="Gray-800" bgColor="gray-800" textColor="white" />
                  <Avatar text="Gray-700" bgColor="gray-700" textColor="white" />
                  <Avatar text="Gray-500" bgColor="gray-500" textColor="white" />
                </div>
              </div>

              <p
                className="text-sm mt-3"
                style={{ color: "var(--flysoft-text-secondary)" }}
              >
                Usa las propiedades <code>bgColor</code> y <code>textColor</code> para
                personalizar los colores. Puedes usar valores hexadecimales (ej:{" "}
                <code>#3b82f6</code>), RGB (ej: <code>rgb(59, 130, 246)</code>), o nombres
                de colores comunes (ej: <code>white</code>, <code>black</code>,
                <code>gray-600</code>). Por defecto, el fondo es <code>gray-600</code> y el
                texto es <code>white</code>.
              </p>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplos Prácticos
            </h3>
            <div className="space-y-4">
              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Lista de Usuarios
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Avatar text="Juan Pérez" bgColor="#3b82f6" />
                    <span style={{ color: "var(--flysoft-text-primary)" }}>
                      Juan Pérez
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar text="María González" bgColor="#10b981" />
                    <span style={{ color: "var(--flysoft-text-primary)" }}>
                      María González
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar
                      text="Carlos Rodríguez"
                      image="https://i.pravatar.cc/150?img=5"
                    />
                    <span style={{ color: "var(--flysoft-text-primary)" }}>
                      Carlos Rodríguez
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4
                  className="text-md font-medium mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Diferentes Tamaños con Colores
                </h4>
                <div className="flex flex-wrap gap-4 items-center">
                  <Avatar text="SM" size="sm" bgColor="#8b5cf6" />
                  <Avatar text="MD" size="md" bgColor="#ec4899" />
                  <Avatar text="LG" size="lg" bgColor="#f59e0b" />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Atributo Title
            </h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Avatar text="Pasa el mouse aquí" />
              <Avatar text="John Doe" bgColor="#3b82f6" />
              <Avatar
                text="Usuario con Imagen"
                image="https://i.pravatar.cc/150?img=8"
              />
            </div>
            <p
              className="text-sm mt-3"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente siempre incluye un atributo <code>title</code> con el texto
              completo. Pasa el mouse sobre cualquier avatar para ver el tooltip.
            </p>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default AvatarDocs;

