import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconPhone } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useDirectoryStore } from "@/stores"
import type { DirectoryData } from "../types/directory.types"

export const Delete = ({ id, phone, name }: DirectoryData) => {
    const remove = useDirectoryStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={phone}
            titleEntity="Extensión Telefónica"
            onDelete={remove}
            label="Para confirmar escribe la extensión telefónica:"
            warningItems={[
                "Se eliminara permanentemente la extensión telefonica"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Extensión Telefónica a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        {phone}
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6}>
                            <IconPhone size={16} />
                            <Text fw={700} size="md" truncate>
                                {phone}
                            </Text>
                        </Group>

                        <Group gap={6}>
                            <IconArticle size={16} />
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

// 107 lineas 