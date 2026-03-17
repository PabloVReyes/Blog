import { Alert, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled } from "@tabler/icons-react"
import { useState } from "react";
import { Notify, showSuccessModal } from "@/ui";
import { ModalButtons } from "@/components";
import { useHomeAccessCardStore } from "@/stores";

interface Props {
    id: string;
    title: string;
}

export const Delete = ({ id, title }: Props) => {
    const remove = useHomeAccessCardStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value => value == `Eliminar acceso ${title}` ? null : "Para eliminar el archivo escribe lo que se solicita")
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await remove?.(id)
            showSuccessModal("Acceso Rápido Eliminado", "El acceso rápido fue eliminado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al eliminar acceso rápido",
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
                            Estás a punto de eliminar el acceso <Text span fw={700}>“{title}”</Text>.
                        </Text>
                        <Text size="sm">
                            Esta acción es <b>permanente e irreversible</b>. Una vez eliminado, no podrás recuperar este archivo.
                        </Text>
                        <Text size="sm">
                            Para continuar, escribe exactamente:
                        </Text>
                        <Text size="sm" fw={700}>
                            Eliminar acceso {title}
                        </Text>
                        <Text size="sm">
                            Esto garantiza que comprendes el impacto de esta acción.
                        </Text>
                    </Stack>
                </Alert>

                <TextInput
                    autoFocus
                    withAsterisk
                    placeholder="Eliminar acceso"
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

// 100 lineas  -> 86 lineas