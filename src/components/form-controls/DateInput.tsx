import React from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Input } from "./Input";
import { DatePicker } from "./DatePicker";
import type { InputProps } from "./Input";
import type { DatePickerProps } from "./DatePicker";

export type DateInputFormat = "dd/mm/yyyy" | "mm/dd/yyyy";

export interface DateInputProps
  extends Omit<InputProps, "type" | "value" | "onChange" | "ref"> {
  value?: Dayjs | null;
  /**
   * Callback cuando cambia la fecha.
   * Compatible con react-hook-form: acepta tanto (date: Dayjs | null) => void como el onChange estándar de HTML.
   */
  onChange?: ((date: Dayjs | null) => void) | React.ChangeEventHandler<HTMLInputElement>;
  format?: DateInputFormat;
  datePickerProps?: Omit<DatePickerProps, "value" | "onChange">;
}

const pad = (value: number) => value.toString().padStart(2, "0");

const isDayjs = (value: unknown): value is Dayjs => {
  return value !== null && value !== undefined && typeof value === "object" && "isValid" in value && typeof (value as any).isValid === "function";
};

const normalizeToDayjs = (value: unknown): Dayjs | null => {
  if (value === null || value === undefined) return null;
  if (isDayjs(value)) return value;
  // Si no es Dayjs, intentar convertirlo
  if (typeof value === "string" || typeof value === "number" || value instanceof Date) {
    const d = dayjs(value);
    return d.isValid() ? d : null;
  }
  return null;
};

const formatDateToString = (date: Dayjs | null | unknown, format: DateInputFormat) => {
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
      const date = dayjs().year(year).month(month - 1).date(day);
      if (date.isValid() && date.year() === year && date.month() === month - 1 && date.date() === day) {
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

  const date = dayjs().year(year).month(month - 1).date(day);
  if (!date.isValid() || date.year() !== year || date.month() !== month - 1 || date.date() !== day) {
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
      ...inputProps
    },
    ref
  ) => {
  // Detectar si estamos usando Controller (modo controlado con Dayjs)
  // Cuando se usa Controller, siempre se pasa onChange, incluso si value es undefined inicialmente
  // Si onChange está presente, asumimos modo controlado con Controller (que espera Dayjs)
  // Esto funciona porque Controller siempre pasa onChange, mientras que register puede no pasarlo directamente
  const isControlled = onChange !== undefined;
  
  const [internalDate, setInternalDate] = React.useState<Dayjs | null>(
    normalizeToDayjs(value)
  );
  const [inputValue, setInputValue] = React.useState(
    formatDateToString(value, format)
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const inputWrapperRef = React.useRef<HTMLDivElement | null>(null);
  const isTypingRef = React.useRef(false);

  React.useEffect(() => {
    if (isControlled && !isTypingRef.current) {
      const normalized = normalizeToDayjs(value);
      setInternalDate(normalized);
      setInputValue(formatDateToString(value, format));
    }
  }, [value, format, isControlled]);

  const handleDateChange = (date: Dayjs | null) => {
    if (!isControlled) {
      setInternalDate(date);
      setInputValue(formatDateToString(date, format));
    }
    
    if (onChange) {
      // Cuando onChange está presente, asumimos que es modo controlado con Controller
      // (que espera Dayjs directamente, no un evento)
      // Esto funciona correctamente porque Controller siempre pasa onChange
      const dayjsHandler = onChange as unknown as ((date: Dayjs | null) => void);
      dayjsHandler(date);
    }
    setIsOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const newValue = event.target.value;
    // Marcar que el usuario está escribiendo para evitar que el useEffect sobrescriba
    isTypingRef.current = true;
    // Solo actualizar el valor del input, NO llamar onChange mientras el usuario escribe
    // El onChange se llamará en onBlur cuando se valide y parse la fecha completa
    setInputValue(newValue);
  };

  const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (
    event
  ) => {
    // Marcar que el usuario terminó de escribir
    isTypingRef.current = false;
    
    const newValue = event.target.value.trim();
    if (!newValue) {
      handleDateChange(null);
      return;
    }

    const parsed = parseDateFromString(newValue, format);
    if (parsed) {
      handleDateChange(parsed);
    } else {
      // Si no es válida, restauramos el valor anterior formateado.
      setInputValue(formatDateToString(internalDate, format));
    }
  };

  const handleIconClick: React.MouseEventHandler<HTMLElement> = (event) => {
    event.preventDefault();
    setIsOpen((prev) => !prev);
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

  const datePickerInitialViewDate =
    internalDate ?? datePickerProps?.initialViewDate ?? dayjs();

  return (
    <div ref={containerRef} className="relative w-full">
      <div ref={inputWrapperRef} className="relative">
        <Input
          {...inputProps}
          ref={ref}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          icon={icon}
          iconPosition={iconPosition}
          onIconClick={handleIconClick}
          placeholder={
            inputProps.placeholder ??
            (format === "mm/dd/yyyy" ? "mm/dd/yyyy" : "dd/mm/yyyy")
          }
          className={className}
        />
      </div>

      {isOpen && (
        <div className="absolute z-20 mt-1 right-0">
          <DatePicker
            {...datePickerProps}
            value={internalDate ?? datePickerInitialViewDate}
            onChange={(date) => handleDateChange(date)}
          />
        </div>
      )}
    </div>
  );
  }
);

DateInput.displayName = "DateInput";
