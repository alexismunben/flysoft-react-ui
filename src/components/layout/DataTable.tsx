import React from "react";
import { twMerge } from "tailwind-merge";
import { DropdownMenu } from "./DropdownMenu";

interface ActionItem {
  id: string | number;
  content: React.ReactNode;
}

export interface DataTableColumn<T> {
  align?: "left" | "right" | "center";
  width?: string;
  header?: string | React.ReactNode;
  footer?: string | React.ReactNode;
  value?: string | number | ((row: T) => string | React.ReactNode);
  tooltip?: (row: T) => string | React.ReactNode;
  type?: "text" | "numeric" | "currency" | "date";
  /**
   * Acciones para cada fila. Retorna un array de ReactNode que se mostrarán en un DropdownMenu.
   */
  actions?: (row: T) => Array<React.ReactNode>;
  /**
   * Acciones para el header de la columna. Retorna un array de ReactNode que se mostrarán en un DropdownMenu.
   */
  headerActions?: () => Array<React.ReactNode>;
}

export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  rows: T[];
  className?: string;
  maxRows?: number; // Máximo número de filas visibles antes de activar scroll
  locale?: string; // Locale para formateo de números (por defecto 'es-AR')
  isLoading?: boolean; // Estado de carga (por defecto false)
  loadingRows?: number; // Número de filas skeleton a mostrar cuando está cargando (por defecto 5)
  /**
   * Función opcional para aplicar clases CSS a una fila específica basada en sus datos.
   */
  rowClassName?: (row: T) => string;
  headerClassName?: string;
  footerClassName?: string;
  headerCellClassName?: string;
  footerCellClassName?: string;
  cellClassName?: string | ((row: T, column: DataTableColumn<T>) => string);
}

