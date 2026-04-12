import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconLetterT, IconMedicalCross, IconNumber } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsCBIMStore } from "@/stores"

interface Props {
    id: string
    name: string
    code: string
}

export const Delete = ({ id, name, code }: Props) => {
    const remove = useSystemsCBIMStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={code}
            titleEntity="Medicamento"
            onDelete={remove}
            label="Para confirmar escribe la clave del medicamento:"
            warningItems={[
                "Se eliminara permanentemente el medicamento"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Medicamento a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconMedicalCross />
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
        </CrudDeleteDialog>
    )
}