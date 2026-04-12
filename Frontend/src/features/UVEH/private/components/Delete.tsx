import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconCategory, IconFileText, IconLetterT, IconVirus } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useUVEHStore } from "@/stores"
import type { UVEHData } from "../../types/UVEH.types"

export const Delete = ({ id, name, description, category, file }: UVEHData) => {
    const remove = useUVEHStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="UVEH"
            onDelete={remove}
            label="Para confirmar escribe el nombre del UVEH:"
            warningItems={[
                "Se eliminara permanentemente el UVEH",
                "El archivo cargado será eliminado permanentemente"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    UVEH a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconVirus />
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

                        <Group gap={6} wrap="nowrap">
                            <IconCategory size={16} />
                            <Text fw={700} size="md" truncate>
                                {category.name}
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