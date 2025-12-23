import React from "react";
import { Card, AutocompleteInput, Button, Input } from "../index";
import type { AutocompleteOption } from "../index";

const sampleOptions: AutocompleteOption[] = [
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
];

const AutocompleteInputDocs: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = React.useState<
    AutocompleteOption | undefined
  >();
  const [value, setValue] = React.useState("");
  const [selectedUser, setSelectedUser] = React.useState<User | undefined>();

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="AutocompleteInput - Búsqueda y selección de opciones">
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
                <AutocompleteInput
                  label="País"
                  placeholder="Escribe para buscar..."
                  icon="fa-globe"
                  options={sampleOptions}
                  onSelectOption={(option) => setSelectedCountry(option)}
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  escribe para filtrar la lista de opciones y selecciona con el
                  mouse o con Enter
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
                      ? `${
                          selectedCountry.label
                        } (${selectedCountry.value.toUpperCase()})`
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
              Controlado vs no controlado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <AutocompleteInput
                  label="Autocomplete no controlado"
                  placeholder="Escribe para buscar..."
                  icon="fa-search"
                  options={sampleOptions}
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
                <AutocompleteInput
                  label="Autocomplete controlado"
                  placeholder="Escribe para buscar..."
                  icon="fa-search"
                  options={sampleOptions}
                  value={value}
                  onChange={setValue}
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
                  value={value}
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
              Personalización y estados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <AutocompleteInput
                  label="Sin resultados"
                  placeholder="Escribe algo que no exista"
                  icon="fa-question-circle"
                  options={sampleOptions}
                  noResultsText="No encontramos coincidencias"
                />
                <p
                  className="text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  el mensaje se muestra cuando no hay coincidencias al filtrar
                </p>
              </div>
              <div className="space-y-3">
                <AutocompleteInput
                  label="Deshabilitado"
                  placeholder="No editable"
                  icon="fa-ban"
                  options={sampleOptions}
                  disabled
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

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso genérico con renderOption personalizado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <AutocompleteInput<User, number>
                  label="Buscar usuario"
                  placeholder="Escribe nombre o email..."
                  icon="fa-users"
                  options={users}
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
              title="Formulario de búsqueda con AutocompleteInput"
              subtitle="Combinación de AutocompleteInput, Input y Button"
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="outline" icon="fa-times">
                    Limpiar
                  </Button>
                  <Button variant="primary" icon="fa-search">
                    Buscar
                  </Button>
                </div>
              }
            >
              <div className="space-y-4">
                <AutocompleteInput
                  label="País de residencia"
                  placeholder="Selecciona un país"
                  icon="fa-flag"
                  options={sampleOptions}
                />
                <Input
                  label="Ciudad"
                  placeholder="Introduce tu ciudad"
                  icon="fa-city"
                />
              </div>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default AutocompleteInputDocs;
