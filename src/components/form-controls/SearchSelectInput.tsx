import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import type { InputProps } from "./Input";
import { Button } from "./Button";
import { Dialog } from "../utils/Dialog";
import type { PaginationInterface } from "./Pagination";

// Interfaz por defecto para mantener compatibilidad
export interface SearchSelectOption {
  label: string;
  value?: string;
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
    onSingleSearchPromiseFn,
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
  // Extraer onBlur de inputProps para manejarlo por separado
  const { onBlur: registerOnBlur, ...restInputProps } = inputProps;

  // Detectar si estamos en modo register: si viene 'name' de register, estamos en modo register
  // register siempre pasa 'name', 'onChange', 'onBlur', y 'ref'
  const isRegisterMode = React.useMemo(() => {
    // Si viene 'name' en inputProps, es porque viene de register
    return "name" in inputProps && inputProps.name !== undefined;
  }, [inputProps]);

  const fieldName =
    isRegisterMode && "name" in restInputProps
      ? (restInputProps.name as string)
      : undefined;

  // Obtener setValue del contexto del formulario
  // Para usar objetos complejos con register, el formulario debe estar dentro de FormProvider
  // useFormContext debe llamarse incondicionalmente (requisito de React Hooks)
  // Si no hay FormProvider y se usa en modo register, useFormContext lanzará un error
  // Para usar sin FormProvider, usar Controller en lugar de register
  const formContext = useFormContext();
  const setValue = formContext?.setValue;

  // Estado interno para el texto mostrado en el input (siempre string)
  const [internalDisplayValue, setInternalDisplayValue] =
    React.useState<string>("");
  const [displayValue, setDisplayValue] = React.useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [options, setOptions] = React.useState<T[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dialogSearchText, setDialogSearchText] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  // Guardar la última opción seleccionada para poder mostrar su label después
  const [lastSelectedOption, setLastSelectedOption] = React.useState<T | null>(
    null
  );
  // Ref para evitar múltiples búsquedas simultáneas del mismo valor
  const searchingValueRef = React.useRef<K | null>(null);

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

