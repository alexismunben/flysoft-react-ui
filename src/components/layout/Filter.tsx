import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import dayjs, { type Dayjs } from "dayjs";
import { Button } from "../form-controls/Button";
import { Input } from "../form-controls/Input";
import { DateInput } from "../form-controls/DateInput";
import { AutocompleteInput } from "../form-controls/AutocompleteInput";
import type { AutocompleteOption } from "../form-controls/AutocompleteInput";
import { SearchSelectInput } from "../form-controls/SearchSelectInput";
import type { SearchSelectOption } from "../form-controls/SearchSelectInput";
import type { PaginationInterface } from "../form-controls/Pagination";
import { DataField } from "./DataField";
import { normalizeIconClass } from "../utils/iconUtils";

export interface StaticOption {
  text: string;
  value: string;
}

// Props base comunes a todos los filtros
interface BaseFilterProps {
  paramName?: string;
  label?: string;
  staticOptions?: StaticOption[];
  inputWidth?: string;
  value?: string;
  onChange?: (value: string | undefined) => void;
  /**
   * Si es true, el componente solo se renderiza si tiene un valor o existe el queryParam asociado con un valor.
   * Por defecto es false.
   */
  hideEmpty?: boolean;
  /**
   * Si es true, el componente se muestra con opacidad y no permite interacciones.
   * Si el panel está abierto, se cerrará automáticamente.
   */
  disabled?: boolean;
}

// Props específicas para cada tipo de filtro
export interface TextFilterProps extends BaseFilterProps {
  filterType?: "text";
}

export interface NumberFilterProps extends BaseFilterProps {
  filterType: "number";
  min?: number;
  max?: number;
}

export interface DateFilterProps extends BaseFilterProps {
  filterType: "date";
}

export interface AutocompleteFilterProps<T = AutocompleteOption, K = string>
  extends BaseFilterProps {
  filterType: "autocomplete";
  options: T[];
  getOptionLabel?: (item: T) => string;
  getOptionValue?: (item: T) => K;
  renderOption?: (item: T) => React.ReactNode;
  noResultsText?: string;
}

export interface SearchFilterProps extends BaseFilterProps {
  filterType: "search";
}

export interface SearchSelectFilterProps<T = SearchSelectOption, K = string>
  extends BaseFilterProps {
  filterType: "searchSelect";
  onSearchPromiseFn: (
    text: string
  ) => Promise<Array<T> | PaginationInterface<T>>;
  onSingleSearchPromiseFn: (value: K) => Promise<T | undefined>;
  getOptionLabel?: (item: T) => string;
  getOptionValue?: (item: T) => K;
  renderOption?: (item: T) => React.ReactNode;
  dialogTitle?: string;
  noResultsText?: string;
}

// Unión discriminada para FilterProps
export type FilterProps =
  | TextFilterProps
  | NumberFilterProps
  | DateFilterProps
  | AutocompleteFilterProps
  | SearchFilterProps
  | SearchSelectFilterProps;

