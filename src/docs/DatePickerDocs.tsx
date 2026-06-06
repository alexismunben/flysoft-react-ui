import React from "react";
import dayjs, { type Dayjs } from "dayjs";
import "dayjs/locale/es";
import { Card, DatePicker, Button } from "../index";

const DatePickerDocs: React.FC = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [anotherDate, setAnotherDate] = React.useState<Dayjs | null>(
    dayjs()
  );

  const formatDate = (date: Dayjs | null) => {
    if (!date || !date.isValid()) return "Sin fecha seleccionada";
    return date.locale("es").format("DD [de] MMMM [de] YYYY");
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
                  onClick={() => setAnotherDate(dayjs())}
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

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Fondo personalizado
            </h3>
            <p
              className="text-sm mb-4"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El panel del calendario usa <code>var(--color-bg-default)</code> como
              fondo. Pasá un <code>bg-*</code> por <code>className</code> para
              cambiarlo: las clases se combinan con <code>twMerge</code>, así que
              tu <code>bg-*</code> pisa el fondo por defecto de forma confiable.
            </p>
            <div
              className="p-6 rounded-lg border"
              style={{
                background: "var(--color-bg-secondary)",
                borderColor: "var(--color-border-default)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--flysoft-text-primary)" }}
                  >
                    Sin override
                  </p>
                  <DatePicker />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    el panel blanco resalta sobre la superficie
                  </p>
                </div>
                <div className="space-y-3">
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--flysoft-text-primary)" }}
                  >
                    Con override
                  </p>
                  <DatePicker className="bg-[var(--color-bg-secondary)]" />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <code>className="bg-[var(--color-bg-secondary)]"</code> integra
                    el panel a la superficie
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DatePickerDocs;


