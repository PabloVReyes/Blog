import { Card, Group, List, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertTriangleFilled, IconMapPin, IconUser, IconUsers, IconUsersGroup } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { useSystemsAgreementPersonStore } from "@/stores"
import type { AgreementPerson } from "../../types/agreementPerson.types"

export const Delete = ({ id, name, zone, group }: AgreementPerson) => {
    const remove = useSystemsAgreementPersonStore(s => s.remove)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            value: ""
        },
        validate: {
            value: (value) => value === name ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await remove?.(id)
            showSuccessModal("Paciente de Convenio Eliminado", "El paciente de convenio fue eliminado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al eliminar paciente de convenio",
                message: error instanceof Error ? error.message : "Error desconocido"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
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

                <Alert
                    color="red"
                    title={
                        <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                            <IconAlertTriangleFilled
                                size={20}
                                color="orange"
                                style={{ flex: "0 0 auto" }}
                            />
                            <Text fw={600} fz="lg">
                                ADVERTENCIA: Esta acción es irreversible
                            </Text>
                        </Group>
                    }
                    content={
                        <List>
                            <List.Item>Se eliminara permanentemente el paciente de convenio</List.Item>
                            <List.Item>En caso de que sea un titular y tenga dependientes primero debera eliminar el dependiente</List.Item>
                        </List>
                    }
                />

                <TextInput
                    label="Para confirmar escribe el nombre del paciente:"
                    placeholder="Escribe el nombre para confirmar..."
                    description={name}
                    autoFocus
                    {...form.getInputProps("value")}
                />

                <ModalButtons
                    label="Eliminar"
                    loading={loading}
                    disabled={!form.isValid()}
                />
            </Stack>
        </form>
    )
}

// 106 lineas -> 90 lineas