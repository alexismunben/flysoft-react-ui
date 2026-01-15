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
            }}
            deletePromise={{
              execute: eliminarEmpresa,
              successMessage: "Persona eliminada correctamente",
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
    </Collection>
  );
};
