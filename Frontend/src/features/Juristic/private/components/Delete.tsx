import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconArticle, IconFileText, IconGavel, IconLetterT } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useJuristicStore } from "@/stores"
import type { JuristicData } from "../../types/juristic.types"

export const Delete = ({ id, name, description, file }: JuristicData) => {
    const remove = useJuristicStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="Disposición Jurídica"
            onDelete={remove}
            label="Para confirmar escribe el nombre de la disposición jurídica:"
            warningItems={[
                "Se eliminara permanentemente la disposición jurídica",
                "Se perdera el archivo cargado"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Disposicion Jurídica Administrativa a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
                        <IconGavel />
                    </ThemeIcon>

                    <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                        <Group gap={6} wrap="nowrap">
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