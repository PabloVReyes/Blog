import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconFileText, IconLetterT } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useSystemsPBMStore } from "@/stores"
import type { PMBData } from "@/features/Systems/types/pbm.types"

export const Delete = ({ id, title, file }: PMBData) => {
    const remove = useSystemsPBMStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value) => value === title ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Algoritmo PBM Eliminado", "El algoritmo PBM fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar algoritmo PBM",
                message: error instanceof Error ? error.message : "Error desconocido"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Card
                    radius="md"
                    p="md"
                    withBorder
                >
                    <Text size="sm" fw={500} c="dimmed" mb="sm">
                        Algoritmo PBM a eliminar:
                    </Text>

                    <Group align="center" gap="md">
                        <ThemeIcon
                            size={56}
                            variant="light"
                        >
                            <IconFileText />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Group gap={6}>
                                <IconLetterT size={16} />
                                <Text fw={700} size="md" truncate>
                                    {title}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconFileText size={16} />
                                <Text fw={700} size="md" truncate>
                                    {file?.name}
                                </Text>
                            </Group>
                        </Stack>
                    </Group>
                </Card>

                <Alert
                    color="red"
                    title={
                        <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                            <IconAlertTriangleFilled
                                size={20}
                                color="orange"
                                style={{ flex: "0 0 auto" }}
                            />
                            <Text fw={600} fz="lg">
                                ADVERTENCIA: Esta acción es irreversible
                            </Text>
                        </Group>
                    }
                    content={
                        <List>
                            <List.Item>Se eliminara permanentemente el Algoritmo PBM</List.Item>
                            <List.Item>El archivo cargado sera eliminado</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el titulo del algoritmo PBM:"
                    description={title}
                    placeholder="Escribe el titulo para confirmar..."
                    autoFocus
                    withAsterisk
                    {...form.getInputProps("value")}
                />

                <ModalButtons
                    label="Eliminar"
                    loading={loading}
                    disabled={!form.isValid()}
                />
            </Stack>
        </form>
    )
}

// 106 lineas -> 90 lineas