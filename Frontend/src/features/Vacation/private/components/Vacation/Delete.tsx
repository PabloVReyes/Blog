import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconBleach, IconCalendar, IconFileText, IconSunMoon } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useVacationStore } from "@/stores"
import type { VacationsData } from "@/features/Vacation/types/vacations.types"

export const Delete = ({ id, type, shift, file }: VacationsData) => {
    const remove = useVacationStore(s => s.remove)
    const Type = type === "CALENDAR" ? "Calendario" : "Index"

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={Type}
            titleEntity="Vacación"
            onDelete={remove}
            label="Para confirmar escribe el tipo de vacación:"
            warningItems={[
                "Se eliminarán permanentemente las vacaciones",
                "Los roles vacacionales serán eliminados permanentemente"
            ].filter(Boolean) as string[]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Rol Vacacional a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
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
        </CrudDeleteDialog>
    )
}