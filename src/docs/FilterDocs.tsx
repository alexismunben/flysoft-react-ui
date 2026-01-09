import React from "react";
import { useSearchParams } from "react-router-dom";
import { Card, Filter, Collection, FiltersDialog } from "../index";
import dayjs from "dayjs";
import { personaService } from "./docMockServices/personaService";

const FilterDocs: React.FC = () => {
  const [searchParams] = useSearchParams();

  const currentFilterValue = searchParams.get("filtro");

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <Card title="Filter - Gestión de Filtros con Query Parameters">
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
              El componente Filter permite gestionar filtros que se sincronizan
              con los query parameters de la URL. El valor se obtiene
              automáticamente del query parameter que coincida con el{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                paramName
              </code>{" "}
              proporcionado. Al setear el filtro, se actualiza la URL sin perder
              los demás query parameters y sin agregar una nueva entrada al
              historial del navegador.
            </p>
            <Card title="Ejemplo básico">
              <div className="space-y-4">
                <Filter paramName="filtro" label="Filtro" />
                {currentFilterValue && (
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p className="text-sm">
                      <span className="font-semibold">Valor del filtro:</span>{" "}
                      <span style={{ color: "var(--flysoft-text-secondary)" }}>
                        {currentFilterValue}
                      </span>
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      URL actual:{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                        ?filtro={currentFilterValue}
                      </code>
                    </p>
                    <p
                      className="text-xs mt-2"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      💡 El componente muestra el valor actual del query
                      parameter. Al hacer clic en "setear", se actualiza la URL
                      con el valor del estado interno.
                    </p>
                  </div>
                )}
                {!currentFilterValue && (
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p
                      className="text-sm"
                      style={{ color: "var(--flysoft-text-secondary)" }}
                    >
                      💡 El filtro está vacío. El componente mostrará
                      "undefined" hasta que se establezca un valor.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Sincronización con URL
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente se sincroniza automáticamente con los query
              parameters de la URL. Si la URL contiene el parámetro al cargar la
              página, el componente mostrará ese valor. Si cambias la URL
              manualmente, el componente se actualizará automáticamente.
            </p>
            <Card title="Ejemplo con sincronización">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Prueba agregar{" "}
                    <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                      ?test=valor123
                    </code>{" "}
                    a la URL y observa cómo el componente se actualiza
                    automáticamente.
                  </p>
                </div>
                <Filter paramName="test" label="Filtro de prueba" />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-xs"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Al hacer clic en "setear", la URL se actualiza usando{" "}
                    <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                      replace: true
                    </code>
                    , lo que significa que al presionar el botón "atrás" del
                    navegador, volverás a la página anterior, no a la misma
                    página sin el parámetro.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Múltiples filtros
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes usar múltiples componentes Filter con diferentes{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                paramName
              </code>{" "}
              para gestionar varios filtros simultáneamente. Cada filtro
              mantiene su propio estado y se sincroniza con su respectivo query
              parameter.
            </p>
            <Card title="Ejemplo con múltiples filtros">
              <div className="space-y-4">
                <Collection direction="row" gap="1rem" wrap>
                  <Filter
                    paramName="categoria"
                    label="Categoría"
                    filterType="text"
                  />
                  <Filter
                    paramName="cantidad"
                    label="Cantidad"
                    filterType="number"
                    min={0}
                    max={1000}
                  />
                  <Filter
                    paramName="fecha"
                    label="Fecha"
                    filterType="date"
                    staticOptions={[
                      { text: "Hoy", value: dayjs().format("YYYY-MM-DD") },
                      {
                        text: "Ayer",
                        value: dayjs().subtract(1, "day").format("YYYY-MM-DD"),
                      },
                      {
                        text: "Última semana",
                        value: dayjs().subtract(1, "week").format("YYYY-MM-DD"),
                      },
                      {
                        text: "Último mes",
                        value: dayjs()
                          .subtract(1, "month")
                          .format("YYYY-MM-DD"),
                      },
                      {
                        text: "Último año",
                        value: dayjs().subtract(1, "year").format("YYYY-MM-DD"),
                      },
                    ].map((option) => ({
                      text: option.text,
                      value: option.value,
                    }))}
                  />
                  <Filter
                    paramName="estado"
                    label="Estado"
                    filterType="autocomplete"
                    options={[
                      { label: "Activo", value: "activo" },
                      { label: "Inactivo", value: "inactivo" },
                      { label: "Pendiente", value: "pendiente" },
                      { label: "Cancelado", value: "cancelado" },
                    ]}
                  />
                  <Filter
                    paramName="busqueda"
                    label="Búsqueda"
                    filterType="search"
                  />
                </Collection>
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-xs"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Cada filtro mantiene su propio query parameter. Puedes
                    tener varios filtros activos simultáneamente en la URL. Los
                    filtros de tipo date guardan el valor como "yyyy-mm-dd" pero
                    lo muestran como "dd/mm/yyyy". El filtro de tipo search
                    muestra directamente el input sin panel desplegable y emite
                    cambios al presionar Enter o hacer click en el ícono.
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Filtro de tipo Search
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El filtro de tipo{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                search
              </code>{" "}
              muestra directamente un campo de búsqueda sin panel desplegable.
              Es ideal para búsquedas rápidas donde el usuario puede escribir y
              presionar Enter para aplicar el filtro. El ícono cambia
              dinámicamente: muestra un ícono de búsqueda cuando no hay valor y
              un ícono de X cuando hay un valor para limpiarlo.
            </p>
            <Card title="Ejemplo de filtro Search">
              <div className="space-y-4">
                <Filter
                  paramName="busquedaTexto"
                  label="Buscar"
                  filterType="search"
                  inputWidth="300px"
                />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <span className="font-semibold">Características:</span>
                  </p>
                  <ul
                    className="list-disc list-inside space-y-1 text-xs mt-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <li>Muestra el input directamente sin panel desplegable</li>
                    <li>
                      Al presionar Enter, emite los cambios y actualiza la URL
                    </li>
                    <li>
                      El ícono cambia: búsqueda (fa-search) cuando está vacío, X
                      (fa-times) cuando hay valor
                    </li>
                    <li>
                      Al hacer click en el ícono X, limpia el valor y emite
                      undefined
                    </li>
                    <li>
                      Al hacer click en el ícono de búsqueda, emite los cambios
                      (submit)
                    </li>
                    <li>
                      Se sincroniza automáticamente con el query parameter
                      asociado
                    </li>
                  </ul>
                </div>
                {searchParams.get("busquedaTexto") && (
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p className="text-sm">
                      <span className="font-semibold">Valor actual:</span>{" "}
                      <span style={{ color: "var(--flysoft-text-secondary)" }}>
                        {searchParams.get("busquedaTexto")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Filtro de tipo SearchSelect
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El filtro de tipo{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                searchSelect
              </code>{" "}
              muestra un panel desplegable con un{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                SearchSelectInput
              </code>{" "}
              que permite buscar y seleccionar opciones desde una fuente de
              datos asíncrona. Requiere funciones de búsqueda que devuelvan
              Promises, ideal para búsquedas en APIs o bases de datos.
            </p>
            <Card title="Ejemplo de filtro SearchSelect">
              <div className="space-y-4">
                <Filter
                  paramName="persona"
                  label="Persona"
                  filterType="searchSelect"
                  onSearchPromiseFn={async (text: string) => {
                    return (await personaService.listar({
                      filtro: text,
                    })) as any;
                  }}
                  onSingleSearchPromiseFn={async (id: string) => {
                    return (await personaService.buscarPorId(
                      Number(id)
                    )) as any;
                  }}
                  getOptionLabel={(persona: any) => persona.nombre}
                  getOptionValue={(persona: any) => persona.id}
                />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <span className="font-semibold">Características:</span>
                  </p>
                  <ul
                    className="list-disc list-inside space-y-1 text-xs mt-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <li>
                      Requiere{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                        onSearchPromiseFn
                      </code>{" "}
                      para buscar opciones (recibe texto y devuelve Promise con
                      array o PaginationInterface)
                    </li>
                    <li>
                      Requiere{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                        onSingleSearchPromiseFn
                      </code>{" "}
                      para buscar una opción individual por su valor (recibe el
                      valor y devuelve Promise con el objeto o undefined)
                    </li>
                    <li>
                      Opcionalmente puede recibir{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                        getOptionLabel
                      </code>
                      ,{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                        getOptionValue
                      </code>
                      , y{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                        renderOption
                      </code>{" "}
                      para personalizar cómo se muestran las opciones
                    </li>
                    <li>
                      Al seleccionar una opción, se guarda el valor (usando{" "}
                      <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                        getOptionValue
                      </code>
                      ) pero se muestra el label en el badge
                    </li>
                    <li>
                      Se sincroniza automáticamente con el query parameter
                      asociado
                    </li>
                  </ul>
                </div>
                {searchParams.get("persona") && (
                  <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                    <p className="text-sm">
                      <span className="font-semibold">
                        ID de persona seleccionada:
                      </span>{" "}
                      <span style={{ color: "var(--flysoft-text-secondary)" }}>
                        {searchParams.get("persona")}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Preservación de otros query parameters
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Al setear un filtro, el componente preserva todos los demás query
              parameters existentes en la URL. Esto permite combinar filtros con
              otros parámetros como paginación, ordenamiento, etc.
            </p>
            <Card title="Ejemplo con otros parámetros">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    Prueba agregar{" "}
                    <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                      ?pagina=2&orden=asc
                    </code>{" "}
                    a la URL y luego setear un filtro. Observa cómo se preservan
                    los parámetros existentes.
                  </p>
                </div>
                <Filter
                  paramName="filtroCompleto"
                  label="Filtro completo"
                  filterType="text"
                />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p className="text-sm">
                    <span className="font-semibold">
                      Query parameters actuales:
                    </span>{" "}
                    <span style={{ color: "var(--flysoft-text-secondary)" }}>
                      {searchParams.toString() || "ninguno"}
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Comportamiento del historial
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente usa{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                replace: true
              </code>{" "}
              al actualizar la URL, lo que significa que reemplaza la entrada
              actual del historial en lugar de agregar una nueva. Esto permite
              que al presionar el botón "atrás" del navegador, vuelvas a la
              página anterior, no a la misma página sin el parámetro.
            </p>
            <Card title="Prueba el historial">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Sigue estos pasos para probar el comportamiento del
                    historial:
                  </p>
                  <ol
                    className="list-decimal list-inside space-y-1 text-xs mt-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <li>Navega a otra página (o recarga esta página)</li>
                    <li>Vuelve a esta página</li>
                    <li>Setear un filtro</li>
                    <li>Presiona el botón "atrás" del navegador</li>
                    <li>
                      Deberías volver a la página anterior, no a esta misma
                      página sin el parámetro
                    </li>
                  </ol>
                </div>
                <Filter paramName="historial" label="Filtro de historial" />
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              FiltersDialog - Dialog de Filtros
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El componente{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                FiltersDialog
              </code>{" "}
              permite agrupar múltiples filtros en un dialog que se abre al
              hacer clic en un botón con ícono de filtrar. Los filtros no
              modifican la URL directamente, sino que se actualizan en un estado
              interno. Solo cuando el usuario hace clic en "Aplicar filtros", se
              actualizan todos los query parameters de una vez.
            </p>
            <Card title="Ejemplo básico de FiltersDialog">
              <div className="space-y-4">
                <FiltersDialog
                  filters={[
                    {
                      filterType: "text",
                      paramName: "nombre",
                      label: "Nombre",
                    },
                    {
                      filterType: "number",
                      paramName: "edad",
                      label: "Edad",
                      min: 0,
                      max: 120,
                    },
                    {
                      filterType: "date",
                      paramName: "fechaNacimiento",
                      label: "Fecha de Nacimiento",
                    },
                  ]}
                />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-xs"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Haz clic en el botón de filtrar para abrir el dialog. Los
                    filtros se actualizan en tiempo real pero no modifican la
                    URL hasta que hagas clic en "Aplicar filtros".
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              FiltersDialog con Autocomplete
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              Puedes incluir filtros de tipo autocomplete en el{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                FiltersDialog
              </code>
              . Todos los tipos de filtros son compatibles.
            </p>
            <Card title="Ejemplo con Autocomplete">
              <div className="space-y-4">
                <FiltersDialog
                  filters={[
                    {
                      filterType: "text",
                      paramName: "busqueda",
                      label: "Búsqueda",
                    },
                    {
                      filterType: "autocomplete",
                      paramName: "estado",
                      label: "Estado",
                      options: [
                        { label: "Activo", value: "activo" },
                        { label: "Inactivo", value: "inactivo" },
                        { label: "Pendiente", value: "pendiente" },
                        { label: "Cancelado", value: "cancelado" },
                      ],
                    },
                    {
                      filterType: "date",
                      paramName: "fecha",
                      label: "Fecha",
                      staticOptions: [
                        { text: "Hoy", value: dayjs().format("YYYY-MM-DD") },
                        {
                          text: "Ayer",
                          value: dayjs()
                            .subtract(1, "day")
                            .format("YYYY-MM-DD"),
                        },
                        {
                          text: "Última semana",
                          value: dayjs()
                            .subtract(1, "week")
                            .format("YYYY-MM-DD"),
                        },
                      ],
                    },
                  ]}
                />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-xs"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Puedes combinar diferentes tipos de filtros en un solo
                    dialog. Todos se aplican simultáneamente cuando haces clic
                    en "Aplicar filtros".
                  </p>
                </div>
              </div>
            </Card>
          </section>

          <section>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "var(--flysoft-text-primary)" }}
            >
              Comportamiento de FiltersDialog
            </h3>
            <p
              className="mb-4 text-sm"
              style={{ color: "var(--flysoft-text-secondary)" }}
            >
              El{" "}
              <code className="px-1 py-0.5 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded text-xs">
                FiltersDialog
              </code>{" "}
              tiene un comportamiento especial: los filtros no modifican la URL
              mientras el usuario los está configurando. Solo cuando hace clic
              en "Aplicar filtros", se actualizan todos los query parameters de
              una vez. Esto permite que el usuario configure múltiples filtros
              antes de aplicarlos.
            </p>
            <Card title="Ventajas de FiltersDialog">
              <div className="space-y-4">
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p
                    className="text-sm mb-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <span className="font-semibold">Ventajas:</span>
                  </p>
                  <ul
                    className="list-disc list-inside space-y-1 text-xs mt-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    <li>
                      Los filtros se configuran sin modificar la URL hasta que
                      se aplican
                    </li>
                    <li>
                      Permite configurar múltiples filtros antes de aplicarlos
                    </li>
                    <li>
                      Todos los filtros se aplican simultáneamente, evitando
                      múltiples actualizaciones de URL
                    </li>
                    <li>
                      El botón "Cerrar" descarta los cambios sin aplicarlos
                    </li>
                    <li>
                      Al abrir el dialog, se sincroniza con los valores actuales
                      de la URL
                    </li>
                  </ul>
                </div>
                <FiltersDialog
                  filters={[
                    {
                      filterType: "text",
                      paramName: "ejemplo1",
                      label: "Ejemplo 1",
                    },
                    {
                      filterType: "text",
                      paramName: "ejemplo2",
                      label: "Ejemplo 2",
                    },
                  ]}
                />
                <div className="p-3 bg-[var(--color-bg-default)] border border-[var(--color-border-default)] rounded">
                  <p className="text-sm">
                    <span className="font-semibold">
                      Query parameters actuales:
                    </span>{" "}
                    <span style={{ color: "var(--flysoft-text-secondary)" }}>
                      {searchParams.toString() || "ninguno"}
                    </span>
                  </p>
                  <p
                    className="text-xs mt-2"
                    style={{ color: "var(--flysoft-text-secondary)" }}
                  >
                    💡 Configura los filtros en el dialog y observa cómo la URL
                    no cambia hasta que hagas clic en "Aplicar filtros".
                  </p>
                </div>
              </div>
            </Card>
          </section>
        </div>
      </Card>
    </div>
  );
};

export default FilterDocs;
