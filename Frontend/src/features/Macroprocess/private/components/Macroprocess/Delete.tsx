import { useModalStore } from "@/layout";
import { Alert, Button, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconCheck } from "@tabler/icons-react"
import { useMacroprocessStore } from "../../store";
import { useState } from "react";
import { Notify } from "@/ui";

interface Props {
    id: string;
    fileName: string;
}

export const Delete = ({ id, fileName }: Props) => {
    const { openModal, closeModal } = useModalStore()
    const { remove } = useMacroprocessStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value => value == `Eliminar archivo ${fileName}` ? null : "Para eliminar el archivo escribe lo que se solicita")
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await remove(id)
            openModal({
                title: "Archivo Eliminado",
                subtitle: "Archivo eliminado correctamente",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            el archivo se ha eliminado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al eliminar archivo",
                message: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Alert
                    color="yellow"
                    mt={10}
                    icon={<IconAlertTriangleFilled />}
                    title="¡Antes de continuar....!"
                >
                    <Stack>
                        <Text size="sm">
                            Estás a punto de eliminar el archivo <Text span fw={700}>“{fileName}”</Text>.
                        </Text>
                        <Text size="sm">
                            Esta acción es <b>permanente e irreversible</b>. Una vez eliminado, no podrás recuperar este archivo.
                        </Text>
                        <Text size="sm">
                            Para continuar, escribe exactamente:
                        </Text>
                        <Text size="sm" fw={700}>
                            Eliminar archivo {fileName}
                        </Text>
                        <Text size="sm">
                            Esto garantiza que comprendes el impacto de esta acción.
                        </Text>
                    </Stack>
                </Alert>

                <TextInput
                    autoFocus
                    withAsterisk
                    placeholder="Eliminar archivo"
                    {...form.getInputProps("value")}
                />

                <Group justify="flex-end" gap={5}>
                    <Button
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Eliminar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}