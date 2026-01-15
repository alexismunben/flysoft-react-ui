import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Collection,
  DateInput,
  Dialog,
  Input,
  Loader,
} from "../../components";
import type { Persona, PersonaConEmpresas } from "../docMockServices";
import { useCrud } from "../../contexts";

interface ListCrudDocsEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  persona: Persona | undefined;
}

export const ListCrudDocsEditDialog = ({
  isOpen,
  onClose,
  persona,
}: ListCrudDocsEditDialogProps) => {
  const methods = useForm<Persona>({
    defaultValues: persona,
  });

  const { createItem, updateItem, fetchItems } = useCrud();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (persona: Persona) => {
    if (persona.id) {
      await updateItem.execute(persona as PersonaConEmpresas);
    } else {
      await createItem.execute(persona as PersonaConEmpresas);
    }
    onClose();
    fetchItems.execute();
  };

  const isLoading = createItem.isLoading || updateItem.isLoading;

  return (
    <FormProvider {...methods}>
      <Dialog
        isOpen={isOpen}
        onClose={onClose}
        title="Editar Persona"
        footer={
          <>
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit(onSubmit)}>Guardar</Button>
          </>
        }
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit(onSubmit)();
            }
          }}
        >
          <Collection>
            <Input
              label="Nombre"
              {...register("nombre", { required: "Campo obligatorio" })}
              error={errors.nombre?.message}
            />
            <Input
              label="Email"
              {...register("email", { required: "Campo obligatorio" })}
              error={errors.email?.message}
            />
            <DateInput
              label="Fecha de Nacimiento"
              placeholder="dd/mm/yyyy"
              icon="fa-calendar-alt"
              {...register("fechaNacimiento", {
                required: "Campo obligatorio",
              })}
              error={errors.fechaNacimiento?.message}
            />
            <Loader isLoading={isLoading} />
          </Collection>
        </form>
      </Dialog>
    </FormProvider>
  );
};
