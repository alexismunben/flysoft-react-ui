import { useEffect } from "react";
import { useAppLayout } from "../../contexts";
import { ListCrudProvider } from "../../contexts/ListCrudContext";
import {
  empresaService,
  personaService,
  type Empresa,
} from "../docMockServices";
import { ListCrudDocsContentPersonas } from "./ListCrudDocsContentPersonas";
import { Collection } from "../../components";
import type { Persona } from "../docMockServices";
import { ListCrudDocsContentEmpresas } from "./ListCrudDocsContentEmpresas";

export const ListCrudDocs = () => {
  const { listarPaginados, eliminar, editar, agregar } = personaService;
  const { listarPaginados: listarPaginadosEmpresa } = empresaService;

  const { setNavBarLeftNode } = useAppLayout();

  useEffect(() => {
    setNavBarLeftNode(
      <h3 className="text-2xl font-semibold">ListCrudContext</h3>
    );
    return () => {
      setNavBarLeftNode(<></>);
    };
  }, [setNavBarLeftNode]);

  return (
    <Collection>
      <ListCrudProvider
        getPromise={listarPaginados}
        postPromise={{
          execute: (persona: Persona) => agregar(persona),
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
      </ListCrudProvider>

      <ListCrudProvider<Empresa>
        getPromise={listarPaginadosEmpresa}
        urlParams={["filtroEmpresa", "idEmpresaEmpresa"]}
      >
        <ListCrudDocsContentEmpresas />
      </ListCrudProvider>
    </Collection>
  );
};
