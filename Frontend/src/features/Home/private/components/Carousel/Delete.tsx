import { Alert, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled } from "@tabler/icons-react"
import { useState } from "react";
import { useCarouselStore } from "../../store";
import { Notify, showSuccessModal } from "@/ui";
import { ModalButtons } from "@/components";

interface Props {
    id: string;
    title: string;
}

export const Delete = ({ id, title }: Props) => {
    const { remove } = useCarouselStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value => value == `Eliminar carrusel ${title}` ? null : "Para eliminar el archivo escribe lo que se solicita")
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await remove(id)
            showSuccessModal("Carrusel Eliminado", "El carrusel fue eliminado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al eliminar carrusel",
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
                            Estás a punto de eliminar el carrusel <Text span fw={700}>“{title}”</Text>.
                        </Text>
                        <Text size="sm">
                            Esta acción es <b>permanente e irreversible</b>. Una vez eliminado, no podrás recuperar este archivo.
                        </Text>
                        <Text size="sm">
                            Para continuar, escribe exactamente:
                        </Text>
                        <Text size="sm" fw={700}>
                            Eliminar carrusel {title}
                        </Text>
                        <Text size="sm">
                            Esto garantiza que comprendes el impacto de esta acción.
                        </Text>
                    </Stack>
                </Alert>

                <TextInput
                    autoFocus
                    withAsterisk
                    placeholder="Eliminar carrusel"
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

// 99 lineas -> 86 lineas