export const DataTable = <T,>({
  columns,
  rows,
  className = "",
  maxRows,
  locale = "es-AR",
  isLoading = false,
  loadingRows = 5,
  rowClassName,
  headerClassName = "",
  footerClassName = "",
  headerCellClassName = "",
  footerCellClassName = "",
  cellClassName = "",
}: DataTableProps<T>) => {
  // Calcular si necesitamos scroll
  const displayRows = isLoading ? loadingRows : rows.length;
  const needsScroll = maxRows !== undefined && displayRows > maxRows;

  // Altura aproximada de una fila (px-4 py-3 = ~48px por fila)
  const rowHeight = 48;
  const maxHeight = maxRows ? `${maxRows * rowHeight}px` : undefined;

  // Verificar si alguna columna tiene footer
  const hasFooter = columns.some((column) => column.footer !== undefined);
  const getCellValue = (
    column: DataTableColumn<T>,
    row: T,
  ): React.ReactNode => {
    if (!column.value) return null;

    if (typeof column.value === "function") {
      return column.value(row);
    }

    // Si es string o number, puede ser un nombre de propiedad o un valor directo
    if (typeof column.value === "string" || typeof column.value === "number") {
      // Intentar obtener la propiedad del objeto si existe
      if (
        typeof column.value === "string" &&
        typeof row === "object" &&
        row !== null
      ) {
        const value = (row as Record<string, unknown>)[column.value];
        if (value !== undefined) {
          return value as string | number | React.ReactNode;
        }
      }
      // Si no es una propiedad, retornar el valor directo
      return column.value;
    }

    return column.value;
  };

  const formatValue = (
    value: string | number | React.ReactNode,
    type?: string,
  ): React.ReactNode => {
    if (React.isValidElement(value)) {
      return value;
    }

    // Convertir string a número si es necesario para currency o numeric
    let numericValue: number | null = null;
    if (typeof value === "number") {
      numericValue = value;
    } else if (
      typeof value === "string" &&
      (type === "currency" || type === "numeric")
    ) {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        numericValue = parsed;
      }
    }

    if (numericValue !== null) {
      if (type === "currency") {
        // Formatear usando el locale proporcionado sin símbolo de moneda
        const parts = new Intl.NumberFormat(locale, {
          style: "currency",
          currency: "EUR",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).formatToParts(numericValue);

        // Construir el string sin el símbolo de moneda
        return parts
          .filter((part) => part.type !== "currency")
          .map((part) => part.value)
          .join("");
      }
      if (type === "numeric") {
        // Formatear usando el locale proporcionado
        const hasDecimals = numericValue % 1 !== 0;
        return new Intl.NumberFormat(locale, {
          minimumFractionDigits: hasDecimals ? 2 : 0,
          maximumFractionDigits: hasDecimals ? 2 : 0,
        }).format(numericValue);
      }
    }

    if (typeof value === "string" && type === "date") {
      try {
        const date = new Date(value);
        return date.toLocaleDateString(locale);
      } catch {
        return value;
      }
    }

    return value;
  };

  const getAlignmentClass = (
    align?: "left" | "right" | "center",
    type?: string,
  ): string => {
    // Las columnas de tipo 'date' siempre se alinean a la izquierda
    // Las columnas de tipo 'currency' y 'numeric' siempre se alinean a la derecha
    let effectiveAlign: "left" | "right" | "center" | undefined = align;
    if (type === "date") {
      effectiveAlign = "left";
    } else if (type === "currency" || type === "numeric") {
      effectiveAlign = "right";
    }

    switch (effectiveAlign) {
      case "right":
        return "text-right";
      case "center":
        return "text-center";
      case "left":
      default:
        return "text-left";
    }
  };

  // Convertir array de ReactNode a array de ActionItem para DropdownMenu
  const convertActionsToOptions = (
    actions: Array<React.ReactNode>,
  ): ActionItem[] => {
    return actions.map((action, index) => ({
      id: index,
      content: (
        <div
          onClick={(e) => {
            // Detener la propagación para que el onClick del DropdownMenu no interfiera
            e.stopPropagation();
          }}
        >
          {action}
        </div>
      ),
    }));
  };

  // Componente Skeleton para celdas de carga
  const SkeletonCell = () => (
    <div className="h-4 bg-[var(--color-border-default)]/40 rounded animate-pulse w-full" />
  );

  return (
    <div className={`overflow-x-auto ${className}`}>
      <div
        className={needsScroll ? "relative overflow-y-auto" : ""}
        style={needsScroll && maxHeight ? { maxHeight: maxHeight } : undefined}
      >
        <table className="w-full border-collapse font-[var(--font-default)]">
          <thead className={needsScroll ? "sticky top-0 z-10" : ""}>
            <tr
              className={twMerge(
                "border-b border-[var(--color-border-default)]",
                headerClassName,
              )}
            >
              {columns.map((column, index) => {
                const headerActions = column.headerActions?.();
                const hasHeaderActions =
                  headerActions && headerActions.length > 0;

                const headerBgClasses = headerClassName
                  .split(/\s+/)
                  .filter((cls) => cls.split(":").pop()?.startsWith("bg-"))
                  .join(" ");

                return (
                  <th
                    key={index}
                    className={twMerge(
                      "px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)]",
                      headerBgClasses || "bg-[var(--color-bg-secondary)]",
                      getAlignmentClass(column.align, column.type),
                      hasHeaderActions ? "relative" : "",
                      headerCellClassName,
                    )}
                    style={{
                      ...(column.width ? { width: column.width } : {}),
                    }}
                  >
                    {isLoading ? (
                      <SkeletonCell />
                    ) : hasHeaderActions ? (
                      <div className="flex items-center justify-between gap-2">
                        <span>{column.header || ""}</span>
                        <DropdownMenu<ActionItem>
                          options={convertActionsToOptions(headerActions)}
                          onOptionSelected={() => {
                            // Las acciones ya manejan sus propios eventos
                          }}
                          renderOption={(item) => item.content}
                          replaceOnSingleOption={true}
                        />
                      </div>
                    ) : (
                      column.header || ""
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: loadingRows }).map((_, rowIndex) => (
                  <tr
                    key={`skeleton-${rowIndex}`}
                    className="border-b border-[var(--color-border-default)]"
                  >
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className={`
                          px-4 py-3 text-sm text-[var(--color-text-primary)]
                          ${getAlignmentClass(column.align, column.type)}
                        `}
                        style={{
                          ...(column.width ? { width: column.width } : {}),
                        }}
                      >
                        <SkeletonCell />
                      </td>
                    ))}
                  </tr>
                ))
              : rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`group/row border-b border-[var(--color-border-default)] transition-colors hover:bg-[var(--color-bg-secondary)] ${
                      rowClassName ? rowClassName(row) : ""
                    }`}
                  >
                    {columns.map((column, colIndex) => {
                      const cellValue = getCellValue(column, row);
                      const formattedValue = formatValue(
                        cellValue as string | number | React.ReactNode,
                        column.type,
                      );
                      const tooltip = column.tooltip
                        ? column.tooltip(row)
                        : undefined;
                      const rowActions = column.actions?.(row);
                      const hasRowActions = rowActions && rowActions.length > 0;

                      return (
                        <td
                          key={colIndex}
                          className={twMerge(
                            "px-4 py-3 text-sm text-[var(--color-text-primary)]",
                            getAlignmentClass(column.align, column.type),
                            typeof cellClassName === "function"
                              ? cellClassName(row, column)
                              : cellClassName,
                          )}
                          style={{
                            ...(column.width ? { width: column.width } : {}),
                          }}
                          title={
                            tooltip
                              ? typeof tooltip === "string"
                                ? tooltip
                                : undefined
                              : undefined
                          }
                        >
                          {hasRowActions ? (
                            <div className="flex items-center justify-between gap-2">
                              <span>{formattedValue}</span>
                              <div className="lg:opacity-0 lg:group-hover/row:opacity-100 transition-opacity">
                                <DropdownMenu<ActionItem>
                                  options={convertActionsToOptions(rowActions)}
                                  onOptionSelected={() => {
                                    // Las acciones ya manejan sus propios eventos
                                  }}
                                  renderOption={(item) => item.content}
                                  replaceOnSingleOption={true}
                                />
                              </div>
                            </div>
                          ) : (
                            formattedValue
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
          </tbody>
          {hasFooter && (
            <tfoot className={needsScroll ? "sticky bottom-0 z-10" : ""}>
              <tr
                className={twMerge(
                  "border-t border-[var(--color-border-default)]",
                  footerClassName,
                )}
              >
                {columns.map((column, index) => {
                  const footerBgClasses = footerClassName
                    .split(/\s+/)
                    .filter((cls) => cls.split(":").pop()?.startsWith("bg-"))
                    .join(" ");

                  return (
                    <td
                      key={index}
                      className={twMerge(
                        "px-4 py-3 text-sm font-semibold text-[var(--color-text-primary)]",
                        footerBgClasses || "bg-[var(--color-bg-secondary)]",
                        getAlignmentClass(column.align, column.type),
                        footerCellClassName,
                      )}
                      style={{
                        ...(column.width ? { width: column.width } : {}),
                      }}
                    >
                      {isLoading ? <SkeletonCell /> : column.footer || ""}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
};
