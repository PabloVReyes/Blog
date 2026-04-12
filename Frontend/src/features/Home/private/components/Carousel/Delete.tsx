import { Card, Group, Image, Stack, Text } from "@mantine/core"
import { IconArticle, IconFile, IconLetterT, IconLink } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components";
import { useHomeCarouselStore } from "@/stores";
import type { CarouselData } from "@/features/Home/types/carousel.types";

export const Delete = ({ id, title, imageUrl, type, url, file, description }: CarouselData) => {
    const remove = useHomeCarouselStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={title}
            titleEntity="Carrusel"
            onDelete={remove}
            label="Para confirmar escribe el título del carrusel:"
            warningItems={[
                "Se eliminara permanentemente el carrusel",
                "Se perdera la imagen cargada",
                "En caso de que la acción sea la descarga de un archivo, este será eliminado"
            ]}
        >
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
                        <Group gap={6} wrap="nowrap">
                            <IconLetterT size={16} style={{flex: "0 0 auto"}}/>
                            <Text fw={700} size="md" truncate>
                                {title}
                            </Text>
                        </Group>

                        <Group gap={6} wrap="nowrap">
                            <IconArticle size={16} style={{flex: "0 0 auto"}}/>
                            <Text fw={700} size="md" truncate>
                                {description}
                            </Text>
                        </Group>

                        {type === "page" &&
                            <Group gap={6} wrap="nowrap">
                                <IconLink size={16} style={{flex: "0 0 auto"}} />
                                <Text fw={700} size="md" truncate>
                                    {url}
                                </Text>
                            </Group>
                        }

                        {type === "file" &&
                            <Group gap={6} wrap="nowrap">
                                <IconFile size={16} style={{flex: "0 0 auto"}} />
                                <Text fw={700} size="md" truncate>
                                    {file.name}
                                </Text>
                            </Group>
                        }
                    </Stack>
                </Group>
            </Card>
        </CrudDeleteDialog>
    )
}