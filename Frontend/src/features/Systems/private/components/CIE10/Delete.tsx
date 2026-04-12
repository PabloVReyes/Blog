import { Stack, Text, Card, Group, ThemeIcon, useMantineTheme } from "@mantine/core"
import { IconLetterT, IconNumber, IconVirus } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsCIE10Store } from "@/stores"
import type { CIE10 } from "../../types/CIE10.types"

export const Delete = ({ id, name }: CIE10) => {
    const remove = useSystemsCIE10Store(s => s.remove)
    const { primaryColor } = useMantineTheme()

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={id}
            titleEntity="Enfermedad"
            onDelete={remove}
            label="Para confirmar escribe la clave de la enfermedad:"
            warningItems={[
                "Se eliminara permanentemente la enfermedad"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Enfermedad a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                        color={primaryColor}
                    >
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
        </CrudDeleteDialog>
    )
}