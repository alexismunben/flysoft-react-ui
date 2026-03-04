import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Card, CurrencyInput, Button } from "../index";

const HookFormExample: React.FC = () => {
  const methods = useForm<{ precio: number | null }>({
    defaultValues: { precio: 25000.75 },
  });
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    alert("Datos enviados: " + JSON.stringify(data));
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 border rounded-lg bg-gray-50"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CurrencyInput
            label="Precio con register"
            {...register("precio", {
              required: "El precio es obligatorio",
              min: { value: 10, message: "El mínimo es 10" },
            })}
            error={errors.precio?.message}
            icon="fa-shopping-cart"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold text-gray-700">
              Estado del formulario:
            </p>
            <pre className="text-xs bg-white p-2 border rounded mt-1">
              {JSON.stringify(watch(), null, 2)}
            </pre>
          </div>
        </div>
        <Button type="submit" size="sm">
          Probar Submit
        </Button>
      </form>
    </FormProvider>
  );
};

const CurrencyInputDocs: React.FC = () => {
  const [value, setValue] = useState<number | null>(1234.56);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="CurrencyInput - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <CurrencyInput
                  label="Precio del producto"
                  placeholder="0,00"
                  icon="fa-tag"
                  value={value}
                  onChange={(val) => setValue(val)}
                />
                <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Valor numérico en el estado profesional (React):
                  </p>
                  <code className="text-primary font-mono bg-white px-2 py-1 rounded border">
                    {value !== null ? value.toString() : "null"}
                  </code>
                </div>
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Este componente formatea automáticamente el valor con
                  separadores de miles y decimales. Al recibir el foco, se
                  eliminan los puntos para facilitar la edición.
                </p>
              </div>
              <div className="space-y-3">
                <CurrencyInput
                  label="Entrada vacía con placeholder"
                  placeholder="Ingrese monto..."
                  icon="fa-dollar-sign"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Si no se proporciona un valor, se muestra el placeholder
                  configurado.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Comportamiento del Foco
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <CurrencyInput
                  label="Haz clic para ver el cambio"
                  value={10500.25}
                  icon="fa-mouse-pointer"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Observa cómo los puntos desaparecen al enfocar el campo y
                  reaparecen al perder el foco.
                </p>
              </div>
              <div className="space-y-3">
                <CurrencyInput
                  label="Conversión de punto a coma"
                  placeholder="Escribe 123.45"
                  icon="fa-keyboard"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  El componente ayuda al usuario convirtiendo automáticamente el
                  punto del teclado numérico en una coma decimal.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Estados y Tamaños
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <CurrencyInput
                size="sm"
                label="Pequeño con error"
                placeholder="0,00"
                error="Monto requerido"
              />
              <CurrencyInput
                size="md"
                label="Mediano deshabilitado"
                value={1234.56}
                disabled
              />
              <CurrencyInput
                size="lg"
                label="Grande ReadOnly"
                value={9999.99}
                readOnly
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Integración con react-hook-form
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente es compatible con <code>register</code> de
              react-hook-form. Para que funcione correctamente devolviendo
              valores numéricos, asegúrate de envolver el formulario en un{" "}
              <code>FormProvider</code>.
            </p>
            <HookFormExample />
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props específicas
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Prop
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Tipo
                    </th>
                    <th className="px-4 py-2 text-left text-sm font-semibold">
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">value</td>
                    <td className="px-4 py-2 text-sm">number | null</td>
                    <td className="px-4 py-2 text-sm">
                      El valor numérico de la entrada.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">onChange</td>
                    <td className="px-4 py-2 text-sm">
                      {"(value: number | null) => void"}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      Callback que se dispara al perder el foco, entregando el
                      número parseado.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td className="px-4 py-2 text-sm font-mono">
                      ...InputProps
                    </td>
                    <td className="px-4 py-2 text-sm">
                      Omit&lt;InputProps, 'value' | 'onChange'&gt;
                    </td>
                    <td className="px-4 py-2 text-sm">
                      Soporta todas las props del componente Input estándar.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>

      <div className="flex justify-start">
        <Button
          variant="outline"
          icon="fa-arrow-left"
          onClick={() => window.history.back()}
        >
          Volver
        </Button>
      </div>
    </div>
  );
};

export default CurrencyInputDocs;
