import React from "react";
import { Card, DateInput, Button, Input, DatePicker } from "../index";
import type { DateInputFormat } from "../index";

const DateInputDocs: React.FC = () => {
  const [date1, setDate1] = React.useState<Date | null>(new Date());
  const [date2, setDate2] = React.useState<Date | null>(null);
  const [format, setFormat] = React.useState<DateInputFormat>("dd/mm/yyyy");

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
      <Card title="DateInput - Input de fecha con calendario">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico (dd/mm/yyyy)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <DateInput
                  label="Fecha de nacimiento"
                  value={date1}
                  onChange={setDate1}
                  format="dd/mm/yyyy"
                  icon="fa-calendar-alt"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  puedes escribir la fecha manualmente (dd/mm/yyyy) o elegirla
                  desde el calendario
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
                    {formatDate(date1)}
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
              Soporte de formatos (dd/mm/yyyy y mm/dd/yyyy)
            </h3>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  size="sm"
                  variant={format === "dd/mm/yyyy" ? "primary" : "outline"}
                  onClick={() => setFormat("dd/mm/yyyy")}
                >
                  dd/mm/yyyy
                </Button>
                <Button
                  size="sm"
                  variant={format === "mm/dd/yyyy" ? "primary" : "outline"}
                  onClick={() => setFormat("mm/dd/yyyy")}
                >
                  mm/dd/yyyy
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-3">
                  <DateInput
                    label="Fecha con formato dinámico"
                    value={date2}
                    onChange={setDate2}
                    format={format}
                    icon="fa-calendar-day"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    cambia el formato y escribe la fecha usando el mismo patrón
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
                      {formatDate(date2)}
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Integración con DatePicker
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="space-y-3">
                <DateInput
                  label="Fecha de reserva"
                  value={date1}
                  onChange={setDate1}
                  format="dd/mm/yyyy"
                  datePickerProps={{
                    startWeekOn: "monday",
                  }}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  puedes pasar props al DatePicker interno mediante la prop
                  datePickerProps
                </p>
              </div>
              <div className="space-y-3">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  DatePicker independiente
                </p>
                <DatePicker
                  value={date1 ?? undefined}
                  onChange={setDate1}
                  startWeekOn="monday"
                />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Estados y personalización
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <DateInput
                  label="Solo lectura"
                  value={new Date()}
                  readOnly
                  icon="fa-lock"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  respeta el estado readOnly del Input subyacente
                </p>
              </div>
              <div className="space-y-3">
                <DateInput
                  label="Deshabilitado"
                  value={new Date()}
                  disabled
                  icon="fa-ban"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  respeta el estado disabled y evita abrir el calendario
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo de formulario
            </h3>
            <Card
              title="Formulario de reserva"
              subtitle="Combinación de DateInput, Input y Button"
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="outline" icon="fa-times">
                    Cancelar
                  </Button>
                  <Button variant="primary" icon="fa-check">
                    Confirmar
                  </Button>
                </div>
              }
            >
              <div className="space-y-4">
                <Input
                  label="Nombre"
                  placeholder="Nombre completo"
                  icon="fa-user"
                />
                <DateInput
                  label="Fecha de entrada"
                  value={date1}
                  onChange={setDate1}
                  format="dd/mm/yyyy"
                  icon="fa-calendar-check"
                />
                <DateInput
                  label="Fecha de salida"
                  value={date2}
                  onChange={setDate2}
                  format="dd/mm/yyyy"
                  icon="fa-calendar-minus"
                />
              </div>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DateInputDocs;


