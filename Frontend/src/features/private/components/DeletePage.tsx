import { deletePage } from "@/api/pages";
import { useModalStore } from "@/shared";
import { notify } from "@/utils/notify";
import { Alert, Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

interface Props {
    id: string;
    title: string
    onUpdate?: () => void;
}

export const DeletePage = ({ id, title, onUpdate }: Props) => {
    const { closeModal } = useModalStore()

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            delete: ''
        },

        validate: {
            delete: (value) => (value.trim() != `Eliminar Pagina ${title.toUpperCase()}` ? `Escribe lo que se te solicita` : null)
        }
    })

    const handleSubmit = async (_values: typeof form.values) => {
        try {
            await deletePage(id)
            notify({
                type: "success",
                title: "Página eliminada",
                message: "Pagína eliminada con exito"
            })

            onUpdate?.()
        } catch (error: any) {
            notify({
                type: "error",
                title: "Error",
                message: error.message
            })
        } finally {
            closeModal()
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Alert color="orange" variant="filled">
                    {`¿Deseas eliminar la página?, esta acción no se puede deshacer, para confirmar por favor escribe lo que se te solicita`}
                </Alert>

                <TextInput
                    label={`Escribe "Eliminar Pagina ${title.toUpperCase()}"`}
                    placeholder={`Eliminar Pagina ${title.toUpperCase()}`}
                    key={form.key('delete')}
                    {...form.getInputProps('delete')}
                />
            </Stack>
            <Group mt="lg" gap={5} justify="flex-end">
                <Button variant="outline" onClick={closeModal}>
                    Cancelar
                </Button>
                <Button color="red" type="submit">
                    Eliminar
                </Button>
            </Group>
        </form>
    )
}