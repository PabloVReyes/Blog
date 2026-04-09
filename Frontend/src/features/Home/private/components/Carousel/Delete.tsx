import { Card, Group, Image, List, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconArticle, IconFile, IconLetterT, IconLink } from "@tabler/icons-react"
import { useState } from "react";
import { Alert, Notify, showSuccessModal } from "@/ui";
import { ModalButtons } from "@/components";
import { useHomeCarouselStore } from "@/stores";
import type { CarouselData } from "@/features/Home/types/carousel.types";

export const Delete = ({ id, title, imageUrl, type, url, file, description }: CarouselData) => {
    const remove = useHomeCarouselStore(s => s.remove)
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
            showSuccessModal("Carrusel Eliminado", "El carrusel fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar carrusel",
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
                        Carrusel a eliminar:
                    </Text>

                    <Group align="center" gap="md">
                        <Image
                            src={`${import.meta.env.VITE_API_URL}${imageUrl}`}
                            h={64}
                            w={64}
                        />

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
                            <List.Item>Se eliminara permanentemente el carrusel</List.Item>
                            <List.Item>Se perdera la imagen cargada</List.Item>
                            <List.Item>En caso de que la acción sea la descarga de un archivo, este será eliminado</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el título del carrusel:"
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

// 99 lineas -> 86 lineas