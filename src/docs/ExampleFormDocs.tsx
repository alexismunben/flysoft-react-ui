import React from "react";
import type { Dayjs } from "dayjs";
import {
  Card,
  Input,
  AutocompleteInput,
  DatePicker,
  DateInput,
  SearchSelectInput,
  Button,
} from "../index";
import type { SearchSelectOption, AutocompleteOption } from "../index";
import { useForm, Controller } from "react-hook-form";

const autocompleteOptions: AutocompleteOption[] = [
  { label: "España", value: "es", description: "Madrid" },
  { label: "Francia", value: "fr", description: "París" },
  { label: "Italia", value: "it", description: "Roma" },
  { label: "Alemania", value: "de", description: "Berlín" },
  { label: "Portugal", value: "pt", description: "Lisboa" },
];

const searchSelectOptions: SearchSelectOption[] = [
  {
    label: "España",
    value: "es",
    icon: "fa-flag",
    description: "Madrid",
  },
  {
    label: "Estados Unidos",
    value: "us",
    icon: "fa-flag",
    description: "Washington D.C.",
  },
  {
    label: "México",
    value: "mx",
    icon: "fa-flag",
    description: "Ciudad de México",
  },
  {
    label: "Argentina",
    value: "ar",
    icon: "fa-flag",
    description: "Buenos Aires",
  },
];

const mockSearchPromise = async (
  text: string
): Promise<SearchSelectOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const search = text.toLowerCase();
  return searchSelectOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(search) ||
      option.value.toLowerCase().includes(search)
  );
};

const ExampleFormDocs: React.FC = () => {
  const {
    handleSubmit,
    reset,
    watch,
    control,
    setFocus,
    formState: { errors, isSubmitted },
  } = useForm<{
    nombre: string;
    pais: string;
    fechaSeleccion: Dayjs | null;
    fechaNacimiento: Dayjs | null;
    ciudad: SearchSelectOption;
  }>({
    defaultValues: {
      nombre: "",
      pais: "",
      fechaSeleccion: null,
      fechaNacimiento: null,
      ciudad: undefined as SearchSelectOption | undefined,
    },
  });

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
        } else if (errors.fechaSeleccion) {
          setFocus("fechaSeleccion");
        } else if (errors.fechaNacimiento) {
          setFocus("fechaNacimiento");
        } else if (errors.ciudad) {
          setFocus("ciudad");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [errors, isSubmitted, setFocus]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Formulario de Ejemplo">
        <div className="space-y-6">
          <p
            className="text-sm"
            style={{ color: "var(--flysoft-text-secondary)" }}
          >
            Este formulario demuestra el uso de todos los componentes de
            formulario controlados por react-hook-form con validaciones
            requeridas.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="nombre"
              control={control}
              rules={{ required: "El nombre es obligatorio" }}
              render={({ field, fieldState }) => (
                <Input
                  label="Nombre completo"
                  placeholder="Ingresa tu nombre"
                  icon="fa-user"
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="pais"
              control={control}
              rules={{ required: "El país es obligatorio" }}
              render={({ field, fieldState }) => (
                <AutocompleteInput
                  label="País"
                  placeholder="Selecciona un país"
                  icon="fa-globe"
                  options={autocompleteOptions}
                  value={field.value}
                  onChange={(value) => field.onChange(value)}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="fechaSeleccion"
              control={control}
              rules={{ required: "La fecha de selección es obligatoria" }}
              render={({ field, fieldState }) => (
                <div>
                  <label className="block text-sm text-[var(--color-primary)] mb-1 font-[var(--font-default)]">
                    Fecha de selección
                  </label>
                  <DatePicker
                    value={field.value ?? undefined}
                    onChange={(date) => field.onChange(date)}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-[var(--color-danger)] font-[var(--font-default)]">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />

            <Controller
              name="fechaNacimiento"
              control={control}
              rules={{ required: "La fecha de nacimiento es obligatoria" }}
              render={({ field, fieldState }) => (
                <DateInput
                  label="Fecha de nacimiento"
                  placeholder="dd/mm/yyyy"
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="ciudad"
              control={control}
              rules={{ required: "La ciudad es obligatoria" }}
              render={({ field, fieldState }) => (
                <SearchSelectInput<SearchSelectOption, SearchSelectOption>
                  label="Ciudad"
                  placeholder="Busca y selecciona una ciudad"
                  getOptionLabel={(option) =>
                    option.description?.toString() || ""
                  }
                  onSearchPromiseFn={mockSearchPromise}
                  dialogTitle="Seleccione una ciudad"
                  {...field}
                  error={fieldState.error?.message}
                />
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                icon="fa-times"
                type="button"
                onClick={() => {
                  reset({
                    nombre: "",
                    pais: "",
                    fechaSeleccion: null,
                    fechaNacimiento: null,
                    ciudad: undefined as SearchSelectOption | undefined,
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
  );
};

export default ExampleFormDocs;
