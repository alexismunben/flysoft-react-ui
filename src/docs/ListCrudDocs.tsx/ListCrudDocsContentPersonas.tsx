import { useListCrud } from "../../contexts";
import {
  Button,
  Card,
  Collection,
  DataTable,
  Dialog,
  Filter,
  Loader,
} from "../../components";
import type { Empresa, Persona, PersonaConEmpresas } from "../docMockServices";
import { useEffect } from "react";
import { useState } from "react";
import { empresaService } from "../docMockServices";
import { ListCrudDocsEditDialog } from "./ListCrudDocsEditDialog";

export const ListCrudDocsContentPersonas = () => {
  const { list, pagination, isLoading, fetchItems, deleteItem } =
    useListCrud<PersonaConEmpresas>();
  const { listar } = empresaService;

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<PersonaConEmpresas>();

  const onDeletePersona = (persona: PersonaConEmpresas) => {
    setSelectedPersona(persona);
    setIsOpenDeleteDialog(true);
  };

  const onDeletePersonaSubmit = async () => {
    if (selectedPersona) {
      await deleteItem.execute(selectedPersona);
      setIsOpenDeleteDialog(false);
      fetchItems.execute();
    }
  };

  const onEditPersona = (persona: PersonaConEmpresas | undefined) => {
    setSelectedPersona(persona);
    setIsOpenEditDialog(true);
  };

  useEffect(() => {
    listar().then((empresas) => {
      setEmpresas(empresas);
    });
  }, [listar]);

  return (
    <>
      <Card
        className="bg-gray-50"
        title="Personas"
        headerActions={
          <Collection direction="row">
            <Button icon="fa-plus" onClick={() => onEditPersona(undefined)}>
              Agregar Persona
            </Button>
            <Button icon="fa-sync" onClick={() => fetchItems.execute()} />
          </Collection>
        }
        alwaysDisplayHeaderActions
      >
        <div className="flex justify-between items-center my-2">
          <Collection direction="row" wrap>
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
          <Collection direction="row" wrap>
            {pagination}
          </Collection>
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
                  onClick={() => onEditPersona(row)}
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

      {isOpenDeleteDialog && (
        <Dialog
          isOpen={isOpenDeleteDialog}
          title="Eliminar Persona"
          onClose={() => setIsOpenDeleteDialog(false)}
          dialogBody={
            <>
              <p>¿Estás seguro de querer eliminar esta persona?</p>
              <Loader isLoading={deleteItem.isLoading} />
            </>
          }
          dialogActions={
            <>
              <Button
                variant="outline"
                onClick={() => setIsOpenDeleteDialog(false)}
                disabled={deleteItem.isLoading}
              >
                Cancelar
              </Button>
              <Button
                onClick={onDeletePersonaSubmit}
                disabled={deleteItem.isLoading}
              >
                Eliminar
              </Button>
            </>
          }
        />
      )}
      {isOpenEditDialog && (
        <ListCrudDocsEditDialog
          isOpen={isOpenEditDialog}
          onClose={() => setIsOpenEditDialog(false)}
          persona={selectedPersona as Persona}
        />
      )}
    </>
  );
};
