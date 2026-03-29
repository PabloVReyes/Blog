import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconArticle, IconFile, IconLetterT, IconLink } from "@tabler/icons-react"
import { useState } from "react";
import { Alert, Notify, showSuccessModal } from "@/ui";
import { ModalButtons } from "@/components";
import { useHomeAccessCardStore } from "@/stores";
import type { AccessCardData } from "@/features/Home/types/accessCard.types";
import { getTablerIcon } from "@/helpers";

export const Delete = ({ id, title, color, icon, description, type, url, file }: AccessCardData) => {
    const remove = useHomeAccessCardStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value => value == title ? null : "Para eliminar el archivo escribe lo que se solicita")
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await remove?.(id)
            showSuccessModal("Acceso Rápido Eliminado", "El acceso rápido fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar acceso rápido",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    const Icon = getTablerIcon(icon)

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Card
                    radius="md"
                    p="md"
                    withBorder
                >
                    <Text size="sm" fw={500} c="dimmed" mb="sm">
                        Acceso Rápido a eliminar:
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
                                    {title}
                                </Text>
                            </Group>

                            <Group gap={6}>
                                <IconArticle size={16} />
                                <Text fw={700} size="md" truncate>
                                    {description}
                                </Text>
                            </Group>

                            {type === "page" &&
                                <Group gap={6}>
                                    <IconLink size={16} />
                                    <Text fw={700} size="md" truncate>
                                        {url}
                                    </Text>
                                </Group>
                            }

                            {type === "file" &&
                                <Group gap={6}>
                                    <IconFile size={16} />
                                    <Text fw={700} size="md" truncate>
                                        {file.name}
                                    </Text>
                                </Group>
                            }
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
                            <List.Item>Se eliminara permanentemente el acceso rápido</List.Item>
                            <List.Item>En caso de que la acción sea la descarga de un archivo, este sera eliminado</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el título del acceso rápido:"
                    description={title}
                    autoFocus
                    placeholder="Escribe el título para confirmar..."
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

// 100 lineas  -> 86 lineas