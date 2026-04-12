import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconDownload, IconFileText, IconLetterT, IconMapPin } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useDownloadStore } from "@/stores"
import type { DownloadData } from "@/features/Downloads/types/download.types"

export const Delete = ({ id, name, description, category, file }: DownloadData) => {
    const remove = useDownloadStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="Descarga"
            onDelete={remove}
            label="Para confirmar escribe el nombre de la descarga:"
            warningItems={[
                "Se eliminara permanentemente la descarga",
                "El archivo cargado será eliminado permanentemente"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Descarga a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconDownload />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6}>
                            <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
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
                            <IconMapPin size={16} style={{ flex: "0 0 auto" }} />
                            <Text fw={700} size="md" truncate>
                                {category.section?.area?.name}
                            </Text>
                        </Group>

                        <Group gap={6} wrap="nowrap">
                            <IconFileText size={16} style={{ flex: "0 0 auto" }} />
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