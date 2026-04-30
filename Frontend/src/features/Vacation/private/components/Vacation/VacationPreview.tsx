import { ThemeIcon } from "@/components"
import type { VacationsData } from "@/features/Vacation/types/vacations.types"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconBleach, IconCalendar, IconFileText, IconSunMoon } from "@tabler/icons-react"

export const VacationPreview = ({ type, shift, file }: VacationsData) => {
    const Type = type === "CALENDAR" ? "Calendario" : "Index"

    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Rol Vacacional a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconBleach />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6} wrap="nowrap">
                        <IconSunMoon size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {shift.name}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconCalendar size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {Type}
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