import { useEffect } from "react";
import { useAppLayout } from "../../contexts";
import { ListCrudProvider } from "../../contexts/ListCrudContext";
import { personaService } from "../docMockServices";
import { ListCrudDocsContent } from "./ListCrudDocsContent";

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
  const { listarPaginados } = personaService;

  const { setNavBarLeftNode } = useAppLayout();

  useEffect(() => {
    setNavBarLeftNode(
      <h3 className="text-2xl font-semibold">ListCrudContext</h3>
    );
  }, [setNavBarLeftNode]);

  return (
    <ListCrudProvider getPromise={listarPaginados}>
      <ListCrudDocsContent />
    </ListCrudProvider>
  );
};
