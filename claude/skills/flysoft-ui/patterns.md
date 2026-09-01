# Cómo se usa flysoft-react-ui

Esto es lo que los tipos no dicen: cuándo elegir un componente sobre otro, qué
forma tiene que tener un genérico, y cómo se arma una página completa. Para
firmas y props, `references/`.

---

## El sistema de densidad

Es lo que más se malinterpreta, porque no se ve en las props de ningún
componente.

La densidad es **global y se setea una sola vez**, en el provider:

```tsx
<AppLayoutProvider density="compact">
  <App />
</AppLayoutProvider>
```

Los valores son `"comfortable" | "compact" | "dense"`. El provider escribe 26
variables CSS (`--flysoft-density-*`) en el `<html>`, y **todos** los componentes
de la librería leen de ahí: padding, tipografía, alto de los controles, alto de
las filas de `DataTable`, radio de los inputs, separación de `Collection`.

La consecuencia práctica es la que importa:

> **No pases `compact` ni `size="sm"` componente por componente para achicar la
> UI.** Esas props existen y funcionan, pero son overrides puntuales. Si las usás
> para lograr una UI compacta, terminás con una densidad distinta en cada
> pantalla, y el día que cambie la densidad global esos componentes no la siguen.

Si toda la app tiene que verse más compacta, se cambia una palabra en el
provider. Si necesitás densidad distinta sólo en una sección, hay un override
por subárbol:

```tsx
<Collection density="dense">
  {/* estos hijos y sus descendientes usan la escala "dense" */}
</Collection>
```

La densidad se persiste en `localStorage` bajo `"flysoft-density"` y se puede
cambiar en runtime:

```tsx
const { density, setDensity } = useAppLayout();
```

Para forzar un valor e ignorar lo guardado, `forceInitialDensity`. Los valores
concretos de cada token están en `references/theming.md`.

---

## Qué forma tiene que tener `T`

Varios componentes son genéricos sin restricción: el tipo acepta cualquier `T`,
pero el componente en runtime espera algo. Este es el contrato real.

### `AutocompleteInput<T, K>` y `SearchSelectInput<T, K>`

Sin `getOptionLabel` / `getOptionValue`, el componente lee `item.label` e
`item.value`. O sea que `T` tiene que ser `{ label: string; value: string }`
—las interfaces `AutocompleteOption` y `SearchSelectOption` son exactamente eso.

Con tus propios objetos, pasás los dos getters y `T` puede ser lo que quieras:

```tsx
<AutocompleteInput<Cliente, number>
  label="Cliente"
  options={clientes}
  getOptionLabel={(c) => c.razonSocial}
  getOptionValue={(c) => c.id}
/>
```

Si omitís los getters con un `T` que no tiene `label`, no hay error de
compilación: la lista se renderiza con todas las etiquetas vacías. Es el modo de
fallar más común de estos dos componentes.

### `DataTable<T>`

`column.value` acepta un string, que se usa como nombre de propiedad de la fila.
**Si la propiedad no existe, se renderiza el string tal cual**, como texto
literal. Un typo en el nombre del campo no rompe: te muestra `"nomrbe"` en la
celda. El tipo no puede detectarlo porque `value` es `string`, no `keyof T`.

Cuando el dato no sale de una propiedad directa, usá la forma de función, que sí
está tipada:

```tsx
{ header: "Total", value: (row) => currencyFormat(row.importe * row.cantidad) }
```

### `Menu<T>` y `DropdownMenu<T>`

Mismo contrato que `AutocompleteInput`: sin `getOptionLabel`, leen `item.label`.

### `CrudProvider<T>` / `useCrud<T>`

`T` es la entidad. Ojo con la forma de lo que devuelve `useCrud`: las
operaciones **no son funciones**, son objetos con `execute` e `isLoading`
propios.

```tsx
const { list, fetchItems, createItem } = useCrud<Usuario>();

await fetchItems.execute({ pagina: 2 });   // correcto
await fetchItems();                         // no compila
```

---

## Cuándo usar qué

