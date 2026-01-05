import React, { useState } from "react";
import { Card, RadioButtonGroup, Button } from "../index";
import type { RadioOption } from "../index";
import { useForm, FormProvider } from "react-hook-form";

const FormExample: React.FC = () => {
  const methods = useForm<{
    gender: string;
    preferences: string;
  }>({
    defaultValues: {
      gender: "male",
      preferences: "notifications",
    },
  });

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = () => {
    console.log(watch());
  };

  return (
    <FormProvider {...methods}>
      <Card
        title="Formulario con RadioButtonGroup"
        subtitle="Ejemplo práctico de uso de RadioButtonGroup en un formulario con react-hook-form"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-[var(--color-primary)] mb-1 font-[var(--font-default)]">
                Género
              </label>
              <RadioButtonGroup
                options={[
                  { label: "Masculino", value: "male" },
                  { label: "Femenino", value: "female" },
                  { label: "Otro", value: "other" },
                ]}
                {...register("gender", {
                  required: "El género es obligatorio",
                })}
                error={errors.gender?.message}
              />
            </div>
            <div>
              <label className="block text-sm text-[var(--color-primary)] mb-1 font-[var(--font-default)]">
                Preferencias
              </label>
              <RadioButtonGroup
                options={[
                  { label: "Notificaciones", value: "notifications" },
                  { label: "Email", value: "email" },
                  { label: "SMS", value: "sms" },
                ]}
                {...register("preferences", {
                  required: "Las preferencias son obligatorias",
                })}
                error={errors.preferences?.message}
                direction="horizontal"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" icon="fa-times" type="button">
              Cancelar
            </Button>
            <Button variant="primary" icon="fa-check" type="submit">
              Enviar
            </Button>
          </div>
        </form>
      </Card>
    </FormProvider>
  );
};

const RadioButtonGroupDocs: React.FC = () => {
  const [selectedValue1, setSelectedValue1] = useState<string | number>(
    "option1"
  );

  const basicOptions: RadioOption[] = [
    { label: "Opción 1", value: "option1" },
    { label: "Opción 2", value: "option2" },
    { label: "Opción 3", value: "option3" },
  ];

  const optionsWithNumbers: RadioOption[] = [
    { label: "Uno", value: 1 },
    { label: "Dos", value: 2 },
    { label: "Tres", value: 3 },
  ];

  // Crear un FormProvider mínimo para los ejemplos en modo controlado
  const controlMethods = useForm();

  return (
    <FormProvider {...controlMethods}>
      <div className="max-w-5xl mx-auto space-y-8">
        <Card title="RadioButtonGroup - Variantes y Ejemplos">
          <div className="space-y-10">
            <section>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--flysoft-text-primary)" }}
              >
                Uso básico con options
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="basic-group"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    grupo de radio buttons con options, label a la derecha (por
                    defecto)
                  </p>
                </div>
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="basic-group-left"
                    labelPosition="left"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    grupo con labels a la izquierda
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--flysoft-text-primary)" }}
              >
                Tamaños
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="size-sm"
                    size="sm"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    tamaño compacto
                  </p>
                </div>
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="size-md"
                    size="md"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    tamaño por defecto
                  </p>
                </div>
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="size-lg"
                    size="lg"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    tamaño amplio
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--flysoft-text-primary)" }}
              >
                Dirección del layout
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="direction-vertical"
                    direction="vertical"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    dirección vertical (por defecto)
                  </p>
                </div>
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="direction-horizontal"
                    direction="horizontal"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    dirección horizontal
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--flysoft-text-primary)" }}
              >
                Estados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="error-group"
                    error="Debes seleccionar una opción"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    utiliza el prop error para mostrar mensajes y estilos
                  </p>
                </div>
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="disabled-group"
                    disabled
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    el estado disabled aplica estilos y bloqueo de interacción
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--flysoft-text-primary)" }}
              >
                Valores numéricos
              </h3>
              <div className="space-y-3">
                <RadioButtonGroup
                  options={optionsWithNumbers}
                  value={selectedValue1}
                  onChange={(value: string | number) =>
                    setSelectedValue1(value)
                  }
                  name="numeric-group"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  soporta valores numéricos además de strings
                </p>
              </div>
            </section>

            <section>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--flysoft-text-primary)" }}
              >
                Espaciado personalizado
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="gap-sm"
                    gap="sm"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    espaciado pequeño
                  </p>
                </div>
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="gap-md"
                    gap="md"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    espaciado mediano (por defecto)
                  </p>
                </div>
                <div className="space-y-3">
                  <RadioButtonGroup
                    options={basicOptions}
                    value={selectedValue1}
                    onChange={(value: string | number) =>
                      setSelectedValue1(value)
                    }
                    name="gap-lg"
                    gap="lg"
                  />
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    espaciado grande
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--flysoft-text-primary)" }}
              >
                Ejemplo de uso
              </h3>
              <FormExample />
            </section>
          </div>
        </Card>
      </div>
    </FormProvider>
  );
};

export default RadioButtonGroupDocs;
