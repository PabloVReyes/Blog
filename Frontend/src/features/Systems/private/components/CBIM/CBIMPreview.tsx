import { ThemeIcon } from "@/components"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconLetterT, IconNumber, IconPillFilled } from "@tabler/icons-react"
import type { CBIMData } from "../../types/CBIM.types"

export const CBIMPreview = ({ code, name }: CBIMData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Medicamento a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconPillFilled />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6} wrap="nowrap" style={{ flex: "0 0 auto" }}>
                        <IconNumber size={16} />
                        <Text fw={700} size="md" truncate>
                            {code}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {name}
                        </Text>
                    </Group>

                </Stack>
            </Group>
        </Card>
    )
}