import React from "react";
import { useFormContext } from "react-hook-form";

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface RadioButtonGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "children"> {
  /**
   * Array de opciones para renderizar radios automáticamente
   */
  options: RadioOption[];
  /**
   * Valor seleccionado (controlado)
   */
  value?: string | number;
  /**
   * Callback cuando cambia la selección
   * Puede recibir un valor directo o un evento (para compatibilidad con react-hook-form)
   */
  onChange?:
    | ((value: string | number) => void)
    | React.ChangeEventHandler<HTMLInputElement>;
  /**
   * Posición del label para todas las opciones
   */
  labelPosition?: "left" | "right";
  /**
   * Tamaño de los radio buttons
   */
  size?: "sm" | "md" | "lg";
  /**
   * Mensaje de error a mostrar
   */
  error?: string;
  /**
   * Dirección del layout: vertical (columna) o horizontal (fila)
   */
  direction?: "vertical" | "horizontal";
  /**
   * Espaciado entre opciones
   */
  gap?: "sm" | "md" | "lg";
  /**
   * Nombre del campo (para react-hook-form)
   */
  name?: string;
  /**
   * Estado deshabilitado
   */
  disabled?: boolean;
  /**
   * Callback cuando pierde el foco
   * Puede recibir un evento (para compatibilidad con react-hook-form) o ser una función sin parámetros
   */
  onBlur?: (() => void) | React.FocusEventHandler<HTMLInputElement>;
  /**
   * Si es true, el radio group será de solo lectura. Las opciones no seleccionadas se verán deshabilitadas
   * y la seleccionada se verá igual, pero no se podrá cambiar el valor.
   * Por defecto es false.
   */
  readOnly?: boolean;
}

export const RadioButtonGroup = React.forwardRef<
  HTMLInputElement,
  RadioButtonGroupProps
