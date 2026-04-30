import { ThemeIcon } from "@/components"
import type { MacroprocessData } from "@/features/Macroprocess/types/macroprocess.types"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconFileText, IconLetterT, IconMapPin } from "@tabler/icons-react"

export const MacroprocessPreview = ({ manualType, area }: MacroprocessData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Macroproceso a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconFileText />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6} wrap="nowrap">
                        <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {manualType.name}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconMapPin size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {area.name}
                        </Text>
                    </Group>
                </Stack>
            </Group>
        </Card>
    )
}