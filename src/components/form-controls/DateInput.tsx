import React from "react";
import { createPortal } from "react-dom";
import dayjs, { type Dayjs } from "dayjs";
import { useFormContext } from "react-hook-form";
import { Input } from "./Input";
import { DatePicker } from "./DatePicker";
import type { InputProps } from "./Input";
import type { DatePickerProps } from "./DatePicker";

export type DateInputFormat = "dd/mm/yyyy" | "mm/dd/yyyy";

export interface DateInputProps
  extends Omit<InputProps, "type" | "value" | "onChange" | "ref"> {
  /**
   * Valor de la fecha.
   * En modo register con FormProvider: Dayjs | null (se guarda como Dayjs en el formulario)
   * En modo register sin FormProvider: string ISO (se guarda como ISO string, se puede parsear a Dayjs)
   * En modo Controller: Dayjs | null
   */
  value?: Dayjs | null | string;
  /**
   * Callback cuando cambia la fecha.
   * En modo register: ChangeEventHandler (de register)
   * En modo Controller: (date: Dayjs | null) => void
   *
   * NOTA: Para usar Dayjs directamente con register, el formulario debe estar envuelto en FormProvider.
   * Sin FormProvider, el valor se guarda como ISO string y se puede parsear de vuelta a Dayjs usando normalizeToDayjs.
   */
  onChange?:
    | ((date: Dayjs | null) => void)
    | React.ChangeEventHandler<HTMLInputElement>;
  format?: DateInputFormat;
  datePickerProps?: Omit<DatePickerProps, "value" | "onChange">;
  /**
   * Si es true, el input será de solo lectura. No se podrá modificar ni desplegar el DatePicker.
   * Por defecto es false.
   */
  readOnly?: boolean;
}

const pad = (value: number) => value.toString().padStart(2, "0");

const isDayjs = (value: unknown): value is Dayjs => {
  return (
    value !== null &&
    value !== undefined &&
    typeof value === "object" &&
    "isValid" in value &&
    typeof (value as any).isValid === "function"
  );
};

const normalizeToDayjs = (value: unknown): Dayjs | null => {
  if (value === null || value === undefined) return null;
  if (isDayjs(value)) return value;
  // Si no es Dayjs, intentar convertirlo
  if (
    typeof value === "string" ||
    typeof value === "number" ||
    value instanceof Date
  ) {
    const d = dayjs(value);
    return d.isValid() ? d : null;
  }
  return null;
};

const formatDateToString = (
  date: Dayjs | null | unknown,
  format: DateInputFormat
) => {
  const normalized = normalizeToDayjs(date);
  if (!normalized || !normalized.isValid()) return "";
  const day = pad(normalized.date());
  const month = pad(normalized.month() + 1);
  const year = normalized.year().toString();

  if (format === "mm/dd/yyyy") {
    return `${month}/${day}/${year}`;
  }

  return `${day}/${month}/${year}`;
};

const parseDateFromString = (
  value: string,
  format: DateInputFormat
): Dayjs | null => {
  // Primero intentar parsear como números sin separadores (ej: 11102025)
  const numbersOnly = value.replace(/\D/g, "");
  if (numbersOnly.length === 8) {
    // Formato: ddmmyyyy o mmddyyyy
    const p1 = parseInt(numbersOnly.substring(0, 2), 10);
    const p2 = parseInt(numbersOnly.substring(2, 4), 10);
    const p3 = parseInt(numbersOnly.substring(4, 8), 10);

    const day = format === "mm/dd/yyyy" ? p2 : p1;
    const month = format === "mm/dd/yyyy" ? p1 : p2;
    const year = p3;

    if (
      !isNaN(day) &&
      !isNaN(month) &&
      !isNaN(year) &&
      day >= 1 &&
      month >= 1 &&
      month <= 12 &&
      year >= 1000 &&
      year <= 9999
    ) {
      const date = dayjs()
        .year(year)
        .month(month - 1)
        .date(day);
      if (
        date.isValid() &&
        date.year() === year &&
        date.month() === month - 1 &&
        date.date() === day
      ) {
        return date.startOf("day");
      }
    }
  }

  // Si no funciona, intentar parsear con separadores
  const parts = value.split(/[/\-.]/).map((p) => p.trim());
  if (parts.length !== 3) return null;

  const [p1, p2, p3] = parts;
  const day = format === "mm/dd/yyyy" ? parseInt(p2, 10) : parseInt(p1, 10);
  const month = format === "mm/dd/yyyy" ? parseInt(p1, 10) : parseInt(p2, 10);
  const year = parseInt(p3, 10);

  if (
    isNaN(day) ||
    isNaN(month) ||
    isNaN(year) ||
    day < 1 ||
    month < 1 ||
    month > 12
  ) {
    return null;
  }

  const date = dayjs()
    .year(year)
    .month(month - 1)
    .date(day);
  if (
    !date.isValid() ||
    date.year() !== year ||
    date.month() !== month - 1 ||
    date.date() !== day
  ) {
    return null;
  }

  return date.startOf("day");
};

