import { ThemeIcon } from "@/components"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconArticle, IconKey, IconLetterT } from "@tabler/icons-react"
import type { PermissionData } from "../../types/permissions.types"

export const PermissionPreview = ({ name, description, permissionKey }: PermissionData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Permiso a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconKey />
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

                    <Group gap={6} wrap="nowrap">
                        <IconKey size={16} />
                        <Text fw={700} size="md" truncate>
                            {permissionKey}
                        </Text>
                    </Group>
                </Stack>
            </Group>
        </Card>
    )
}