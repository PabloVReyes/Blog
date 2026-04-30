import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import type { UsersData } from "../../types/users.types"
import { IconMail, IconUser } from "@tabler/icons-react"

export const UserPreview = ({ name, email }: UsersData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Usuario a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
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
    )
}