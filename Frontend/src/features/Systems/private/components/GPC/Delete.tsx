import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconFileText, IconLetterT, IconRepeat } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsGPCStore } from "@/stores"
import type { GPCData } from "@/features/Systems/types/gpc.types"
import { getTablerIcon } from "@/helpers"

export const Delete = ({ id, title, orderIndex, description, cycle, file }: GPCData) => {
    const remove = useSystemsGPCStore(s => s.remove)
    const Icon = getTablerIcon(`IconHexagonNumber${orderIndex}Filled`)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={title}
            titleEntity="Algoritmo GPC"
            onDelete={remove}
            label="Para confirmar escribe el nombre del algoritmo GPC:"
            warningItems={[
                "Se eliminara permanentemente el algoritmo GPC"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Algoritmo GPC a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <Icon />
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
                            <IconRepeat size={16} />
                            <Text fw={700} size="md" truncate>
                                {cycle.name}
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