  // Función helper para sincronizar displayValue con el valor del formulario en modo register
  const syncDisplayValue = React.useCallback(() => {
    if (isRegisterMode) {
      // Si tenemos setValue, el valor del formulario es un objeto complejo (T | K)
      if (fieldName) {
        const formValue = formContext.watch(fieldName);
        if (formValue !== undefined && formValue !== null && formValue !== "") {
          // Primero verificar si la última opción seleccionada coincide
          if (lastSelectedOption) {
            const lastValue = valueGetter(lastSelectedOption);
            if (
              lastValue === formValue ||
              (typeof formValue === "object" &&
                formValue === lastSelectedOption)
            ) {
              setDisplayValue(labelGetter(lastSelectedOption));
              return true;
            }
          }

          // Buscar en las opciones ya cargadas
          const matchingOption = options.find(
            (opt) => valueGetter(opt) === formValue
          );
          if (matchingOption) {
            setDisplayValue(labelGetter(matchingOption));
            setLastSelectedOption(matchingOption);
            return true;
          }

          // Si no encontramos, intentar usar getOptionLabel si formValue es un objeto
          if (
            getOptionLabel &&
            typeof formValue === "object" &&
            formValue !== null
          ) {
            try {
              const label = getOptionLabel(formValue as T);
              if (label) {
                setDisplayValue(label);
                return true;
              }
            } catch {
              // Si falla, continuar
            }
          }

          // Si no encontramos nada y tenemos onSingleSearchPromiseFn, intentar buscar el elemento individual
          if (onSingleSearchPromiseFn) {
            // Si ya estamos buscando este valor, preservar el displayValue actual
            if (searchingValueRef.current === formValue) {
              // Ya estamos buscando este valor, preservar el displayValue actual
              return displayValue.trim() !== "" || lastSelectedOption !== null;
            }

            // Si ya tenemos lastSelectedOption con este valor, preservar el displayValue
            // Esto evita buscar de nuevo cuando el valor ya se cargó previamente
            if (lastSelectedOption) {
              const lastValue = valueGetter(lastSelectedOption);
              if (lastValue === formValue) {
                // Ya tenemos la opción correcta, asegurarnos de que esté en options y preservar displayValue
                if (!options.find((opt) => valueGetter(opt) === formValue)) {
                  setOptions((prev) => [...prev, lastSelectedOption]);
                }
                // El displayValue ya debería estar establecido, pero asegurémonos
                setDisplayValue(labelGetter(lastSelectedOption));
                return true;
              }
            }

            // Iniciar búsqueda solo si no hemos encontrado la opción todavía
            searchingValueRef.current = formValue as K;
            onSingleSearchPromiseFn(formValue as K)
              .then((foundOption) => {
                // Verificar que el valor sigue siendo el mismo (por si cambió mientras buscábamos)
                if (fieldName) {
                  const currentFormValue = formContext.watch(fieldName);
                  if (currentFormValue === formValue) {
                    if (foundOption) {
                      // Si se encontró la opción, actualizar el displayValue
                      const label = labelGetter(foundOption);
                      setDisplayValue(label);
                      setLastSelectedOption(foundOption);
                      // Agregar la opción a las opciones disponibles si no está ya
                      setOptions((prev) => {
                        if (
                          !prev.find(
                            (opt) =>
                              valueGetter(opt) === valueGetter(foundOption)
                          )
                        ) {
                          return [...prev, foundOption];
                        }
                        return prev;
                      });
                    } else {
                      // Si no se encontró (undefined), dejar displayValue vacío solo si realmente no hay valor
                      // Pero como formValue existe, no deberíamos limpiarlo aquí
                      // En realidad, si formValue existe pero no se encontró, dejar vacío es correcto
                      setDisplayValue("");
                      setLastSelectedOption(null);
                    }
                  }
                }
                searchingValueRef.current = null;
              })
              .catch((error) => {
                console.error("Error buscando elemento individual:", error);
                searchingValueRef.current = null;
              });
            // Retornar true si ya tenemos un displayValue para preservarlo mientras buscamos
            return displayValue.trim() !== "" || lastSelectedOption !== null;
          }

          // Si no encontramos nada y no hay onSingleSearchPromiseFn, pero ya tenemos un displayValue
          // (probablemente de una búsqueda anterior), preservarlo
          if (displayValue.trim() !== "" || lastSelectedOption !== null) {
            return true;
          }
          return false;
        } else {
          setDisplayValue("");
          setLastSelectedOption(null);
          return false;
        }
      } else if (inputRef.current) {
        // Fallback: leer del input nativo (valor string o serializado)
        const formValue = inputRef.current.value;
        if (formValue) {
          // Buscar en las opciones para mostrar el label
          const matchingOption = options.find(
            (opt) => String(valueGetter(opt)) === String(formValue)
          );
          if (matchingOption) {
            setDisplayValue(labelGetter(matchingOption));
          } else {
            setDisplayValue(formValue);
          }
          return true;
        } else {
          setDisplayValue("");
          setLastSelectedOption(null);
          return false;
        }
      }
    }
    return false;
  }, [
    isRegisterMode,
    fieldName,
    formContext,
    options,
    labelGetter,
    valueGetter,
    getOptionLabel,
    lastSelectedOption,
    onSingleSearchPromiseFn,
    displayValue,
  ]);

