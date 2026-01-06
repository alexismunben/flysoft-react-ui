import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import dayjs, { type Dayjs } from "dayjs";
import { Button } from "../form-controls/Button";
import { Input } from "../form-controls/Input";
import { DateInput } from "../form-controls/DateInput";
import { DataField } from "../layout/DataField";

export interface StaticOption {
  text: string;
  value: string;
}

export interface FilterProps {
  paramName: string;
  label?: string;
  filterType?: "text" | "number" | "date";
  staticOptions?: StaticOption[];
  inputWidth?: string;
}

export const Filter: React.FC<FilterProps> = ({
  paramName,
  label,
  filterType = "text",
  staticOptions,
  inputWidth,
}) => {
  // Calcular el ancho por defecto según el tipo de filtro
  const defaultInputWidth = filterType === "date" ? "160px" : "200px";
  const finalInputWidth = inputWidth || defaultInputWidth;
  const [searchParams, setSearchParams] = useSearchParams();
  const urlValue = searchParams.get(paramName) || undefined;
  const [inputValue, setInputValue] = useState<string>(urlValue || "");
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sincronizar el input con el query param cuando cambia en la URL
  useEffect(() => {
    setInputValue(urlValue || "");
  }, [urlValue]);

  // Sincronizar el dateValue con el query param cuando cambia en la URL
  useEffect(() => {
    if (filterType === "date") {
      if (urlValue) {
        const date = dayjs(urlValue, "YYYY-MM-DD");
        setDateValue(date.isValid() ? date : null);
      } else {
        setDateValue(null);
      }
    }
  }, [urlValue, filterType]);

  // Cerrar el panel al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSetFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (inputValue.trim()) {
      newSearchParams.set(paramName, inputValue.trim());
    } else {
      newSearchParams.delete(paramName);
    }

    // Usar replace: true para reemplazar la URL sin agregar una nueva entrada al historial
    setSearchParams(newSearchParams, { replace: true });
    setIsOpen(false);
  };

  const handleDateChange = (date: Dayjs | null) => {
    // Solo actualizar el estado temporal, no setear en la URL
    setDateValue(date);
  };

  const handleSetDateFilter = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (dateValue && dateValue.isValid()) {
      // Guardar como yyyy-mm-dd
      const dateString = dateValue.format("YYYY-MM-DD");
      newSearchParams.set(paramName, dateString);
    } else {
      newSearchParams.delete(paramName);
    }

    setSearchParams(newSearchParams, { replace: true });
    setIsOpen(false);
  };

  const handleStaticOptionSelect = (option: StaticOption) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(paramName, option.value);
    setSearchParams(newSearchParams, { replace: true });
    setIsOpen(false);
  };

  // Para staticOptions: mostrar el texto de la opción si el valor coincide (prioridad)
  // Para date: convertir yyyy-mm-dd a Dayjs y formatear para mostrar como dd/mm/yyyy
  const getDisplayValue = () => {
    // Primero verificar si el valor coincide con alguna opción estática
    if (staticOptions && urlValue) {
      const option = staticOptions.find((opt) => opt.value === urlValue);
      if (option) {
        return option.text;
      }
    }
    // Si no hay opción estática que coincida, formatear según el tipo
    if (filterType === "date" && urlValue) {
      const date = dayjs(urlValue, "YYYY-MM-DD");
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return urlValue || "";
  };

  const handleClearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(paramName);
    setSearchParams(newSearchParams, { replace: true });
  };

  const handleTogglePanel = () => {
    setIsOpen(!isOpen);
  };

  // Contenedor tipo badge secundario
  const badgeContainer = (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 min-h-[2rem] rounded-md bg-[var(--color-secondary-light)] text-gray-800 font-[var(--font-default)] cursor-pointer"
      onClick={handleTogglePanel}
    >
      {/* Valor a la izquierda (o vacío si no tiene valor) */}
      <span className="text-sm min-w-[1rem]">
        {getDisplayValue() || "\u00A0"}
      </span>

      {/* Botones a la derecha */}
      <div className="flex items-center gap-1">
        {/* Chevron hacia abajo siempre */}
        <span className="p-0.5 hover:bg-[var(--color-secondary)] rounded transition-colors flex items-center justify-center">
          <i
            className={`fa fa-chevron-down text-xs transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </span>

        {/* X solo si tiene valor */}
        {urlValue && (
          <button
            onClick={handleClearFilter}
            className="p-0.5 hover:bg-[var(--color-secondary)] rounded transition-colors flex items-center justify-center"
            aria-label="Borrar filtro"
            type="button"
          >
            <i className="fa fa-times text-xs" />
          </button>
        )}
      </div>
    </div>
  );

  // Renderizar según el tipo de filtro
  if (filterType === "date") {
    return (
      <div ref={containerRef} className="relative inline-block">
        <DataField
          label={label}
          value={badgeContainer}
          className="inline-block"
        />

        {/* Panel flotante para date */}
        {isOpen && (
          <div className="absolute z-20 mt-1 w-fit rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] p-4">
            <div className="space-y-3">
              {/* Opciones estáticas si existen */}
              {staticOptions && staticOptions.length > 0 && (
                <ul className="py-1 max-h-60 overflow-auto">
                  {staticOptions.map((option) => (
                    <li
                      key={option.value}
                      className={`px-3 py-2 cursor-pointer flex items-center gap-2 text-sm rounded transition-colors ${
                        urlValue === option.value
                          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                          : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleStaticOptionSelect(option);
                      }}
                    >
                      <span className="font-[var(--font-default)]">
                        {option.text}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Form control */}
              <div className="flex items-center gap-2">
                <div style={{ width: finalInputWidth }}>
                  <DateInput
                    value={dateValue}
                    onChange={handleDateChange}
                    format="dd/mm/yyyy"
                  />
                </div>
                <Button
                  onClick={handleSetDateFilter}
                  icon="fa-arrow-right"
                  variant="ghost"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Para text y number
  return (
    <div ref={containerRef} className="relative inline-block">
      <DataField
        label={label}
        value={badgeContainer}
        className="inline-block"
      />

      {/* Panel flotante para text y number */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-fit rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] p-4">
          <div className="space-y-3">
            {/* Opciones estáticas si existen */}
            {staticOptions && staticOptions.length > 0 && (
              <ul className="py-1 max-h-60 overflow-auto">
                {staticOptions.map((option) => (
                  <li
                    key={option.value}
                    className={`px-3 py-2 cursor-pointer flex items-center gap-2 text-sm rounded transition-colors ${
                      urlValue === option.value
                        ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                        : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleStaticOptionSelect(option);
                    }}
                  >
                    <span className="font-[var(--font-default)]">
                      {option.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Form control */}
            <div className="flex items-center gap-2">
              <div style={{ width: finalInputWidth }}>
                <Input
                  type={filterType === "number" ? "number" : "text"}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ingresa un valor"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSetFilter();
                    }
                  }}
                />
              </div>
              <Button
                onClick={handleSetFilter}
                icon="fa-arrow-right"
                variant="ghost"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
