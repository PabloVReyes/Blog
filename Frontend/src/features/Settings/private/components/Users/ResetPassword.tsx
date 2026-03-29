import { Card, Group, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertCircle, IconMail, IconUser } from "@tabler/icons-react"
import { useState } from "react"
import { Alert, Notify, showSuccessModal } from "@/ui"
import { ModalButtons } from "@/components"
import { resetPasswordUser } from "../../api"
import type { UsersData } from "../../types/users.types"

export const ResetPassword = ({ id, name, email }: UsersData) => {
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (value) => value === email ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);
            await resetPasswordUser(id)
            showSuccessModal("Contraseña Restablecida", "La contraseña fue restablecida correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al restablecer contraseña",
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
                        Usuario seleccionado:
                    </Text>

                    <Group align="center" gap="md">
                        <ThemeIcon
                            size={56}
                            variant="light"
                        >
                            <IconUser />
                        </ThemeIcon>

                        <Stack gap={4} style={{ flex: 1, minWidth: 0 }}>
                            <Group gap={6}>
                                <IconUser size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {name}
                                </Text>
                            </Group>

                            <Group gap={6} wrap="nowrap">
                                <IconMail size={16} style={{ flex: "0 0 auto" }} />
                                <Text fw={700} size="md" truncate>
                                    {email}
                                </Text>
                            </Group>
                        </Stack>
                    </Group>
                </Card>


                <Alert
                    color="yellow"
                    title={
                        <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                            <IconAlertCircle style={{ flex: "0 0 auto" }} />
                            <Text fw={600} fz="sm">
                                Confirmación requerida
                            </Text>
                        </Group>
                    }
                    content={"Se enviará un correo electrónico con las nuevas credenciales del usuario"}
                />
                <TextInput
                    label="Para confirmar escribe el correo electrónico del usuario"
                    placeholder="Escribe el correo para confirmar..."
                    description={email}
                    autoFocus
                    {...form.getInputProps("value")}
                />

                <ModalButtons
                    label="Enviar correo"
                    loading={loading}
                    disabled={!form.isValid()}
                />
            </Stack>
        </form>
    )
}

// 106 lineas -> 90 lineas