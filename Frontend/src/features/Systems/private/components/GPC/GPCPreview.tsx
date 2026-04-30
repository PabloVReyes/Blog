import { ThemeIcon } from "@/components"
import type { GPCData } from "@/features/Systems/types/gpc.types"
import { getTablerIcon } from "@/helpers"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconArticle, IconFileText, IconLetterT, IconRepeat } from "@tabler/icons-react"

export const GPCPreview = ({ orderIndex, title, description, cycle, file }: GPCData) => {
    const Icon = getTablerIcon(`IconHexagonNumber${orderIndex}Filled`)

    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Algoritmo GPC a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <Icon />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6}>
                        <IconLetterT size={16} />
                        <Text fw={700} size="md" truncate>
                            {title}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconArticle size={16} />
                        <Text fw={700} size="md" truncate>
                            {description}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconRepeat size={16} />
                        <Text fw={700} size="md" truncate>
                            {cycle.name}
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