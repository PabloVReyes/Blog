import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconLetterT, IconShield } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSettingsRolesStore } from "@/stores"
import type { RolData } from "../../types/roles.types"

export const Delete = ({ id, name, description }: RolData) => {
    const remove = useSettingsRolesStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="Rol"
            onDelete={remove}
            label="Para confirmar escribe el nombre del rol:"
            warningItems={[
                "Se eliminara permanentemente el rol",
                "Todos los usuario que tienen este rol no podran acceder a algunos apartados del sistema"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Rol a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconShield />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6}>
                            <IconLetterT size={16} />
                            <Text fw={700} size="md" truncate>
                                {name}
                            </Text>
                        </Group>
                        <Group gap={6} wrap="nowrap">
                            <IconArticle size={16} style={{ flex: "0 0 auto" }} />
                            <Text fw={700} size="md" truncate>
                                {description}
                            </Text>
                        </Group>
                    </Stack>
                </Group>
            </Card>
        </CrudDeleteDialog>
    )
}