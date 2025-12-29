import React from "react";
import { Input } from "./Input";
import type { InputProps } from "./Input";

// Interfaz por defecto para mantener compatibilidad
export interface AutocompleteOption {
  label: string;
  value: string;
  description?: string | number;
  icon?: string;
}

export interface AutocompleteInputProps<T = AutocompleteOption, K = string>
  extends Omit<InputProps, "onChange" | "value"> {
  options: T[];
  value?: string;
  /**
   * Valor de texto del input (controlado)
   */
  onChange?: (value: string) => void;
  /**
   * Callback al seleccionar una opción. Devuelve el item completo (T) y el valor mapeado (K)
   */
  onSelectOption?: (option: T, value: K) => void;
  noResultsText?: string;
  /**
   * Obtiene el label que se muestra para cada opción. Por defecto usa la propiedad "label".
   */
  getOptionLabel?: (item: T) => string;
  /**
   * Obtiene el valor que se devuelve al seleccionar una opción. Por defecto usa la propiedad "value".
   */
  getOptionValue?: (item: T) => K;
  /**
   * Obtiene la descripción opcional para cada opción. Por defecto usa la propiedad "description".
   */
  getOptionDescription?: (item: T) => string | number | undefined;
  /**
   * Renderizado personalizado de cada opción. Si se define, se ignora el render por defecto.
   */
  renderOption?: (item: T) => React.ReactNode;
}

export const AutocompleteInput = <T = AutocompleteOption, K = string>({
  options,
  value,
  onChange,
  onSelectOption,
  noResultsText = "Sin resultados",
  className = "",
  getOptionLabel,
  getOptionValue,
  getOptionDescription,
  renderOption,
  ...inputProps
}: AutocompleteInputProps<T, K>) => {
  const [internalValue, setInternalValue] = React.useState<string>(value || "");
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const inputValue = value !== undefined ? value : internalValue;

  const labelGetter = React.useCallback(
    (item: T): string => {
      if (getOptionLabel) return getOptionLabel(item);
      const anyItem = item as unknown as { label?: string };
      return (anyItem.label ?? "").toString();
    },
    [getOptionLabel]
  );

  const valueGetter = React.useCallback(
    (item: T): K => {
      if (getOptionValue) return getOptionValue(item);
      const anyItem = item as unknown as { value?: K };
      return (anyItem.value as K) ?? (undefined as unknown as K);
    },
    [getOptionValue]
  );

  const descriptionGetter = React.useCallback(
    (item: T): string | number | undefined => {
      if (getOptionDescription) return getOptionDescription(item);
      const anyItem = item as unknown as { description?: string | number };
      return anyItem.description;
    },
    [getOptionDescription]
  );

  const filteredOptions = React.useMemo(() => {
    const search = inputValue.trim().toLowerCase();
    if (!search) return options;

    return options.filter((option) => {
      const label = labelGetter(option).toLowerCase();
      const optionValue = String(valueGetter(option) ?? "").toLowerCase();
      return label.includes(search) || optionValue.includes(search);
    });
  }, [inputValue, options, labelGetter, valueGetter]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = event.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleSelect = (option: T) => {
    const label = labelGetter(option);
    const selectedValue = valueGetter(option);

    if (value === undefined) {
      setInternalValue(label);
    }
    onChange?.(label);
    onSelectOption?.(option, selectedValue);
    setIsOpen(false);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (!isOpen && (event.key === "ArrowDown" || event.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (!filteredOptions.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : 0
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredOptions.length - 1
      );
    } else if (event.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        event.preventDefault();
        handleSelect(filteredOptions[highlightedIndex]);
      }
    } else if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    } else {
      // Resetear el estado interno cuando value es undefined (por ejemplo, después de un reset)
      setInternalValue("");
    }
  }, [value]);

  const showDropdown = isOpen && (filteredOptions.length > 0 || noResultsText);

  return (
    <div ref={containerRef} className="relative w-full">
      <Input
        {...inputProps}
        value={inputValue}
        onChange={handleChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        className={className}
      />

      {showDropdown && (
        <div
          className="absolute z-20 mt-1 w-full rounded-md border border-[var(--color-border-default)] 
          bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] max-h-60 overflow-auto"
        >
          {filteredOptions.length > 0 ? (
            <ul className="py-1">
              {filteredOptions.map((option, index) => {
                const label = labelGetter(option);
                const description = descriptionGetter(option);
                const anyOption = option as unknown as { icon?: string };

                return (
                  <li
                    key={String(valueGetter(option) ?? label ?? index)}
                    className={`px-3 py-2 cursor-pointer flex items-start gap-2 text-sm
                      ${
                        index === highlightedIndex
                          ? "bg-[var(--color-primary-soft)] text-[var(--color-primary)]"
                          : "text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]"
                      }`}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      handleSelect(option);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {renderOption ? (
                      renderOption(option)
                    ) : (
                      <>
                        {anyOption.icon && (
                          <i
                            className={`fa ${anyOption.icon} mt-0.5 text-[var(--color-text-muted)]`}
                          />
                        )}
                        <div className="flex flex-col">
                          <span className="font-[var(--font-default)]">
                            {label}
                          </span>
                          {description !== undefined &&
                            description !== null && (
                              <span className="text-xs text-[var(--color-text-secondary)]">
                                {description}
                              </span>
                            )}
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-3 py-2 text-sm text-[var(--color-text-secondary)]">
              {noResultsText}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
