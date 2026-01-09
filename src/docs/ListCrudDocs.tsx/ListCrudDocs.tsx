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

/**
 * Componente de Documentación del ListCrudContext
 *
 * Este componente muestra cómo usar el ListCrudContext con un servicio mock
 * para propósitos de documentación y desarrollo.
 *
 * El servicio mock simula la operación principal:
 * - getPromise: Obtiene una lista de items (Array o PaginationInterface)
 */
export const ListCrudDocs = () => {
  const { listarPaginados, eliminar } = personaService;
  const { listarPaginados: listarPaginadosEmpresa } = empresaService;

  const { setNavBarLeftNode } = useAppLayout();

  useEffect(() => {
    setNavBarLeftNode(
      <h3 className="text-2xl font-semibold">ListCrudContext</h3>
    );
  }, [setNavBarLeftNode]);

  return (
    <Collection>
      <ListCrudProvider
        getPromise={listarPaginados}
        deletePromise={eliminar}
        urlParams={["filtro", "idEmpresa"]}
      >
        <ListCrudDocsContentPersonas />
      </ListCrudProvider>

      <ListCrudProvider<Empresa>
        getPromise={listarPaginadosEmpresa}
        urlParams={["filtroEmpresa", "idEmpresaEmpresa"]}
      >
        Empresas
      </ListCrudProvider>
    </Collection>
  );
};
