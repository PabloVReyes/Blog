import { ThemeIcon } from "@/components"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconLetterT, IconNumber, IconVirus } from "@tabler/icons-react"
import type { CIE10Data } from "../../types/CIE10.types"

export const CIE10Preview = ({ id, name }: CIE10Data) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Enfermedad a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconVirus />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6}>
                        <IconNumber size={16} />
                        <Text fw={700} size="md" truncate>
                            {id}
                        </Text>
                    </Group>

                    <Group gap={6}>
                        <IconLetterT size={16} />
                        <Text fw={700} size="md" truncate>
                            {name}
                        </Text>
                    </Group>
                </Stack>
            </Group>
        </Card>
    )
}