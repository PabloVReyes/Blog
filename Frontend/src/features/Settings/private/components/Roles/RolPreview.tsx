import { Card, Group, Stack, Text } from "@mantine/core";
import type { RolData } from "../../types/roles.types";
import { ThemeIcon } from "@/components";
import { IconArticle, IconLetterT, IconShield } from "@tabler/icons-react";

export const RolPreview = ({ name, description }: RolData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Rol a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
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
    )
}