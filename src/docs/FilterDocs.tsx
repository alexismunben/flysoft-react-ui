import React from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Filter, Collection } from "../index";
import dayjs from "dayjs";

const FilterDocs: React.FC = () => {
  const [searchParams] = useSearchParams();

  const currentFilterValue = searchParams.get("filtro");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Filter - Gestión de Filtros con Query Parameters">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente Filter permite gestionar filtros que se sincronizan
              con los query parameters de la URL. El valor se obtiene
              automáticamente del query parameter que coincida con el{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                paramName
              </code>{" "}
              proporcionado. Al setear el filtro, se actualiza la URL sin perder
              los demás query parameters y sin agregar una nueva entrada al
              historial del navegador.
            </p>
            <Card title="Ejemplo básico">
              <div className="space-y-4">
                <Filter paramName="filtro" label="Filtro" />
                {currentFilterValue && (
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p className="text-sm">
                      <span className="font-semibold">Valor del filtro:</span>{" "}
                      <span style={{ color: "var(--flysoft-text-secondary)" }}>
                        {currentFilterValue}
                      </span>
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      URL actual:{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                        ?filtro={currentFilterValue}
                      </code>
                    </p>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      💡 El componente muestra el valor actual del query
                      parameter. Al hacer clic en "setear", se actualiza la URL
                      con el valor del estado interno.
                    </p>
                  </div>
                )}
                {!currentFilterValue && (
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p
                      className="text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      💡 El filtro está vacío. El componente mostrará
                      "undefined" hasta que se establezca un valor.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Sincronización con URL
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente se sincroniza automáticamente con los query
              parameters de la URL. Si la URL contiene el parámetro al cargar la
              página, el componente mostrará ese valor. Si cambias la URL
              manualmente, el componente se actualizará automáticamente.
            </p>
            <Card title="Ejemplo con sincronización">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Prueba agregar{" "}
                    <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                      ?test=valor123
                    </code>{" "}
                    a la URL y observa cómo el componente se actualiza
                    automáticamente.
                  </p>
                </div>
                <Filter paramName="test" label="Filtro de prueba" />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-xs"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Al hacer clic en "setear", la URL se actualiza usando{" "}
                    <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                      replace: true
                    </code>
                    , lo que significa que al presionar el botón "atrás" del
                    navegador, volverás a la página anterior, no a la misma
                    página sin el parámetro.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Múltiples filtros
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes usar múltiples componentes Filter con diferentes{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                paramName
              </code>{" "}
              para gestionar varios filtros simultáneamente. Cada filtro
              mantiene su propio estado y se sincroniza con su respectivo query
              parameter.
            </p>
            <Card title="Ejemplo con múltiples filtros">
              <div className="space-y-4">
                <Collection direction="row" gap="1rem" wrap>
                  <Filter
                    paramName="categoria"
                    label="Categoría"
                    filterType="text"
                  />
                  <Filter
                    paramName="cantidad"
                    label="Cantidad"
                    filterType="number"
                  />
                  <Filter
                    paramName="fecha"
                    label="Fecha"
                    filterType="date"
                    staticOptions={[
                      { text: "Hoy", value: dayjs().format("YYYY-MM-DD") },
                      {
                        text: "Ayer",
                        value: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
                      },
                      {
                        text: "Última semana",
                        value: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
                      },
                      {
                        text: "Último mes",
                        value: dayjs()
                          .subtract(1, "month")
                          .format("YYYY-MM-DD"),
                      },
                      {
                        text: "Último año",
                        value: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
                      },
                    ].map((option) => ({
                      text: option.text,
                      value: option.value,
                    }))}
                  />
                </Collection>
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-xs"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Cada filtro mantiene su propio query parameter. Puedes
                    tener varios filtros activos simultáneamente en la URL. Los
                    filtros de tipo date guardan el valor como "yyyy-mm-dd" pero
                    lo muestran como "dd/mm/yyyy".
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Preservación de otros query parameters
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Al setear un filtro, el componente preserva todos los demás query
              parameters existentes en la URL. Esto permite combinar filtros con
              otros parámetros como paginación, ordenamiento, etc.
            </p>
            <Card title="Ejemplo con otros parámetros">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Prueba agregar{" "}
                    <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                      ?pagina=2&orden=asc
                    </code>{" "}
                    a la URL y luego setear un filtro. Observa cómo se preservan
                    los parámetros existentes.
                  </p>
                </div>
                <Filter paramName="filtroCompleto" label="Filtro completo" />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p className="text-sm">
                    <span className="font-semibold">
                      Query parameters actuales:
                    </span>{" "}
                    <span style={{ color: "var(--flysoft-text-secondary)" }}>
                      {searchParams.toString() || "ninguno"}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Comportamiento del historial
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente usa{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                replace: true
              </code>{" "}
              al actualizar la URL, lo que significa que reemplaza la entrada
              actual del historial en lugar de agregar una nueva. Esto permite
              que al presionar el botón "atrás" del navegador, vuelvas a la
              página anterior, no a la misma página sin el parámetro.
            </p>
            <Card title="Prueba el historial">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Sigue estos pasos para probar el comportamiento del
                    historial:
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-1 text-xs mt-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <li>Navega a otra página (o recarga esta página)</li>
                    <li>Vuelve a esta página</li>
                    <li>Setear un filtro</li>
                    <li>Presiona el botón "atrás" del navegador</li>
                    <li>
                      Deberías volver a la página anterior, no a esta misma
                      página sin el parámetro
                    </li>
                  </ol>
                </div>
                <Filter paramName="historial" label="Filtro de historial" />
              </div>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default FilterDocs;
