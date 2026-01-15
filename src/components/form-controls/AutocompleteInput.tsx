import React from "react";
import { createPortal } from "react-dom";
import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import type { InputProps } from "./Input";
import { normalizeIconClass } from "../utils/iconUtils";

// Interfaz por defecto para mantener compatibilidad
export interface AutocompleteOption {
  label: string;
  value: string;
  description?: string | number;
  icon?: string;
}

export interface AutocompleteInputProps<T = AutocompleteOption, K = string>
  extends Omit<InputProps, "onChange" | "value" | "ref"> {
  options: T[];
  value?: string;
  /**
   * Valor de texto del input (controlado)
   * Puede ser un ChangeEventHandler (de register) o una función que recibe string (API personalizada)
   */
  onChange?:
    | React.ChangeEventHandler<HTMLInputElement>
    | ((value: string) => void);
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
  /**
   * Si es true, el input será de solo lectura. No se podrá modificar ni desplegar las opciones.
   * Por defecto es false.
   */
  readOnly?: boolean;
}

const AutocompleteInputInner = React.forwardRef<
  HTMLInputElement,
  AutocompleteInputProps<any, any>
>(
  (
    {
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
      readOnly = false,
      ...inputProps
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      value || ""
    );
    const [displayValue, setDisplayValue] = React.useState<string>("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);
    const [dropdownPosition, setDropdownPosition] = React.useState<{
      top: number;
      left: number;
      width: number;
    } | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const hiddenInputRef = React.useRef<HTMLInputElement | null>(null);
    const justClearedRef = React.useRef<boolean>(false);

    // Detectar si estamos en modo register: si viene 'name' de register, estamos en modo register
    // register siempre pasa 'name', 'onChange', 'onBlur', y 'ref'
    const isRegisterMode = React.useMemo(() => {
      // Si viene 'name' en inputProps, es porque viene de register
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

    const inputValue = isRegisterMode
      ? displayValue
      : value !== undefined
      ? value
      : internalValue;

    const labelGetter = React.useCallback(
      (item: any): string => {
        if (getOptionLabel) return getOptionLabel(item);
        const anyItem = item as unknown as { label?: string };
        return (anyItem.label ?? "").toString();
      },
      [getOptionLabel]
    );

    const valueGetter = React.useCallback(
      (item: any): any => {
        if (getOptionValue) return getOptionValue(item);
        const anyItem = item as unknown as { value?: any };
        return (anyItem.value as any) ?? (undefined as unknown as any);
      },
      [getOptionValue]
    );

    const descriptionGetter = React.useCallback(
      (item: any): string | number | undefined => {
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

    // Función helper para sincronizar displayValue con el valor del formulario
    const syncDisplayValue = React.useCallback(() => {
      if (isRegisterMode) {
        // En modo register, usamos el hiddenInputRef si existe, sino el inputRef (legacy/fallback)
        const targetInput = hiddenInputRef.current || inputRef.current;
        if (targetInput) {
          const formValue = targetInput.value;
          // Si el valor del formulario coincide con algún getOptionValue, mostrar su label
          const matchingOption = options.find(
            (option) => String(valueGetter(option)) === String(formValue)
          );
          if (matchingOption) {
            const label = labelGetter(matchingOption);
            setDisplayValue(label);
            return true; // Indica que se encontró y sincronizó un valor
          } else if (formValue) {
            // Si hay un valor pero no coincide, mostrarlo tal cual (o buscar por label si fuera el caso)
            setDisplayValue(formValue);
            return true;
          } else {
            setDisplayValue("");
            return false; // No hay valor aún
          }
        }
      }
      return false;
    }, [isRegisterMode, options, valueGetter, labelGetter]);

    // Sincronizar displayValue con el valor del formulario en modo register
    // Usar un intervalo que se ejecute hasta que encuentre el valor o hasta un máximo de intentos
    React.useEffect(() => {
      if (isRegisterMode) {
        let attempts = 0;
        const maxAttempts = 50; // Intentar durante ~5 segundos (50 * 100ms)

        // Función que intenta sincronizar y retorna true si encontró un valor
        const trySync = (): boolean => {
          const targetInput = hiddenInputRef.current || inputRef.current;
          if (targetInput) {
            const formValue = targetInput.value;
            if (formValue) {
              // Hay un valor, intentar sincronizar
              const matchingOption = options.find(
                (option) => String(valueGetter(option)) === String(formValue)
              );
              if (matchingOption) {
                const label = labelGetter(matchingOption);
                setDisplayValue(label);
                return true; // Valor encontrado y sincronizado
              } else {
                setDisplayValue(formValue);
                return true; // Valor encontrado pero no coincide con opciones
              }
            }
          }
          return false; // No hay valor aún
        };

        // Intentar inmediatamente
        if (trySync()) {
          return; // Ya encontramos el valor
        }

        // Si no encontramos el valor, usar un intervalo para seguir intentando
        const intervalId = window.setInterval(() => {
          attempts++;
          if (trySync() || attempts >= maxAttempts) {
            clearInterval(intervalId);
          }
        }, 100); // Intentar cada 100ms

        // También usar timeouts como fallback
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
    }, [isRegisterMode, options, valueGetter, labelGetter]);

    // También escuchar cambios en el input (hidden o visible) para sincronizar cuando cambie
    React.useEffect(() => {
      if (isRegisterMode) {
        // Observamos el hiddenInput si estamos en register mode y existe, o el input normal
        const targetElement = hiddenInputRef.current || inputRef.current;
        
        if (targetElement) {
          // Función para sincronizar cuando el input cambia
          const handleInputSync = () => {
             // Solo sincronizar si es el hidden input o si no tenemos hidden input
             if (targetElement === hiddenInputRef.current) {
                 syncDisplayValue();
             }
          };

          // Escuchar eventos de input y change (aunque en hidden input no suelen dispararse eventos de usuario)
          targetElement.addEventListener("input", handleInputSync);
          targetElement.addEventListener("change", handleInputSync);

          // También usar MutationObserver para detectar cambios en el atributo value (más fiable para hidden inputs cambiados por JS)
          const observer = new MutationObserver(() => {
            syncDisplayValue();
          });

          observer.observe(targetElement, {
            attributes: true,
            attributeFilter: ["value"],
          });

          return () => {
            targetElement.removeEventListener("input", handleInputSync);
            targetElement.removeEventListener("change", handleInputSync);
            observer.disconnect();
          };
        }
      }
    }, [isRegisterMode, syncDisplayValue]);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      if (readOnly) return;

      const newValue = event.target.value;

      if (isRegisterMode) {
        // En modo register, actualizar el displayValue para mostrar lo que el usuario escribe
        setDisplayValue(newValue);
      } else {
        // Modo API personalizada
        if (value === undefined) {
          setInternalValue(newValue);
        }
        if (onChange) {
          (onChange as (value: string) => void)(newValue);
        }
      }

      setIsOpen(true);
      setHighlightedIndex(-1);
    };

    const handleSelect = (option: any) => {
      if (readOnly) return;

      const label = labelGetter(option);
      const selectedValue = valueGetter(option);
      const valueString = String(selectedValue ?? "");

      if (isRegisterMode) {
        // En modo register, setear el valor usando setValue o actualizando el input nativo (hidden)
        if (setValue && fieldName) {
          setValue(fieldName, selectedValue, {
            shouldValidate: true,
            shouldDirty: true,
          });
          
          // Actualizar el input hidden con el ID
          if (hiddenInputRef.current) {
             hiddenInputRef.current.value = valueString;
          }
          
          // Actualizar displayValue con el label para mostrarlo visualmente en el input visible
          setDisplayValue(label);
        } else {
           // Fallback si no hay setValue (raro en registerMode) o para inputs manuales
           const targetInput = hiddenInputRef.current || inputRef.current;
           if (targetInput) {
             const nativeInput = targetInput;
             const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
               window.HTMLInputElement.prototype,
               "value"
             )?.set;

             if (nativeInputValueSetter) {
               nativeInputValueSetter.call(nativeInput, valueString);
             } else {
               nativeInput.value = valueString;
             }
             
             // Disparar eventos en el input que tiene el ref de register
             if (onChange) {
                const changeEvent = {
                  target: nativeInput,
                  currentTarget: nativeInput,
                } as unknown as React.ChangeEvent<HTMLInputElement>; // Cast agresivo necesario
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
           
           // Y actualizamos visualmente
           setDisplayValue(label);
        }
      } else {
        // Modo API personalizada - comportamiento original
        // Pasar el valor devuelto por getOptionValue, no el label
        if (onChange) {
          (onChange as (value: string) => void)(valueString);
        }
      }

      onSelectOption?.(option, selectedValue);
      setIsOpen(false);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (
      event
    ) => {
      if (readOnly) return;

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
        // Si hay una opción resaltada, seleccionarla
        if (
          highlightedIndex >= 0 &&
          highlightedIndex < filteredOptions.length
        ) {
          event.preventDefault();
          handleSelect(filteredOptions[highlightedIndex]);
        } else if (isOpen && filteredOptions.length > 0) {
          // Si no hay opción resaltada pero hay opciones disponibles, seleccionar la primera
          event.preventDefault();
          handleSelect(filteredOptions[0]);
        }
      } else if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    React.useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const isClickInsideContainer = containerRef.current?.contains(target);
        const isClickInsideDropdown = dropdownRef.current?.contains(target);

        if (!isClickInsideContainer && !isClickInsideDropdown) {
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

    React.useEffect(() => {
      if (!isRegisterMode) {
        // Solo para modo API personalizada
        if (value !== undefined) {
          // Si el value es el resultado de getOptionValue, buscar la opción correspondiente
          // y mostrar su label. Si no se encuentra, mostrar el value tal cual.
          const matchingOption = options.find(
            (option) => String(valueGetter(option)) === String(value)
          );
          if (matchingOption) {
            setInternalValue(labelGetter(matchingOption));
          } else {
            setInternalValue(value);
          }
        } else {
          // Resetear el estado interno cuando value es undefined (por ejemplo, después de un reset)
          setInternalValue("");
        }
      }
    }, [value, options, valueGetter, labelGetter, isRegisterMode]);

    const showDropdown =
      !readOnly && isOpen && (filteredOptions.length > 0 || noResultsText);

    // Verificar que estamos en el navegador
    // Inicializar isMounted de forma síncrona si es posible
    const [isMounted, setIsMounted] = React.useState(() => {
      return typeof document !== "undefined" && !!document.body;
    });

    React.useEffect(() => {
      if (!isMounted && typeof document !== "undefined" && document.body) {
        setIsMounted(true);
      }
    }, [isMounted]);

    // Actualizar posición del dropdown cuando se abre
    React.useEffect(() => {
      if (showDropdown && containerRef.current && isMounted) {
        const updatePosition = () => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setDropdownPosition({
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
      } else {
        setDropdownPosition(null);
      }
    }, [showDropdown, isMounted]);

    // Detectar si hay un valor seleccionado
    // Un valor está seleccionado si el value coincide con el getOptionValue de alguna opción
    const hasSelectedValue = React.useMemo(() => {
      if (isRegisterMode) {
        const targetInput = hiddenInputRef.current || inputRef.current;
        if (targetInput) {
            const formValue = targetInput.value;
            if (!formValue) return false;
            return options.some(
              (option) => String(valueGetter(option)) === String(formValue)
            );
        }
        return false;
      }
      if (value === undefined || value === null || value === "") return false;
      // Verificar si el value coincide con el getOptionValue de alguna opción
      return options.some(
        (option) => String(valueGetter(option)) === String(value)
      );
    }, [value, options, valueGetter, isRegisterMode]);

    // Función para limpiar el valor
    const handleClear = React.useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        if (readOnly) return;

        event.preventDefault();
        event.stopPropagation();

        // Marcar que acabamos de limpiar para prevenir que onFocus abra el diálogo
        justClearedRef.current = true;

        if (isRegisterMode) {
          // En modo register, limpiar el input nativo (hidden) y disparar eventos
          const targetInput = hiddenInputRef.current || inputRef.current;
          
          if (targetInput) {
            const nativeInput = targetInput;
            const setter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;
            setter?.call(nativeInput, "");

            // Disparar eventos para que react-hook-form lo capture
            const inputEvent = new Event("input", { bubbles: true });
            nativeInput.dispatchEvent(inputEvent);
            const changeEvent = new Event("change", { bubbles: true });
            nativeInput.dispatchEvent(changeEvent);
            
             // Llamar al onChange de register
            if (onChange) {
                const changeEventReact = {
                target: nativeInput,
                currentTarget: nativeInput,
                } as React.ChangeEvent<HTMLInputElement>;
                (onChange as React.ChangeEventHandler<HTMLInputElement>)(
                     changeEventReact
                );
            }
          }
          // Limpiar el displayValue
          setDisplayValue("");
        } else {
          // Modo API personalizada
          if (value === undefined) {
            setInternalValue("");
          }
          if (onChange) {
            (onChange as (value: string) => void)("");
          }
        }

        setIsOpen(false);

        // Resetear el flag después de un pequeño delay para permitir que otros eventos se procesen
        setTimeout(() => {
          justClearedRef.current = false;
        }, 100);
      },
      [value, onChange, isRegisterMode, readOnly]
    );

    // Determinar qué ícono mostrar: si hay valor seleccionado, mostrar "X", sino usar el ícono original
    // Si está en readOnly, no mostrar el ícono de limpiar ni permitir clicks
    const displayIcon = readOnly
      ? inputProps.icon
      : hasSelectedValue
      ? "fa-times"
      : inputProps.icon;
    const displayIconPosition = readOnly
      ? inputProps.iconPosition || "left"
      : hasSelectedValue
      ? "right"
      : inputProps.iconPosition || "left";
    const displayOnIconClick = readOnly
      ? undefined
      : hasSelectedValue
      ? handleClear
      : inputProps.onIconClick;

    // Refs separados: uno para el visible y otro para el hidden (registrado)
    const setHiddenRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        hiddenInputRef.current = node;
        // Solo pasar el ref externo al hidden input en modo register
        if (isRegisterMode) {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            
             // Sincronización inicial cuando el ref se monta
            if (node) {
               [0, 10, 50, 100, 200, 500].forEach((delay) => {
                setTimeout(() => {
                  if (node && hiddenInputRef.current === node) {
                    const formValue = node.value;
                    if (formValue) {
                      const matchingOption = options.find(
                        (option) =>
                          String(valueGetter(option)) === String(formValue)
                      );
                      if (matchingOption) {
                        setDisplayValue(labelGetter(matchingOption));
                      } else {
                        setDisplayValue(formValue);
                      }
                    }
                  }
                }, delay);
              });
            }
        }
      },
      [ref, isRegisterMode, options, valueGetter, labelGetter]
    );

    const setVisibleRef = React.useCallback(
        (node: HTMLInputElement | null) => {
            inputRef.current = node;
            // En modo NO register, pasamos el ref al input visible
            if (!isRegisterMode) {
                if (typeof ref === "function") {
                    ref(node);
                } else if (ref) {
                    ref.current = node;
                }
            }
        },
        [ref, isRegisterMode]
    );

    // Separar propiedades para input visible y hidden
    const { name: nameProp, ...visibleInputProps } = inputProps;

    return (
      <div ref={containerRef} className="relative w-full">
        {isRegisterMode && (
             <input 
                type="hidden" 
                name={nameProp as string} 
                ref={setHiddenRef} 
                defaultValue={value}
             />
        )}
        <Input
          {...visibleInputProps}
          name={isRegisterMode ? undefined : (nameProp as string)} // Evitar duplicar name en el visible si estamos en register
          ref={setVisibleRef} // Usar el ref visible
          value={inputValue}
          onChange={handleChange}
          onFocus={() => {
            if (!readOnly && !justClearedRef.current) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className={className}
          icon={displayIcon}
          iconPosition={displayIconPosition}
          onIconClick={displayOnIconClick}
          readOnly={readOnly}
        />

        {(() => {
          // Verificar de forma segura que document.body existe y es válido
          const bodyElement =
            typeof document !== "undefined" &&
            document.body &&
            document.body instanceof HTMLElement
              ? document.body
              : null;

          return (
            showDropdown &&
            dropdownPosition &&
            isMounted &&
            bodyElement &&
            createPortal(
              <div
                ref={dropdownRef}
                className="fixed z-[2001] min-w-full w-max rounded-md border border-[var(--color-border-default)] 
          bg-[var(--color-bg-default)] shadow-[var(--shadow-lg)] max-h-60 overflow-auto"
                style={{
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  minWidth: `${dropdownPosition.width}px`,
                }}
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
                                  className={`${normalizeIconClass(
                                    anyOption.icon
                                  )} mt-0.5 text-[var(--color-text-muted)] flex-shrink-0`}
                                />
                              )}
                              <div className="flex flex-col min-w-0">
                                <span className="font-[var(--font-default)] whitespace-nowrap">
                                  {label}
                                </span>
                                {description !== undefined &&
                                  description !== null && (
                                    <span className="text-xs text-[var(--color-text-secondary)] break-words">
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
              </div>,
              bodyElement
            )
          );
        })()}
      </div>
    );
  }
);

// Asignar displayName antes del cast genérico
AutocompleteInputInner.displayName = "AutocompleteInput";

// Exportar con el cast genérico
export const AutocompleteInput = AutocompleteInputInner as <
  T = AutocompleteOption,
  K = string
>(
  props: AutocompleteInputProps<T, K> & {
    ref?: React.ForwardedRef<HTMLInputElement>;
  }
) => React.ReactElement;
