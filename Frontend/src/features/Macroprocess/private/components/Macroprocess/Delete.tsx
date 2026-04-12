import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconFileText, IconLetterT, IconMapPin } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components";
import { useMacroprocessStore } from "@/stores";
import type { MacroprocessData } from "@/features/Macroprocess/types/macroprocess.types";

export const Delete = ({ id, manualType, area }: MacroprocessData) => {
    const remove = useMacroprocessStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={manualType.name}
            titleEntity="Macroproceso"
            onDelete={remove}
            label="Para confirmar escribe el nombre del macroproceso:"
            warningItems={[
                "Se eliminara permanentemente la guía del macroproceso"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Macroproceso a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
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
        </CrudDeleteDialog>
    )
}
