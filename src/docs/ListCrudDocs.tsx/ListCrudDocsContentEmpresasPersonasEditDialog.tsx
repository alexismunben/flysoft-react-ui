import { FormProvider, useForm } from "react-hook-form";
import {
  AutocompleteInput,
  Button,
  Collection,
  Dialog,
  Input,
  Loader,
} from "../../components";
import {
  personaService,
  type Persona,
  type PersonaEmpresa,
  type PersonaEmpresaConPersona,
} from "../docMockServices";
import { useEffect, useState } from "react";
import { useCrud } from "../../contexts";
import { useAsyncRequest } from "../../hooks";

interface ListCrudDocsContentEmpresasPersonasEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  personaEmpresa: PersonaEmpresaConPersona | undefined;
  personasEnEmpresa: PersonaEmpresaConPersona[];
}

export const ListCrudDocsContentEmpresasPersonasEditDialog = ({
  isOpen,
  onClose,
  personaEmpresa,
  personasEnEmpresa,
}: ListCrudDocsContentEmpresasPersonasEditDialogProps) => {
  const { listar } = personaService;
  const { updateItem, createItem, extraData, fetchItems } = useCrud<PersonaEmpresa>();

  const [personas, setPersonas] = useState<Persona[]>([]);

  const listarPersonas = useAsyncRequest();

  useEffect(() => {
    listarPersonas.execute(listar).then((personas) => {
      setPersonas((personas || []).filter((persona) => !personasEnEmpresa.some((personaEnEmpresa) => personaEnEmpresa.idPersona === persona.id)));
    });
  }, [listar, personasEnEmpresa]);

  const methods = useForm<PersonaEmpresa>({
    defaultValues: personaEmpresa,
  });

  const onSubmit = async (personaEmpresa: PersonaEmpresa) => {
    if (personaEmpresa.idEmpresa) {
      await updateItem.execute(personaEmpresa);
    } else {
      if (!extraData?.idEmpresa) {
        throw new Error("No se encontro el id de la empresa");
      }
      await createItem.execute({ ...personaEmpresa, idEmpresa: extraData.idEmpresa });
    }
    onClose();
    await fetchItems.execute();
  };

  return (
    <FormProvider {...methods}>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Editar Persona Empresa"
        footer={
          <>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={methods.handleSubmit(onSubmit)}>Guardar</Button>
          </>
        }
      >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Collection>
            <AutocompleteInput
              label="Persona"
              options={personas}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id.toString()}
              {...methods.register("idPersona", {
                required: "Campo obligatorio",
              })}
              error={methods.formState.errors.idPersona?.message}
              disabled={listarPersonas.isLoading || updateItem.isLoading || createItem.isLoading}
            />
            <Input
              label="Cargo"
              {...methods.register("cargo", {
                required: "Campo obligatorio",
              })}
              error={methods.formState.errors.cargo?.message}
              disabled={listarPersonas.isLoading || updateItem.isLoading || createItem.isLoading}
            />
            <Loader isLoading={listarPersonas.isLoading || updateItem.isLoading || createItem.isLoading} />
          </Collection>
        </form>
      </Dialog>
    </FormProvider>
  );
};
