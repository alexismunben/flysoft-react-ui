import { Card, Collection, Filter, LinkButton, Loader } from "../../components";
import { useCrud } from "../../contexts";
import type { Empresa } from "../docMockServices";

export const ListCrudDocsContentEmpresas = () => {
  const { list, pagination, fetchItems } = useCrud<Empresa>();

  return (
    <Card className="bg-gray-50" title="Empresas">
      <div className="flex justify-between items-center my-2">
        <Collection direction="row" wrap>
          <Filter
            paramName="filtroEmpresa"
            label="Buscar"
            filterType="search"
          />
        </Collection>
        <Collection direction="row" wrap>
          {pagination}
        </Collection>
      </div>
      <Loader isLoading={fetchItems.isLoading}>
        <Collection direction="row" wrap>
          {list?.map((empresa) => (
            <Card
              key={empresa.id}
              className="bg-white w-[100%] md:w-[45%] lg:w-[30%] xl:w-[18%]"
              title={empresa.nombre}
              headerActions={
                <LinkButton
                  to={`/docs/listcrud/empresa/${empresa.id}`}
                  icon="fa-search"
                  variant="ghost"
                  size="sm"
                />
              }
            />
          ))}
        </Collection>
      </Loader>
    </Card>
  );
};
