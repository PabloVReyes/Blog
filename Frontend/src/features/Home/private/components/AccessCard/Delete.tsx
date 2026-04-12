import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconFile, IconLetterT, IconLink } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components";
import { useHomeAccessCardStore } from "@/stores";
import type { AccessCardData } from "@/features/Home/types/accessCard.types";
import { getTablerIcon } from "@/helpers";

export const Delete = ({ id, title, color, icon, description, type, url, file }: AccessCardData) => {
    const remove = useHomeAccessCardStore(s => s.remove)
    const IconAccess = getTablerIcon(icon)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={title}
            titleEntity="Acceso Rápido"
            onDelete={remove}
            label="Para confirmar escribe el título del acceso rápido:"
            warningItems={[
                "Se eliminara permanentemente el acceso rápido",
                "En caso de que la acción sea la descarga de un archivo, este será eliminado permanentemente"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Acceso Rápido a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                        color={color}
                    >
                        <IconAccess />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6}>
                            <IconLetterT size={16} />
                            <Text fw={700} size="md" truncate>
                                {title}
                            </Text>
                        </Group>

                        <Group gap={6}>
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
                                    {file.name}
                                </Text>
                            </Group>
                        }
                    </Stack>
                </Group>
            </Card>
        </CrudDeleteDialog>
    )
}