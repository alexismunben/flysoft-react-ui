import React from "react";
import { Input } from "./Input";
import { DatePicker } from "./DatePicker";
import type { InputProps } from "./Input";
import type { DatePickerProps } from "./DatePicker";

export type DateInputFormat = "dd/mm/yyyy" | "mm/dd/yyyy";

export interface DateInputProps
  extends Omit<InputProps, "type" | "value" | "onChange"> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  format?: DateInputFormat;
  datePickerProps?: Omit<DatePickerProps, "value" | "onChange">;
}

const pad = (value: number) => value.toString().padStart(2, "0");

const formatDateToString = (date: Date | null, format: DateInputFormat) => {
  if (!date) return "";
  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear().toString();

  if (format === "mm/dd/yyyy") {
    return `${month}/${day}/${year}`;
  }

  return `${day}/${month}/${year}`;
};

const parseDateFromString = (
  value: string,
  format: DateInputFormat
): Date | null => {
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
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      ) {
        return date;
      }
    }
  }

  // Si no funciona, intentar parsear con separadores
  const parts = value.split(/[\/\-\.]/).map((p) => p.trim());
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

  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
};

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  format = "dd/mm/yyyy",
  datePickerProps,
  icon = "fa-calendar-alt",
  iconPosition = "right",
  className = "",
  ...inputProps
}) => {
  const [internalDate, setInternalDate] = React.useState<Date | null>(
    value ?? null
  );
  const [inputValue, setInputValue] = React.useState(
    formatDateToString(value ?? null, format)
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (value !== undefined) {
      setInternalDate(value);
      setInputValue(formatDateToString(value, format));
    }
  }, [value, format]);

  const handleDateChange = (date: Date | null) => {
    if (value === undefined) {
      setInternalDate(date);
      setInputValue(formatDateToString(date, format));
    }
    onChange?.(date);
    setIsOpen(false);
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const newValue = event.target.value;
    setInputValue(newValue);

    // No intentamos parsear en cada pulsación, solo actualizamos el texto.
  };

  const handleInputBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
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

  const handleIconClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
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
    internalDate ?? datePickerProps?.initialViewDate ?? new Date();

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Input
          {...inputProps}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          icon={iconPosition === "right" ? undefined : icon}
          iconPosition={iconPosition}
          placeholder={
            inputProps.placeholder ??
            (format === "mm/dd/yyyy" ? "mm/dd/yyyy" : "dd/mm/yyyy")
          }
          className={`${className} ${
            iconPosition === "right" ? "pr-10" : ""
          }`}
        />

        {iconPosition === "right" && (
          <div
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onMouseDown={handleIconClick}
          >
            <i
              className={`fa ${icon} ${
                inputProps.size === "sm"
                  ? "w-4 h-4"
                  : inputProps.size === "lg"
                  ? "w-6 h-6"
                  : "w-5 h-5"
              } text-[var(--color-text-muted)]`}
            />
          </div>
        )}
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
};


