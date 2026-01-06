import { useListCrud } from "../../contexts";
import { Card, DataTable, Loader } from "../../components";
import type { Persona } from "../docMockServices";

export const ListCrudDocsContent = () => {
  const { list, pagination, isLoading } = useListCrud<Persona>();

  return (
    <Card className="bg-gray-50" title="Personas">
      <div className="flex justify-between items-center my-2">
        <div></div>
        <div>{pagination}</div>
      </div>
      <Loader
        isLoading={isLoading}
        keepContentWhileLoading
        overlayClassName="bg-white/50 backdrop-blur-sm rounded-lg"
      >
        <DataTable<Persona>
          columns={[
            { header: "Nombre", value: (row) => row.nombre },
            { header: "Email", value: (row) => row.email },
            {
              header: "Fecha de Nacimiento",
              value: (row) => row.fechaNacimiento.format("DD/MM/YYYY"),
            },
          ]}
          rows={list || []}
          maxRows={10}
        />
      </Loader>
    </Card>
  );
};
