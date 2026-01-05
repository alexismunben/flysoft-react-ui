import { useListCrud } from "../../contexts";
import { DataTable, Loader } from "../../components";
import type { Empresa } from "../docMockServices";

export const ListCrudDocsContent = () => {
  const { list, pagination, isLoading } = useListCrud<Empresa>();

  return (
    <div>
      {pagination}
      <Loader
        isLoading={isLoading}
        keepContentWhileLoading
        overlayClassName="bg-white/50 backdrop-blur-sm rounded-lg"
      >
        <DataTable<Empresa>
          columns={[{ header: "Nombre", value: (row) => row.nombre }]}
          rows={list || []}
          maxRows={10}
        />
      </Loader>
    </div>
  );
};
