import React from "react";
import { Input } from "./Input";
import type { InputProps } from "./Input";
import { Button } from "./Button";
import { Dialog } from "../utils/Dialog";
import type { PaginationInterface } from "./Pagination";

// Interfaz por defecto para mantener compatibilidad
export interface SearchSelectOption {
  label: string;
  value: string;
  description?: string | number;
  icon?: string;
}

export interface SearchSelectInputProps<T = SearchSelectOption, K = string>
  extends Omit<InputProps, "onChange" | "value" | "ref"> {
  /**
   * Valor del input (controlado).
   * Puede ser la opción completa (T), el valor extraído (K si hay getOptionValue), o un string (para compatibilidad con react-hook-form).
   */
  value?: T | K | string;
  /**
   * Callback cuando cambia el valor del input.
   * Recibe la opción completa (T) si no hay getOptionValue, o el valor extraído (K) si hay getOptionValue.
   * También es compatible con react-hook-form: acepta el onChange estándar de HTML.
   */
  onChange?:
    | ((value: T | K) => void)
    | React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Función que realiza la búsqueda y devuelve un Promise con los resultados
   */
  onSearchPromiseFn: (
    text: string
  ) => Promise<Array<T> | PaginationInterface<T>>;
  /**
   * Callback al seleccionar una opción. Devuelve el item completo (T) y el valor mapeado (K)
   */
  onSelectOption?: (option: T, value: K) => void;
  /**
   * Título del dialog de selección. Por defecto "Seleccione una opción"
   */
  dialogTitle?: string;
  /**
   * Posición del botón de búsqueda. Por defecto "right"
   */
  searchButtonPosition?: "left" | "right";
  /**
   * Texto a mostrar cuando no hay resultados
   */
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

function SearchSelectInputInner<T = SearchSelectOption, K = string>(
  {
    value,
    onChange,
    onSearchPromiseFn,
    onSelectOption,
    dialogTitle = "Seleccione una opción",
    searchButtonPosition = "right",
    noResultsText = "Sin resultados",
    getOptionLabel,
    getOptionValue,
    getOptionDescription,
    renderOption,
    className = "",
    size = "md",
    ...inputProps
  }: SearchSelectInputProps<T, K>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  // Estado interno para el texto mostrado en el input (siempre string)
  const [internalDisplayValue, setInternalDisplayValue] =
    React.useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [options, setOptions] = React.useState<T[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dialogSearchText, setDialogSearchText] = React.useState<string>("");

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

  // Sincronizar displayValue cuando value cambia externamente
  // Si value es string, usarlo directamente. Si es T | K, obtener el label del objeto
  React.useEffect(() => {
    if (value !== undefined) {
      if (typeof value === "string") {
        setInternalDisplayValue(value);
      } else {
        // Si value es T | K, obtener el label usando getOptionLabel o la propiedad label
        // Si hay getOptionValue, el value puede ser K (no tiene label), así que necesitamos
        // buscar el objeto original en las opciones recientes o usar getOptionLabel si está disponible
        if (getOptionLabel) {
          // Si hay getOptionLabel, intentar usarlo (puede que value sea K, no T)
          // En ese caso, necesitamos buscar el objeto T correspondiente
          // Por ahora, intentamos usar getOptionLabel directamente
          try {
            setInternalDisplayValue(getOptionLabel(value as T));
          } catch {
            // Si falla, value es probablemente K, buscar en las opciones
            const matchingOption = options.find(
              (opt) => valueGetter(opt) === value
            );
            if (matchingOption) {
              setInternalDisplayValue(labelGetter(matchingOption));
            }
          }
        } else {
          // Intentar obtener la propiedad label directamente
          const anyValue = value as unknown as { label?: string };
          if (anyValue?.label) {
            setInternalDisplayValue(anyValue.label);
          } else {
            // Si no tiene label, puede ser K, buscar en las opciones
            const matchingOption = options.find(
              (opt) => valueGetter(opt) === value
            );
            if (matchingOption) {
              setInternalDisplayValue(labelGetter(matchingOption));
            }
          }
        }
      }
    } else {
      // Resetear el estado interno cuando value es undefined (por ejemplo, después de un reset)
      setInternalDisplayValue("");
    }
  }, [value, getOptionLabel, options, labelGetter, valueGetter]);

  // El input siempre muestra un string (el label o el texto escrito)
  const inputValue = typeof value === "string" ? value : internalDisplayValue;

  const descriptionGetter = React.useCallback(
    (item: T): string | number | undefined => {
      if (getOptionDescription) return getOptionDescription(item);
      const anyItem = item as unknown as { description?: string | number };
      return anyItem.description;
    },
    [getOptionDescription]
  );

  const handleSearch = React.useCallback(async () => {
    const textToSearch =
      typeof inputValue === "string" ? inputValue.trim() : "";
    if (!textToSearch) return;

    setIsLoading(true);
    setIsDialogOpen(true);
    setDialogSearchText(textToSearch);

    try {
      const result = await onSearchPromiseFn(textToSearch);
      // Si es PaginationInterface, extraer el array de list
      if (result && typeof result === "object" && "list" in result) {
        setOptions((result as PaginationInterface<T>).list);
      } else {
        setOptions(result as T[]);
      }
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, onSearchPromiseFn]);

  const handleDialogSearch = React.useCallback(async () => {
    const textToSearch = dialogSearchText.trim();
    if (!textToSearch) return;

    setIsLoading(true);

    try {
      const result = await onSearchPromiseFn(textToSearch);
      // Si es PaginationInterface, extraer el array de list
      if (result && typeof result === "object" && "list" in result) {
        setOptions((result as PaginationInterface<T>).list);
      } else {
        setOptions(result as T[]);
      }
    } catch (error) {
      console.error("Error en búsqueda:", error);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  }, [dialogSearchText, onSearchPromiseFn]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const newValue = event.target.value;
    // Actualizar el display value cuando el usuario escribe
    if (value === undefined || typeof value === "string") {
      setInternalDisplayValue(newValue);
    }

    // Compatibilidad con react-hook-form: siempre pasar el evento
    if (onChange) {
      // Siempre llamar como ChangeEventHandler (para react-hook-form)
      const standardHandler =
        onChange as unknown as React.ChangeEventHandler<HTMLInputElement>;
      standardHandler(event);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSelect = (option: T) => {
    const label = labelGetter(option);

    // Determinar el valor a asignar: opción completa (T) o valor extraído (K)
    const valueToAssign: T | K = getOptionValue ? valueGetter(option) : option;

    // Actualizar el display value para mostrar el label en el input
    setInternalDisplayValue(label);

    // Llamar al onChange con el valor correcto (T | K)
    if (onChange) {
      // Intentar primero como onChange personalizado (acepta T | K directamente)
      // Esto funciona con Controller de react-hook-form que puede recibir valores directamente
      const customHandler = onChange as unknown as
        | ((value: T | K) => void)
        | undefined;

      // Llamar como función personalizada
      // Si el onChange es de Controller (field.onChange), recibirá el objeto directamente
      if (typeof customHandler === "function") {
        // Llamar como función personalizada - esto funciona con Controller
        customHandler(valueToAssign);

        // NO llamar también al ChangeEventHandler porque field.onChange de Controller
        // puede recibir tanto valores como eventos, y si llamamos ambos, el segundo
        // (evento serializado) sobrescribirá el primero (objeto)
      } else {
        // Si no es función personalizada, es ChangeEventHandler (para register de react-hook-form)
        const serializedValue =
          typeof valueToAssign === "object" && valueToAssign !== null
            ? JSON.stringify(valueToAssign)
            : String(valueToAssign);

        const syntheticEvent = {
          target: {
            value: serializedValue,
            name: inputProps.name || "",
          },
          currentTarget: {
            value: serializedValue,
            name: inputProps.name || "",
          },
          type: "change",
          bubbles: true,
          cancelable: true,
          defaultPrevented: false,
          eventPhase: 0,
          isTrusted: false,
          nativeEvent: {} as Event,
          preventDefault: () => {},
          isDefaultPrevented: () => false,
          stopPropagation: () => {},
          isPropagationStopped: () => false,
          persist: () => {},
          timeStamp: Date.now(),
        } as React.ChangeEvent<HTMLInputElement>;

        const standardHandler =
          onChange as unknown as React.ChangeEventHandler<HTMLInputElement>;
        standardHandler(syntheticEvent);
      }
    }

    onSelectOption?.(option, valueGetter(option));
    setIsDialogOpen(false);
  };

  const handleIconClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      handleSearch();
    }
  };

  // Resetear el texto de búsqueda del dialog cuando se cierra
  React.useEffect(() => {
    if (!isDialogOpen) {
      setDialogSearchText("");
    }
  }, [isDialogOpen]);

  return (
    <>
      <div className={`relative w-full ${className}`}>
        <Input
          {...inputProps}
          ref={ref}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          size={size}
          icon={inputProps.icon || "fa-search"}
          iconPosition={searchButtonPosition}
          onIconClick={
            typeof inputValue === "string" && inputValue.trim()
              ? handleIconClick
              : undefined
          }
        />
      </div>

      <Dialog
        isOpen={isDialogOpen}
        title={dialogTitle}
        dialogBody={
          <div className="space-y-2">
            <Input
              value={dialogSearchText}
              onChange={(e) => setDialogSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleDialogSearch();
                }
              }}
              icon="fa-search"
              iconPosition="right"
              onIconClick={
                dialogSearchText.trim() ? handleDialogSearch : undefined
              }
              size={size}
              placeholder="Buscar..."
              autoFocus
            />
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <i className="fa fa-spinner fa-spin text-2xl text-[var(--color-primary)]" />
              </div>
            ) : options.length > 0 ? (
              <ul className="space-y-1 max-h-96 overflow-y-auto">
                {options.map((option, index) => {
                  const label = labelGetter(option);
                  const description = descriptionGetter(option);
                  const anyOption = option as unknown as { icon?: string };

                  return (
                    <li
                      key={String(valueGetter(option) ?? label ?? index)}
                      className="px-3 py-2 cursor-pointer rounded-md flex items-start gap-2 text-sm
                        text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                      onClick={() => handleSelect(option)}
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
                          <div className="flex flex-col flex-1">
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
              <div className="px-3 py-8 text-center text-sm text-[var(--color-text-secondary)]">
                {noResultsText}
              </div>
            )}
          </div>
        }
        dialogActions={
          <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
            Cerrar
          </Button>
        }
        onClose={() => setIsDialogOpen(false)}
        closeOnOverlayClick={true}
      />
    </>
  );
}

const SearchSelectInputForwarded = React.forwardRef(SearchSelectInputInner);

SearchSelectInputForwarded.displayName = "SearchSelectInput";

export const SearchSelectInput = SearchSelectInputForwarded as <
  T = SearchSelectOption,
  K = string
>(
  props: SearchSelectInputProps<T, K> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => React.ReactElement;
