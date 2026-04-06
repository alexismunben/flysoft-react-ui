import React, { useState } from "react";
import { Card, Checkbox, Button, Filter, Badge } from "../index";
import { ListPattern } from "../templates/patterns/ListPattern";
import type { DataTableColumn } from "../components/layout/DataTable";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  createdAt: string;
}

const sampleUsers: User[] = [
  { id: 1, name: "Juan Pérez", email: "juan@ejemplo.com", role: "Admin", status: "active", createdAt: "2024-01-15" },
  { id: 2, name: "María García", email: "maria@ejemplo.com", role: "Editor", status: "active", createdAt: "2024-02-20" },
  { id: 3, name: "Carlos López", email: "carlos@ejemplo.com", role: "Viewer", status: "inactive", createdAt: "2024-03-10" },
  { id: 4, name: "Ana Martínez", email: "ana@ejemplo.com", role: "Editor", status: "active", createdAt: "2024-04-05" },
  { id: 5, name: "Pedro Rodríguez", email: "pedro@ejemplo.com", role: "Admin", status: "active", createdAt: "2024-05-12" },
  { id: 6, name: "Laura Sánchez", email: "laura@ejemplo.com", role: "Viewer", status: "inactive", createdAt: "2024-06-18" },
];

const ListPatternDocs: React.FC = () => {
  const [isCompact, setIsCompact] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const columns: DataTableColumn<User>[] = [
    { header: "Nombre", value: (row) => row.name },
    { header: "Email", value: (row) => row.email },
    { header: "Rol", value: (row) => row.role },
    {
      header: "Estado",
      value: (row) => (
        <Badge
          variant={row.status === "active" ? "success" : "default"}
          size="sm"
        >
          {row.status === "active" ? "Activo" : "Inactivo"}
        </Badge>
      ),
    },
    { header: "Creado", value: "createdAt", type: "date" },
    {
      align: "center",
      actions: () => [
        <Button key="edit" size="sm" variant="ghost" icon="fa-edit">
          Editar
        </Button>,
        <Button key="delete" size="sm" variant="ghost" icon="fa-trash">
          Eliminar
        </Button>,
      ],
    },
  ];

  const simpleColumns: DataTableColumn<User>[] = [
    { header: "Nombre", value: (row) => row.name },
    { header: "Email", value: (row) => row.email },
    { header: "Rol", value: (row) => row.role },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="ListPattern - Template de Lista con Filtros y Paginación">
        <div className="space-y-10">
          <div className="flex items-center gap-4 mb-4">
            <Checkbox
              label="Modo compacto"
              checked={isCompact}
              onChange={(e) => setIsCompact(e.target.checked)}
            />
            <Checkbox
              label="Simular carga"
              checked={isLoading}
              onChange={(e) => setIsLoading(e.target.checked)}
            />
          </div>

          <section>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Template para páginas de listado con el patrón Card + buscador +
              filtros + paginación + DataTable. Ideal para replicar en proyectos
              que consuman la librería.
            </p>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo completo
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Card con botón de agregar, buscador, filtros adicionales, paginación
              y DataTable con acciones por fila.
            </p>
            <ListPattern<User>
              title="Usuarios"
              subtitle="Gestión de usuarios del sistema"
              columns={columns}
              rows={sampleUsers}
              searchParamName="buscarUsuario"
              addButtonText="Nuevo Usuario"
              onAdd={() => alert("Agregar usuario")}
              filtersNode={
                <Filter
                  paramName="rolUsuario"
                  label="Rol"
                  filterType="autocomplete"
                  compact={isCompact}
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "Editor", value: "editor" },
                    { label: "Viewer", value: "viewer" },
                  ]}
                />
              }
              page={1}
              pages={3}
              total={18}
              isLoading={isLoading}
              compact={isCompact}
              maxRows={10}
            />
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo mínimo
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Solo título, columnas y filas. Sin buscador, filtros, paginación ni
              botón de agregar.
            </p>
            <ListPattern<User>
              title="Usuarios"
              columns={simpleColumns}
              rows={sampleUsers}
              compact={isCompact}
              isLoading={isLoading}
            />
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Solo con buscador y paginación
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Sin filtros adicionales ni botón de agregar.
            </p>
            <ListPattern<User>
              title="Listado de Usuarios"
              columns={simpleColumns}
              rows={sampleUsers}
              searchParamName="buscarSimple"
              page={1}
              pages={1}
              total={6}
              compact={isCompact}
              isLoading={isLoading}
            />
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
                    <strong>Card con headerActions:</strong> Botón de agregar y nodos
                    adicionales en el header, siempre visibles.
                  </li>
                  <li>
                    <strong>Buscador:</strong> Filter con filterType="search"
                    sincronizado con URL via paramName.
                  </li>
                  <li>
                    <strong>Filtros adicionales:</strong> Nodo libre para agregar
                    Filter, AutocompleteInput u otros.
                  </li>
                  <li>
                    <strong>Paginación:</strong> Componente Pagination sincronizado
                    con URL.
                  </li>
                  <li>
                    <strong>DataTable:</strong> Con soporte para columnas de acciones,
                    loading skeleton y scroll.
                  </li>
                  <li>
                    <strong>Modo compacto:</strong> Reduce paddings y usa size="sm"
                    en componentes internos.
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
                    <th className="px-4 py-2 text-left text-sm font-semibold" style={{ color: "var(--flysoft-text-primary)" }}>Prop</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold" style={{ color: "var(--flysoft-text-primary)" }}>Tipo</th>
                    <th className="px-4 py-2 text-left text-sm font-semibold" style={{ color: "var(--flysoft-text-primary)" }}>Descripción</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["title", "string", "Título de la card"],
                    ["columns", "DataTableColumn<T>[]", "Columnas de la DataTable"],
                    ["rows", "T[]", "Filas de datos"],
                    ["onAdd", "() => void", "Callback del botón agregar. Si no se pasa, no se muestra"],
                    ["addButtonText", "string", "Texto del botón agregar"],
                    ["searchParamName", "string", "Query param del buscador. Si no se pasa, no se muestra"],
                    ["filtersNode", "ReactNode", "Nodo con filtros adicionales"],
                    ["page / pages / total", "number", "Datos de paginación. Si no se pasan, no se muestra"],
                    ["pageParamName", "string", "Query param para la página"],
                    ["isLoading", "boolean", "Estado de carga"],
                    ["maxRows", "number", "Filas visibles antes de scroll"],
                    ["compact", "boolean", "Modo compacto"],
                    ["headerActionsNode", "ReactNode", "Nodo adicional en el header"],
                    ["className", "string", "Clases adicionales para la Card"],
                  ].map(([prop, type, desc]) => (
                    <tr key={prop} className="border-b border-[var(--color-border-default)]">
                      <td className="px-4 py-2 text-sm font-mono" style={{ color: "var(--flysoft-text-primary)" }}>{prop}</td>
                      <td className="px-4 py-2 text-sm" style={{ color: "var(--flysoft-text-secondary)" }}>{type}</td>
                      <td className="px-4 py-2 text-sm" style={{ color: "var(--flysoft-text-secondary)" }}>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default ListPatternDocs;
