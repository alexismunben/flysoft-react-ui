import React from "react";
import { Card, Skeleton } from "../index";

const SkeletonDocs: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Skeleton - Estados de Carga">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Skeleton Básico
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente Skeleton proporciona una forma sencilla de mostrar
              que el contenido se está cargando, mejorando la experiencia del
              usuario (UX) al evitar saltos bruscos en el diseño.
            </p>
            <div className="space-y-4 p-4 border border-[var(--color-border-default)] rounded-lg">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Personalización con Tailwind
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes pasar cualquier clase de Tailwind a través de la prop{" "}
              <code>className</code> para definir las medidas, el borde
              redondeado, el color de fondo, etc. El componente utiliza{" "}
              <code>tailwind-merge</code> para asegurar que tus clases
              personalizadas se apliquen correctamente sin perder la animación
              base.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 border border-[var(--color-border-default)] rounded-lg">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--flysoft-text-muted)]">
                  Círculo (Avatar)
                </span>
                <Skeleton className="h-16 w-16 rounded-full" />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--flysoft-text-muted)]">
                  Bloque de Imagen
                </span>
                <Skeleton className="h-32 w-full rounded-xl" />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--flysoft-text-muted)]">
                  Botón
                </span>
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--flysoft-text-muted)]">
                  Color Personalizado
                </span>
                <Skeleton className="h-4 w-full bg-blue-100 dark:bg-blue-900/30" />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo: Card Complex
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Combinando varios skeletons puedes simular la estructura de
              cualquier componente.
            </p>
            <div className="flex justify-center p-8 bg-[var(--color-bg-secondary)]/30 rounded-xl border border-dashed border-[var(--color-border-default)]">
              <Card className="w-[320px] shrink-0" variant="elevated">
                <div className="flex items-center gap-4 mb-5">
                  <Skeleton className="h-12 w-12 rounded-full flex-shrink-0" />
                  <div className="flex-1 space-y-2 min-w-0">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <Skeleton className="h-40 w-full rounded-lg mb-5" />
                <div className="space-y-3">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                </div>
              </Card>
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
                        className
                      </code>
                    </td>
                    <td className="p-3 text-sm">string</td>
                    <td className="p-3 text-sm">-</td>
                    <td className="p-3 text-sm">
                      Clases de Tailwind para personalizar el estilo
                      (dimensiones, bordes, colores, etc.).
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

export default SkeletonDocs;
