import { useEffect } from "react";
import { useAppLayout } from "../../contexts";
import { CrudProvider } from "../../contexts/CrudContext";
import {
  empresaService,
  personaService,
  type Empresa,
} from "../docMockServices";
import { ListCrudDocsContentPersonas } from "./ListCrudDocsContentPersonas";
import { Collection, TabPanel, TabsGroup } from "../../components";
import type { Persona } from "../docMockServices";
import { ListCrudDocsContentEmpresas } from "./ListCrudDocsContentEmpresas";
import { useParams } from "react-router-dom";
import { ListCrudDocsContentEmpresaSingle } from "./ListCrudDocsContentEmpresaSingle";

export const ListCrudDocs = () => {
  const { listarPaginados, eliminar, editar, agregar } = personaService;
  const {
    listarPaginados: listarPaginadosEmpresa,
    buscarPorId,
    editar: editarEmpresa,
    eliminar: eliminarEmpresa,
  } = empresaService;

  const { setNavBarLeftNode } = useAppLayout();

  useEffect(() => {
    setNavBarLeftNode(<h3 className="text-2xl font-semibold">CrudContext</h3>);
    return () => {
      setNavBarLeftNode(<></>);
    };
  }, [setNavBarLeftNode]);

  const { id } = useParams();

  return (
    <Collection>
      <TabsGroup
        tabs={[
          { id: "personas", label: "Personas" },
          { id: "empresas", label: "Empresas" },
        ]}
        paramName="tab"
      >
        <TabPanel tabId="personas">
          <CrudProvider
            getPromise={listarPaginados}
            postPromise={{
              execute: agregar,
              successMessage: "Persona agregada correctamente",
            }}
            putPromise={{
              execute: (persona: Persona) =>
                editar(persona.id, persona as Partial<Persona>),
              successMessage: "Cambios guardados",
            }}
            deletePromise={{
              execute: eliminar,
              successMessage: "Persona eliminada correctamente",
            }}
            urlParams={["filtro", "idEmpresa"]}
          >
            <ListCrudDocsContentPersonas />
          </CrudProvider>
        </TabPanel>
        <TabPanel tabId="empresas">
          <CrudProvider<Empresa>
            getPromise={listarPaginadosEmpresa}
            putPromise={{
              execute: (empresa: Empresa) =>
                editarEmpresa(empresa.id, empresa as Partial<Empresa>),
              successMessage: "Cambios guardados",
              // Ejemplo de mensaje de error diferencial basado en el error
              errorMessage: (error) => {
                if (error?.status === 409)
                  return "El nombre de la empresa ya existe";
                return "Error al actualizar la empresa";
              },
            }}
            deletePromise={{
              execute: eliminarEmpresa,
              successMessage: "Empresa eliminada correctamente",
            }}
            getItemPromise={(params) => buscarPorId(params?.toString() || "")}
            pageParam="paginaEmpresa"
            urlParams={["filtroEmpresa", "idEmpresaEmpresa"]}
            singleItemId={id}
          >
            {id ? (
              <ListCrudDocsContentEmpresaSingle />
            ) : (
              <ListCrudDocsContentEmpresas />
            )}
          </CrudProvider>
        </TabPanel>
      </TabsGroup>

      <section className="mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-bold mb-4">
          <i className="fa fa-info-circle mr-2 text-blue-500"></i>
          Configuración de Feedback en Promesas
        </h3>
        <p className="text-sm mb-4">
          Las propiedades <code>postPromise</code>, <code>putPromise</code>,{" "}
          <code>deletePromise</code> y <code>getItemPromise</code>
          soportan configuración avanzada de feedback:
        </p>
        <ul className="list-disc list-inside space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li>
            <strong>Múltiplos Tipos:</strong> <code>errorMessage</code> acepta{" "}
            <code>string</code> o una función <code>(error) =&gt; string</code>.
          </li>
          <li>
            <strong>Feedback Opcional:</strong> Si no se define{" "}
            <code>errorMessage</code>, no se mostrará ningún snackbar ante
            errores.
          </li>
          <li>
            <strong>Simplificación:</strong> Internamente utiliza{" "}
            <code>useAsyncRequest</code> para unificar el comportamiento.
          </li>
        </ul>
      </section>
    </Collection>
  );
};
