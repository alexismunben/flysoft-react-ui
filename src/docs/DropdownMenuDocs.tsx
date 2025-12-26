import React, { useState } from "react";
import { Card, DropdownMenu, Button, Badge } from "../index";

interface BasicOption {
  label: string;
  id: string;
}

interface ActionOption {
  label: string;
  icon: string;
  action: string;
}

interface UserOption {
  id: number;
  name: string;
  email: string;
  role: string;
}

const DropdownMenuDocs: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<BasicOption | null>(null);

  // Opciones básicas con propiedad label
  const basicOptions: BasicOption[] = [
    { label: "Editar", id: "edit" },
    { label: "Eliminar", id: "delete" },
    { label: "Compartir", id: "share" },
    { label: "Duplicar", id: "duplicate" },
  ];

  // Opciones con iconos usando renderOption
  const optionsWithIcons: ActionOption[] = [
    { label: "Editar", icon: "fa-edit", action: "edit" },
    { label: "Eliminar", icon: "fa-trash", action: "delete" },
    { label: "Compartir", icon: "fa-share", action: "share" },
    { label: "Duplicar", icon: "fa-copy", action: "duplicate" },
  ];

  // Opciones complejas usando renderOption
  const complexOptions: ActionOption[] = [
    { label: "Ver Perfil", icon: "fa-user", action: "profile" },
    { label: "Configuración", icon: "fa-cog", action: "settings" },
    { label: "Cerrar Sesión", icon: "fa-sign-out-alt", action: "logout" },
  ];

  // Opciones con estructura diferente usando getOptionLabel
  const userOptions: UserOption[] = [
    { id: 1, name: "Juan Pérez", email: "juan@ejemplo.com", role: "Admin" },
    { id: 2, name: "María García", email: "maria@ejemplo.com", role: "User" },
    { id: 3, name: "Carlos López", email: "carlos@ejemplo.com", role: "User" },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="DropdownMenu - Variantes y Ejemplos">
        <div className="space-y-10">
          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Uso básico
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente DropdownMenu muestra un menú desplegable con
              opciones. Por defecto, muestra un botón con tres puntos
              horizontales. Al hacer clic, se abre un menú flotante con las
              opciones. Las opciones deben ser objetos con una propiedad{" "}
              <code>label</code> o usar <code>getOptionLabel</code>.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <DropdownMenu<BasicOption>
                  options={basicOptions}
                  onOptionSelected={(item) => {
                    setSelectedItem(item);
                  }}
                />
                {selectedItem && (
                  <p
                    className="text-sm"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Opción seleccionada: <strong>{selectedItem.label}</strong>{" "}
                    (id: {selectedItem.id})
                  </p>
                )}
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Opciones con iconos usando renderOption
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando <code>renderOption</code> puedes personalizar completamente
              cómo se renderiza cada opción, incluyendo iconos, badges u otros
              componentes.
            </p>
            <div className="space-y-4">
              <DropdownMenu<ActionOption>
                options={optionsWithIcons}
                onOptionSelected={(item) => {
                  console.log("Opción seleccionada:", item);
                }}
                renderOption={(item) => (
                  <span>
                    <i className={`fa ${item.icon} mr-2`} />
                    {item.label}
                  </span>
                )}
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Opciones complejas con renderOption
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo de menú con opciones que incluyen múltiples elementos como
              badges y diferentes estilos usando <code>renderOption</code>.
            </p>
            <div className="space-y-4">
              <DropdownMenu<ActionOption>
                options={complexOptions}
                onOptionSelected={(item) => {
                  console.log("Opción compleja seleccionada:", item);
                }}
                renderOption={(item) => {
                  if (item.action === "profile") {
                    return (
                      <div className="flex items-center justify-between w-full">
                        <span className="mr-2">
                          <i className={`fa ${item.icon} mr-2`} />
                          {item.label}
                        </span>
                        <Badge variant="info" size="sm">
                          Nuevo
                        </Badge>
                      </div>
                    );
                  }
                  if (item.action === "logout") {
                    return (
                      <div className="flex items-center text-[var(--color-danger)]">
                        <i className={`fa ${item.icon} mr-2`} />
                        {item.label}
                      </div>
                    );
                  }
                  return (
                    <div className="flex items-center">
                      <i className={`fa ${item.icon} mr-2`} />
                      {item.label}
                    </div>
                  );
                }}
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Usando getOptionLabel
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cuando los objetos no tienen una propiedad <code>label</code>,
              puedes usar <code>getOptionLabel</code> para especificar cómo
              obtener el texto a mostrar.
            </p>
            <div className="space-y-4">
              <DropdownMenu<UserOption>
                options={userOptions}
                onOptionSelected={(item) => {
                  console.log("Usuario seleccionado:", item);
                }}
                getOptionLabel={(item) => item.name}
              />
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Reemplazar con opción única (replaceOnSingleOption)
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Cuando <code>replaceOnSingleOption</code> es <code>true</code> y
              hay una sola opción, el componente muestra directamente la opción
              en lugar del botón trigger. Útil cuando solo hay una acción
              disponible y no necesitas un menú desplegable.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Con replaceOnSingleOption=false (por defecto):
                  </p>
                  <DropdownMenu<BasicOption>
                    options={[{ label: "Única acción", id: "single" }]}
                    onOptionSelected={(item) => {
                      console.log("Opción seleccionada:", item);
                    }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Con replaceOnSingleOption=true:
                  </p>
                  <DropdownMenu<BasicOption>
                    options={[{ label: "Única acción", id: "single" }]}
                    onOptionSelected={(item) => {
                      console.log("Opción seleccionada:", item);
                    }}
                    replaceOnSingleOption={true}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Con renderNode personalizado
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Usando la prop <code>renderNode</code> puedes personalizar el
              elemento que activa el menú. En lugar del botón con tres puntos,
              puedes usar cualquier componente React.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <DropdownMenu<BasicOption>
                  options={basicOptions}
                  onOptionSelected={(item) => {
                    console.log("Opción seleccionada:", item);
                  }}
                  renderNode={
                    <Button variant="primary" icon="fa-cog">
                      Menú de Acciones
                    </Button>
                  }
                />
                <DropdownMenu<BasicOption>
                  options={basicOptions}
                  onOptionSelected={(item) => {
                    console.log("Opción seleccionada:", item);
                  }}
                  renderNode={
                    <Button variant="outline" icon="fa-ellipsis-h">
                      Más opciones
                    </Button>
                  }
                />
                <DropdownMenu<BasicOption>
                  options={basicOptions}
                  onOptionSelected={(item) => {
                    console.log("Opción seleccionada:", item);
                  }}
                  renderNode={
                    <div className="flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-secondary)] rounded cursor-pointer hover:bg-[var(--color-bg-hover)] transition-colors">
                      <i className="fa fa-user-circle" />
                      <span>Usuario</span>
                      <i className="fa fa-chevron-down text-xs" />
                    </div>
                  }
                />
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Posicionamiento inteligente
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El menú se posiciona automáticamente arriba o abajo según el
              espacio disponible en la pantalla. Prueba hacer scroll hacia abajo
              y abrir el menú cerca del borde inferior de la pantalla.
            </p>
            <div className="space-y-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <DropdownMenu<BasicOption>
                    options={basicOptions}
                    onOptionSelected={(item) => {
                      console.log("Opción seleccionada:", item);
                    }}
                  />
                </div>
                <div
                  className="h-96 flex items-end justify-center"
                  style={{ minHeight: "400px" }}
                >
                  <DropdownMenu<BasicOption>
                    options={basicOptions}
                    onOptionSelected={(item) => {
                      console.log("Opción seleccionada:", item);
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Ejemplo en tabla
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Ejemplo de uso común: menú de acciones en una fila de tabla.
            </p>
            <div className="space-y-4">
              <div className="border border-[var(--color-border-default)] rounded">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[var(--color-border-default)]">
                      <th
                        className="px-4 py-2 text-left text-sm font-semibold"
                        style={{ color: "var(--flysoft-text-primary)" }}
                      >
                        Nombre
                      </th>
                      <th
                        className="px-4 py-2 text-left text-sm font-semibold"
                        style={{ color: "var(--flysoft-text-primary)" }}
                      >
                        Email
                      </th>
                      <th
                        className="px-4 py-2 text-right text-sm font-semibold"
                        style={{ color: "var(--flysoft-text-primary)" }}
                      >
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {userOptions.map((user) => (
                      <tr
                        key={user.id}
                        className="border-b border-[var(--color-border-default)] hover:bg-[var(--color-bg-hover)]"
                      >
                        <td
                          className="px-4 py-2 text-sm"
                          style={{ color: "var(--flysoft-text-primary)" }}
                        >
                          {user.name}
                        </td>
                        <td
                          className="px-4 py-2 text-sm"
                          style={{ color: "var(--flysoft-text-secondary)" }}
                        >
                          {user.email}
                        </td>
                        <td className="px-4 py-2 text-right">
                          <DropdownMenu<ActionOption>
                            options={optionsWithIcons}
                            onOptionSelected={(item) => {
                              console.log(
                                `Acción ${item.action} para usuario:`,
                                user.name
                              );
                            }}
                            renderOption={(item) => (
                              <span>
                                <i className={`fa ${item.icon} mr-2`} />
                                {item.label}
                              </span>
                            )}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Características
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                <ul
                  className="list-disc list-inside space-y-2 text-sm"
                  style={{ color: "var(--flysoft-text-secondary)" }}
                >
                  <li>
                    <strong>Genérico y tipado:</strong> El componente es
                    genérico y acepta cualquier tipo de objeto, manteniendo la
                    seguridad de tipos
                  </li>
                  <li>
                    <strong>Posicionamiento inteligente:</strong> El menú se
                    posiciona automáticamente arriba o abajo según el espacio
                    disponible en la pantalla
                  </li>
                  <li>
                    <strong>Cierre automático:</strong> El menú se cierra al
                    hacer clic fuera de él o al presionar la tecla Escape
                  </li>
                  <li>
                    <strong>Renderizado flexible:</strong> Usa{" "}
                    <code>renderOption</code> para renderizado personalizado,{" "}
                    <code>getOptionLabel</code> para obtener el label, o la
                    propiedad <code>label</code> por defecto
                  </li>
                  <li>
                    <strong>Trigger personalizable:</strong> Puedes usar{" "}
                    <code>renderNode</code> para personalizar el elemento que
                    activa el menú
                  </li>
                  <li>
                    <strong>Callback de selección:</strong> El callback{" "}
                    <code>onOptionSelected</code> recibe el objeto completo
                    seleccionado, no solo el índice
                  </li>
                  <li>
                    <strong>Estilos temáticos:</strong> Respeta las variables
                    CSS del tema actual
                  </li>
                  <li>
                    <strong>Accesibilidad:</strong> Soporte para navegación por
                    teclado (Escape para cerrar)
                  </li>
                  <li>
                    <strong>Opción única:</strong> Con{" "}
                    <code>replaceOnSingleOption</code> puedes mostrar
                    directamente la opción cuando solo hay una disponible, sin
                    necesidad de un menú desplegable
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Props
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Prop
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Tipo
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Requerido
                    </th>
                    <th
                      className="px-4 py-2 text-left text-sm font-semibold"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      Descripción
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      options
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      T[]
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Sí
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Array de opciones genéricas. Por defecto se asume que
                      tienen una propiedad <code>label</code>, o se puede usar{" "}
                      <code>getOptionLabel</code>.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      onOptionSelected
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      (item: T) =&gt; void
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Sí
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Callback que se ejecuta cuando se selecciona una opción.
                      Recibe el objeto completo seleccionado.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      renderNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Elemento personalizado que activa el menú. Si no se
                      proporciona, se muestra un botón ghost con tres puntos
                      horizontales.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      getOptionLabel
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      (item: T) =&gt; string
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Función para obtener el label de cada opción. Si no se
                      proporciona, se usa la propiedad <code>label</code> del
                      objeto.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      renderOption
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      (item: T) =&gt; ReactNode
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Función para renderizar completamente cada opción. Si se
                      define, se ignora <code>getOptionLabel</code> y la
                      propiedad <code>label</code>.
                    </td>
                  </tr>
                  <tr className="border-b border-[var(--color-border-default)]">
                    <td
                      className="px-4 py-2 text-sm font-mono"
                      style={{ color: "var(--flysoft-text-primary)" }}
                    >
                      replaceOnSingleOption
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      boolean
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      No
                    </td>
                    <td
                      className="px-4 py-2 text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      Si es <code>true</code> y hay una sola opción, muestra
                      directamente la opción en lugar del trigger (botón con
                      tres puntos o renderNode). Por defecto es{" "}
                      <code>false</code>.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default DropdownMenuDocs;
