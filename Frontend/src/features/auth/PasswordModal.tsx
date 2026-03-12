import { Stack, Text, PasswordInput, Button, Group, Progress } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useModalStore } from "@/layout/store"
import { useAuthStore } from "./store"
import { api } from "@/lib"
import { IconCheck, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { Notify } from "@/ui"

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


export const ChangePasswordModal = () => {
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            password: "",
            confirmPassword: ""
        },
        validate: {
            confirmPassword: (value, values) =>
                value !== values.password
                    ? "Las contraseñas no coinciden"
                    : null
        }
    })

    const updateUser = useAuthStore(state => state.updateUser)
    const user = useAuthStore(state => state.user)
    const { openModal } = useModalStore()

    const value = form.values.password
    const strength = getStrength(value)

    const checks = requirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(value)}
        />
    ))

    const bars = Array(4)
        .fill(0)
        .map((_, index) => (
            <Progress
                key={index}
                styles={{ section: { transitionDuration: "0ms" } }}
                value={
                    value.length > 0 && index === 0
                        ? 100
                        : strength >= ((index + 1) / 4) * 100
                            ? 100
                            : 0
                }
                color={strength > 80 ? "teal" : strength > 50 ? "yellow" : "red"}
                size={4}
            />
        ))

    const handleSubmit = async (values: any) => {
        try {
            await api.put(`/api/users/me/change-passwd/${user?.id}`, {
                password: values.password
            })

            updateUser({
                mustChangePassword: false
            })

            openModal({
                title: "Área agregado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El área ha sido agregado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al cambiar contraseña",
                message: error?.response?.data?.message ||
                    error?.message ||
                    "Error desconocido"
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (

        <form onSubmit={form.onSubmit(handleSubmit)}>

            <Stack>

                <Text size="sm" c="dimmed">
                    Debes cambiar tu contraseña antes de continuar.
                </Text>

                <Stack gap={5}>
                    <PasswordInput
                        withAsterisk
                        label="Nueva contraseña"
                        {...form.getInputProps("password")}
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

                <PasswordInput
                    label="Confirmar contraseña"
                    {...form.getInputProps("confirmPassword")}
                />

                <Group justify="flex-end">
                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Cambiar contraseña
                    </Button>
                </Group>

            </Stack>

        </form>

    )
}