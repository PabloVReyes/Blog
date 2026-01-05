import { useModalStore } from "@/shared"
import { Blockquote, Button, Divider, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconInfoTriangle, IconTrash } from "@tabler/icons-react"
import { useState } from "react"
import { useFilesStore } from "../../store"

export const UploadsDelete = ({ filename }: { filename: string }) => {
    const { closeModal, openModal } = useModalStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { deleteFile } = useFilesStore()

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (value => value == `Eliminar archivo` ? null : "Para eliminar el archivo escribe lo que se solicita")
        }

    })

    const handleSubmit = async () => {
        try {
            setIsLoading(true)

            await deleteFile(filename)

            closeModal()

            openModal({
                title: "Archivo eliminado",
                subtitle: "El archivo fue eliminado correctamente",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconTrash size={60} color="red" />
                        <Text ta="center">
                            El archivo ha sido eliminado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error) {
            console.error("Error al eliminar el archivo", error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack mt={20}>
                <Blockquote color="yellow" icon={<IconInfoTriangle />}>
                    <Stack gap={7}>
                        <Text size="sm" fw={700}>
                            ¡Antes de continuar....!
                        </Text>
                        <Text size="sm">
                            Estás a punto de eliminar el archivo <Text span fw={700}>“{filename}”</Text>.
                        </Text>
                        <Text size="sm">
                            Esta acción es <b>permanente e irreversible</b>. Una vez eliminado, no podrás recuperar este archivo.
                        </Text>
                        <Text size="sm">
                            Para continuar, escribe exactamente:
                        </Text>
                        <Text size="sm" fw={700}>
                            Eliminar archivo
                        </Text>
                        <Text size="sm">
                            Esto garantiza que comprendes el impacto de esta acción.
                        </Text>
                    </Stack>
                </Blockquote>

                <Divider />

                <TextInput
                    autoFocus
                    withAsterisk
                    placeholder="Eliminar archivo"
                    {...form.getInputProps("value")}
                />

                <Group gap={5} justify="flex-end">
                    <Button variant="outline" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button
                        color="red"
                        type="submit"
                        loading={isLoading}
                    >
                        Eliminar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}