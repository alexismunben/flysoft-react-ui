import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { useFormContext } from "react-hook-form";
import { Input, type InputProps } from "./Input";
import type { PaginationInterface } from "./Pagination";
import { Button } from "./Button";
import { Dialog, Loader } from "../utils";
import { normalizeIconClass } from "../utils/iconUtils";

export interface SearchSelectOption {
  label: string;
  value?: string;
  description?: string | number;
  icon?: string;
}
export interface SearchSelectInputProps<T = SearchSelectOption, K = string>
  extends Omit<InputProps, "onChange" | "value" | "ref"> {
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
   * Función que busca un elemento individual usando su valor (K).
   * Se usa cuando hay un valor por defecto que no está presente en las opciones cargadas.
   * Recibe el valor (K) y devuelve una Promise con el objeto completo (T) o undefined si no se encuentra.
   */
  onSingleSearchPromiseFn: (value: K) => Promise<T | undefined>;
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
  icon?: string;
  iconPosition?: "left" | "right";
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
  /**
   * Si es true, el input será de solo lectura. No se podrá modificar ni abrir el diálogo de selección.
   * Por defecto es false.
   */
  readOnly?: boolean;
}

const SearchSelectInputInner = React.forwardRef<
  HTMLInputElement,
  SearchSelectInputProps<any, any>
