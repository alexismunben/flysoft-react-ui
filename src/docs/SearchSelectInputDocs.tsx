import React from "react";
import type { Dayjs } from "dayjs";
import { Card, SearchSelectInput, Button, Input, DateInput } from "../index";
import type { SearchSelectOption, PaginationInterface } from "../index";
import { useForm } from "react-hook-form";

const sampleOptions: SearchSelectOption[] = [
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
  {
    label: "Chile",
    value: "cl",
    icon: "fa-flag",
    description: "Santiago",
  },
  {
    label: "Colombia",
    value: "co",
    icon: "fa-flag",
    description: "Bogotá",
  },
];

// Ejemplo de array sin propiedades label, value ni description
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
}

const users: User[] = [
  {
    id: 1,
    firstName: "Juan",
    lastName: "Pérez",
    email: "juan.perez@empresa.com",
    role: "Desarrollador",
    department: "Tecnología",
  },
  {
    id: 2,
    firstName: "María",
    lastName: "García",
    email: "maria.garcia@empresa.com",
    role: "Diseñadora",
    department: "Diseño",
  },
  {
    id: 3,
    firstName: "Carlos",
    lastName: "Rodríguez",
    email: "carlos.rodriguez@empresa.com",
    role: "Gerente",
    department: "Ventas",
  },
  {
    id: 4,
    firstName: "Ana",
    lastName: "Martínez",
    email: "ana.martinez@empresa.com",
    role: "Analista",
    department: "Marketing",
  },
  {
    id: 5,
    firstName: "Luis",
    lastName: "Fernández",
    email: "luis.fernandez@empresa.com",
    role: "Desarrollador",
    department: "Tecnología",
  },
];

// Simular búsqueda asíncrona
const mockSearchPromise = async (
  text: string
): Promise<SearchSelectOption[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const search = text.toLowerCase();
  return sampleOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(search) ||
      (option.value && option.value.toLowerCase().includes(search)) ||
      (option.description &&
        String(option.description).toLowerCase().includes(search))
  );
};

// Simular búsqueda de un elemento individual por valor
const mockSingleSearchPromise = async (
  value: string
): Promise<SearchSelectOption | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return sampleOptions.find((option) => option.value === value);
};

// Simular búsqueda con PaginationInterface
const mockSearchWithPagination = async (
  text: string
): Promise<PaginationInterface<SearchSelectOption>> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const search = text.toLowerCase();
  const filtered = sampleOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(search) ||
      (option.value && option.value.toLowerCase().includes(search)) ||
      (option.description &&
        String(option.description).toLowerCase().includes(search))
  );
  return {
    list: filtered,
    limit: 10,
    page: 1,
    pages: 1,
    total: filtered.length,
  };
};

// Simular búsqueda de usuarios
const mockUserSearch = async (text: string): Promise<User[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const search = text.toLowerCase();
  return users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search) ||
      user.lastName.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.role.toLowerCase().includes(search)
  );
};

// Simular búsqueda de un usuario individual por ID
const mockSingleUserSearch = async (
  userId: number
): Promise<User | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return users.find((user) => user.id === userId);
};

