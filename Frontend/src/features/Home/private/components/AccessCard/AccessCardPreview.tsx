import { ThemeIcon } from "@/components"
import type { AccessCardData } from "@/features/Home/types/accessCard.types"
import { getTablerIcon } from "@/helpers"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconArticle, IconFile, IconLetterT, IconLink } from "@tabler/icons-react"

export const AccessCardPreview = ({ color, icon, title, description, type, url, file }: AccessCardData) => {
    const Icon = getTablerIcon(icon)
    return (
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
    )
}