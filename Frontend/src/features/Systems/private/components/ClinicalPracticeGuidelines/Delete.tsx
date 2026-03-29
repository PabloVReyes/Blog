import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconFileText, IconLetterT, IconNumber } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useSystemsClinicalPracticeGuidelinesStore } from "@/stores"
import type { ClinicalPracticeGuidelinesData } from "@/features/Systems/types/ClinicalPracticeGuidelines.types"

export const Delete = ({ id, title, code, fileER, fileRR }: ClinicalPracticeGuidelinesData) => {
    const remove = useSystemsClinicalPracticeGuidelinesStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (value) => value === code ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Guía de Práctica Clínica Eliminada", "La guía de práctica clínica fue eliminada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar guía de práctica clínica",
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
                        Guía de Práctica Clínica a eliminar:
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
                                <IconNumber size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {code}
                                </Text>
                            </Group>

                            <Group gap={6}>
                                <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {title}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconFileText size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    ER: {fileER?.name}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconFileText size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    RR: {fileRR?.name}
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
                            <List.Item>Se eliminara permanentemente la Guía de Práctica Clínica</List.Item>
                            <List.Item>Las guías seran eliminadas</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe la clave de la Guía de Práctica Clínica:"
                    placeholder="Escribe la clave para confirmar..."
                    description={code}
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

// 107 lineas -> 91 lineas