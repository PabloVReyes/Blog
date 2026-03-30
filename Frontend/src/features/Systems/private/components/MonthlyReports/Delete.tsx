import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconArticle, IconFile, IconFileText, IconLetterT } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useSystemsMonthlyReportsStore } from "@/stores"
import type { MonthlyReportsData } from "@/features/Systems/types/monthlyReports.types"

export const Delete = ({ id, title, description, file }: MonthlyReportsData) => {
    const remove = useSystemsMonthlyReportsStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value) => value == title ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Informe Mensual Eliminado", "El informe mensual fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar informe mensual",
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
                        Informe Mensual a eliminar:
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

                            <Group gap={6}>
                                <IconArticle size={16} />
                                <Text fw={700} size="md" truncate>
                                    {description}
                                </Text>
                            </Group>

                            <Group gap={6}>
                                <IconFile size={16} />
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
                            <List.Item>Se eliminara permanentemente el informe mensual</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el título del informe mensual"
                    description={title}
                    placeholder="Escribe el título para confirmar..."
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

// 104 lineas -> 90 lineas