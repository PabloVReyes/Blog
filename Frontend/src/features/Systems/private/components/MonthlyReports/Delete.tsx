import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconFile, IconFileText, IconLetterT } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsMonthlyReportsStore } from "@/stores"
import type { MonthlyReportsData } from "@/features/Systems/types/monthlyReports.types"

export const Delete = ({ id, title, description, file }: MonthlyReportsData) => {
    const remove = useSystemsMonthlyReportsStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={title}
            titleEntity="Informe Mensual"
            onDelete={remove}
            label="Para confirmar escribe el nombre del informe mensual:"
            warningItems={[
                "Se eliminara permanentemente el informe mensual"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Informe Mensual a eliminar:
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

                        <Group gap={6}>
                            <IconArticle size={16} />
                            <Text fw={700} size="md" truncate>
                                {description}
                            </Text>
                        </Group>

                        <Group gap={6}>
                            <IconFile size={16} />
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