import { ListCrudProvider } from "../../contexts/ListCrudContext";
import { empresaService } from "../docMockServices";
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
  const { listarPaginados } = empresaService;
  return (
    <ListCrudProvider getPromise={listarPaginados}>
      <ListCrudDocsContent />
    </ListCrudProvider>
  );
};
