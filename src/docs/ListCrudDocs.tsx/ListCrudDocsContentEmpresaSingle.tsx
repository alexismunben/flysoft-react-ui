import { personaEmpresaService, type Empresa } from "../docMockServices";
import { CrudProvider, useCrud } from "../../contexts";
import { Button, Card, Collection, Dialog, Input, Loader } from "../../components";
import { useNavigate } from "react-router-dom";
import type { PersonaEmpresa, PersonaEmpresaConPersona } from "../docMockServices";
import { ListCrudDocsContentEmpresaPersonas } from "./ListCrudDocsContentEmpresaPersonas";
import { useEffect, useState, useCallback } from "react";
import { DropdownMenu } from "../../components/layout/DropdownMenu";
import { FormProvider, useForm } from "react-hook-form";

export const ListCrudDocsContentEmpresaSingle = () => {
  const { item, fetchItem, fetchItems, updateItem, deleteItem } = useCrud<Empresa>();
  const methods = useForm<Empresa>({
    defaultValues: item,
  });
  const { buscarPorEmpresa, agregar, editar, eliminar } = personaEmpresaService;
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenEliminarDialog, setIsOpenEliminarDialog] = useState(false);

  const buscarPersonasPorEmpresa = useCallback(async (): Promise<
    PersonaEmpresaConPersona[]
  > => {
    if (!item?.id) {
      return [];
    }
    const personas = await buscarPorEmpresa(item.id);
    return personas;
  }, [item?.id, buscarPorEmpresa]);

  useEffect(() => {
    if (item) {
      methods.reset(item);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const onSubmitEdit = async (empresa: Empresa) => {
    await updateItem.execute(empresa);
    setIsEditing(false);
    fetchItem.execute();
    fetchItems.execute();
  };

  const onDeleteEmpresaSubmit = async () => {
    await deleteItem.execute(item as Empresa);
    setIsOpenEliminarDialog(false);
    navigate(-1);
    fetchItems.execute();
  };

  return (
    <>
      <Card
        title={fetchItem.isLoading ? "" : item?.nombre}
        headerActions={
          !isEditing ? (
            <Collection direction="row">
              <DropdownMenu
                options={[
                  { label: "Editar", icon: "fa-edit" },
                  { label: "Eliminar", icon: "fa-trash" },
                ]}
                onOptionSelected={(item) => {
                  if (item.label === "Editar") {
                    setIsEditing(true);
                  }
                  if (item.label === "Eliminar") {
                    setIsOpenEliminarDialog(true);
                  }
                }}
              />
              <Button
                icon="fa-undo"
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
              />
            </Collection>
          ) : null
        }
        alwaysDisplayHeaderActions
        footer={
          isEditing ? (
            <div className="flex justify-end">
              <Collection direction="row">
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                  disabled={updateItem.isLoading}
                >
                  Cancelar
                </Button>
                <Button
                  icon="fa-save"
                  onClick={methods.handleSubmit(onSubmitEdit)}
                  disabled={updateItem.isLoading}
                >
                  Guardar
                </Button>
              </Collection>
            </div>
          ) : null
        }
      >
        {!isEditing ? (
          <CrudProvider<PersonaEmpresaConPersona>
            getPromise={buscarPersonasPorEmpresa}
            postPromise={{
              execute: (persona) => agregar(persona) as Promise<PersonaEmpresaConPersona | null>,
              successMessage: "Persona agregada correctamente",
            }}
            putPromise={{
              execute: (personaEmpresa: PersonaEmpresaConPersona) => editar(personaEmpresa.idPersona, personaEmpresa.idEmpresa, personaEmpresa as Partial<PersonaEmpresaConPersona>) as Promise<PersonaEmpresaConPersona | null>,
              successMessage: "Cambios guardados",
            }}
            deletePromise={{
              execute: (persona: PersonaEmpresaConPersona) => eliminar(persona) as Promise<void>,
              successMessage: "Persona eliminada correctamente",
            }}
            extraData={{ idEmpresa: item?.id }}
          >
            <ListCrudDocsContentEmpresaPersonas />
          </CrudProvider>
        ) : (
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmitEdit)}>
              <Collection>
                <div className="w-[300px]">
                  <Input
                    label="Nombre"
                    {...methods.register("nombre", {
                      required: "Campo obligatorio",
                    })}
                  />
                </div>
              </Collection>
            </form>
          </FormProvider>
        )}
      </Card>
      {isOpenEliminarDialog && (
        <Dialog
          isOpen={isOpenEliminarDialog}
          title="Eliminar Empresa"
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
                onClick={onDeleteEmpresaSubmit}
                disabled={deleteItem.isLoading}
              >
                Eliminar
              </Button>
            </>
          }
        >
          <p>¿Estás seguro de querer eliminar esta empresa?</p>
          <Loader isLoading={deleteItem.isLoading} />
        </Dialog>
      )}
    </>
  );
};
