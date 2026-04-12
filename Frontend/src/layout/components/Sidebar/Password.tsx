import { Alert, ModalButtons } from "@/components"
import { changePasswordUser } from "@/layout/api"
import { Notify, showSuccessModal } from "@/ui"
import {
    Divider,
    Group,
    List,
    PasswordInput,
    Progress,
    Stack,
    Text
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconCheck, IconShield, IconX } from "@tabler/icons-react"
import { useState } from "react"

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
    return (
        <Group gap={3} align="center" c={meets ? "teal" : "red"}>
            {meets ? <IconCheck size={11} stroke={1.5} /> : <IconX size={11} stroke={1.5} />}
            <Text
                size="xs"
                lh={1.1}
            >
                {label}
            </Text>
        </Group>
    )
}

const requirements = [
    { re: /[0-9]/, label: "Incluye un número" },
    { re: /[a-z]/, label: "Incluye una letra minúscula" },
    { re: /[A-Z]/, label: "Incluye una letra mayúscula" },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Incluye un símbolo especial" }
]

function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1

    requirements.forEach((requirement) => {
        if (!requirement.re.test(password)) {
            multiplier += 1
        }
    })

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0)
}

export const Password = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const form = useForm({
        mode: "controlled",
        initialValues: {
            currentPassword: "",
            newPassword: "",
            confirmPassword: ""
        },

        validate: {
            currentPassword: (value) =>
                value.length === 0 ? "Ingresa tu contraseña actual" : null,

            newPassword: (value) =>
                value.length < 6 ? "La contraseña debe tener al menos 6 caracteres" : null,

            confirmPassword: (value, values) =>
                value !== values.newPassword ? "Las contraseñas no coinciden" : null
        }
    })

    const value = form.values.newPassword
    const strength = getStrength(value)

    const checks = requirements.map((requirement) => (
        <PasswordRequirement
            key={requirement.label}
            label={requirement.label}
            meets={requirement.re.test(value)}
        />
    ))

    const thresholds = [25, 50, 75, 100]

    const bars = thresholds.map((threshold) => (
        <Progress
            key={`bar-${threshold}`}
            styles={{ section: { transitionDuration: "0ms" } }}
            value={
                value.length > 0 && threshold === 25
                    ? 100
                    : strength >= threshold
                        ? 100
                        : 0
            }
            color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
            size={4}
        />
    ))

    const handleSubmit = async (values: typeof form.values) => {
        setLoading(true)
        try {
            await changePasswordUser(id, values)
            showSuccessModal("Contraseña Actualizada", "La contraseña fue actualizada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al cambiar contraseña",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Stack>
            <Alert
                color="yellow"
                content={
                    <Stack gap={0}>
                        <Group gap={5} wrap="nowrap">
                            <IconShield style={{ flex: "0 0 auto" }} />
                            <Text size="sm">
                                <strong>Recomendaciones de seguridad</strong>
                            </Text>
                        </Group>

                        <List ml={30}>
                            <List.Item><Text size="sm">No compartas tu contraseña</Text></List.Item>
                            <List.Item><Text size="sm">Usa una contraseña única</Text></List.Item>
                            <List.Item><Text size="sm">Actualízala regularmente</Text></List.Item>
                        </List>
                    </Stack>
                }
            />

            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack>
                    <PasswordInput
                        withAsterisk
                        label="Contraseña actual"
                        {...form.getInputProps("currentPassword")}
                    />

                    <Divider />

                    <Stack gap={5}>
                        <PasswordInput
                            withAsterisk
                            label="Nueva contraseña"
                            {...form.getInputProps("newPassword")}
                        />

                        <Group gap={5} grow mt="xs" mb="md">
                            {bars}
                        </Group>

                        <PasswordRequirement
                            label="Tiene al menos 6 caracteres"
                            meets={value.length > 5}
                        />
                        {checks}
                    </Stack>

                    <Divider />

                    <PasswordInput
                        withAsterisk
                        label="Confirmar nueva contraseña"
                        {...form.getInputProps("confirmPassword")}
                    />

                    <ModalButtons
                        loading={loading}
                        label="Cambiar contraseña"
                    />
                </Stack>
            </form>
        </Stack>
    )
}