const SearchSelectInputDocs: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = React.useState<
    SearchSelectOption | undefined
  >();
  const [internalValue, setInternalValue] = React.useState("");

  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitted },
    watch,
  } = useForm<{
    country: SearchSelectOption;
    birthDate: Dayjs | null;
    city: string;
  }>();

  const onSubmit = (data: {
    country: SearchSelectOption;
    birthDate: Dayjs | null;
    city: string;
  }) => {
    console.log(data);
  };

  // Enfocar el primer campo con error después de un submit fallido
  React.useEffect(() => {
    if (isSubmitted && Object.keys(errors).length > 0) {
      // Usar setTimeout para asegurar que se ejecute después del render
      const timer = setTimeout(() => {
        if (errors.country) {
          setFocus("country");
        } else if (errors.birthDate) {
          setFocus("birthDate");
        } else if (errors.city) {
          setFocus("city");
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [errors, isSubmitted, setFocus]);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="SearchSelectInput - Búsqueda asíncrona y selección en Dialog">
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
                <SearchSelectInput
                  label="Buscar país"
                  placeholder="Escribe y presiona Enter o click en buscar..."
                  icon="fa-globe"
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                  onSelectOption={(option) => setSelectedCountry(option)}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  Escribe el texto, presiona Enter o haz click en el botón de
                  búsqueda para abrir el dialog con los resultados
                </p>
              </div>
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Selección actual
                </p>
                <Card variant="outlined">
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    {selectedCountry
                      ? `${selectedCountry.label} (${
                          selectedCountry.value?.toUpperCase() ?? "N/A"
                        })`
                      : "Ningún país seleccionado"}
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
              Posición del botón de búsqueda
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <SearchSelectInput
                  label="Botón a la derecha (por defecto)"
                  placeholder="Escribe y busca..."
                  icon="fa-search"
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  searchButtonPosition="right" (valor por defecto)
                </p>
              </div>
              <div className="space-y-3">
                <SearchSelectInput
                  label="Botón a la izquierda"
                  placeholder="Escribe y busca..."
                  icon="fa-search"
                  iconPosition="left"
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  searchButtonPosition="left"
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Controlado vs no controlado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <SearchSelectInput
                  label="SearchSelectInput no controlado"
                  placeholder="Escribe y busca..."
                  icon="fa-search"
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  sin prop value: el componente maneja internamente el valor del
                  input
                </p>
              </div>
              <div className="space-y-3">
                <SearchSelectInput
                  label="SearchSelectInput controlado"
                  placeholder="Escribe y busca..."
                  icon="fa-search"
                  value={internalValue}
                  getOptionValue={(option) => option.value ?? ""}
                  onChange={(val: SearchSelectOption | string) => {
                    if (typeof val === "string") {
                      setInternalValue(val);
                    }
                  }}
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  con value y onChange: el valor del input se controla desde el
                  estado externo
                </p>
                <Input
                  label="Valor actual"
                  value={internalValue}
                  readOnly
                  icon="fa-code"
                />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con PaginationInterface
            </h3>
            <div className="space-y-3">
              <SearchSelectInput
                label="Búsqueda con paginación"
                placeholder="Escribe y busca países..."
                icon="fa-globe"
                onSearchPromiseFn={mockSearchWithPagination}
                onSingleSearchPromiseFn={mockSingleSearchPromise}
                dialogTitle="Seleccione un país"
                onSelectOption={(option) => {
                  console.log("País seleccionado:", option);
                }}
              />
              <p
                className="text-sm"
                style={{ color: "var(--flysoft-text-secondary)" }}
              >
                La función onSearchPromiseFn puede devolver un{" "}
                <code>PaginationInterface&lt;T&gt;</code>. El componente
                extraerá automáticamente el array de la propiedad{" "}
                <code>list</code>.
              </p>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Personalización del Dialog
            </h3>
            <div className="space-y-3">
              <SearchSelectInput
                label="Dialog personalizado"
                placeholder="Escribe y busca..."
                icon="fa-search"
                dialogTitle="Buscar y seleccionar un país"
                noResultsText="No se encontraron países con ese criterio"
                onSearchPromiseFn={mockSearchPromise}
                onSingleSearchPromiseFn={mockSingleSearchPromise}
              />
              <p
                className="text-sm"
                style={{ color: "var(--flysoft-text-secondary)" }}
              >
                Puedes personalizar el título del dialog con{" "}
                <code>dialogTitle</code> y el mensaje de sin resultados con{" "}
                <code>noResultsText</code>.
              </p>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso genérico con renderOption personalizado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <SearchSelectInput<User, number>
                  label="Buscar usuario"
                  placeholder="Escribe nombre, email o rol..."
                  icon="fa-users"
                  onSearchPromiseFn={mockUserSearch}
                  onSingleSearchPromiseFn={mockSingleUserSearch}
                  getOptionLabel={(user) =>
                    `${user.firstName} ${user.lastName}`
                  }
                  getOptionValue={(user) => user.id}
                  getOptionDescription={(user) => user.email}
                  onSelectOption={(user, userId) => {
                    setSelectedUser(user);
                    console.log("Usuario seleccionado:", user, "ID:", userId);
                  }}
                  renderOption={(user) => (
                    <div className="flex items-start gap-3 w-full">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--color-primary-soft)] flex items-center justify-center">
                        <i className="fa fa-user text-[var(--color-primary)]" />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="font-medium text-[var(--color-text-primary)]">
                          {user.firstName} {user.lastName}
                        </span>
                        <span className="text-xs text-[var(--color-text-secondary)] truncate">
                          {user.email}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)]">
                            {user.role}
                          </span>
                          <span className="text-xs text-[var(--color-text-muted)]">
                            • {user.department}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  usando getOptionLabel, getOptionValue y renderOption para
                  personalizar completamente el renderizado de opciones sin
                  propiedades label/value/description
                </p>
              </div>
              <div className="space-y-2">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--flysoft-text-primary)" }}
                >
                  Usuario seleccionado
                </p>
                <Card variant="outlined">
                  {selectedUser ? (
                    <div className="space-y-2">
                      <p
                        className="text-sm font-medium"
                        style={{ color: "var(--flysoft-text-primary)" }}
                      >
                        {selectedUser.firstName} {selectedUser.lastName}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--flysoft-text-secondary)" }}
                      >
                        {selectedUser.email}
                      </p>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs px-2 py-0.5 rounded bg-[var(--color-bg-secondary)]"
                          style={{ color: "var(--flysoft-text-secondary)" }}
                        >
                          {selectedUser.role}
                        </span>
                        <span
                          className="text-xs"
                          style={{ color: "var(--flysoft-text-muted)" }}
                        >
                          {selectedUser.department}
                        </span>
                      </div>
                      <p
                        className="text-xs mt-2"
                        style={{ color: "var(--flysoft-text-muted)" }}
                      >
                        ID: {selectedUser.id}
                      </p>
                    </div>
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Ningún usuario seleccionado
                    </p>
                  )}
                </Card>
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
              title="Formulario de búsqueda con SearchSelectInput"
              subtitle="Combinación de SearchSelectInput, DateInput, Input y Button"
            >
              <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <SearchSelectInput<SearchSelectOption, string>
                  label="País de residencia"
                  {...register("country")}
                  placeholder="Busca y selecciona un país"
                  getOptionLabel={(option) => option.label}
                  getOptionValue={(option) => option.value ?? ""}
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                  dialogTitle="Seleccione un país"
                />
                <div>País de residencia: {watch("country")?.toString()}</div>
                <DateInput
                  label="Fecha de nacimiento"
                  placeholder="dd/mm/yyyy"
                  {...register("birthDate")}
                />
                <Input
                  label="Ciudad"
                  placeholder="Introduce tu ciudad"
                  icon="fa-city"
                  error={errors.city?.message}
                />
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    icon="fa-times"
                    type="submit"
                    onClick={() => reset()}
                  >
                    Limpiar
                  </Button>
                  <Button variant="primary" icon="fa-search" type="submit">
                    Buscar
                  </Button>
                </div>
              </form>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Tamaños
            </h3>
            <div className="space-y-4">
              <SearchSelectInput
                label="Tamaño pequeño"
                placeholder="Escribe y busca..."
                size="sm"
                onSearchPromiseFn={mockSearchPromise}
                onSingleSearchPromiseFn={mockSingleSearchPromise}
              />
              <SearchSelectInput
                label="Tamaño mediano (por defecto)"
                placeholder="Escribe y busca..."
                size="md"
                onSearchPromiseFn={mockSearchPromise}
                onSingleSearchPromiseFn={mockSingleSearchPromise}
              />
              <SearchSelectInput
                label="Tamaño grande"
                placeholder="Escribe y busca..."
                size="lg"
                onSearchPromiseFn={mockSearchPromise}
                onSingleSearchPromiseFn={mockSingleSearchPromise}
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Estados y validación
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <SearchSelectInput
                  label="Con error"
                  placeholder="Escribe y busca..."
                  error="Este campo es requerido"
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  respeta el estado error heredado del componente Input
                </p>
              </div>
              <div className="space-y-3">
                <SearchSelectInput
                  label="Deshabilitado"
                  placeholder="No editable"
                  icon="fa-ban"
                  disabled
                  onSearchPromiseFn={mockSearchPromise}
                  onSingleSearchPromiseFn={mockSingleSearchPromise}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  respeta el estado disabled heredado del componente Input
                </p>
              </div>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default SearchSelectInputDocs;
