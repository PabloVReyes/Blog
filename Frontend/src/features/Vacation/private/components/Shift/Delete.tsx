import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconLetterT } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useVacationShiftStore } from "@/stores"
import type { ShiftData } from "@/features/Vacation/types/vacations.types"
import { getTablerIcon } from "@/helpers"


export const Delete = ({ id, name, color, icon }: ShiftData) => {
    const remove = useVacationShiftStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (values) => values === name ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Turno Eliminado", "El turno fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar turno",
                message: error instanceof Error ? error.message : "Error desconocido"
            });
        } finally {
            setLoading(false);
        }
    }

    const Icon = getTablerIcon(icon);

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Card
                    radius="md"
                    p="md"
                    withBorder
                >
                    <Text size="sm" fw={500} c="dimmed" mb="sm">
                        Turno a eliminar:
                    </Text>

                    <Group align="center" gap="md">
                        <ThemeIcon
                            size={56}
                            variant="light"
                            color={color}
                        >
                            <Icon />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Group gap={6}>
                                <IconLetterT size={16} />
                                <Text fw={700} size="md" truncate>
                                    {name}
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
                            <List.Item>Se eliminara permanentemente el turno</List.Item>
                            <List.Item>Los roles vacacionales serán eliminados permanentemente</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el nombre del turno:"
                    placeholder="Escribe el nombre para confirmar..."
                    description={name}
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