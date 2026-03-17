import { Alert, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled } from "@tabler/icons-react"
import { useState } from "react";
import { Notify, showSuccessModal } from "@/ui";
import { ModalButtons } from "@/components";
import { useMacroprocessStore } from "@/stores";

interface Props {
    id: string;
    name: string;
    area: string;
}

export const Delete = ({ id, name, area }: Props) => {
    const remove = useMacroprocessStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value => value == `Eliminar archivo ${name}` ? null : "Para eliminar el archivo escribe lo que se solicita")
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await remove?.(id)
            showSuccessModal("Macroproceso Eliminado", "El macroproceso fue eliminado correctamente")
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
                            Estás a punto de eliminar el archivo <Text span fw={700}>“{name}” del área "{area}"</Text>.
                        </Text>
                        <Text size="sm">
                            Esta acción es <b>permanente e irreversible</b>. Una vez eliminado, no podrás recuperar este archivo.
                        </Text>
                        <Text size="sm">
                            Para continuar, escribe exactamente:
                        </Text>
                        <Text size="sm" fw={700}>
                            Eliminar archivo {name}
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

                <ModalButtons
                    loading={loading}
                    label="Eliminar"
                />
            </Stack>
        </form>
    )
}

// 110 lineas -> 87 lineas