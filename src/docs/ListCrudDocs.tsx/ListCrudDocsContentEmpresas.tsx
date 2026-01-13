import { Card, Collection } from "../../components";
import { useListCrud } from "../../contexts";
import type { Empresa } from "../docMockServices";

export const ListCrudDocsContentEmpresas = () => {
  const { list, pagination } = useListCrud<Empresa>();

  return (
    <Card className="bg-gray-50" title="Empresas">
      <Collection direction="row" wrap>
        {list?.map((empresa) => (
          <Card
            key={empresa.id}
            className="bg-white w-[100%] md:w-[45%] lg:w-[30%] xl:w-[18%]"
            title={empresa.nombre}
          />
        ))}
      </Collection>
    </Card>
  );
};