**`Card` vs `Collection` vs `DataField`.** `Card` es una superficie con título,
acciones y footer — un bloque de contenido con identidad. `Collection` no dibuja
nada: sólo apila o alinea con la separación de la densidad activa; es el
reemplazo de `<div className="flex gap-4">`. `DataField` es un par
etiqueta-valor para pantallas de detalle, no un contenedor.

**`AutocompleteInput` vs `SearchSelectInput`.** Si las opciones ya están en
memoria y son unas pocas decenas, `AutocompleteInput`. Si hay que ir al backend
a buscarlas, `SearchSelectInput`, que abre un diálogo y recibe dos promesas: una
para buscar por texto y otra para resolver un valor ya seleccionado
(`onSingleSearchPromiseFn`, necesaria para poder mostrar el label cuando la
pantalla carga con un valor preexistente).

**`DataTable` vs `Collection` de `Card`s.** Tabla cuando las filas comparten
columnas y se comparan entre sí. Cards cuando cada ítem tiene forma propia.

**`Dialog` vs `DropdownPanel`.** `Dialog` bloquea e interrumpe: confirmaciones y
formularios. `DropdownPanel` es un popover anclado a un disparador, para filtros
y opciones.

**Template vs composición.** Los templates (`ListPattern`, `FormPattern`,
`LoginForm`) resuelven un caso entero. Sirven mientras tu caso sea el suyo; en
cuanto necesitás desviarte, componé con `Card` + `DataTable` + `Filter` en vez
de pelearle las props. `ListPattern` es el que más rinde porque el listado
paginado con filtros es siempre igual.

---

## Patrones

### Formulario con guardado async

`useAsyncRequest` envuelve la promesa, maneja el `isLoading` y dispara el
snackbar de éxito o error. Necesita un `SnackbarProvider` arriba —
`AppLayoutProvider` ya lo incluye.

```tsx
const { execute, isLoading } = useAsyncRequest({
  successMessage: "Guardado exitosamente",
  errorMessage: (err) => getErrorMessage(err),
});

const guardar = () =>
  execute(() => apiClient.post({ url: "/api/usuarios", body: { nombre, email } }));

return (
  <Card title="Nuevo usuario">
    <Collection>
      <Input label="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} icon="fa-user" />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} icon="fa-envelope" />
      <Button icon="fa-save" loading={isLoading} onClick={guardar}>Guardar</Button>
    </Collection>
  </Card>
);
```

`execute` devuelve el resultado de la promesa, o `undefined` si falló — así que
podés encadenar sin try/catch:

```tsx
const creado = await execute(() => apiClient.post<Usuario>({ url: "/api/usuarios", body }));
if (creado) navigate(`/usuarios/${creado.id}`);
```

### Confirmación con Dialog

`isOpen`, `title` y `children` son requeridas. Las acciones van en `footer`.

```tsx
<Dialog
  isOpen={mostrarConfirmacion}
  title="Confirmar eliminación"
  onClose={() => setMostrarConfirmacion(false)}
  footer={
    <>
      <Button variant="ghost" onClick={() => setMostrarConfirmacion(false)}>Cancelar</Button>
      <Button color="danger" loading={isLoading} onClick={eliminar}>Eliminar</Button>
    </>
  }
>
  <p>¿Está seguro? Esta acción no se puede deshacer.</p>
</Dialog>
```

Por defecto el click en el overlay **no** cierra el diálogo (`closeOnOverlayClick`
es `false`), que es lo que querés en una confirmación destructiva.

### Página de listado

Los `Filter` se sincronizan solos con el query string a través de `paramName`, y
`Pagination` hace lo mismo con `fieldName` (por defecto `"pagina"`). No hace
falta cablear nada entre ellos: el efecto que dispara la búsqueda escucha los
search params.