export const Filter: React.FC<FilterProps> = (props) => {
  const {
    paramName,
    label,
    staticOptions,
    inputWidth,
    value: propValue,
    onChange,

    hideEmpty = false,
    disabled = false,
  } = props;
  const filterType = props.filterType || "text";

  // Calcular el ancho por defecto según el tipo de filtro
  const defaultInputWidth =
    filterType === "date" || filterType === "autocomplete" ? "160px" : "200px";
  const finalInputWidth = inputWidth || defaultInputWidth;
  const [searchParams, setSearchParams] = useSearchParams();
  const urlValue = paramName
    ? searchParams.get(paramName) || undefined
    : undefined;

  // Usar propValue si está presente, sino usar urlValue
  const currentValue = propValue !== undefined ? propValue : urlValue;
  const [inputValue, setInputValue] = useState<string>(currentValue || "");
  const [searchValue, setSearchValue] = useState<string>(currentValue || "");
  const [dateValue, setDateValue] = useState<Dayjs | null>(null);
  const [autocompleteValue, setAutocompleteValue] = useState<string>(
    currentValue || ""
  );
  const [searchSelectValue, setSearchSelectValue] = useState<any>(
    currentValue || undefined
  );
  const [searchSelectLabel, setSearchSelectLabel] = useState<string>("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [panelPosition, setPanelPosition] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchSelectInputRef = useRef<HTMLInputElement | null>(null);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteInputRef = useRef<HTMLInputElement | null>(null);

  // Sincronizar el input con el valor actual (propValue o urlValue)
  useEffect(() => {
    if (
      filterType !== "autocomplete" &&
      filterType !== "search" &&
      filterType !== "searchSelect"
    ) {
      setInputValue(currentValue || "");
    }
  }, [currentValue, filterType]);

  // Sincronizar el searchValue con el valor actual (propValue o urlValue)
  useEffect(() => {
    if (filterType === "search") {
      setSearchValue(currentValue || "");
    }
  }, [currentValue, filterType]);

  // Sincronizar el searchSelectValue con el valor actual (propValue o urlValue)
  // y buscar el label si no está disponible
  useEffect(() => {
    if (filterType === "searchSelect" && currentValue) {
      const searchSelectProps = props as SearchSelectFilterProps;
      const getOptionLabel =
        searchSelectProps.getOptionLabel || ((item: any) => item.label || "");
      const getOptionValue =
        searchSelectProps.getOptionValue || ((item: any) => item.value || "");
      const onSingleSearchPromiseFn = searchSelectProps.onSingleSearchPromiseFn;

      // Si searchSelectValue es un objeto, extraer el label directamente
      if (searchSelectValue && typeof searchSelectValue === "object") {
        const label = getOptionLabel(searchSelectValue);
        const value = String(getOptionValue(searchSelectValue));
        if (value === String(currentValue)) {
          setSearchSelectLabel(label);
          return;
        }
      }

      // Si no tenemos el objeto completo, usar onSingleSearchPromiseFn para obtenerlo
      if (onSingleSearchPromiseFn) {
        onSingleSearchPromiseFn(currentValue as any)
          .then((option) => {
            if (option) {
              setSearchSelectValue(option);
              setSearchSelectLabel(getOptionLabel(option));
            } else {
              setSearchSelectLabel(String(currentValue));
            }
          })
          .catch(() => {
            setSearchSelectLabel(String(currentValue));
          });
      } else {
        setSearchSelectLabel(String(currentValue));
      }
    } else if (filterType === "searchSelect" && !currentValue) {
      setSearchSelectValue(undefined);
      setSearchSelectLabel("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentValue, filterType]);

  // Sincronizar el dateValue con el valor actual (propValue o urlValue)
  useEffect(() => {
    if (filterType === "date") {
      if (currentValue) {
        const date = dayjs(currentValue, "YYYY-MM-DD");
        setDateValue(date.isValid() ? date : null);
      } else {
        setDateValue(null);
      }
    }
  }, [currentValue, filterType]);

  // Sincronizar el autocompleteValue con el valor actual (propValue o urlValue)
  // Para autocomplete, mantener el value (no el label) para que AutocompleteInput pueda encontrar la opción
  useEffect(() => {
    if (filterType === "autocomplete") {
      // Mantener el value, el AutocompleteInput se encargará de mostrar el label
      setAutocompleteValue(currentValue || "");
      setIsUserTyping(false);
    }
  }, [currentValue, filterType]);

  // Cerrar el panel al hacer clic fuera
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isClickInsideContainer = containerRef.current?.contains(target);
      const isClickInsidePanel = panelRef.current?.contains(target);

      // Verificar si el click está dentro de un elemento con portal (DatePicker, AutocompleteInput, etc.)
      // Estos elementos tienen z-[2001] y están posicionados fixed
      let isClickInsidePortal = false;
      if (target instanceof Element) {
        let element = target as HTMLElement;
        // Subir por el árbol DOM buscando elementos con z-index alto que sean portales
        while (element && element !== document.body) {
          const computedStyle = window.getComputedStyle(element);
          const zIndex = computedStyle.zIndex;
          const position = computedStyle.position;

          // Si encontramos un elemento fixed con z-index alto, probablemente es un portal
          if (
            position === "fixed" &&
            (zIndex === "2001" || parseInt(zIndex) >= 2001)
          ) {
            isClickInsidePortal = true;
            break;
          }
          element = element.parentElement as HTMLElement;
        }
      }

      if (
        !isClickInsideContainer &&
        !isClickInsidePanel &&
        !isClickInsidePortal
      ) {
        setIsOpen(false);
      }
    };

    // Pequeño delay para asegurar que el portal esté montado
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Cerrar el panel si el componente se deshabilita
  useEffect(() => {
    if (disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  const handleSetFilter = () => {
    const newValue = inputValue.trim() || undefined;

    // Si hay onChange, llamarlo con el nuevo valor
    if (onChange) {
      onChange(newValue);
    }

    // Si hay paramName, actualizar el query param
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      if (newValue) {
        newSearchParams.set(paramName, newValue);
      } else {
        newSearchParams.delete(paramName);
      }
      // Usar replace: true para reemplazar la URL sin agregar una nueva entrada al historial
      setSearchParams(newSearchParams, { replace: true });
    }

    setIsOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    }
  };

  const handleSearchSubmit = () => {
    const newValue = searchValue.trim() || undefined;

    // Si hay onChange, llamarlo con el nuevo valor
    if (onChange) {
      onChange(newValue);
    }

    // Si hay paramName, actualizar el query param
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      if (newValue) {
        newSearchParams.set(paramName, newValue);
      } else {
        newSearchParams.delete(paramName);
      }
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const handleSearchIconClick = () => {
    // Verificar si el texto actual coincide con el valor actual
    const valueMatches = currentValue && searchValue.trim() === currentValue;

    if (valueMatches) {
      // Si coincide, limpiar
      const newValue = undefined;

      // Si hay onChange, llamarlo con undefined
      if (onChange) {
        onChange(newValue);
      }

      // Si hay paramName, actualizar el query param
      if (paramName) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete(paramName);
        setSearchParams(newSearchParams, { replace: true });
      }

      setSearchValue("");
    } else {
      // Si no coincide, hacer submit
      handleSearchSubmit();
    }
  };

  const handleAutocompleteChange = () => {
    // Marcar que el usuario está escribiendo para que el AutocompleteInput pueda manejar el texto libremente
    setIsUserTyping(true);
  };

  const handleAutocompleteSelect = () => {
    // Obtener el valor actual del input del AutocompleteInput
    const currentInputValue = autocompleteInputRef.current?.value || "";

    // Buscar si el texto actual coincide con alguna opción
    if (filterType === "autocomplete") {
      const autocompleteProps = props as AutocompleteFilterProps;
      const getOptionLabel =
        autocompleteProps.getOptionLabel || ((item: any) => item.label || "");
      const getOptionValue =
        autocompleteProps.getOptionValue || ((item: any) => item.value || "");

      // Buscar opción por label
      const matchingOption = autocompleteProps.options.find(
        (opt) =>
          getOptionLabel(opt).toLowerCase() === currentInputValue.toLowerCase()
      );

      let newValue: string | undefined;

      if (matchingOption) {
        newValue = String(getOptionValue(matchingOption));
        setAutocompleteValue(newValue);
        setIsUserTyping(false);
      } else if (currentInputValue.trim()) {
        // Si no coincide con ninguna opción, guardar el texto tal cual
        newValue = currentInputValue.trim();
        setAutocompleteValue(newValue);
        setIsUserTyping(false);
      } else {
        newValue = undefined;
        setAutocompleteValue("");
        setIsUserTyping(false);
      }

      // Si hay onChange, llamarlo con el nuevo valor
      if (onChange) {
        onChange(newValue);
      }

      // Si hay paramName, actualizar el query param
      if (paramName) {
        const newSearchParams = new URLSearchParams(searchParams);
        if (newValue) {
          newSearchParams.set(paramName, newValue);
        } else {
          newSearchParams.delete(paramName);
        }
        setSearchParams(newSearchParams, { replace: true });
      }

      setIsOpen(false);
    }
  };

  const handleAutocompleteOptionSelect = (option: any) => {
    if (filterType === "autocomplete") {
      const autocompleteProps = props as AutocompleteFilterProps;
      const getOptionValue =
        autocompleteProps.getOptionValue || ((item: any) => item.value || "");
      const newValue = String(getOptionValue(option));
      setAutocompleteValue(newValue);
      setIsUserTyping(false);

      // Si hay onChange, llamarlo con el nuevo valor
      if (onChange) {
        onChange(newValue);
      }

      // Si hay paramName, actualizar el query param
      if (paramName) {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(paramName, newValue);
        setSearchParams(newSearchParams, { replace: true });
      }

      setIsOpen(false);
    }
  };

  const handleSearchSelectChange = (value: any) => {
    if (filterType === "searchSelect") {
      const searchSelectProps = props as SearchSelectFilterProps;
      const getOptionValue =
        searchSelectProps.getOptionValue || ((item: any) => item.value || "");
      const getOptionLabel =
        searchSelectProps.getOptionLabel || ((item: any) => item.label || "");

      // Si value es un objeto, extraer el valor usando getOptionValue
      // Si value es un string/number, usarlo directamente
      let newValue: string | undefined;
      if (value === undefined || value === null) {
        newValue = undefined;
        setSearchSelectValue(undefined);
        setSearchSelectLabel("");
      } else if (typeof value === "object") {
        newValue = String(getOptionValue(value));
        setSearchSelectValue(value);
        setSearchSelectLabel(getOptionLabel(value));
      } else {
        newValue = String(value);
        setSearchSelectValue(value);
        // Si solo tenemos el valor, el useEffect se encargará de buscar el label
        setSearchSelectLabel("");
      }

      // Si hay onChange, llamarlo con el nuevo valor
      if (onChange) {
        onChange(newValue);
      }

      // Si hay paramName, actualizar el query param
      if (paramName) {
        const newSearchParams = new URLSearchParams(searchParams);
        if (newValue) {
          newSearchParams.set(paramName, newValue);
        } else {
          newSearchParams.delete(paramName);
        }
        setSearchParams(newSearchParams, { replace: true });
      }

      setIsOpen(false);
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    // Solo actualizar el estado temporal, no setear en la URL
    setDateValue(date);
  };

  const handleSetDateFilter = () => {
    let newValue: string | undefined;

    if (dateValue && dateValue.isValid()) {
      // Guardar como yyyy-mm-dd
      newValue = dateValue.format("YYYY-MM-DD");
    } else {
      newValue = undefined;
    }

    // Si hay onChange, llamarlo con el nuevo valor
    if (onChange) {
      onChange(newValue);
    }

    // Si hay paramName, actualizar el query param
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      if (newValue) {
        newSearchParams.set(paramName, newValue);
      } else {
        newSearchParams.delete(paramName);
      }
      setSearchParams(newSearchParams, { replace: true });
    }

    setIsOpen(false);
  };

  const handleStaticOptionSelect = (option: StaticOption) => {
    const newValue = option.value;

    // Si hay onChange, llamarlo con el nuevo valor
    if (onChange) {
      onChange(newValue);
    }

    // Si hay paramName, actualizar el query param
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set(paramName, newValue);
      setSearchParams(newSearchParams, { replace: true });
    }

    setIsOpen(false);
  };

  // Para staticOptions: mostrar el texto de la opción si el valor coincide (prioridad)
  // Para date: convertir yyyy-mm-dd a Dayjs y formatear para mostrar como dd/mm/yyyy
  // Para autocomplete: mostrar el label de la opción si el valor coincide
  const getDisplayValue = () => {
    // Primero verificar si el valor coincide con alguna opción estática
    if (staticOptions && currentValue) {
      const option = staticOptions.find((opt) => opt.value === currentValue);
      if (option) {
        return option.text;
      }
    }
    // Para autocomplete, buscar el label de la opción
    if (filterType === "autocomplete" && currentValue) {
      const autocompleteProps = props as AutocompleteFilterProps;
      if (autocompleteProps.options) {
        const getOptionLabel =
          autocompleteProps.getOptionLabel || ((item: any) => item.label || "");
        const getOptionValue =
          autocompleteProps.getOptionValue || ((item: any) => item.value || "");
        const option = autocompleteProps.options.find(
          (opt) => String(getOptionValue(opt)) === String(currentValue)
        );
        if (option) {
          return getOptionLabel(option);
        }
      }
    }
    // Para searchSelect, mostrar el label guardado o buscar el label del objeto
    if (filterType === "searchSelect" && currentValue) {
      if (searchSelectLabel) {
        return searchSelectLabel;
      }
      // Si tenemos el objeto completo, extraer el label
      if (searchSelectValue && typeof searchSelectValue === "object") {
        const searchSelectProps = props as SearchSelectFilterProps;
        const getOptionLabel =
          searchSelectProps.getOptionLabel || ((item: any) => item.label || "");
        return getOptionLabel(searchSelectValue);
      }
    }
    // Si no hay opción estática que coincida, formatear según el tipo
    if (filterType === "date" && currentValue) {
      const date = dayjs(currentValue, "YYYY-MM-DD");
      if (date.isValid()) {
        return date.format("DD/MM/YYYY");
      }
    }
    return currentValue || "";
  };

  const handleClearFilter = (e: React.MouseEvent) => {
    e.stopPropagation();

    // Si hay onChange, llamarlo con undefined para limpiar
    if (onChange) {
      onChange(undefined);
    }

    // Si hay paramName, actualizar el query param
    if (paramName) {
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.delete(paramName);
      setSearchParams(newSearchParams, { replace: true });
    }
  };

  const handleTogglePanel = () => {
    if (disabled) return;

    if (!isOpen) {
      // Calcular posición antes de abrir
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPanelPosition({
          top: rect.bottom + window.scrollY + 4,
          left: rect.left + window.scrollX,
          width: rect.width,
        });
      }
    }
    setIsOpen(!isOpen);
  };

  // Actualizar posición cuando se abre o cuando cambia el scroll
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const updatePosition = () => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setPanelPosition({
            top: rect.bottom + window.scrollY + 4,
            left: rect.left + window.scrollX,
            width: rect.width,
          });
        }
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

  // Hacer foco en el input cuando se abre el panel
  useEffect(() => {
    if (isOpen) {
      // Pequeño delay para asegurar que el DOM esté actualizado
      const timer = setTimeout(() => {
        if (filterType === "text" || filterType === "number") {
          inputRef.current?.focus();
        } else if (filterType === "date") {
          dateInputRef.current?.focus();
        } else if (filterType === "autocomplete") {
          autocompleteInputRef.current?.focus();
        }
        // searchSelect no necesita focus porque usa un Dialog interno
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, filterType]);

  // Si hideEmpty es true y no hay valor, no renderizar el componente
  if (hideEmpty && !currentValue) {
    return null;
  }

  // Contenedor tipo badge con diseño similar al Input
  // Altura ajustada para coincidir con input sm: py-1.5 (6px arriba y abajo) + text-sm (14px línea) = ~26px total
  const badgeContainer = (
    <div
      className="inline-flex items-center gap-2 px-3 py-1.5 h-[2.1rem] rounded-lg border border-[var(--color-border-default)] bg-[var(--color-bg-default)] text-[var(--color-text-primary)] font-[var(--font-default)] cursor-pointer text-sm transition-colors"
      onClick={handleTogglePanel}
    >
      {/* Valor a la izquierda (o vacío si no tiene valor) */}
      <span className="text-sm min-w-[1rem]">
        {getDisplayValue() || "\u00A0"}
      </span>

      {/* Botones a la derecha */}
      <div className="flex items-center gap-1">
        {/* Chevron hacia abajo siempre */}
        <span className="p-0.5 hover:bg-[var(--color-bg-secondary)] rounded transition-colors flex items-center justify-center">
          <i
            className={`${normalizeIconClass(
              "fa-chevron-down"
            )} text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all ${isOpen ? "rotate-180" : ""
              }`}
          />
        </span>

        {/* X solo si tiene valor */}
        {currentValue && (
          <button
            onClick={handleClearFilter}
            className="p-0.5 hover:bg-[var(--color-bg-secondary)] rounded transition-colors flex items-center justify-center"
            aria-label="Borrar filtro"
            type="button"
          >
            <i
              className={`${normalizeIconClass(
                "fa-times"
              )} text-xs text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors`}
            />
          </button>
        )}
      </div>
    </div>
  );

  // Renderizar según el tipo de filtro
  if (filterType === "autocomplete") {
    return (
      <div
        ref={containerRef}
        className={`relative inline-block ${disabled ? "opacity-50 pointer-events-none" : ""
          }`}
      >
        <DataField
          label={label}
          value={badgeContainer}
          className="inline-block"
        />

        {/* Panel flotante para autocomplete */}
        {isOpen &&
          panelPosition &&
          typeof document !== "undefined" &&
          document.body &&
          createPortal(
            <div
              ref={panelRef}
              className="fixed z-[2001] w-fit rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] p-4"
              style={{
                top: `${panelPosition.top}px`,
                left: `${panelPosition.left}px`,
              }}
            >
              <div className="space-y-3">
                {/* Opciones estáticas si existen */}
                {staticOptions && staticOptions.length > 0 && (
                  <ul className="py-1 max-h-60 overflow-auto">
                    {staticOptions.map((option) => (
                      <li
                        key={option.value}
                        className={`px-3 py-2 cursor-pointer flex items-center gap-2 text-sm rounded transition-colors ${currentValue === option.value
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
                    <AutocompleteInput
                      ref={autocompleteInputRef}
                      options={(props as AutocompleteFilterProps).options}
                      value={isUserTyping ? undefined : autocompleteValue}
                      onChange={handleAutocompleteChange}
                      getOptionLabel={
                        (props as AutocompleteFilterProps).getOptionLabel
                      }
                      getOptionValue={
                        (props as AutocompleteFilterProps).getOptionValue
                      }
                      renderOption={
                        (props as AutocompleteFilterProps).renderOption
                      }
                      noResultsText={
                        (props as AutocompleteFilterProps).noResultsText
                      }
                      onSelectOption={handleAutocompleteOptionSelect}
                      disabled={disabled}
                    />
                  </div>
                  <Button
                    onClick={handleAutocompleteSelect}
                    icon="fa-arrow-right"
                    variant="ghost"
                  />
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }

  if (filterType === "date") {
    return (
      <div
        ref={containerRef}
        className={`relative inline-block ${disabled ? "opacity-50 pointer-events-none" : ""
          }`}
      >
        <DataField
          label={label}
          value={badgeContainer}
          className="inline-block"
        />

        {/* Panel flotante para date */}
        {isOpen &&
          panelPosition &&
          typeof document !== "undefined" &&
          document.body &&
          createPortal(
            <div
              ref={panelRef}
              className="fixed z-[2001] w-fit rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] p-4"
              style={{
                top: `${panelPosition.top}px`,
                left: `${panelPosition.left}px`,
              }}
            >
              <div className="space-y-3">
                {/* Opciones estáticas si existen */}
                {staticOptions && staticOptions.length > 0 && (
                  <ul className="py-1 max-h-60 overflow-auto">
                    {staticOptions.map((option) => (
                      <li
                        key={option.value}
                        className={`px-3 py-2 cursor-pointer flex items-center gap-2 text-sm rounded transition-colors ${currentValue === option.value
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
                      ref={dateInputRef}
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
            </div>,
            document.body
          )}
      </div>
    );
  }

  // Para searchSelect
  if (filterType === "searchSelect") {
    const searchSelectProps = props as SearchSelectFilterProps;

    return (
      <div
        ref={containerRef}
        className={`relative inline-block ${disabled ? "opacity-50 pointer-events-none" : ""
          }`}
      >
        <DataField
          label={label}
          value={badgeContainer}
          className="inline-block"
        />

        {/* Panel flotante para searchSelect */}
        {isOpen &&
          panelPosition &&
          typeof document !== "undefined" &&
          document.body &&
          createPortal(
            <div
              ref={panelRef}
              className="fixed z-[2001] w-fit rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] p-4"
              style={{
                top: `${panelPosition.top}px`,
                left: `${panelPosition.left}px`,
              }}
            >
              <div className="space-y-3">
                {/* Opciones estáticas si existen */}
                {staticOptions && staticOptions.length > 0 && (
                  <ul className="py-1 max-h-60 overflow-auto">
                    {staticOptions.map((option) => (
                      <li
                        key={option.value}
                        className={`px-3 py-2 cursor-pointer flex items-center gap-2 text-sm rounded transition-colors ${currentValue === option.value
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
                <div style={{ width: finalInputWidth }}>
                  <SearchSelectInput
                    ref={searchSelectInputRef}
                    value={searchSelectValue}
                    onChange={handleSearchSelectChange}
                    onSearchPromiseFn={searchSelectProps.onSearchPromiseFn}
                    onSingleSearchPromiseFn={
                      searchSelectProps.onSingleSearchPromiseFn
                    }
                    getOptionLabel={searchSelectProps.getOptionLabel}
                    getOptionValue={searchSelectProps.getOptionValue}
                    renderOption={searchSelectProps.renderOption}
                    dialogTitle={searchSelectProps.dialogTitle}
                    noResultsText={searchSelectProps.noResultsText}
                  />
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>
    );
  }

  // Para search
  if (filterType === "search") {
    // Mostrar X solo si hay un valor actual Y el texto del input coincide con ese valor
    const hasValue = !!currentValue;
    const valueMatches = hasValue && searchValue.trim() === currentValue;

    return (
      <div
        ref={containerRef}
        className={`relative inline-block ${disabled ? "opacity-50 pointer-events-none" : ""
          }`}
      >
        <DataField
          label={label}
          value={
            <div style={{ width: finalInputWidth }}>
              <Input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
                icon={valueMatches ? "fa-times" : "fa-search"}
                iconPosition="right"
                onIconClick={handleSearchIconClick}
                placeholder="Buscar..."
                size="sm"
                disabled={disabled}
              />
            </div>
          }
          className="inline-block"
        />
      </div>
    );
  }

  // Para text y number
  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${disabled ? "opacity-50 pointer-events-none" : ""
        }`}
    >
      <DataField
        label={label}
        value={badgeContainer}
        className="inline-block"
      />

      {/* Panel flotante para text y number */}
      {isOpen &&
        panelPosition &&
        typeof document !== "undefined" &&
        document.body &&
        createPortal(
          <div
            ref={panelRef}
            className="fixed z-[2001] w-fit rounded-md border border-[var(--color-border-default)] bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] p-4"
            style={{
              top: `${panelPosition.top}px`,
              left: `${panelPosition.left}px`,
            }}
          >
            <div className="space-y-3">
              {/* Opciones estáticas si existen */}
              {staticOptions && staticOptions.length > 0 && (
                <ul className="py-1 max-h-60 overflow-auto">
                  {staticOptions.map((option) => (
                    <li
                      key={option.value}
                      className={`px-3 py-2 cursor-pointer flex items-center gap-2 text-sm rounded transition-colors ${urlValue === option.value
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
                    ref={inputRef}
                    type={filterType === "number" ? "number" : "text"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ingresa un valor"
                    min={
                      filterType === "number"
                        ? (props as NumberFilterProps).min
                        : undefined
                    }
                    max={
                      filterType === "number"
                        ? (props as NumberFilterProps).max
                        : undefined
                    }
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
          </div>,
          document.body
        )}
    </div>
  );
};
