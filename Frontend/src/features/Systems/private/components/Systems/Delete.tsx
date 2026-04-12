import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconFile, IconLetterT, IconLink } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsStore } from "@/stores"
import { getTablerIcon } from "@/helpers"
import type { SystemData } from "@/features/Systems/types/systems.types"

export const Delete = ({ id, name, icon, color, description, type, url, file }: SystemData) => {
    const remove = useSystemsStore(s => s.remove)
    const Icon = getTablerIcon(icon)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="Sistema"
            onDelete={remove}
            label="Para confirmar escribe el nombre del sistema:"
            warningItems={[
                "Se eliminara permanentemente el sistema",
                type === "file" && "El archivo cargado será eliminado permanentemente"
            ].filter(Boolean) as string[]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Sistema a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
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

                        <Group gap={6} wrap="nowrap">
                            <IconArticle size={16} />
                            <Text fw={700} size="md" truncate>
                                {description}
                            </Text>
                        </Group>

                        {type === "page" &&
                            <Group gap={6}>
                                <IconLink size={16} />
                                <Text fw={700} size="md" truncate>
                                    {url}
                                </Text>
                            </Group>
                        }

                        {type === "file" &&
                            <Group gap={6}>
                                <IconFile size={16} />
                                <Text fw={700} size="md" truncate>
                                    {file?.name}
                                </Text>
                            </Group>
                        }
                    </Stack>
                </Group>
            </Card>
        </CrudDeleteDialog>
    )
}