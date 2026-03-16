import { Alert, Divider, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled } from "@tabler/icons-react"
import { useState } from "react"
import { useClinicalPracticeGuidelinesStore } from "../../store"
import { Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"

interface Props {
    id: string
    name: string
    code: string
}

export const Delete = ({ id, name, code }: Props) => {
    const { remove } = useClinicalPracticeGuidelinesStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (values) => values === `Eliminar ${code}` ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove(id)
            showSuccessModal("Guía de Práctica Clínica Eliminada", "La guía de práctica clínica fue eliminada correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al eliminar informe",
                message: error.message
            });
        } finally {
            setLoading(false);
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
                            Estás a punto de eliminar el informe “{name}”.
                        </Text>

                        <Text size="sm">
                            Esta acción es <b>permanente e irreversible</b>. Una vez eliminado, no podrás recuperar este permiso, y cualquier rol o usuario que dependiera de él perderá de inmediato dicho acceso.
                        </Text>
                        <Text size="sm">
                            Para continuar, escribe exactamente:
                        </Text>

                        <Text size="sm" fw={700}>
                            Eliminar {code}
                        </Text>

                        <Text size="sm">
                            Esto garantiza que comprendes el impacto de esta acción.
                        </Text>
                    </Stack>
                </Alert>

                <Divider />

                <TextInput
                    autoFocus
                    withAsterisk
                    placeholder="Eliminar informe"
                    {...form.getInputProps("value")}
                />

                <ModalButtons
                    label="Eliminar"
                    loading={loading}
                />
            </Stack>
        </form>
    )
}

// 107 lineas -> 91 lineas