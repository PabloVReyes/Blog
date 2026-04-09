import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconBleach, IconCalendar, IconFileText, IconSunMoon } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useVacationStore } from "@/stores"
import type { VacationsData } from "@/features/Vacation/types/vacations.types"

export const Delete = ({ id, type, shift, file }: VacationsData) => {
    const remove = useVacationStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)
    const Type = type === "CALENDAR" ? "Calendario" : "Index"

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (values) => values === Type ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Vacaciones Eliminadas", "Las vacaciones fueron eliminadas correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar vacaciones",
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
                        Rol Vacacional a eliminar:
                    </Text>

                    <Group align="center" gap="md">
                        <ThemeIcon
                            size={56}
                            variant="light"
                        >
                            <IconBleach />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Group gap={6} wrap="nowrap">
                                <IconSunMoon size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {shift.name}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconCalendar size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {Type}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconFileText size={16} style={{ flex: "0 0 auto" }} />
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
                            <List.Item>Se eliminara permanentemente el rol vacacional</List.Item>
                            <List.Item>El archivo cargado será eliminado permanentemente</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el tipo del rol vacacional:"
                    placeholder="Escribe el tipo para confirmar..."
                    description={Type}
                    autoFocus
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

// 109 lineas -> 91 lineas