import { ThemeIcon } from "@/components"
import type { MonthlyReportsData } from "@/features/Systems/types/monthlyReports.types"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconArticle, IconFile, IconFileText, IconLetterT } from "@tabler/icons-react"

export const ReportPreview = ({ title, description, file }: MonthlyReportsData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Informe Mensual a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
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
    )
}