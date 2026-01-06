import React from "react";
import type { Dayjs } from "dayjs";
import {
  Card,
  Input,
  AutocompleteInput,
  DateInput,
  SearchSelectInput,
  Button,
  Checkbox,
  RadioButtonGroup,
} from "../index";
import type { AutocompleteOption } from "../index";
import { useForm, FormProvider } from "react-hook-form";
import dayjs from "dayjs";

const autocompleteOptions: AutocompleteOption[] = [
  { label: "España", value: "es", description: "Madrid" },
  { label: "Francia", value: "fr", description: "París" },
  { label: "Italia", value: "it", description: "Roma" },
  { label: "Alemania", value: "de", description: "Berlín" },
  { label: "Portugal", value: "pt", description: "Lisboa" },
];

const searchSelectOptions: Array<{ label: string; id: number }> = [
  {
    label: "Madrid",
    id: 1,
  },
  {
    label: "París",
    id: 2,
  },
  {
    label: "Roma",
    id: 3,
  },
  {
    label: "Berlín",
    id: 4,
  },
  {
    label: "Lisboa",
    id: 5,
  },
];

const mockSearchPromise = async (
  text: string
): Promise<Array<{ label: string; id: number }>> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const search = text.toLowerCase();
  return searchSelectOptions.filter((option) =>
    option.label.toLowerCase().includes(search)
  );
};

const mockSingleSearchPromise = async (
  id: number
): Promise<{ label: string; id: number } | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return searchSelectOptions.find((option) => option.id === id);
};