export const DateInput = React.forwardRef<HTMLInputElement, DateInputProps>(
  (
    {
      value,
      onChange,
      format = "dd/mm/yyyy",
      datePickerProps,
      icon = "fa-calendar-alt",
      iconPosition = "right",
      className = "",
      readOnly = false,
      ...inputProps
    },
    ref
  ) => {
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
    // useFormContext debe llamarse incondicionalmente (requisito de React Hooks)
    // Si no hay FormProvider, esto lanzará un error
    // Para usar sin FormProvider, el componente guardará el valor Dayjs serializado (ISO string)
    // en el input, y se puede parsear de vuelta a Dayjs cuando se lee el valor del formulario
    const formContext = useFormContext();
    const setValue = formContext?.setValue;

    const [internalDate, setInternalDate] = React.useState<Dayjs | null>(null);
    const [displayValue, setDisplayValue] = React.useState<string>("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [pickerPosition, setPickerPosition] = React.useState<{
      top: number;
      left: number;
      width: number;
    } | null>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const pickerRef = React.useRef<HTMLDivElement | null>(null);
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const hiddenInputRef = React.useRef<HTMLInputElement | null>(null);
    const isTypingRef = React.useRef(false);
    const lastDayjsValueRef = React.useRef<Dayjs | null>(null);

    // Función helper para sincronizar displayValue con el valor del formulario en modo register
    const syncDisplayValue = React.useCallback(() => {
      if (isRegisterMode && inputRef.current) {
        const formValue = inputRef.current.value;
        if (formValue) {
          // Parsear el string de fecha del formulario
          const parsed = parseDateFromString(formValue, format);
          if (parsed) {
            setDisplayValue(formatDateToString(parsed, format));
            setInternalDate(parsed);
            return true;
          } else {
            // Si hay un valor pero no se puede parsear, mostrarlo tal cual
            setDisplayValue(formValue);
            return true;
          }
        } else {
          setDisplayValue("");
          setInternalDate(null);
          return false;
        }
      }
      return false;
    }, [isRegisterMode, format]);

    // Sincronizar displayValue con el valor del formulario en modo register
    React.useEffect(() => {
      if (isRegisterMode) {
        let attempts = 0;
        const maxAttempts = 50; // Intentar durante ~5 segundos (50 * 100ms)

        const trySync = (): boolean => {
          if (inputRef.current) {
            const formValue = inputRef.current.value;
            if (formValue) {
              const parsed = parseDateFromString(formValue, format);
              if (parsed) {
                setDisplayValue(formatDateToString(parsed, format));
                setInternalDate(parsed);
                return true;
              } else {
                setDisplayValue(formValue);
                return true;
              }
            } else {
              setDisplayValue("");
              setInternalDate(null);
            }
          }
          return false;
        };

        // Intentar inmediatamente
        if (trySync()) {
          return;
        }

        // Si no encontramos el valor, usar un intervalo
        const intervalId = window.setInterval(() => {
          attempts++;
          if (trySync() || attempts >= maxAttempts) {
            clearInterval(intervalId);
          }
        }, 100);

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
    }, [isRegisterMode, format]);

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

    // Sincronizar con el valor del formulario
    React.useEffect(() => {
      if (!isTypingRef.current) {
        if (isRegisterMode) {
          // En modo register con setValue, leer del formulario
          if (formContext && fieldName) {
            const formValue = formContext.watch(fieldName);
            const normalized = normalizeToDayjs(formValue);
            setInternalDate(normalized);
            if (normalized) {
              setDisplayValue(formatDateToString(normalized, format));
            } else {
              setDisplayValue("");
            }
          }
          // Si no hay setValue, syncDisplayValue se encarga de sincronizar desde el input nativo
        } else {
          // Modo Controller, sincronizar con el valor Dayjs
          const normalized = normalizeToDayjs(value);
          setInternalDate(normalized);
          if (normalized) {
            setDisplayValue(formatDateToString(normalized, format));
          } else {
            setDisplayValue("");
          }
        }
      }
    }, [value, format, isRegisterMode, setValue, fieldName, formContext]);

    // Determinar el valor a mostrar en el input
    const inputValue = isRegisterMode ? displayValue : displayValue;

    const handleDateChange = (date: Dayjs | null) => {
      if (readOnly) return;

      const dateString = formatDateToString(date, format);

      if (isRegisterMode) {
        // En modo register, usar setValue si está disponible para guardar el objeto Dayjs
        // Si no está disponible, guardar como string (comportamiento por defecto)
        if (setValue && fieldName) {
          // Usar setValue para guardar el objeto Dayjs directamente
          setValue(fieldName, date, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });

          // Actualizar el displayValue y el estado interno
          setDisplayValue(dateString);
          setInternalDate(date);

          // Actualizar el input nativo con el valor visual (string) para mantener la sincronización
          // Esto es solo para mostrar el valor correcto en el input
          // El valor real (Dayjs) ya está guardado en el formulario vía setValue
          if (inputRef.current) {
            const nativeInput = inputRef.current;
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;

            if (nativeInputValueSetter) {
              nativeInputValueSetter.call(nativeInput, dateString);
            } else {
              nativeInput.value = dateString;
            }
          }
        } else {
          // Sin FormProvider: guardar el valor Dayjs serializado (ISO string) en el input
          // react-hook-form leerá este valor y se puede parsear de vuelta a Dayjs cuando se lee
          lastDayjsValueRef.current = date;

          // Guardar el valor Dayjs serializado (como ISO string)
          const dayjsIsoString = date ? date.toISOString() : "";

          // Actualizar el input visible con el valor Dayjs serializado
          // Esto es lo que react-hook-form leerá y guardará
          if (inputRef.current) {
            const nativeInput = inputRef.current;

            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
              window.HTMLInputElement.prototype,
              "value"
            )?.set;

            if (nativeInputValueSetter) {
              nativeInputValueSetter.call(nativeInput, dayjsIsoString);
            } else {
              nativeInput.value = dayjsIsoString;
            }

            // Llamar al onChange de register con el valor Dayjs serializado
            if (onChange) {
              const changeEvent = {
                target: nativeInput,
                currentTarget: nativeInput,
              } as React.ChangeEvent<HTMLInputElement>;

              (onChange as React.ChangeEventHandler<HTMLInputElement>)(
                changeEvent
              );
            }

            // Disparar eventos nativos
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

          // Actualizar el displayValue con el string formateado para mostrar al usuario
          // Aunque el input tiene el ISO string, mostramos el formato legible
          setDisplayValue(dateString);
          setInternalDate(date);
        }
      } else {
        // Modo Controller - comportamiento original
        setInternalDate(date);
        setDisplayValue(dateString);

        if (onChange) {
          const dayjsHandler = onChange as unknown as (
            date: Dayjs | null
          ) => void;
          dayjsHandler(date);
        }
      }

      setIsOpen(false);
    };

    const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
      event
    ) => {
      if (readOnly) return;

      const newValue = event.target.value;
      isTypingRef.current = true;

      if (isRegisterMode) {
        // En modo register, actualizar el displayValue mientras el usuario escribe
        setDisplayValue(newValue);
      } else {
        // Modo Controller
        setDisplayValue(newValue);
      }
    };

    const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (
      event
    ) => {
      isTypingRef.current = false;

      const newValue = event.target.value.trim();

      if (isRegisterMode) {
        // En modo register, validar y actualizar el input nativo
        if (!newValue) {
          // Limpiar el valor
          if (setValue && fieldName) {
            // Si tenemos setValue, usar setValue para limpiar el valor como null
            setValue(fieldName, null as any, {
              shouldValidate: true,
              shouldDirty: true,
              shouldTouch: true,
            });
            setDisplayValue("");
            setInternalDate(null);
          } else {
            // Fallback: actualizar el input nativo
            if (inputRef.current) {
              const nativeInput = inputRef.current;
              const setter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype,
                "value"
              )?.set;
              setter?.call(nativeInput, "");

              if (onChange) {
                const changeEvent = {
                  target: nativeInput,
                  currentTarget: nativeInput,
                } as React.ChangeEvent<HTMLInputElement>;
                (onChange as React.ChangeEventHandler<HTMLInputElement>)(
                  changeEvent
                );
              }

              const inputEvent = new Event("input", { bubbles: true });
              nativeInput.dispatchEvent(inputEvent);
              const changeEventNative = new Event("change", { bubbles: true });
              nativeInput.dispatchEvent(changeEventNative);
            }
            setDisplayValue("");
            setInternalDate(null);
          }
        } else {
          const parsed = parseDateFromString(newValue, format);
          if (parsed) {
            // handleDateChange ya usa setValue si está disponible
            handleDateChange(parsed);

            // Si usamos setValue, asegurarse de que el valor Dayjs se mantenga
            // después del blur, ya que registerOnBlur puede causar que react-hook-form
            // lea el valor del input como string
            if (setValue && fieldName && registerOnBlur) {
              // Guardar el valor Dayjs antes de llamar a registerOnBlur
              const dayjsValue = parsed;

              // Llamar al onBlur de register
              registerOnBlur(event);

              // Usar setTimeout para asegurarse de que esto se ejecuta después de registerOnBlur
              // y restaurar el valor Dayjs si react-hook-form lo sobrescribió con un string
              setTimeout(() => {
                const currentValue = formContext?.watch(fieldName);
                // Si el valor actual es un string en lugar de Dayjs, restaurarlo
                if (currentValue && typeof currentValue === "string") {
                  setValue(fieldName, dayjsValue, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                  });
                }
              }, 0);

              // No llamar a registerOnBlur más abajo ya que ya lo llamamos aquí
              return;
            }
          } else {
            // Si no es válida, restaurar el valor anterior
            const previousValue = inputRef.current?.value || "";
            setDisplayValue(previousValue);
          }
        }

        // Llamar al onBlur de register si existe
        // Solo se llama aquí si no usamos setValue o si no había un valor válido
        if (registerOnBlur) {
          registerOnBlur(event);
        }
      } else {
        // Modo Controller
        if (!newValue) {
          handleDateChange(null);
        } else {
          const parsed = parseDateFromString(newValue, format);
          if (parsed) {
            handleDateChange(parsed);
          } else {
            // Si no es válida, restaurar el valor anterior formateado
            setDisplayValue(formatDateToString(internalDate, format));
          }
        }
      }
    };

    const handleIconClick: React.MouseEventHandler<HTMLElement> = (event) => {
      if (readOnly) return;
      event.preventDefault();
      setIsOpen((prev) => !prev);
    };

    React.useEffect(() => {
      if (!isOpen) return;

      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Node;
        const isClickInsideContainer = containerRef.current?.contains(target);
        const isClickInsidePicker = pickerRef.current?.contains(target);

        if (!isClickInsideContainer && !isClickInsidePicker) {
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
                const formValue = node.value;
                if (formValue) {
                  const parsed = parseDateFromString(formValue, format);
                  if (parsed) {
                    setDisplayValue(formatDateToString(parsed, format));
                    setInternalDate(parsed);
                  } else {
                    setDisplayValue(formValue);
                  }
                }
              }
            }, delay);
          });
        }
      },
      [ref, isRegisterMode, format]
    );

    const datePickerInitialViewDate =
      internalDate ?? datePickerProps?.initialViewDate ?? dayjs();

    // Ocultar el ícono cuando está en modo readOnly
    const displayIcon = readOnly ? undefined : icon;
    const displayIconPosition = readOnly ? undefined : iconPosition;
    const displayOnIconClick = readOnly ? undefined : handleIconClick;

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

    // Actualizar posición del picker cuando se abre
    React.useEffect(() => {
      if (isOpen && !readOnly && containerRef.current && isMounted) {
        const updatePosition = () => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setPickerPosition({
              top: rect.bottom + window.scrollY + 4,
              left: rect.right + window.scrollX - 280, // Alinear a la derecha
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
        setPickerPosition(null);
      }
    }, [isOpen, readOnly, isMounted]);

    return (
      <div ref={containerRef} className="relative w-full">
        {/* Input hidden para almacenar el valor Dayjs serializado cuando no hay FormProvider */}
        {isRegisterMode && !setValue && fieldName && (
          <input
            ref={hiddenInputRef}
            type="hidden"
            name={fieldName}
            value={
              lastDayjsValueRef.current
                ? lastDayjsValueRef.current.toISOString()
                : ""
            }
          />
        )}
        <Input
          {...restInputProps}
          ref={combinedRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          icon={displayIcon}
          iconPosition={displayIconPosition}
          onIconClick={displayOnIconClick}
          placeholder={
            restInputProps.placeholder ??
            (format === "mm/dd/yyyy" ? "mm/dd/yyyy" : "dd/mm/yyyy")
          }
          className={className}
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
            !readOnly &&
            isOpen &&
            pickerPosition &&
            isMounted &&
            bodyElement &&
            createPortal(
              <div
                ref={pickerRef}
                className="fixed z-[2001] min-w-[280px] w-max"
                style={{
                  top: `${pickerPosition.top}px`,
                  left: `${pickerPosition.left}px`,
                }}
              >
                <DatePicker
                  {...datePickerProps}
                  value={internalDate ?? datePickerInitialViewDate}
                  onChange={(date) => handleDateChange(date)}
                />
              </div>,
              bodyElement
            )
          );
        })()}
      </div>
    );
  }
);

DateInput.displayName = "DateInput";
