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
>(({ value, onChange, onFocus, onBlur, onPaste, ...props }, ref) => {
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

  // Parsea un valor pegado que puede venir formateado desde otra aplicación.
  // Detecta el separador decimal en base a la posición de puntos y comas,
  // tratando el otro separador como separador de miles.
  // Ej: "10.500,25" -> 10500.25 | "10,500.25" -> 10500.25 | "10500,25" -> 10500.25
  const parsePastedNumber = useCallback((raw: string): number | null => {
    let s = raw.trim().replace(/[^0-9.,-]/g, "");
    if (!s) return null;

    const lastComma = s.lastIndexOf(",");
    const lastDot = s.lastIndexOf(".");

    let decimalSep: "" | "," | "." = "";
    if (lastComma > -1 && lastDot > -1) {
      // Ambos presentes: el que aparece más a la derecha es el decimal
      decimalSep = lastComma > lastDot ? "," : ".";
    } else if (lastComma > -1) {
      decimalSep = ",";
    } else if (lastDot > -1) {
      // Solo puntos: un único punto seguido de 1-2 dígitos es decimal,
      // en cualquier otro caso se interpretan como separadores de miles (es-AR)
      const onlyOneDot = s.indexOf(".") === lastDot;
      const digitsAfter = s.length - lastDot - 1;
      decimalSep = onlyOneDot && digitsAfter > 0 && digitsAfter <= 2 ? "." : "";
    }

    if (decimalSep === ".") {
      // Puntos decimales: quitar comas (miles) y dejar el punto
      s = s.replace(/,/g, "");
    } else if (decimalSep === ",") {
      // Comas decimales: quitar puntos (miles) y convertir coma en punto
      s = s.replace(/\./g, "").replace(/,/g, ".");
    } else {
      // Sin decimales: quitar todos los separadores
      s = s.replace(/[.,]/g, "");
    }

    const numeric = parseFloat(s);
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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData("text");
    const numeric = parsePastedNumber(pasted);

    // Si pudimos interpretar un número, tomamos el control del pegado
    // para evitar que handleChange malinterprete los separadores de miles.
    if (numeric !== null) {
      e.preventDefault();
      // Mientras tiene el foco mostramos sin separadores de miles (coma decimal)
      setDisplayValue(formatToFocus(numeric));
    }

    if (onPaste) onPaste(e);
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
      onPaste={handlePaste}
    />
  );
});

CurrencyInput.displayName = "CurrencyInput";
