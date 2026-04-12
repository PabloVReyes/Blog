import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconFileText, IconLetterT } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsPBMStore } from "@/stores"
import type { PMBData } from "@/features/Systems/types/pbm.types"

export const Delete = ({ id, title, file }: PMBData) => {
    const remove = useSystemsPBMStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={title}
            titleEntity="Algoritmo PBM"
            onDelete={remove}
            label="Para confirmar escribe el nombre del algoritmo PBM:"
            warningItems={[
                "Se eliminara permanentemente el algoritmo PBM"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Algoritmo PBM a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconFileText />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6}>
                            <IconLetterT size={16} />
                            <Text fw={700} size="md" truncate>
                                {title}
                            </Text>
                        </Group>

                        <Group gap={6} wrap="nowrap">
                            <IconFileText size={16} />
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