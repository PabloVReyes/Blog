import { Divider, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconAlertCircle, IconCheck, IconMail } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Alert, Notify } from "@/ui"
import { ModalButtons } from "@/components"
import { resetPasswordUser } from "../../api"

interface Props {
    id: string
    name: string
    email: string
}

export const ResetPassword = ({ id, name, email }: Props) => {
    const { openModal } = useModalStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            value: ""
        },
        validate: {
            value: (values) => values === email ? null : "Escribe lo solicitado"
        }
    })

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await resetPasswordUser(id)

            openModal({
                title: "Permiso eliminado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El permiso ha sido eliminado correctamente.
                        </Text>
                    </Stack>
                ),
            });

        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al eliminar permiso",
                message: error.message
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Alert
                    color="blue"
                    content={
                        <Group>
                            <IconMail />
                            <Stack gap={5}>
                                <Text size="sm" fw={700}>Usuario seleccionado:</Text>
                                <Text size="md" fw={700}>{name}</Text>
                                <Text size="sm" fw={500}>{email}</Text>
                            </Stack>
                        </Group>
                    }
                />

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

                <Divider />

                <TextInput
                    label="Confirma el correo electrónico del usuario"
                    autoFocus
                    withAsterisk
                    placeholder="Escribe el correo para confirmar..."
                    {...form.getInputProps("value")}
                />

                <ModalButtons
                    label="Enviar correo"
                    loading={loading}
                />
            </Stack>
        </form>
    )
}