import React, { useState } from "react";
import { Card, Loader, Button, Input } from "../index";

const LoaderDocs: React.FC = () => {
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [isLoading5, setIsLoading5] = useState(false);
  const [isLoading6, setIsLoading6] = useState(false);

  // Componente Skeleton para el ejemplo
  const SkeletonCard = () => (
    <Card title="Cargando contenido...">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-4 bg-[var(--color-bg-secondary)] rounded animate-pulse w-3/4" />
          <div className="h-4 bg-[var(--color-bg-secondary)] rounded animate-pulse w-full" />
          <div className="h-4 bg-[var(--color-bg-secondary)] rounded animate-pulse w-5/6" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-20 bg-[var(--color-bg-secondary)] rounded animate-pulse" />
          <div className="h-20 bg-[var(--color-bg-secondary)] rounded animate-pulse" />
          <div className="h-20 bg-[var(--color-bg-secondary)] rounded animate-pulse" />
        </div>
        <div className="h-10 bg-[var(--color-bg-secondary)] rounded animate-pulse w-1/3" />
      </div>
    </Card>
  );

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Loader - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Loader básico, sin children
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cuando no hay children ni contentLoadingNode, el Loader muestra
              únicamente la barra de progreso y el texto. Ideal para pantallas
              de carga completas.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-spinner"
                onClick={() => {
                  setIsLoading1(true);
                  setTimeout(() => setIsLoading1(false), 3000);
                }}
              >
                Mostrar Loader Básico
              </Button>
              <Loader isLoading={isLoading1} />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Loader básico con texto personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes personalizar el texto que se muestra debajo de la barra de
              progreso usando la prop <code>text</code>.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-file-upload"
                onClick={() => {
                  setIsLoading2(true);
                  setTimeout(() => setIsLoading2(false), 3000);
                }}
              >
                Mostrar Loader con Texto Personalizado
              </Button>
              <Loader
                isLoading={isLoading2}
                text="Subiendo archivo... Por favor espera."
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Loader con children pero sin contentLoadingNode ni
              keepContentWhileLoading
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cuando hay children pero no contentLoadingNode, el Loader muestra
              los children con un overlay semitransparente y la barra de
              progreso centrada. Los eventos del mouse y teclado se deshabilitan
              en los children.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-layer-group"
                onClick={() => {
                  setIsLoading3(true);
                  setTimeout(() => setIsLoading3(false), 3000);
                }}
              >
                Mostrar Loader con Overlay
              </Button>
              <Loader isLoading={isLoading3}>
                <Card title="Contenido con Loader">
                  <div className="space-y-4">
                    <Input
                      label="Nombre"
                      placeholder="Ingresa tu nombre"
                      icon="fa-user"
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="usuario@ejemplo.com"
                      icon="fa-envelope"
                    />
                    <Button variant="primary" icon="fa-save">
                      Guardar
                    </Button>
                  </div>
                </Card>
              </Loader>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Loader con children y keepContentWhileLoading
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando <code>keepContentWhileLoading</code> los children mantienen
              su opacidad normal pero siguen deshabilitados para interacción.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-eye"
                onClick={() => {
                  setIsLoading4(true);
                  setTimeout(() => setIsLoading4(false), 3000);
                }}
              >
                Mostrar Loader (mantener contenido visible)
              </Button>
              <Loader isLoading={isLoading4} keepContentWhileLoading>
                <Card title="Contenido Visible Durante Carga">
                  <div className="space-y-4">
                    <Input
                      label="Búsqueda"
                      placeholder="Buscar productos..."
                      icon="fa-search"
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-[var(--color-bg-secondary)] rounded">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--flysoft-text-primary)" }}
                        >
                          Producto 1
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--color-bg-secondary)] rounded">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--flysoft-text-primary)" }}
                        >
                          Producto 2
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--color-bg-secondary)] rounded">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--flysoft-text-primary)" }}
                        >
                          Producto 3
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Loader>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Loader con children y contentLoadingNode (skeleton)
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cuando se proporciona <code>contentLoadingNode</code>, los
              children se ocultan y se muestra el nodo personalizado con el
              loader centrado encima. En este ejemplo usamos un skeleton para
              mostrar el contenido que se está cargando.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-image"
                onClick={() => {
                  setIsLoading5(true);
                  setTimeout(() => setIsLoading5(false), 3000);
                }}
              >
                Mostrar Loader con Skeleton
              </Button>
              <Loader
                isLoading={isLoading5}
                contentLoadingNode={<SkeletonCard />}
              >
                <Card title="Contenido Real (oculto durante carga)">
                  <div className="space-y-4">
                    <p style={{ color: "var(--flysoft-text-secondary)" }}>
                      Este es el contenido real que se mostrará cuando termine
                      la carga.
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="p-4 bg-[var(--color-bg-secondary)] rounded">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--flysoft-text-primary)" }}
                        >
                          Item 1
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--color-bg-secondary)] rounded">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--flysoft-text-primary)" }}
                        >
                          Item 2
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--color-bg-secondary)] rounded">
                        <p
                          className="text-sm font-semibold"
                          style={{ color: "var(--flysoft-text-primary)" }}
                        >
                          Item 3
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </Loader>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Loader con children y keepContentWhileLoading pero cambiando el
              color del overlay
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes personalizar el overlay usando la prop{" "}
              <code>overlayClassName</code> con clases de Tailwind. Útil para
              adaptar el loader a diferentes fondos de interfaz, cambiar el
              border radius, padding, color, etc. En este ejemplo usamos un
              overlay blanco semitransparente con border radius personalizado.
            </p>
            <div className="space-y-4">
              <Button
                variant="primary"
                icon="fa-palette"
                onClick={() => {
                  setIsLoading6(true);
                  setTimeout(() => setIsLoading6(false), 3000);
                }}
              >
                Mostrar Loader (Overlay Blanco)
              </Button>
              <div className="p-4 bg-[var(--color-bg-secondary)] rounded">
                <Loader
                  isLoading={isLoading6}
                  keepContentWhileLoading
                  overlayClassName="bg-white/50 backdrop-blur-sm rounded-lg"
                >
                  <Card title="Contenido con Overlay Personalizado">
                    <div className="space-y-4">
                      <Input
                        label="Campo 1"
                        placeholder="Ejemplo..."
                        icon="fa-edit"
                      />
                      <Input
                        label="Campo 2"
                        placeholder="Ejemplo..."
                        icon="fa-edit"
                      />
                      <Button variant="primary" icon="fa-save">
                        Guardar
                      </Button>
                    </div>
                  </Card>
                </Loader>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Características
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <ul
                  className="list-disc list-inside space-y-2 text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  <li>
                    <strong>Barra de progreso infinita:</strong> Animación
                    continua usando el color primario del tema
                  </li>
                  <li>
                    <strong>Tres variantes de uso:</strong> Solo loader, con
                    overlay sobre children, o con nodo personalizado
                  </li>
                  <li>
                    <strong>Deshabilitación de eventos:</strong> Cuando está
                    cargando, deshabilita todos los eventos del mouse y teclado
                    en los children
                  </li>
                  <li>
                    <strong>Overlay semitransparente:</strong> Similar al
                    Dialog, con efecto blur para mejor enfoque visual
                  </li>
                  <li>
                    <strong>Texto personalizable:</strong> Puedes cambiar el
                    texto que se muestra debajo de la barra de progreso
                  </li>
                  <li>
                    <strong>Integración con tema:</strong> Usa el color primario
                    del tema actual automáticamente
                  </li>
                  <li>
                    <strong>Contenido condicional:</strong> Con
                    keepContentWhileLoading puedes mantener el contenido visible
                    pero deshabilitado
                  </li>
                  <li>
                    <strong>Overlay personalizable:</strong> Puedes personalizar
                    completamente el overlay usando overlayClassName con clases
                    de Tailwind para cambiar color, border radius, padding, etc.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Prop
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Tipo
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Default
                    </th>
                    <th
                      className="text-left p-3 font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        isLoading
                      </code>
                    </td>
                    <td className="p-3 text-sm">boolean</td>
                    <td className="p-3 text-sm">false</td>
                    <td className="p-3 text-sm">
                      Controla si el loader está visible
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        text
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">"Cargando..."</td>
                    <td className="p-3 text-sm">
                      Texto que se muestra debajo de la barra de progreso
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        children
                      </code>
                    </td>
                    <td className="p-3 text-sm">ReactNode</td>
                    <td className="p-3 text-sm">-</td>
                    <td className="p-3 text-sm">
                      Contenido que se mostrará con overlay cuando isLoading es
                      true
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        keepContentWhileLoading
                      </code>
                    </td>
                    <td className="p-3 text-sm">boolean</td>
                    <td className="p-3 text-sm">false</td>
                    <td className="p-3 text-sm">
                      Si es true, mantiene el contenido visible (sin reducir
                      opacidad) pero deshabilitado
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        contentLoadingNode
                      </code>
                    </td>
                    <td className="p-3 text-sm">ReactNode</td>
                    <td className="p-3 text-sm">-</td>
                    <td className="p-3 text-sm">
                      Nodo personalizado que se muestra en lugar de children
                      cuando isLoading es true
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="p-3">
                      <code className="text-sm text-[var(--color-primary)]">
                        overlayClassName
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">
                      "bg-black/50 backdrop-blur-sm"
                    </td>
                    <td className="p-3 text-sm">
                      Clases de Tailwind para personalizar el overlay (ej:
                      "bg-white/50 backdrop-blur-sm rounded-lg" para overlay
                      blanco con border radius)
                    </td>
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

export default LoaderDocs;
