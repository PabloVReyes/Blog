import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconLetterT } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useVacationShiftStore } from "@/stores"
import type { ShiftData } from "@/features/Vacation/types/vacations.types"
import { getTablerIcon } from "@/helpers"

export const Delete = ({ id, name, color, icon }: ShiftData) => {
    const remove = useVacationShiftStore(s => s.remove)
    const Icon = getTablerIcon(icon);

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="Turno"
            onDelete={remove}
            label="Para confirmar escribe el nombre del turno:"
            warningItems={[
                "Se eliminara permanentemente el turno",
                "Los roles vacacionales serán eliminados permanentemente"
            ].filter(Boolean) as string[]}
        >
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
                        size={56}
                        variant="light"
                        color={color}
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
        </CrudDeleteDialog>
    )
}