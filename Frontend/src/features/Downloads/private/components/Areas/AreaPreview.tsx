import { ThemeIcon } from "@/components"
import { getTablerIcon } from "@/helpers"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconLetterT } from "@tabler/icons-react";
import type { Area } from "../../types/areas.types";

export const AreaPreview = ({ icon, name, color }: Area) => {
    const Icon = getTablerIcon(icon);

    return (
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
                    radius={50}
                    variant="filled"
                    color={color}
                >
                    <Icon />
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
    )
}