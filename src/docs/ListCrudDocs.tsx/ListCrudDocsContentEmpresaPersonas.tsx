import { useState } from "react";
import { Button, Card, DataTable, Dialog, Loader } from "../../components";
import { useCrud } from "../../contexts";
import type { PersonaEmpresaConPersona } from "../docMockServices";
import { ListCrudDocsContentEmpresasPersonasEditDialog } from "./ListCrudDocsContentEmpresasPersonasEditDialog";

export const ListCrudDocsContentEmpresaPersonas = () => {
  const { list, fetchItems, deleteItem } = useCrud<PersonaEmpresaConPersona>();
  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isOpenEliminarDialog, setIsOpenEliminarDialog] = useState(false);
  const [selectedPersonaEmpresa, setSelectedPersonaEmpresa] =
    useState<PersonaEmpresaConPersona>();

  const onEditPersonaEmpresa = (
    personaEmpresa: PersonaEmpresaConPersona | undefined
  ) => {
    setSelectedPersonaEmpresa(personaEmpresa);
    setIsOpenEditDialog(true);
  };

  const onEliminarPersonaEmpresa = (
    personaEmpresa: PersonaEmpresaConPersona | undefined
  ) => {
    setSelectedPersonaEmpresa(personaEmpresa);
    setIsOpenEliminarDialog(true);
  };

  const onDeletePersonaSubmit = async () => {
    await deleteItem.execute(selectedPersonaEmpresa as PersonaEmpresaConPersona);
    setIsOpenEliminarDialog(false);
    await fetchItems.execute();
  };

  return (
    <>
      <Card
        title="Personas"
        headerActions={
          <Button
            icon="fa-plus"
            onClick={() => onEditPersonaEmpresa(undefined)}
          >
            Agregar Persona
          </Button>
        }
        alwaysDisplayHeaderActions
      >
        <DataTable<PersonaEmpresaConPersona>
          isLoading={fetchItems.isLoading}
          columns={[
            { header: "Nombre", value: (row) => row.persona.nombre },
            { header: "Cargo", value: (row) => row.cargo },
            {
              actions: (row) => [
                <Button
                  icon="fa-edit"
                  onClick={() => onEditPersonaEmpresa(row)}
                  variant="ghost"
                > Editar </Button>,
                <Button
                  icon="fa-trash"
                  onClick={() => onEliminarPersonaEmpresa(row)}
                  variant="ghost"
                > Eliminar </Button>
              ]
            }
          ]}
          rows={list || []}
        />
      </Card>

      {isOpenEditDialog && (
        <ListCrudDocsContentEmpresasPersonasEditDialog
          isOpen={isOpenEditDialog}
          onClose={() => setIsOpenEditDialog(false)}
          personaEmpresa={selectedPersonaEmpresa}
          personasEnEmpresa={list || []}
        />
      )}
      {isOpenEliminarDialog && (
        <Dialog
          isOpen={isOpenEliminarDialog}
          title="Eliminar Persona"
          onClose={() => setIsOpenEliminarDialog(false)}
          footer={
            <>
              <Button
                variant="outline"
                onClick={() => setIsOpenEliminarDialog(false)}
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
        >
          <p>¿Estás seguro de querer eliminar esta persona?</p>
          <Loader isLoading={deleteItem.isLoading} />
        </Dialog>
      )}
    </>
  );
};
