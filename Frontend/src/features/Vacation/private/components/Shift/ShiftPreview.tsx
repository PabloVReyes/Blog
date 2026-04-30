import type { ShiftData } from "@/features/Vacation/types/vacations.types"
import { getTablerIcon } from "@/helpers"
import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconLetterT } from "@tabler/icons-react";


export const ShiftPreview = ({ color, icon, name }: ShiftData) => {
    const Icon = getTablerIcon(icon);
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Turno a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon
                    color={color}
                    variant="filled"
                >
                    <Icon />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
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