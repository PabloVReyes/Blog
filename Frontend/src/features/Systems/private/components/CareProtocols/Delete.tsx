import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconCategory, IconFileText, IconLetterT } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsCareProtocolsApiStore } from "@/stores"
import type { CareProtocolsData } from "@/features/Systems/types/careProtocols.types"

export const Delete = ({ id, title, description, category, file }: CareProtocolsData) => {
    const remove = useSystemsCareProtocolsApiStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={title}
            titleEntity="Protocolo de Atención (Pediatría)"
            onDelete={remove}
            label="Para confirmar escribe el título del protocolo:"
            warningItems={[
                "Se eliminara permanentemente el Protocolo de Atención (Pediatría)",
                "El archivo cargado será eliminado permanentemente"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Protocolo de Atención (Pediatría) a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconFileText />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6}>
                            <IconLetterT size={16} />
                            <Text fw={700} size="md" truncate>
                                {title}
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
                            <IconFileText size={16} />
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