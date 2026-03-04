import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Input } from "./Input";
import type { InputProps } from "./Input";
import { useFormContext } from "react-hook-form";

/**
 * Props para el componente CurrencyInput.
 * Extiende todas las props de Input excepto value y onChange, que se manejan de forma numérica.
 */
export interface CurrencyInputProps extends Omit<
  InputProps,
  "value" | "onChange" | "type"
> {
  /**
   * Valor numérico del input.
   */
  value?: number | null;
  /**
   * Callback que se ejecuta al perder el foco, devolviendo el valor numérico actualizado.
   * Si se usa con react-hook-form (register), este callback será el de register.
   */
  onChange?: (value: any) => void;
}

/**
 * Componente de entrada para valores monetarios.
 * Muestra el valor formateado con separadores de miles (puntos) y decimales (comas).
 * Al recibir el foco, quita los puntos para facilitar la edición.
 */
export const CurrencyInput = React.forwardRef<
  HTMLInputElement,
  CurrencyInputProps
>(({ value, onChange, onFocus, onBlur, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");

  // Detectar si estamos en modo register (si viene 'name')
  const isRegisterMode = useMemo(() => {
    return "name" in props && props.name !== undefined;
  }, [props]);

  const fieldName = (props as any).name;

  // Obtener el contexto de react-hook-form si existe
  const formContext = useFormContext();
  const setValue = formContext?.setValue;

  // Formateador para mostrar el valor final (con puntos y comas)
  const formatToCurrency = useCallback(
    (val: number | null | undefined): string => {
      if (val === null || val === undefined || isNaN(val)) return "";
      return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(val);
    },
    [],
  );

  // Formateador para cuando tiene el foco (sin puntos de miles)
  const formatToFocus = useCallback(
    (val: number | null | undefined): string => {
      if (val === null || val === undefined || isNaN(val)) return "";
      return new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
      }).format(val);
    },
    [],
  );

  // Función para parsear el string de vuelta a número
  const parseToNumeric = useCallback((val: string): number | null => {
    if (!val || val.trim() === "") return null;
    // Reemplazamos la coma por punto para que parseFloat funcione correctamente
    const cleanValue = val.replace(/\./g, "").replace(",", ".");
    const numeric = parseFloat(cleanValue);
    return isNaN(numeric) ? null : numeric;
  }, []);

  // Valor actual a usar (del prop value o del formulario)
  const numericValue = useMemo(() => {
    if (isRegisterMode && formContext && fieldName) {
      return formContext.watch(fieldName);
    }
    return value;
  }, [isRegisterMode, formContext, fieldName, value]);

  // Sincronizar el valor externo con el estado interno cuando no hay foco
  useEffect(() => {
    if (!isFocused) {
      setDisplayValue(formatToCurrency(numericValue));
    }
  }, [numericValue, isFocused, formatToCurrency]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Al ganar foco, mostramos el valor sin separadores de miles
    setDisplayValue(formatToFocus(numericValue));
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    const numericVal = parseToNumeric(displayValue);

    // Notificamos el cambio
    if (isRegisterMode && setValue && fieldName) {
      // Si estamos en modo register con FormProvider, usamos setValue para guardar el número
      setValue(fieldName, numericVal, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } else if (onChange) {
      // Si no, llamamos al onChange tradicional
      onChange(numericVal);
    }

    // Formateamos el valor final para mostrarlo al perder el foco
    setDisplayValue(formatToCurrency(numericVal));
    if (onBlur) onBlur(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;

    // Solo permitimos números y una sola coma
    // Si el usuario presiona punto, lo convertimos a coma para facilitar la entrada
    val = val.replace(/\./g, ",");

    // Limpiamos caracteres no permitidos
    val = val.replace(/[^0-9,]/g, "");

    // Aseguramos que solo haya una coma
    const parts = val.split(",");
    if (parts.length > 2) {
      val = parts[0] + "," + parts.slice(1).join("");
    }

    setDisplayValue(val);
  };

  return (
    <Input
      {...props}
      ref={ref}
      type="text"
      value={displayValue}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});

CurrencyInput.displayName = "CurrencyInput";