const ExampleFormDocs: React.FC = () => {
  const [isReadOnly, setIsReadOnly] = React.useState(false);

  const methods = useForm<{
    nombre: string;
    pais: string;
    fechaNacimiento: Dayjs | null;
    ciudad: number | undefined;
    aceptaTerminos: boolean;
    genero: string;
    tipoUsuario: string;
  }>({
    defaultValues: {
      nombre: "Alexis Wursten",
      pais: "de",
      fechaNacimiento: dayjs("1990-01-01"),
      ciudad: 3,
      aceptaTerminos: false,
      genero: "masculino",
      tipoUsuario: "user",
    },
  });

  const {
    handleSubmit,
    reset,
    watch,
    setFocus,
    register,
    formState: { errors, isSubmitted },
  } = methods;

  const onSubmit = () => {
    console.log(watch());
  };

  // Enfocar el primer campo con error después de un submit fallido
  React.useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      const timer = setTimeout(() => {
        if (errors.nombre) {
          setFocus("nombre");
        } else if (errors.pais) {
          setFocus("pais");
        } else if (errors.fechaNacimiento) {
          setFocus("fechaNacimiento");
        } else if (errors.ciudad) {
          setFocus("ciudad");
        } else if (errors.aceptaTerminos) {
          // No se puede hacer focus en checkbox, pero podemos registrar el error
        } else if (errors.genero) {
          // No se puede hacer focus en radio button group, pero podemos registrar el error
        } else if (errors.tipoUsuario) {
          // No se puede hacer focus en radio button group, pero podemos registrar el error
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [errors, isSubmitted, setFocus]);

  return (
    <FormProvider {...methods}>
      <div className="max-w-5xl mx-auto space-y-8">
        <Card title="Formulario de Ejemplo">
          <div className="space-y-6">
            <p
              className="text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Este formulario demuestra el uso de todos los componentes de
              formulario controlados por react-hook-form con validaciones
              requeridas. Todos los campos usan <code>register</code> de forma
              simplificada (sin Controller).
            </p>

            <div className="pb-4 border-b border-[var(--color-border-default)]">
              <Checkbox
                label="ReadOnly"
                checked={isReadOnly}
                onChange={(e) => setIsReadOnly(e.target.checked)}
              />
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Nombre completo"
                placeholder="Ingresa tu nombre"
                readOnly={isReadOnly}
                {...register("nombre", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 3,
                    message: "El nombre debe tener al menos 3 caracteres",
                  },
                })}
                error={errors.nombre?.message}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    console.log("Enter");
                    setTimeout(() => {
                      setFocus("fechaNacimiento");
                    }, 100);
                  }
                }}
              />

              <AutocompleteInput
                label="País"
                placeholder="Selecciona un país"
                options={autocompleteOptions}
                getOptionValue={(option) => option.value}
                readOnly={isReadOnly}
                {...register("pais", {
                  required: "El país es obligatorio",
                })}
                error={errors.pais?.message}
                onSelectOption={() => {
                  // Al seleccionar un país, mover el foco a fecha de nacimiento
                  setTimeout(() => {
                    setFocus("fechaNacimiento");
                  }, 100);
                }}
              />
              <div>País: {watch("pais")}</div>

              <DateInput
                label="Fecha de nacimiento"
                placeholder="dd/mm/yyyy"
                icon="fa-calendar-alt"
                readOnly={isReadOnly}
                {...register("fechaNacimiento", {
                  required: "La fecha de nacimiento es obligatoria",
                })}
                error={errors.fechaNacimiento?.message}
              />
              <div>
                Fecha de nacimiento:{" "}
                {(watch("fechaNacimiento") && watch("fechaNacimiento")?.format
                  ? watch("fechaNacimiento")?.format("DD/MM/YYYY")
                  : "") || "N/A"}
              </div>

              <SearchSelectInput<{ label: string; id: number }, number>
                label="Ciudad"
                placeholder="Busca y selecciona una ciudad"
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.id}
                onSearchPromiseFn={mockSearchPromise}
                onSingleSearchPromiseFn={mockSingleSearchPromise}
                dialogTitle="Seleccione una ciudad"
                readOnly={isReadOnly}
                {...register("ciudad", {
                  required: "La ciudad es obligatoria",
                })}
                error={errors.ciudad?.message}
                onSelectOption={() => {
                  // Al seleccionar una ciudad, mover el foco a nombre completo
                  setTimeout(() => {
                    setFocus("nombre");
                  }, 100);
                }}
              />
              <div>Ciudad: {watch("ciudad")}</div>

              <Checkbox
                label="Acepto los términos y condiciones"
                readOnly={isReadOnly}
                {...register("aceptaTerminos", {
                  required: "Debes aceptar los términos y condiciones",
                })}
                error={errors.aceptaTerminos?.message}
              />
              <div>
                Acepta términos: {watch("aceptaTerminos") ? "Sí" : "No"}
              </div>

              <div>
                <label className="block text-sm text-[var(--color-primary)] mb-1 font-[var(--font-default)]">
                  Género
                </label>
                <RadioButtonGroup
                  options={[
                    { label: "Masculino", value: "masculino" },
                    { label: "Femenino", value: "femenino" },
                    { label: "Otro", value: "otro" },
                  ]}
                  readOnly={isReadOnly}
                  {...register("genero", {
                    required: "El género es obligatorio",
                  })}
                  error={errors.genero?.message}
                />
              </div>
              <div>Género: {watch("genero")}</div>

              <div>
                <label className="block text-sm text-[var(--color-primary)] mb-1 font-[var(--font-default)]">
                  Tipo de Usuario
                </label>
                <RadioButtonGroup
                  options={[
                    { label: "Administrador", value: "admin" },
                    { label: "Usuario", value: "user" },
                    { label: "Invitado", value: "guest" },
                  ]}
                  readOnly={isReadOnly}
                  {...register("tipoUsuario", {
                    required: "El tipo de usuario es obligatorio",
                  })}
                  error={errors.tipoUsuario?.message}
                />
              </div>
              <div>Tipo de Usuario: {watch("tipoUsuario")}</div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  variant="outline"
                  icon="fa-times"
                  type="button"
                  onClick={() => {
                    reset({
                      nombre: "",
                      pais: "",
                      fechaNacimiento: "",
                      ciudad: undefined,
                      aceptaTerminos: false,
                      genero: "",
                      tipoUsuario: "",
                    });
                  }}
                >
                  Resetear
                </Button>
                <Button variant="primary" icon="fa-check" type="submit">
                  Enviar
                </Button>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </FormProvider>
  );
};

export default ExampleFormDocs;
