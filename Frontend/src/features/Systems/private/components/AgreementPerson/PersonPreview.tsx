import { ThemeIcon } from "@/components"
import { Card, Group, Stack, Text } from "@mantine/core"
import { IconMapPin, IconUser, IconUsers, IconUsersGroup } from "@tabler/icons-react"
import type { AgreementPerson } from "../../types/agreementPerson.types"

export const PersonPreview = ({ name, zone, group }: AgreementPerson) => {
    return (
        <Card
            radius="md"
            p="md"
            withBorder
        >
            <Text size="sm" fw={500} c="dimmed" mb="sm">
                Paciente de Convenio a eliminar:
            </Text>

            <Group align="center" gap="md">
                <ThemeIcon>
                    <IconUsers />
                </ThemeIcon>

                <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                    <Group gap={6}>
                        <IconUser size={16} />
                        <Text fw={700} size="md" truncate>
                            {name}
                        </Text>
                    </Group>

                    <Group gap={6}>
                        <IconMapPin size={16} />
                        <Text fw={700} size="md" truncate>
                            {zone.name}
                        </Text>
                    </Group>

                    <Group gap={6}>
                        <IconUsersGroup size={16} />
                        <Text fw={700} size="md" truncate>
                            {group.name}
                        </Text>
                    </Group>

                </Stack>
            </Group>
        </Card>
    )
}