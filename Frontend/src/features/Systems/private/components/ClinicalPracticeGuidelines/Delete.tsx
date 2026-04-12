import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconFileText, IconLetterT, IconNumber } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsClinicalPracticeGuidelinesStore } from "@/stores"
import type { ClinicalPracticeGuidelinesData } from "@/features/Systems/types/ClinicalPracticeGuidelines.types"

export const Delete = ({ id, title, code, fileER, fileRR }: ClinicalPracticeGuidelinesData) => {
    const remove = useSystemsClinicalPracticeGuidelinesStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={code}
            titleEntity="Guía de Práctica Clínica"
            onDelete={remove}
            label="Para confirmar escribe la clave de la Guía de Práctica Clínica:"
            warningItems={[
                "Se eliminara permanentemente la Guía de Práctica Clínica",
                "Los archivos cargados serán eliminados permanentemente"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Guía de Práctica Clínica a eliminar:
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
        </CrudDeleteDialog>
    )
}