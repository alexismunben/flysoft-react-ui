import React from "react";
import { Card, DatePicker, Button } from "../index";

const DatePickerDocs: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);
  const [anotherDate, setAnotherDate] = React.useState<Date | null>(
    new Date()
  );

  const formatDate = (date: Date | null) => {
    if (!date) return "Sin fecha seleccionada";
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="DatePicker - Selector de fecha con calendario">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <DatePicker value={selectedDate ?? undefined} onChange={setSelectedDate} />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  selector de fecha sin input, solo calendario
                </p>
              </div>
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Fecha seleccionada
                </p>
                <Card variant="outlined">
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    {formatDate(selectedDate)}
                  </p>
                </Card>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Navegación por meses y años
            </h3>
            <div className="space-y-4">
              <p
                className="text-sm"
                style={{ color: "var(--flysoft-text-secondary)" }}
              >
                Usa los botones con flechas para cambiar de mes o de año. El día
                actual se resalta con un borde, y el día seleccionado se marca
                con el color primario.
              </p>
              <DatePicker
                value={anotherDate ?? undefined}
                onChange={setAnotherDate}
                startWeekOn="monday"
              />
              <div className="flex items-center justify-between">
                <span
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  {formatDate(anotherDate)}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  icon="fa-calendar-day"
                  onClick={() => setAnotherDate(new Date())}
                >
                  Ir a hoy
                </Button>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Inicio de semana configurable
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Semana comenzando en lunes (default)
                </p>
                <DatePicker startWeekOn="monday" />
              </div>
              <div className="space-y-3">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Semana comenzando en domingo
                </p>
                <DatePicker startWeekOn="sunday" />
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DatePickerDocs;


