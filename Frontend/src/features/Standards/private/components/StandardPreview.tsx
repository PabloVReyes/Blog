import { ThemeIcon } from "@/components"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconArticle, IconCategory, IconFileText, IconLetterT } from "@tabler/icons-react"
import type { StandardsData } from "../../types/standards.types"

export const StandardPreview = ({ name, description, category, file }: StandardsData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Norma Oficial Mexicana a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconFileText />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6} wrap="nowrap">
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
                        <IconCategory size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {category.name}
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