```tsx
function ListadoUsuarios() {
  const [searchParams] = useSearchParams();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [paginacion, setPaginacion] = useState({ page: 1, pages: 1, total: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const buscar = async () => {
      setIsLoading(true);
      try {
        const params = Object.fromEntries(searchParams);
        const data = await apiClient.get<PaginationInterface<Usuario>>({
          url: "/api/usuarios",
          params,
        });
        setUsuarios(data.list);
        setPaginacion({ page: data.page, pages: data.pages, total: data.total });
      } catch (error) {
        showSnackbar(getErrorMessage(error), "danger");
      } finally {
        setIsLoading(false);
      }
    };
    buscar();
  }, [searchParams]);

  const columns: DataTableColumn<Usuario>[] = [
    { header: "Nombre", value: "nombre" },
    { header: "Email", value: "email" },
    { header: "Alta", value: "fechaAlta", type: "date" },
    {
      actions: (row) => [
        <LinkButton key="ver" to={`/usuarios/${row.id}`} variant="ghost" icon="fa-eye" />,
      ],
    },
  ];

  return (
    <Collection>
      <Collection direction="row">
        <Filter filterType="search" paramName="nombre" label="Nombre" />
        <Filter
          filterType="autocomplete"
          paramName="rol"
          label="Rol"
          options={[
            { label: "Administrador", value: "admin" },
            { label: "Operador", value: "operador" },
          ]}
        />
      </Collection>

      <Card
        title="Usuarios"
        headerActions={<LinkButton to="/usuarios/nuevo" icon="fa-plus">Nuevo</LinkButton>}
      >
        <DataTable columns={columns} rows={usuarios} isLoading={isLoading} />
        <Pagination {...paginacion} isLoading={isLoading} />
      </Card>
    </Collection>
  );
}
```

`DataTable` formatea solo según `type`: `"currency"` a miles con dos decimales y
sin símbolo, `"numeric"` según el `locale` (por defecto `"es-AR"`), `"date"` a
`DD/MM/YYYY`. Las columnas `currency` y `numeric` además se alinean solas a la
derecha, no hace falta pasar `align`.

### El mismo listado con ListPattern

Cuando el caso es el estándar, `ListPattern` reemplaza todo el JSX de arriba:

```tsx
<ListPattern<Usuario>
  title="Usuarios"
  columns={columns}
  rows={usuarios}
  searchParamName="nombre"
  addButtonText="Nuevo"
  onAdd={() => navigate("/usuarios/nuevo")}
  filtersNode={<Filter filterType="autocomplete" paramName="rol" label="Rol" options={roles} />}
  page={paginacion.page}
  pages={paginacion.pages}
  total={paginacion.total}
  isLoading={isLoading}
/>
```

### Token de autenticación en el apiClient

Se registra una vez, y todas las llamadas lo mandan:

```tsx
setApiClientTokenProvider(() => user?.token?.accessToken);
```

Es un *provider*, no un valor: se evalúa en cada request, así que un refresh de
token se refleja solo sin volver a registrar nada.

### Controlar el drawer desde el contenido

En desktop el drawer está siempre visible; en móvil es un panel con overlay que
queda abierto después de navegar. Por eso los links del drawer lo cierran:

```tsx
const { closeLeftDrawer } = useLeftDrawer();

<LinkButton to="/inicio" onClick={closeLeftDrawer}>Inicio</LinkButton>
```

`useLeftDrawer()` lanza error fuera de un `AppLayout`. Para componentes que se
usan dentro y fuera, `useOptionalLeftDrawer()` devuelve `undefined`.

---

## Íconos

FontAwesome 5, estilo light. Se pasa sólo el nombre y la librería lo normaliza a
`fal fa-*`:

```tsx
<Button icon="fa-save">Guardar</Button>
```

No mezclar con otras librerías de íconos: no van a heredar el color ni el tamaño
del tema.

---

## Trampas verificadas

- **`CurrencyInput.onChange` está tipado `(value: any) => void`.** El valor real
  que recibís es `number`. Tipá tu handler como `number` igual.
- **`DataTable` con un `value` string que no existe en la fila** renderiza el
  string como texto, no falla. Revisá los nombres de campo.
- **`useCrud()` devuelve objetos, no funciones** (`fetchItems.execute()`).
- **`NavbarInterface.fullWidthNavbar` es requerida**, no opcional.
- **`Collection` es `direction="column"` por defecto**, no `row`.
- **`SnackbarContainer` es `position="top-right"` por defecto.**
- **`--color-primary-soft` se usa en `Filter` y `AutocompleteInput` pero no está
  definida** en el `@theme` de la librería. Si necesitás ese fondo, definila en
  tu app.