>(function SearchSelectInput(
  {
    value,
    onChange,
    onSearchPromiseFn,
    onSingleSearchPromiseFn,
    onSelectOption,
    dialogTitle = "Seleccione una opción",
    icon = "fa-search",
    iconPosition = "right",
    noResultsText = "Sin resultados",
    getOptionLabel,
    getOptionValue,
    getOptionDescription,
    renderOption,
    label,
    readOnly = false,
    ...inputProps
  },
  ref
) {
  const [inputText, setInputText] = useState("");
  const [dialogInputText, setDialogInputText] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dialogInputRef = useRef<HTMLInputElement | null>(null);
  const justClearedRef = useRef<boolean>(false);

  // Detectar modo register
  const isRegisterMode = useMemo(() => {
    return "name" in inputProps && inputProps.name !== undefined;
  }, [inputProps]);

  const fieldName =
    isRegisterMode && "name" in inputProps
      ? (inputProps.name as string)
      : undefined;

  // Obtener setValue del contexto del formulario
  // Para usar con register, el formulario debe estar dentro de FormProvider
  // useFormContext debe llamarse incondicionalmente (requisito de React Hooks)
  // Si no hay FormProvider y se usa en modo register, useFormContext lanzará un error
  // Para usar sin FormProvider, usar Controller en lugar de register
  const formContext = useFormContext();
  const setValue = formContext?.setValue;

  // Combinar refs
  const combinedRef = useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    },
    [ref]
  );

  const valueGetter = useCallback(
    (item: any) => {
      if (getOptionValue) return getOptionValue(item);
      return item["value"];
    },
    [getOptionValue]
  );

  const labelGetter = useCallback(
    (item: any) => {
      if (getOptionLabel) return getOptionLabel(item);
      return item["label"];
    },
    [getOptionLabel]
  );

  const descriptionGetter = useCallback(
    (item: any) => {
      if (getOptionDescription) return getOptionDescription(item);
      return item["description"];
    },
    [getOptionDescription]
  );

  const handleSearch = async (text: string) => {
    setIsLoading(true);
    setHasSearched(true);
    const options = await onSearchPromiseFn(text);
    if (options instanceof Array) {
      setOptions(options);
    } else {
      setOptions(options.list);
    }
    setIsLoading(false);
  };

  const handleSelect = (option: any) => {
    const selectedValue = valueGetter(option);
    setIsDialogOpen(false);

    // En modo register, setear el valor usando setValue o actualizando el input nativo
    if (isRegisterMode) {
      if (setValue && fieldName) {
        setValue(fieldName, selectedValue, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else if (inputRef.current) {
        const nativeInput = inputRef.current;
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;

        if (nativeInputValueSetter) {
          nativeInputValueSetter.call(nativeInput, String(selectedValue ?? ""));
        } else {
          nativeInput.value = String(selectedValue ?? "");
        }

        if (onChange) {
          const changeEvent = {
            target: nativeInput,
            currentTarget: nativeInput,
          } as React.ChangeEvent<HTMLInputElement>;
          (onChange as React.ChangeEventHandler<HTMLInputElement>)(changeEvent);
        }

        const inputEvent = new Event("input", {
          bubbles: true,
          cancelable: true,
        });
        nativeInput.dispatchEvent(inputEvent);
        const changeEventNative = new Event("change", {
          bubbles: true,
          cancelable: true,
        });
        nativeInput.dispatchEvent(changeEventNative);
      }
    } else {
      onChange?.(selectedValue as any);
    }

    onSelectOption?.(option, selectedValue);
    setInputText(labelGetter(option));
    setDialogInputText("");
    setOptions([]);
    setHasSearched(false);
  };

  // Función para sincronizar inputText con un valor
  const syncInputText = useCallback(
    (currentValue: any) => {
      if (
        currentValue === undefined ||
        currentValue === null ||
        currentValue === ""
      ) {
        setInputText("");
        return;
      }

      // Si currentValue es un objeto (T) y tenemos getOptionLabel, usar directamente
      if (
        typeof currentValue === "object" &&
        getOptionLabel &&
        !getOptionValue
      ) {
        try {
          const label = getOptionLabel(currentValue as any);
          setInputText(label);
          return;
        } catch {
          // Si falla, continuar con la búsqueda normal
        }
      }

      // Normalizar el value: si es un objeto (T), extraer el valor usando valueGetter
      let valueToSearch: any = currentValue;
      if (typeof currentValue === "object" && getOptionValue) {
        // Si currentValue es un objeto y tenemos getOptionValue, extraer el valor
        try {
          valueToSearch = getOptionValue(currentValue as any);
        } catch {
          // Si falla, no podemos usar onSingleSearchPromiseFn con un objeto
          // Intentar mostrar el label directamente si está disponible
          if (getOptionLabel) {
            try {
              setInputText(getOptionLabel(currentValue as any));
              return;
            } catch {
              setInputText(String(currentValue));
              return;
            }
          }
          setInputText(String(currentValue));
          return;
        }
      }

      // Buscar en las opciones actuales
      const matchingOption = options.find(
        (opt) =>
          valueGetter(opt) === valueToSearch ||
          valueGetter(opt) === currentValue
      );

      if (matchingOption) {
        setInputText(labelGetter(matchingOption));
        return;
      }

      // Si no se encuentra en las opciones actuales, usar onSingleSearchPromiseFn
      if (
        onSingleSearchPromiseFn &&
        valueToSearch !== undefined &&
        valueToSearch !== null
      ) {
        onSingleSearchPromiseFn(valueToSearch)
          .then((foundOption) => {
            if (foundOption) {
              setInputText(labelGetter(foundOption));
              // Agregar la opción a las opciones disponibles si no está ya
              setOptions((prev) => {
                if (
                  !prev.find(
                    (opt) => valueGetter(opt) === valueGetter(foundOption)
                  )
                ) {
                  return [...prev, foundOption];
                }
                return prev;
              });
            } else {
              // Si no se encuentra, mostrar el valor como string
              setInputText(String(valueToSearch));
            }
          })
          .catch((error) => {
            console.error("Error al buscar opción individual:", error);
            setInputText(String(valueToSearch));
          });
      } else {
        // Si no hay onSingleSearchPromiseFn, mostrar el valor como string
        setInputText(String(valueToSearch));
      }
    },
    [
      options,
      getOptionValue,
      getOptionLabel,
      onSingleSearchPromiseFn,
      valueGetter,
      labelGetter,
    ]
  );

  // Sincronizar inputText cuando cambia el value (modo controlado)
  useEffect(() => {
    if (!isRegisterMode) {
      syncInputText(value);
    }
  }, [value, isRegisterMode, syncInputText]);

  // Sincronizar inputText cuando cambia el valor del formulario (modo register)
  useEffect(() => {
    if (isRegisterMode && formContext && fieldName) {
      // Sincronizar inicialmente
      const formValue = formContext.watch(fieldName);
      syncInputText(formValue);

      // Suscribirse a cambios del formulario
      const subscription = formContext.watch((_data, { name }) => {
        // Solo sincronizar cuando cambia el campo específico
        if (name === fieldName) {
          const currentFormValue = formContext.watch(fieldName);
          syncInputText(currentFormValue);
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [isRegisterMode, formContext, fieldName, syncInputText]);

  // Hacer blur en el input del dialog cuando se abre
  useEffect(() => {
    if (isDialogOpen) {
      // El Dialog renderiza condicionalmente, así que necesitamos esperar a que el input esté montado
      // Usar requestAnimationFrame doble para asegurar que el DOM esté completamente renderizado
      const timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          dialogInputRef.current?.focus();
        });
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [isDialogOpen]);

  const getDialogBody = () => {
    return (
      <div>
        <div className="mb-2">
          <Input
            ref={dialogInputRef}
            value={dialogInputText}
            onChange={(e) => setDialogInputText(e.target.value)}
            icon={icon}
            iconPosition={iconPosition}
            onIconClick={() => handleSearch(dialogInputText)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearch(dialogInputText);
              }
            }}
          />
        </div>
        <div>
          <Loader isLoading={isLoading}>
            {!hasSearched || options.length > 0 ? (
              <ul className="space-y-1 max-h-96 overflow-y-auto">
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
                                className={`${normalizeIconClass(
                                  anyOption.icon
                                )} mt-0.5 text-[var(--color-text-muted)]`}
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
              </ul>
            ) : (
              <div className="px-3 py-8 text-center text-sm text-[var(--color-text-secondary)]">
                {noResultsText}
              </div>
            )}
          </Loader>
        </div>
      </div>
    );
  };

  // Detectar si hay un valor seleccionado
  const hasValue =
    inputText !== "" && inputText !== undefined && inputText !== null;

  // Función para limpiar el valor y abrir el dialog
  const handleIconClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (readOnly) return;

      event.preventDefault();
      event.stopPropagation();

      if (hasValue) {
        // Si hay valor, limpiarlo
        // Marcar que acabamos de limpiar para prevenir que onFocus abra el diálogo
        justClearedRef.current = true;

        if (isRegisterMode) {
          if (setValue && fieldName) {
            setValue(fieldName, undefined, {
              shouldValidate: true,
              shouldDirty: true,
            });
          } else if (inputRef.current) {
            const nativeInput = inputRef.current;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;

            if (nativeInputValueSetter) {
              nativeInputValueSetter.call(nativeInput, "");
            } else {
              nativeInput.value = "";
            }

            if (onChange) {
              const changeEvent = {
                target: nativeInput,
                currentTarget: nativeInput,
              } as React.ChangeEvent<HTMLInputElement>;
              (onChange as React.ChangeEventHandler<HTMLInputElement>)(
                changeEvent
              );
            }

            const inputEvent = new Event("input", {
              bubbles: true,
              cancelable: true,
            });
            nativeInput.dispatchEvent(inputEvent);
            const changeEventNative = new Event("change", {
              bubbles: true,
              cancelable: true,
            });
            nativeInput.dispatchEvent(changeEventNative);
          }
        } else {
          onChange?.(undefined as any);
        }
        setInputText("");
        setIsDialogOpen(false);

        // Resetear el flag después de un pequeño delay para permitir que otros eventos se procesen
        setTimeout(() => {
          justClearedRef.current = false;
        }, 100);
      } else {
        // Si no hay valor, abrir el dialog
        setIsDialogOpen(true);
      }
    },
    [hasValue, isRegisterMode, setValue, fieldName, onChange, readOnly]
  );

  // Determinar qué ícono mostrar: si hay valor, mostrar "fa-times", sino el ícono original
  // Si está en readOnly, no mostrar ningún ícono
  const displayIcon = readOnly ? undefined : hasValue ? "fa-times" : icon;
  const displayIconPosition = readOnly ? undefined : iconPosition;
  const displayOnIconClick = readOnly ? undefined : handleIconClick;

  return (
    <>
      <Input
        {...inputProps}
        ref={combinedRef}
        label={label}
        value={inputText}
        onChange={(e) => {
          if (readOnly) return;
          setInputText(e.target.value);
        }}
        onFocus={() => {
          if (!readOnly && !justClearedRef.current) {
            setIsDialogOpen(true);
          }
        }}
        icon={displayIcon}
        iconPosition={displayIconPosition}
        onIconClick={displayOnIconClick}
        readOnly={readOnly}
      />

      {!readOnly && (
        <Dialog
          isOpen={isDialogOpen}
          title={dialogTitle}
          footer={
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cerrar
            </Button>
          }
          onClose={() => setIsDialogOpen(false)}
        >
          {getDialogBody()}
        </Dialog>
      )}
    </>
  );
});

SearchSelectInputInner.displayName = "SearchSelectInput";

// Exportar con el cast genérico para permitir uso como <SearchSelectInput<T, K>>
export const SearchSelectInput = SearchSelectInputInner as <
  T = SearchSelectOption,
  K = string
>(
  props: SearchSelectInputProps<T, K> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => React.ReactElement;
