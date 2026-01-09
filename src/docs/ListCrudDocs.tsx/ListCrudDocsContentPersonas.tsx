import { useListCrud } from "../../contexts";
import {
  Button,
  Card,
  Collection,
  DataTable,
  Dialog,
  Filter,
} from "../../components";
import type { Empresa, PersonaConEmpresas } from "../docMockServices";
import { useEffect } from "react";
import { useState } from "react";
import { empresaService } from "../docMockServices";

export const ListCrudDocsContentPersonas = () => {
  const { list, pagination, isLoading, refetch, deleteItem } =
    useListCrud<PersonaConEmpresas>();
  const { listar } = empresaService;

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaConEmpresas>();

  const onDeletePersona = (persona: PersonaConEmpresas) => {
    setSelectedPersona(persona);
    setIsOpenDeleteDialog(true);
  };

  const onDeletePersonaSubmit = async () => {
    if (selectedPersona) {
      await deleteItem(selectedPersona);
      refetch();
      setIsOpenDeleteDialog(false);
    }
  };

  useEffect(() => {
    listar().then((empresas) => {
      setEmpresas(empresas);
    });
  }, [listar]);

  return (
    <>
      <Collection>
        <Card className="bg-gray-50" title="Personas">
          <div className="flex justify-between items-center my-2">
            <div>
              <Collection direction="row" wrap gap="12px">
                <Filter paramName="filtro" label="Buscar" filterType="search" />
                <Filter
                  paramName="idEmpresa"
                  label="Empresa"
                  filterType="autocomplete"
                  options={empresas.map((empresa) => ({
                    label: empresa.nombre,
                    value: empresa.id.toString(),
                  }))}
                />
              </Collection>
            </div>
            <div>{pagination}</div>
          </div>
          <DataTable<PersonaConEmpresas>
            columns={[
              { header: "Nombre", value: (row) => row.nombre },
              { header: "Email", value: (row) => row.email },
              {
                header: "Fecha de Nacimiento",
                value: (row) => row.fechaNacimiento.format("DD/MM/YYYY"),
              },
              {
                header: "Empresas",
                value: (row) =>
                  row.empresas.map((empresa) => empresa.nombre).join(", "),
              },
              {
                align: "center",
                actions: (row) => [
                  <Button
                    key="edit"
                    size="sm"
                    variant="ghost"
                    icon="fa-edit"
                    onClick={() => console.log("Editar", row)}
                  >
                    Editar
                  </Button>,
                  <Button
                    key="delete"
                    size="sm"
                    variant="ghost"
                    icon="fa-trash"
                    onClick={() => onDeletePersona(row)}
                  >
                    Eliminar
                  </Button>,
                ],
              },
            ]}
            rows={list || []}
            maxRows={10}
            isLoading={isLoading}
            loadingRows={10}
          />
        </Card>
        <div>
          <Button onClick={() => refetch()}>Refetch</Button>
        </div>
      </Collection>

      {isOpenDeleteDialog && (
        <Dialog
          isOpen={isOpenDeleteDialog}
          title="Eliminar Persona"
          onClose={() => setIsOpenDeleteDialog(false)}
          dialogBody={<p>¿Estás seguro de querer eliminar esta persona?</p>}
          dialogActions={
            <>
              <Button
                variant="outline"
                onClick={() => setIsOpenDeleteDialog(false)}
              >
                Cancelar
              </Button>
              <Button onClick={onDeletePersonaSubmit}>Eliminar</Button>
            </>
          }
        />
      )}
    </>
  );
};