>(
  (
    {
      options,
      value,
      onChange,
      labelPosition = "right",
      size = "md",
      error,
      direction = "vertical",
      gap = "md",
      className = "",
      name,
      disabled,
      onBlur,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    // useFormContext debe llamarse incondicionalmente (regla de hooks)
    // Si no hay FormProvider, esto lanzará un error
    // Para modo controlado sin FormProvider, necesitamos envolver los ejemplos
    // en un FormProvider mínimo o usar una detección diferente
    // Por ahora, llamamos useFormContext incondicionalmente
    const formContext = useFormContext();
    const setValue = formContext?.setValue;

    // Detectar si estamos en modo register
    // Modo register: formContext existe (hay FormProvider) Y name está definido
    // Modo controlado: no hay formContext (no hay FormProvider) o no hay name
    // Nota: Si no hay FormProvider, useFormContext lanzará error, pero esto es esperado
    // cuando se usa register. Para modo controlado, el componente puede funcionar
    // si simplemente no usamos el contexto cuando no está disponible
    const isRegisterMode = React.useMemo(() => {
      // Si no hay formContext, definitivamente es modo controlado
      if (!formContext) return false;
      // Si hay formContext pero no hay name, es modo controlado
      if (!name) return false;
      // Si hay formContext y name, es modo register
      return true;
    }, [formContext, name]);

    // Usar el valor proporcionado solo en modo controlado (no register)
    // En modo register, react-hook-form maneja el valor automáticamente
    const currentValue = !isRegisterMode ? value : undefined;

    // Input hidden para compatibilidad con react-hook-form
    const hiddenInputRef = React.useRef<HTMLInputElement | null>(null);

    // Combinar el ref del forwardRef (de register) con el ref interno del input hidden
    const combinedRef = React.useCallback(
      (node: HTMLInputElement | null) => {
        hiddenInputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Obtener el valor actual desde react-hook-form en modo register
    const watchValue = formContext?.watch(name || "");
    const actualValue = isRegisterMode
      ? watchValue !== undefined
        ? watchValue
        : currentValue
      : currentValue;

    const gapClasses = {
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
    };

    const directionClasses = {
      vertical: "flex-col",
      horizontal: "flex-row flex-wrap",
    };

    const containerClasses = `
      flex ${directionClasses[direction]} ${gapClasses[gap]}
      ${className}
    `;

    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const labelSizeClasses = {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    };

    const handleOptionClick = (optionValue: string | number) => {
      if (disabled || readOnly) return;

      const valueString = String(optionValue);

      if (isRegisterMode && name) {
        // En modo register, actualizar el input hidden y usar setValue
        if (hiddenInputRef.current) {
          const nativeInput = hiddenInputRef.current;
          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          )?.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(nativeInput, valueString);
          } else {
            nativeInput.value = valueString;
          }

          // Disparar evento change para react-hook-form
          const changeEvent = {
            target: nativeInput,
            currentTarget: nativeInput,
          } as React.ChangeEvent<HTMLInputElement>;

          if (onChange) {
            // En modo register, siempre usar formato de evento
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

        // También usar setValue directamente como respaldo
        if (setValue) {
          setValue(name, optionValue, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      } else {
        // Modo controlado - llamar onChange con valor directo
        if (onChange) {
          // Verificar si onChange es una función de valor directo o ChangeEventHandler
          // Intentar primero como función de valor directo (modo controlado típico)
          const onChangeAsValueFn = onChange as (
            value: string | number
          ) => void;
          // Si la función tiene la firma correcta, llamarla directamente
          if (typeof onChangeAsValueFn === "function") {
            onChangeAsValueFn(optionValue);
          } else {
            // Si no, intentar como ChangeEventHandler (por compatibilidad)
            const syntheticEvent = {
              target: { value: String(optionValue) },
              currentTarget: { value: String(optionValue) },
            } as any;
            (onChange as React.ChangeEventHandler<HTMLInputElement>)(
              syntheticEvent
            );
          }
        }
      }
    };

    const handleBlur = (event?: React.FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        if (isRegisterMode && hiddenInputRef.current) {
          // En modo register, crear un evento de blur para react-hook-form
          const blurEvent =
            event ||
            ({
              target: hiddenInputRef.current,
              currentTarget: hiddenInputRef.current,
            } as React.FocusEvent<HTMLInputElement>);
          (onBlur as React.FocusEventHandler<HTMLInputElement>)(blurEvent);
        } else {
          // En modo controlado, llamar como función sin parámetros
          (onBlur as () => void)();
        }
      }
      // También disparar blur en el input hidden si existe
      if (hiddenInputRef.current) {
        hiddenInputRef.current.blur();
      }
    };

    return (
      <div className="w-full">
        {/* Input hidden para compatibilidad con react-hook-form */}
        <input
          ref={combinedRef}
          type="hidden"
          name={name}
          value={actualValue !== undefined ? String(actualValue) : ""}
          readOnly
          tabIndex={-1}
          aria-hidden="true"
        />

        <div
          className={containerClasses}
          role="radiogroup"
          aria-label={name}
          aria-invalid={error ? "true" : "false"}
          aria-errormessage={error ? `${name}-error` : undefined}
          {...props}
        >
          {options.map((option, index) => {
            const optionValue = String(option.value);
            const isSelected =
              actualValue !== undefined && String(actualValue) === optionValue;
            // En modo readOnly, las opciones no seleccionadas se ven deshabilitadas
            const isDisabled = disabled || option.disabled || (readOnly && !isSelected);

            const radioId = `${name || "radio"}-${index}-${option.value}`;

            const radioClasses = `
              ${sizeClasses[size]}
              rounded-full border-2 transition-all duration-200
              flex items-center justify-center
              ${
                isSelected
                  ? "border-[var(--color-primary)]"
                  : "border-[var(--color-border-default)]"
              }
              ${isSelected ? "bg-[var(--color-primary)]" : "bg-transparent"}
              ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:border-[var(--color-primary)]"
              }
              focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-[var(--color-primary)]
            `;

            const labelClasses = `
              ${labelSizeClasses[size]}
              font-[var(--font-default)] select-none
              ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
              text-[var(--color-text-primary)]
            `;

            const optionContainerClasses = `
              flex items-center
              ${labelPosition === "left" ? "flex-row-reverse" : "flex-row"}
              ${gapClasses[gap]}
            `;

            return (
              <div
                key={radioId}
                className={optionContainerClasses}
                onClick={() => !isDisabled && handleOptionClick(option.value)}
                onBlur={
                  index === options.length - 1
                    ? () => {
                        handleBlur();
                      }
                    : undefined
                }
                role="radio"
                aria-checked={isSelected}
                aria-disabled={isDisabled}
                tabIndex={isDisabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (isDisabled || readOnly) return;
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleOptionClick(option.value);
                  }
                }}
              >
                <div className={radioClasses}>
                  {isSelected && (
                    <div
                      className="rounded-full bg-white"
                      style={{
                        width:
                          size === "sm"
                            ? "8px"
                            : size === "md"
                            ? "10px"
                            : "12px",
                        height:
                          size === "sm"
                            ? "8px"
                            : size === "md"
                            ? "10px"
                            : "12px",
                      }}
                    />
                  )}
                </div>
                {option.label && (
                  <label
                    htmlFor={radioId}
                    className={labelClasses}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!isDisabled) {
                        handleOptionClick(option.value);
                      }
                    }}
                  >
                    {option.label}
                  </label>
                )}
              </div>
            );
          })}
        </div>
        {error && (
          <p
            id={name ? `${name}-error` : undefined}
            className="mt-1 text-sm text-[var(--color-danger)] font-[var(--font-default)]"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

RadioButtonGroup.displayName = "RadioButtonGroup";
