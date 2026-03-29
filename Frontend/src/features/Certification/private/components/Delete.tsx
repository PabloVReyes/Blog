import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconArticle, IconAward, IconFileText, IconLetterT } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useCertificationStore } from "@/stores"
import type { CertificationData } from "../../types/certification.types"

export const Delete = ({ id, name, description, file }: CertificationData) => {
    const remove = useCertificationStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (value) => value == name ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Certificado eliminado", "El certificado fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar certificado",
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
                        Certificado a eliminar:
                    </Text>

                    <Group align="center" gap="md">
                        <ThemeIcon
                            size={56}
                            variant="light"
                        >
                            <IconAward />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Group gap={6}>
                                <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {name}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconArticle size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {description}
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
                            <List.Item>Se eliminara permanentemente el certificado</List.Item>
                            <List.Item>El archivo cargado sera eliminado permanentemente</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el nombre del certificado:"
                    placeholder="Escribe el nombre para confirmar..."
                    description={name}
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