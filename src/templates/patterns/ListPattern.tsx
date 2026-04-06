import React from "react";
import { Card, Button, Collection, Filter, DataTable, Pagination } from "../../index";
import type { DataTableColumn } from "../../components/layout/DataTable";

/**
 * Template de Patrón de Lista con Filtros y Paginación
 *
 * Estructura típica para páginas de listado: Card con título, botón de agregar,
 * fila de búsqueda/filtros/paginación y DataTable.
 *
 * Ejemplo de uso:
 * ```tsx
 * import { ListPattern } from "flysoft-react-ui";
 *
 * const columns = [
 *   { header: "Nombre", value: "name" },
 *   { header: "Email", value: "email" },
 * ];
 *
 * <ListPattern
 *   title="Usuarios"
 *   columns={columns}
 *   rows={users}
 *   searchParamName="buscar"
 *   onAdd={() => setShowDialog(true)}
 *   page={1}
 *   pages={5}
 *   total={50}
 * />
 * ```
 */
export interface ListPatternProps<T> {
  /** Título de la card */
  title: string;
  /** Subtítulo opcional */
  subtitle?: string;
  /** Columnas de la DataTable */
  columns: DataTableColumn<T>[];
  /** Filas de datos */
  rows: T[];
  /** Texto del botón de agregar. Si no se pasa, no se muestra el botón */
  addButtonText?: string;
  /** Icono del botón de agregar */
  addButtonIcon?: string;
  /** Callback al presionar el botón de agregar */
  onAdd?: () => void;
  /** Nombre del query parameter para el buscador. Si no se pasa, no se muestra el buscador */
  searchParamName?: string;
  /** Label del buscador */
  searchLabel?: string;
  /** Nodo adicional para agregar filtros extra junto al buscador */
  filtersNode?: React.ReactNode;
  /** Página actual (para el paginador) */
  page?: number;
  /** Total de páginas */
  pages?: number;
  /** Total de elementos */
  total?: number;
  /** Nombre del query parameter para la página */
  pageParamName?: string;
  /** Indica si los datos están cargando */
  isLoading?: boolean;
  /** Cantidad de filas skeleton mientras carga */
  loadingRows?: number;
  /** Máximo de filas visibles antes de activar scroll */
  maxRows?: number;
  /** Modo compacto: reduce paddings y usa size="sm" en componentes internos */
  compact?: boolean;
  /** Clases CSS adicionales para la Card */
  className?: string;
  /** Nodo adicional en el header junto al botón de agregar */
  headerActionsNode?: React.ReactNode;
  /** Locale para formateo de números en la DataTable */
  locale?: string;
  /** Función para aplicar clases CSS a una fila */
  rowClassName?: (row: T) => string;
}

export const ListPattern = <T,>({
  title,
  subtitle,
  columns,
  rows,
  addButtonText,
  addButtonIcon = "fa-plus",
  onAdd,
  searchParamName,
  searchLabel = "Buscar",
  filtersNode,
  page,
  pages,
  total,
  pageParamName,
  isLoading = false,
  loadingRows = 10,
  maxRows,
  compact = false,
  className = "",
  headerActionsNode,
  locale,
  rowClassName,
}: ListPatternProps<T>) => {
  const showAddButton = onAdd !== undefined;
  const showHeaderActions = showAddButton || headerActionsNode;
  const showSearch = searchParamName !== undefined;
  const showPagination = page !== undefined && pages !== undefined;
  const showToolbar = showSearch || filtersNode || showPagination;

  return (
    <Card
      title={title}
      subtitle={subtitle}
      className={className}
      compact={compact}
      alwaysDisplayHeaderActions={showHeaderActions ? true : undefined}
      headerActions={
        showHeaderActions ? (
          <Collection direction="row" gap="0.5rem">
            {headerActionsNode}
            {showAddButton && (
              <Button
                icon={addButtonIcon}
                onClick={onAdd}
                size={compact ? "sm" : undefined}
              >
                {addButtonText}
              </Button>
            )}
          </Collection>
        ) : undefined
      }
    >
      {showToolbar && (
        <div className="flex justify-between items-center my-2">
          <Collection direction="row" wrap gap="0.5rem">
            {showSearch && (
              <Filter
                paramName={searchParamName}
                label={searchLabel}
                filterType="search"
                compact={compact}
              />
            )}
            {filtersNode}
          </Collection>
          <Collection direction="row" wrap>
            {showPagination && (
              <Pagination
                page={page}
                pages={pages}
                total={total}
                fieldName={pageParamName}
                isLoading={isLoading}
              />
            )}
          </Collection>
        </div>
      )}
      <DataTable<T>
        columns={columns}
        rows={rows}
        isLoading={isLoading}
        loadingRows={loadingRows}
        maxRows={maxRows}
        compact={compact}
        locale={locale}
        rowClassName={rowClassName}
      />
    </Card>
  );
};
