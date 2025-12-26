import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Pagination } from "../index";
import type { PaginationInterface } from "../components/form-controls/Pagination";

const PaginationDocs: React.FC = () => {
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("pagina") || "1", 10);
  const [page, setPage] = useState(currentPage);
  const [customPage, setCustomPage] = useState(2);

  useEffect(() => {
    const pageParam = searchParams.get("pagina");
    if (pageParam) {
      setPage(parseInt(pageParam, 10));
    }
  }, [searchParams]);

  useEffect(() => {
    const customPageParam = searchParams.get("page");
    if (customPageParam) {
      setCustomPage(parseInt(customPageParam, 10));
    }
  }, [searchParams]);

  // Ejemplo de datos paginados
  const mockData: PaginationInterface<string> = {
    list: Array.from({ length: 50 }, (_, i) => `Elemento ${i + 1}`),
    limit: 10,
    page: page,
    pages: 5,
    total: 50,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Pagination - Navegación de Páginas">
        <div className="space-y-8">
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
              El componente Pagination permite navegar entre páginas de resultados.
              Modifica automáticamente el query parameter en la URL para mantener
              el estado de navegación.
            </p>
            <div className="flex justify-center py-8 border border-[var(--color-border-default)] rounded-sm">
              <Pagination
                page={mockData.page}
                pages={mockData.pages}
                total={mockData.total}
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con nombre de campo personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes personalizar el nombre del query parameter usando la prop{" "}
              <code>fieldName</code>. Por defecto es "página".
            </p>
            <div className="flex justify-center py-8 border border-[var(--color-border-default)] rounded-sm">
              <Pagination
                fieldName="page"
                page={customPage}
                pages={10}
                total={100}
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Primera página
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Los botones de navegación anterior y primera página se deshabilitan
              automáticamente cuando estás en la primera página.
            </p>
            <div className="flex justify-center py-8 border border-[var(--color-border-default)] rounded-sm">
              <Pagination page={1} pages={5} total={50} />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Última página
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Los botones de navegación siguiente y última página se deshabilitan
              automáticamente cuando estás en la última página.
            </p>
            <div className="flex justify-center py-8 border border-[var(--color-border-default)] rounded-sm">
              <Pagination page={5} pages={5} total={50} />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Una sola página
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cuando solo hay una página, todos los botones de navegación se
              deshabilitan automáticamente.
            </p>
            <div className="flex justify-center py-8 border border-[var(--color-border-default)] rounded-sm">
              <Pagination page={1} pages={1} total={5} />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Interfaz PaginationInterface
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              La interfaz <code>PaginationInterface&lt;T&gt;</code> define la
              estructura de datos para información de paginación:
            </p>
            <div
              className="p-4 rounded-sm bg-[var(--color-bg-secondary)]"
              style={{ fontFamily: "monospace", fontSize: "0.875rem" }}
            >
              <pre style={{ color: "var(--color-text-primary)" }}>
                {`export interface PaginationInterface<T> {
  list: Array<T>;
  limit: number;
  page: number;
  pages: number;
  total: number;
}`}
              </pre>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props del componente
            </h3>
            <div className="space-y-4">
              <div>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  fieldName?: string
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Nombre del query parameter que se usará para la página. Por
                  defecto es "pagina".
                </p>
              </div>
              <div>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  page?: number
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Número de página actual. Por defecto es 1.
                </p>
              </div>
              <div>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  pages?: number
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Número total de páginas. Por defecto es 1.
                </p>
              </div>
              <div>
                <h4
                  className="font-semibold mb-2"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  total?: number
                </h4>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Número total de elementos. Por defecto es 0.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default PaginationDocs;

