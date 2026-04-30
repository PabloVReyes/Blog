import type { CarouselData } from "@/features/Home/types/carousel.types"
import { Card, Group, Image, Stack, Text } from "@mantine/core"
import { IconArticle, IconFile, IconLetterT, IconLink } from "@tabler/icons-react"

export const CarouselPreview = ({ imageUrl, title, description, type, url, file }: CarouselData) => {
    return (
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
                        <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {title}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconArticle size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {description}
                        </Text>
                    </Group>

                    {type === "page" &&
                        <Group gap={6} wrap="nowrap">
                            <IconLink size={16} style={{ flex: "0 0 auto" }} />
                            <Text fw={700} size="md" truncate>
                                {url}
                            </Text>
                        </Group>
                    }

                    {type === "file" &&
                        <Group gap={6} wrap="nowrap">
                            <IconFile size={16} style={{ flex: "0 0 auto" }} />
                            <Text fw={700} size="md" truncate>
                                {file.name}
                            </Text>
                        </Group>
                    }
                </Stack>
            </Group>
        </Card>
    )
}