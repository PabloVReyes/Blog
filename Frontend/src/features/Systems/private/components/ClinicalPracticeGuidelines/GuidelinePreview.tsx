import { ThemeIcon } from "@/components"
import type { ClinicalPracticeGuidelinesData } from "@/features/Systems/types/ClinicalPracticeGuidelines.types"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconFileText, IconLetterT, IconNumber } from "@tabler/icons-react"

export const GuidelinePreview = ({ code, title, fileER, fileRR }: ClinicalPracticeGuidelinesData) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Guía de Práctica Clínica a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconFileText />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6}>
                        <IconNumber size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {code}
                        </Text>
                    </Group>

                    <Group gap={6}>
                        <IconLetterT size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            {title}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconFileText size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            ER: {fileER?.name}
                        </Text>
                    </Group>

                    <Group gap={6} wrap="nowrap">
                        <IconFileText size={16} style={{ flex: "0 0 auto" }} />
                        <Text fw={700} size="md" truncate>
                            RR: {fileRR?.name}
                        </Text>
                    </Group>
                </Stack>
            </Group>
        </Card>
    )
}