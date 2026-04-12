import { Card, Group, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconMapPin, IconUser, IconUsers, IconUsersGroup } from "@tabler/icons-react"
import { CrudDeleteDialog } from "@/components"
import { useSystemsAgreementPersonStore } from "@/stores"
import type { AgreementPerson } from "../../types/agreementPerson.types"

export const Delete = ({ id, name, zone, group }: AgreementPerson) => {
    const remove = useSystemsAgreementPersonStore(s => s.remove)

    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={name}
            titleEntity="Paciente de Convenio"
            onDelete={remove}
            label="Para confirmar escribe el nombre del paciente de convenio:"
            warningItems={[
                "Se eliminara permanentemente el paciente de convenio",
                "En caso de que sea un titular y tenga dependientes primero debera eliminar el dependiente"
            ]}
        >
            <Card
                radius="md"
                p="md"
                withBorder
            >
                <Text size="sm" fw={500} c="dimmed" mb="sm">
                    Paciente de Convenio a eliminar:
                </Text>

                <Group align="center" gap="md">
                    <ThemeIcon
                        size={56}
                        variant="light"
                    >
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
        </CrudDeleteDialog>
    )
}