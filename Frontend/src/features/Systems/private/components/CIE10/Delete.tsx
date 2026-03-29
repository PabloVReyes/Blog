import { Divider, Stack, Text, TextInput, Card, Group, ThemeIcon, useMantineTheme, List } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconLetterT, IconNumber, IconVirus } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useSystemsCIE10Store } from "@/stores"
import type { CIE10 } from "../../types/CIE10.types"

export const Delete = ({ id, name }: CIE10) => {
    const remove = useSystemsCIE10Store(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)
    const { primaryColor } = useMantineTheme()

    const form = useForm({
        mode: "controlled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value) => value == id ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Enfermedad Eliminada", "La enfermedad fue eliminada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar enfermedad",
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
                        Enfermedad a eliminar:
                    </Text>

                    <Group align="center" gap="md">
                        <ThemeIcon
                            size={56}
                            variant="light"
                            color={primaryColor}
                        >
                            <IconVirus />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Group gap={6}>
                                <IconNumber size={16} />
                                <Text fw={700} size="md" truncate>
                                    {id}
                                </Text>
                            </Group>

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
                            <List.Item>Se eliminara permanentemente la enfermedad</List.Item>
                        </List>
                    }
                />

                <Divider />

                <TextInput
                    label="Para confirmar escribe la clave de la enfermedad:"
                    placeholder="Escribe la clave para confirmar..."
                    description={id}
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
