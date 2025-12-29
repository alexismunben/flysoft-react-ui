import React from "react";
import dayjs, { type Dayjs } from "dayjs";
import { Button } from "./Button";

export type DatePickerView = {
  month: number; // 0-11
  year: number;
};

export interface DatePickerProps {
  value?: Dayjs | null;
  onChange?: (date: Dayjs) => void;
  initialViewDate?: Dayjs;
  startWeekOn?: "monday" | "sunday";
  className?: string;
}

const createDateAtMidnight = (date: Dayjs | Date) => {
  const d = dayjs(date);
  return d.startOf("day");
};

const isSameDay = (a: Dayjs, b: Dayjs) => {
  return a.isSame(b, "day");
};

const getDaysInMonth = (year: number, month: number) => {
  return dayjs().year(year).month(month).daysInMonth();
};

const getWeekdayLabels = (startWeekOn: "monday" | "sunday") => {
  const base = ["D", "L", "M", "X", "J", "V", "S"];
  if (startWeekOn === "sunday") {
    return base;
  }
  return [...base.slice(1), base[0]];
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  initialViewDate,
  startWeekOn = "sunday",
  className = "",
}) => {
  const today = React.useMemo(() => dayjs().startOf("day"), []);

  const initial = React.useMemo(() => {
    const base = value ?? initialViewDate ?? today;
    return {
      month: base.month(),
      year: base.year(),
    };
  }, [value, initialViewDate, today]);

  const [view, setView] = React.useState<DatePickerView>(initial);

  React.useEffect(() => {
    if (value) {
      setView({
        month: value.month(),
        year: value.year(),
      });
    }
  }, [value]);

  const handlePrevMonth = () => {
    setView((prev) => {
      const month = prev.month === 0 ? 11 : prev.month - 1;
      const year = prev.month === 0 ? prev.year - 1 : prev.year;
      return { month, year };
    });
  };

  const handleNextMonth = () => {
    setView((prev) => {
      const month = prev.month === 11 ? 0 : prev.month + 1;
      const year = prev.month === 11 ? prev.year + 1 : prev.year;
      return { month, year };
    });
  };

  const handlePrevYear = () => {
    setView((prev) => ({ ...prev, year: prev.year - 1 }));
  };

  const handleNextYear = () => {
    setView((prev) => ({ ...prev, year: prev.year + 1 }));
  };

  const handleSelectDay = (day: number, month?: number, year?: number) => {
    const targetMonth = month !== undefined ? month : view.month;
    const targetYear = year !== undefined ? year : view.year;
    const date = dayjs().year(targetYear).month(targetMonth).date(day);
    onChange?.(createDateAtMidnight(date));

    // Si el día es de otro mes, cambiar la vista
    if (month !== undefined && month !== view.month) {
      setView({ month: targetMonth, year: targetYear });
    } else if (year !== undefined && year !== view.year) {
      setView({ month: targetMonth, year: targetYear });
    }
  };

  const firstDayOfMonth = dayjs().year(view.year).month(view.month).date(1);
  const firstWeekday = firstDayOfMonth.day(); // 0-6, Sunday=0
  const daysInMonth = getDaysInMonth(view.year, view.month);
  const weekdayLabels = getWeekdayLabels(startWeekOn);

  const offset =
    startWeekOn === "sunday"
      ? firstWeekday
      : firstWeekday === 0
      ? 6
      : firstWeekday - 1;

  // Calcular días del mes anterior y siguiente
  const prevMonth = view.month === 0 ? 11 : view.month - 1;
  const prevYear = view.month === 0 ? view.year - 1 : view.year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  const nextMonth = view.month === 11 ? 0 : view.month + 1;
  const nextYear = view.month === 11 ? view.year + 1 : view.year;

  type DayInfo = {
    day: number;
    month: number;
    year: number;
  };

  const weeks: DayInfo[][] = [];

  // Construir todas las semanas (6 semanas = 42 días)
  let dayCounter = 1 - offset; // Puede ser negativo para días del mes anterior

  for (let week = 0; week < 6; week++) {
    const currentWeek: DayInfo[] = [];

    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      if (dayCounter < 1) {
        // Día del mes anterior
        const day = daysInPrevMonth + dayCounter;
        currentWeek.push({ day, month: prevMonth, year: prevYear });
      } else if (dayCounter > daysInMonth) {
        // Día del mes siguiente
        const day = dayCounter - daysInMonth;
        currentWeek.push({ day, month: nextMonth, year: nextYear });
      } else {
        // Día del mes actual
        currentWeek.push({
          day: dayCounter,
          month: view.month,
          year: view.year,
        });
      }
      dayCounter++;
    }

    weeks.push(currentWeek);
  }

  const selectedDate =
    value && value.isValid() ? createDateAtMidnight(value) : null;

  const monthName = dayjs()
    .year(view.year)
    .month(view.month)
    .date(1)
    .format("MMMM");

  return (
    <div
      className={`inline-flex flex-col rounded-lg border border-[var(--color-border-default)] 
      bg-[var(--color-bg-default)] p-3 shadow-sm font-[var(--font-default)] text-sm ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            icon="fa-angle-double-left"
            onClick={handlePrevYear}
            aria-label="Año anterior"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            icon="fa-angle-left"
            onClick={handlePrevMonth}
            aria-label="Mes anterior"
          />
        </div>
        <div className="text-center">
          <div className="text-[var(--color-text-primary)] font-medium capitalize">
            {monthName} {view.year}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            icon="fa-angle-right"
            onClick={handleNextMonth}
            aria-label="Mes siguiente"
          />
          <Button
            type="button"
            size="sm"
            variant="ghost"
            icon="fa-angle-double-right"
            onClick={handleNextYear}
            aria-label="Año siguiente"
          />
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-1">
        {weekdayLabels.map((label) => (
          <div
            key={label}
            className="text-xs text-center text-[var(--color-text-secondary)]"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-rows-6 gap-1">
        {weeks.map((week, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-7 gap-1">
            {week.map((dayInfo, index) => {
              const { day, month, year } = dayInfo;
              const isCurrentMonth = month === view.month && year === view.year;

              const date = dayjs().year(year).month(month).date(day);
              const isToday = isSameDay(date, today);
              const isSelected =
                selectedDate !== null && isSameDay(date, selectedDate);

              let dayClasses =
                "w-8 h-8 flex items-center justify-center rounded-full cursor-pointer text-xs";

              if (isSelected) {
                dayClasses +=
                  " bg-[var(--color-primary)] text-[var(--color-primary-contrast)]";
              } else if (isToday) {
                dayClasses +=
                  " border border-[var(--color-primary)] text-[var(--color-primary)]";
              } else if (isCurrentMonth) {
                dayClasses +=
                  " text-[var(--color-text-primary)] hover:bg-[var(--color-bg-secondary)]";
              } else {
                dayClasses +=
                  " text-[var(--color-text-muted)] opacity-50 hover:bg-[var(--color-bg-secondary)] hover:opacity-75";
              }

              return (
                <button
                  key={index}
                  type="button"
                  className={dayClasses}
                  onClick={() => handleSelectDay(day, month, year)}
                >
                  {day}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
