import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconLetterT, IconMapPin } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useDownloadAreasStore } from "@/stores"
import type { Area } from "../../types/areas.types"

export const Delete = ({ id, name }: Area) => {
    const remove = useDownloadAreasStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="Área"
            onDelete={remove}
            label="Para confirmar escribe el nombre del área:"
            warningItems={[
                "Se eliminara permanentemente el área",
                "Se eliminaran permanentemente todas sus descargas"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Área a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconMapPin />
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