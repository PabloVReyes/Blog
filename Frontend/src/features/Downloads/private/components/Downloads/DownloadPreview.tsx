import { ThemeIcon } from "@/components"
import type { DownloadData } from "@/features/Downloads/types/download.types"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconArticle, IconDownload, IconFileText, IconLetterT, IconMapPin } from "@tabler/icons-react"

export const DownloadPreview = ({ name, description, category, file }: DownloadData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Descarga a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconDownload />
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
                        <IconMapPin size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {category.section?.area?.name}
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
    )
}