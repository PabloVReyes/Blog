import { ThemeIcon } from "@/components"
import { Card, Group, Stack, Text } from "@mantine/core"
import type { DirectoryData } from "../types/directory.types"
import { IconArticle, IconPhone } from "@tabler/icons-react"

export const DirectoryPreview = ({ phone, name }: DirectoryData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Extensión Telefónica a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon
                    variant="filled"
                >
                    <Text fw={900}>{phone}</Text>
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6}>
                        <IconPhone size={16} />
                        <Text fw={700} size="md" truncate>
                            {phone}
                        </Text>
                    </Group>

                    <Group gap={6}>
                        <IconArticle size={16} />
                        <Text fw={700} size="md" truncate>
                            {name}
                        </Text>
                    </Group>
                </Stack>
            </Group>
        </Card>
    )
}