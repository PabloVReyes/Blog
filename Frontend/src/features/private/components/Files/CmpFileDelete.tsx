import { deleteFile } from "@/api/files"
import { usePrivateFilesStore } from "@/store/files/filesStore"
import { useModalStore } from "@/store/modalStore"
import { Alert, Button, Divider, Flex, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconTrash } from "@tabler/icons-react"
import { useState } from "react"

export const CmpFileDelete = ({ filename }: { filename: string }) => {
    const { closeModal, openModal } = useModalStore()
    const { fetchFiles } = usePrivateFilesStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            filename: filename,
            value: ""
        },
        validate: {
            value: (value => value == `Eliminar archivo` ? null : "Para eliminar el archivo escribe exactamente lo que se solicita")
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setIsLoading(true);

            await deleteFile(values.filename)

            setTimeout(() => {
                openModal({
                    title: "Archivo eliminado",
                    subtitle: "El archivo fue eliminado correctamente",
                    content: (
                        <Stack align="center" p="xl">
                            <IconTrash size={60} color="red" />
                            <Text ta="center">
                                El archivo ha sido eliminado correctamente.
                            </Text>
                        </Stack>
                    )
                });

                fetchFiles();

                setTimeout(() => {
                    closeModal();
                }, 2500);

            }, 1000);
        } catch (error) {
            console.error("Error deleted file:", error);
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    }


    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Alert color="yellow" variant="light" icon={<IconAlertTriangleFilled />}>
                    <Text size="sm" fw={700}>
                        ¡Antes de continuar....!
                    </Text>
                </Alert>

                <Flex
                    gap="md"
                    style={{
                        borderLeft: "3px solid #ffcc00",
                        paddingLeft: 12
                    }}
                >
                    <Stack>
                        <Text size="sm">
                            Estás a punto de eliminar el archivo “{filename}”.
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
                </Flex>

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