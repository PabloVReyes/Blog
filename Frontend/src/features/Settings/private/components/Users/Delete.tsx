import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconMail, IconUser } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSettingsUsersStore } from "@/stores"
import type { UsersData } from "../../types/users.types"

export const Delete = ({ id, name, email }: UsersData) => {
    const remove = useSettingsUsersStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={email}
            titleEntity="Usuario"
            onDelete={remove}
            label="Para confirmar escribe el email del usuario:"
            warningItems={[
                "Se eliminara permanentemente el usuario",
                "No podra volver acceder al sistema"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Usuario a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconUser />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6}>
                            <IconUser size={16} style={{ flex: "0 0 auto" }} />
                            <Text fw={700} size="md" truncate>
                                {name}
                            </Text>
                        </Group>

                        <Group gap={6} wrap="nowrap">
                            <IconMail size={16} style={{ flex: "0 0 auto" }} />
                            <Text fw={700} size="md" truncate>
                                {email}
                            </Text>
                        </Group>
                    </Stack>
                </Group>
            </Card>
        </CrudDeleteDialog>
    )
}