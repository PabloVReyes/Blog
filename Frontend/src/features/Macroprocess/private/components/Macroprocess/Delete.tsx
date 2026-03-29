import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconFileText, IconLetterT, IconMapPin } from "@tabler/icons-react"
import { useState } from "react";
import { Alert, Notify, showSuccessModal } from "@/ui";
import { ModalButtons } from "@/components";
import { useMacroprocessStore } from "@/stores";
import type { MacroprocessData } from "@/features/Macroprocess/types/macroprocess.types";

export const Delete = ({ id, manualType, area }: MacroprocessData) => {
    const remove = useMacroprocessStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value => value == manualType.name ? null : "Para eliminar el archivo escribe lo que se solicita")
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await remove?.(id)
            showSuccessModal("Macroproceso Eliminado", "El macroproceso fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar macroproceso",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
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
                        Macroproceso a eliminar:
                    </Text>

                    <Group align="center" gap="md">
                        <ThemeIcon
                            size={56}
                            variant="light"
                        >
                            <IconFileText />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Group gap={6} wrap="nowrap">
                                <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {manualType.name}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconMapPin size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {area.name}
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
                            <List.Item>Solo se eliminara el archivo cargado</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el nombre del macroproceso:"
                    placeholder="Escribe el nombre para confirmar..."
                    description={manualType.name}
                    autoFocus
                    {...form.getInputProps("value")}
                />

                <ModalButtons
                    loading={loading}
                    label="Eliminar"
                    disabled={!form.isValid()}
                />
            </Stack>
        </form>
    )
}

// 110 lineas -> 87 lineas