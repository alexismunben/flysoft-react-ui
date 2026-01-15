import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "../form-controls/Button";
import { Dialog } from "./Dialog";
import { Filter, type FilterProps } from "../layout/Filter";
import { Collection } from "../layout/Collection";

export interface FilterConfig {
  filterType: FilterProps["filterType"];
  paramName: string;
  label?: string;
  staticOptions?: FilterProps["staticOptions"];
  inputWidth?: string;
  // Props específicas para cada tipo
  min?: number;
  max?: number;
  options?: any[];
  getOptionLabel?: (item: any) => string;
  getOptionValue?: (item: any) => any;
  renderOption?: (item: any) => React.ReactNode;
  noResultsText?: string;
}

export interface FiltersDialogProps {
  filters: FilterConfig[];
}

export const FiltersDialog: React.FC<FiltersDialogProps> = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [filterValues, setFilterValues] = useState<Record<string, string | undefined>>({});

  // Inicializar filterValues con los valores actuales de la URL
  useEffect(() => {
    const initialValues: Record<string, string | undefined> = {};
    filters.forEach((filter) => {
      const urlValue = searchParams.get(filter.paramName);
      initialValues[filter.paramName] = urlValue || undefined;
    });
    setFilterValues(initialValues);
  }, []); // Solo al montar el componente

  // Sincronizar filterValues cuando se abre el dialog con los valores actuales de la URL
  useEffect(() => {
    if (isOpen) {
      const currentValues: Record<string, string | undefined> = {};
      filters.forEach((filter) => {
        const urlValue = searchParams.get(filter.paramName);
        currentValues[filter.paramName] = urlValue || undefined;
      });
      setFilterValues(currentValues);
    }
  }, [isOpen, filters, searchParams]);

  const handleFilterChange = (paramName: string, value: string | undefined) => {
    setFilterValues((prev) => ({
      ...prev,
      [paramName]: value,
    }));
  };

  const handleApplyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    // Aplicar todos los filtros a la URL
    filters.forEach((filter) => {
      const value = filterValues[filter.paramName];
      if (value) {
        newSearchParams.set(filter.paramName, value);
      } else {
        newSearchParams.delete(filter.paramName);
      }
    });

    setSearchParams(newSearchParams, { replace: true });
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Construir las props de Filter para cada filtro
  const getFilterProps = (filterConfig: FilterConfig): FilterProps => {
    const baseProps: any = {
      label: filterConfig.label,
      staticOptions: filterConfig.staticOptions,
      inputWidth: filterConfig.inputWidth,
      value: filterValues[filterConfig.paramName],
      onChange: (value: string | undefined) => handleFilterChange(filterConfig.paramName, value),
    };

    switch (filterConfig.filterType) {
      case "text":
        return {
          ...baseProps,
          filterType: "text" as const,
        };
      case "number":
        return {
          ...baseProps,
          filterType: "number" as const,
          min: filterConfig.min,
          max: filterConfig.max,
        };
      case "date":
        return {
          ...baseProps,
          filterType: "date" as const,
        };
      case "autocomplete":
        return {
          ...baseProps,
          filterType: "autocomplete" as const,
          options: filterConfig.options || [],
          getOptionLabel: filterConfig.getOptionLabel,
          getOptionValue: filterConfig.getOptionValue,
          renderOption: filterConfig.renderOption,
          noResultsText: filterConfig.noResultsText,
        };
      default:
        return {
          ...baseProps,
          filterType: "text" as const,
        };
    }
  };

  return (
    <>
      <Button
        icon="fa-filter"
        variant="outline"
        size="sm"
        onClick={handleOpen}
        aria-label="Abrir filtros"
      >
        Filtrar
      </Button>

      <Dialog
        isOpen={isOpen}
        title="Filtros"
        footer={
          <>
            <Button variant="outline" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={handleApplyFilters}>
              Aplicar filtros
            </Button>
          </>
        }
        onClose={handleClose}
        closeOnOverlayClick={false}
      >
        <div className="space-y-4">
          <Collection direction="column" gap="1rem">
            {filters.map((filter) => (
              <Filter key={filter.paramName} {...getFilterProps(filter)} />
            ))}
          </Collection>
        </div>
      </Dialog>
    </>
  );
};