  // Sincronizar displayValue cuando value cambia externamente (modo Controller)
  React.useEffect(() => {
    if (!isRegisterMode) {
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "string") {
          setInternalDisplayValue(value);
        } else {
          // Si value es T | K, obtener el label usando getOptionLabel o la propiedad label
          // Si hay getOptionValue, el value puede ser K (no tiene label), así que necesitamos
          // buscar el objeto original en las opciones recientes o usar getOptionLabel si está disponible
          let displayValueSet = false;

          if (getOptionLabel) {
            // Si hay getOptionLabel, intentar usarlo (puede que value sea K, no T)
            // En ese caso, necesitamos buscar el objeto T correspondiente
            // Por ahora, intentamos usar getOptionLabel directamente
            try {
              setInternalDisplayValue(getOptionLabel(value as T));
              displayValueSet = true;
            } catch {
              // Si falla, value es probablemente K, buscar en las opciones
              const matchingOption = options.find(
                (opt) => valueGetter(opt) === value
              );
              if (matchingOption) {
                setInternalDisplayValue(labelGetter(matchingOption));
                displayValueSet = true;
              }
            }
          } else {
            // Intentar obtener la propiedad label directamente
            const anyValue = value as unknown as { label?: string };
            if (anyValue?.label) {
              setInternalDisplayValue(anyValue.label);
              displayValueSet = true;
            } else {
              // Si no tiene label, puede ser K, buscar en las opciones
              const matchingOption = options.find(
                (opt) => valueGetter(opt) === value
              );
              if (matchingOption) {
                setInternalDisplayValue(labelGetter(matchingOption));
                displayValueSet = true;
              }
            }
          }

          // Si no se encontró una opción coincidente, mostrar el valor como string
          // (útil cuando hay un valor por defecto pero las opciones aún no se han cargado)
          if (!displayValueSet) {
            setInternalDisplayValue(String(value));
          }
        }
      } else {
        // Resetear el estado interno cuando value es undefined (por ejemplo, después de un reset)
        setInternalDisplayValue("");
      }
    }
  }, [
    value,
    getOptionLabel,
    options,
    labelGetter,
    valueGetter,
    isRegisterMode,
  ]);

  // Sincronizar displayValue con el valor del formulario en modo register
  React.useEffect(() => {
    if (isRegisterMode) {
      let attempts = 0;
      const maxAttempts = 50;

      const trySync = (): boolean => {
        return syncDisplayValue();
      };

      if (trySync()) {
        return;
      }

      const intervalId = window.setInterval(() => {
        attempts++;
        if (trySync() || attempts >= maxAttempts) {
          clearInterval(intervalId);
        }
      }, 100);

      const timeouts: number[] = [];
      [0, 50, 100, 200, 500, 1000].forEach((delay) => {
        const timeoutId = window.setTimeout(() => {
          trySync();
        }, delay);
        timeouts.push(timeoutId);
      });

      return () => {
        clearInterval(intervalId);
        timeouts.forEach(clearTimeout);
      };
    }
  }, [isRegisterMode, syncDisplayValue]);

  // También sincronizar cuando cambia el valor del formulario
  React.useEffect(() => {
    if (isRegisterMode && fieldName) {
      const subscription = formContext.watch((_data, { name }) => {
        if (name === fieldName || !name) {
          // Cuando cambia el valor del formulario, sincronizar el displayValue
          syncDisplayValue();
        }
      });
      return () => subscription.unsubscribe();
    }
  }, [isRegisterMode, setValue, fieldName, formContext, syncDisplayValue]);

  // También escuchar cambios en el input nativo para sincronizar cuando cambie
  React.useEffect(() => {
    if (isRegisterMode && inputRef.current) {
      const input = inputRef.current;

      const handleInputSync = () => {
        syncDisplayValue();
      };

      input.addEventListener("input", handleInputSync);
      input.addEventListener("change", handleInputSync);

      const observer = new MutationObserver(() => {
        syncDisplayValue();
      });

      observer.observe(input, {
        attributes: true,
        attributeFilter: ["value"],
      });

      return () => {
        input.removeEventListener("input", handleInputSync);
        input.removeEventListener("change", handleInputSync);
        observer.disconnect();
      };
    }
  }, [isRegisterMode, syncDisplayValue]);

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
    // El input principal ahora es readonly, así que esto no debería llamarse
    // Pero lo mantenemos por compatibilidad
    const newValue = event.target.value;

    if (isRegisterMode) {
      setDisplayValue(newValue);
    } else {
      if (value === undefined || typeof value === "string") {
        setInternalDisplayValue(newValue);
      }
    }

    if (onChange) {
      const standardHandler =
        onChange as unknown as React.ChangeEventHandler<HTMLInputElement>;
      standardHandler(event);
    }
  };

  // Handler para cuando se hace foco en el input principal
  // Abre el dialog automáticamente
  const handleInputFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    // Abrir el dialog cuando se hace foco
    setIsDialogOpen(true);
    setDialogSearchText(inputValue.trim());
  };

  // Función para hacer búsqueda desde un valor dado
  const handleDialogSearchFromValue = React.useCallback(
    async (textToSearch: string) => {
      if (!textToSearch.trim()) return;

      setIsLoading(true);

      try {
        const result = await onSearchPromiseFn(textToSearch.trim());
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
    },
    [onSearchPromiseFn]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
    event
  ) => {
    // Cuando se presiona Enter, abrir el dialog
    if (event.key === "Enter") {
      event.preventDefault();
      setIsDialogOpen(true);
      setDialogSearchText(inputValue.trim());

      // Si hay texto en el input, hacer búsqueda automática
      if (inputValue.trim()) {
        handleDialogSearchFromValue(inputValue.trim());
      }
    }
  };

  const handleSelect = (option: T) => {
    const label = labelGetter(option);

    // Guardar la opción seleccionada para poder mostrar su label después
    setLastSelectedOption(option);

    // Agregar la opción a las opciones disponibles si no está ya
    if (!options.find((opt) => valueGetter(opt) === valueGetter(option))) {
      setOptions((prev) => [...prev, option]);
    }

    // Determinar el valor a asignar: opción completa (T) o valor extraído (K)
    const valueToAssign: T | K = getOptionValue ? valueGetter(option) : option;

    if (isRegisterMode) {
      // Actualizar el displayValue inmediatamente con el label
      setDisplayValue(label);

      // En modo register
      if (fieldName) {
        // Usar setValue para guardar el objeto completo directamente
        setValue(fieldName, valueToAssign, {
          shouldValidate: true,
          shouldDirty: true,
        });
      } else {
        // Fallback: actualizar el input nativo con el valor serializado
        if (inputRef.current) {
          const nativeInput = inputRef.current;
          const valueString =
            typeof valueToAssign === "object" && valueToAssign !== null
              ? JSON.stringify(valueToAssign)
              : String(valueToAssign);

          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          )?.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(nativeInput, valueString);
          } else {
            nativeInput.value = valueString;
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
      }
    } else {
      // Modo Controller o API personalizada
      setInternalDisplayValue(label);

      if (onChange) {
        // Intentar primero como onChange personalizado (acepta T | K directamente)
        const customHandler = onChange as unknown as
          | ((value: T | K) => void)
          | undefined;

        if (typeof customHandler === "function") {
          customHandler(valueToAssign);
        } else {
          // Si no es función personalizada, es ChangeEventHandler
          const serializedValue =
            typeof valueToAssign === "object" && valueToAssign !== null
              ? JSON.stringify(valueToAssign)
              : String(valueToAssign);

          const syntheticEvent = {
            target: {
              value: serializedValue,
              name: restInputProps.name || "",
            },
            currentTarget: {
              value: serializedValue,
              name: restInputProps.name || "",
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
    }

    onSelectOption?.(option, valueGetter(option));
    setIsDialogOpen(false);
  };

  const handleIconClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    // Si hay valor seleccionado, limpiarlo
    if (hasSelectedValue) {
      handleClear(event);
    } else {
      // Si no hay valor, abrir el dialog (similar a handleInputFocus)
      setIsDialogOpen(true);
      setDialogSearchText(inputValue.trim());

      // Si hay texto en el input, hacer búsqueda automática
      if (inputValue.trim()) {
        handleDialogSearchFromValue(inputValue.trim());
      }
    }
  };

  // Detectar si hay un valor seleccionado
  const hasSelectedValue = React.useMemo(() => {
    const currentDisplayValue = isRegisterMode
      ? displayValue
      : internalDisplayValue;
    const displayValueStr = isRegisterMode
      ? displayValue ?? ""
      : internalDisplayValue ?? "";
    return (
      (isRegisterMode
        ? displayValueStr.trim() !== ""
        : value !== undefined && value !== null && value !== "") &&
      typeof currentDisplayValue === "string" &&
      currentDisplayValue.trim() !== ""
    );
  }, [value, internalDisplayValue, displayValue, isRegisterMode]);

  // Función para limpiar el valor
  const handleClear = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (isRegisterMode) {
        setDisplayValue("");
        setLastSelectedOption(null);

        if (fieldName) {
          // Usar setValue para limpiar el valor
          setValue(fieldName, undefined as any, {
            shouldValidate: true,
            shouldDirty: true,
          });
        } else {
          // Fallback: limpiar el input nativo
          if (inputRef.current) {
            const nativeInput = inputRef.current;
            const setter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;
            setter?.call(nativeInput, "");

            const inputEvent = new Event("input", { bubbles: true });
            nativeInput.dispatchEvent(inputEvent);
            const changeEvent = new Event("change", { bubbles: true });
            nativeInput.dispatchEvent(changeEvent);
          }

          if (onChange && inputRef.current) {
            const changeEvent = {
              target: inputRef.current,
              currentTarget: inputRef.current,
            } as React.ChangeEvent<HTMLInputElement>;
            (onChange as React.ChangeEventHandler<HTMLInputElement>)(
              changeEvent
            );
          }
        }
      } else {
        setInternalDisplayValue("");
      }

      // Resetear el valor llamando a onChange
      if (!isRegisterMode && onChange) {
        const customHandler = onChange as unknown as
          | ((value: T | K) => void)
          | undefined;

        if (typeof customHandler === "function") {
          // Si hay getOptionValue, pasar undefined, sino pasar undefined también
          customHandler(undefined as unknown as T | K);
        } else {
          // Si es ChangeEventHandler, crear un evento sintético
          const syntheticEvent = {
            target: {
              value: "",
              name: inputProps.name || "",
            },
            currentTarget: {
              value: "",
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
    },
    [onChange, isRegisterMode, setValue, fieldName, inputProps.name]
  );

  // Determinar qué ícono mostrar: si hay valor seleccionado, mostrar "X", sino mostrar el ícono de búsqueda
  const displayIcon = hasSelectedValue
    ? "fa-times"
    : inputProps.icon || "fa-search";
  const displayIconPosition = searchButtonPosition;
  // handleIconClick ya maneja tanto limpiar como abrir el dialog
  const displayOnIconClick = handleIconClick;

  // Resetear el texto de búsqueda del dialog cuando se cierra
  // Y buscar la opción individual si el valor del control no está en las opciones cargadas
  React.useEffect(() => {
    if (!isDialogOpen) {
      setDialogSearchText("");

      // Cuando se cierra el dialog, verificar si necesitamos buscar la opción individual
      if (isRegisterMode && fieldName && onSingleSearchPromiseFn) {
        const formValue = formContext.watch(fieldName);

        if (formValue !== undefined && formValue !== null && formValue !== "") {
          // Verificar si ya tenemos la opción en lastSelectedOption o en options
          const hasOption =
            (lastSelectedOption &&
              valueGetter(lastSelectedOption) === formValue) ||
            options.some((opt) => valueGetter(opt) === formValue);

          // Si no tenemos la opción y no estamos buscando ya, buscarla
          if (!hasOption && searchingValueRef.current !== formValue) {
            searchingValueRef.current = formValue as K;
            onSingleSearchPromiseFn(formValue as K)
              .then((foundOption) => {
                // Verificar que el valor sigue siendo el mismo
                if (fieldName) {
                  const currentFormValue = formContext.watch(fieldName);
                  if (currentFormValue === formValue) {
                    if (foundOption) {
                      // Si se encontró la opción, actualizar el displayValue
                      const label = labelGetter(foundOption);
                      setDisplayValue(label);
                      setLastSelectedOption(foundOption);
                      // Agregar la opción a las opciones disponibles si no está ya
                      setOptions((prev) => {
                        if (
                          !prev.find(
                            (opt) =>
                              valueGetter(opt) === valueGetter(foundOption)
                          )
                        ) {
                          return [...prev, foundOption];
                        }
                        return prev;
                      });
                    }
                  }
                }
                searchingValueRef.current = null;
              })
              .catch((error) => {
                console.error(
                  "Error buscando elemento individual al cerrar dialog:",
                  error
                );
                searchingValueRef.current = null;
              });
          }
        }
      }
    }
  }, [
    isDialogOpen,
    isRegisterMode,
    setValue,
    fieldName,
    formContext,
    onSingleSearchPromiseFn,
    lastSelectedOption,
    options,
    valueGetter,
    labelGetter,
  ]);

  // Combinar refs: el ref del componente y el ref interno
  const combinedRef = React.useCallback(
    (node: HTMLInputElement | null) => {
      inputRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }

      // Cuando el ref se establece en modo register, sincronizar el displayValue
      if (isRegisterMode && node) {
        [0, 10, 50, 100, 200, 500].forEach((delay) => {
          setTimeout(() => {
            if (node && inputRef.current === node) {
              syncDisplayValue();
            }
          }, delay);
        });
      }
    },
    [ref, isRegisterMode, syncDisplayValue]
  );

  // Valor que se muestra en el input principal - completamente desacoplado del dialog
  // Solo muestra el label de la opción seleccionada
  const inputValue = React.useMemo(() => {
    if (isRegisterMode) {
      // En modo register, usar displayValue (que contiene el label de la opción seleccionada)
      // displayValue se sincroniza automáticamente con el valor del formulario
      return displayValue ?? "";
    } else {
      // Modo Controller o API personalizada
      if (value !== undefined && value !== null && value !== "") {
        // Si el valor es una opción completa (T), mostrar su label
        if (getOptionLabel && typeof value === "object") {
          try {
            return getOptionLabel(value as T);
          } catch {
            // Si falla, puede ser K, buscar en las opciones
            const matchingOption = options.find(
              (opt) => valueGetter(opt) === value
            );
            if (matchingOption) {
              return labelGetter(matchingOption);
            }
          }
        }

        // Si el valor es K (el valor extraído), buscar en las opciones
        const matchingOption = options.find(
          (opt) => valueGetter(opt) === value
        );
        if (matchingOption) {
          return labelGetter(matchingOption);
        }

        // Si no se encuentra, intentar mostrar el valor como string
        return String(value);
      }
      return internalDisplayValue;
    }
  }, [
    isRegisterMode,
    displayValue,
    value,
    internalDisplayValue,
    options,
    labelGetter,
    valueGetter,
    getOptionLabel,
  ]);

  return (
    <>
      <div className={`relative w-full ${className}`}>
        <Input
          {...restInputProps}
          ref={combinedRef}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={(e) => {
            // Llamar al onFocus original si existe
            if (restInputProps.onFocus) {
              restInputProps.onFocus(e);
            }
            handleInputFocus(e);
          }}
          onBlur={registerOnBlur}
          onKeyDown={handleKeyDown}
          size={size}
          icon={displayIcon}
          iconPosition={displayIconPosition}
          onIconClick={displayOnIconClick}
          readOnly
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
