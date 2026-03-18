import { MAX_NAME_PERSON_LENGTH } from "@/constants"
import { useAuthStore } from "@/features/auth/store"
import { validateName } from "@/utils"
import { Box, Divider, Fieldset, Group, Stack, Text, TextInput, ThemeIcon, UnstyledButton } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconChevronRight, IconKey, IconMail } from "@tabler/icons-react"
import classes from "./Profile.module.css"
import { useModalStore } from "@/layout/store"
import { Password } from "./Password"
import { ModalButtons } from "@/components"
import { useState } from "react"
import { updateMe } from "@/layout/api"
import { Notify, showSuccessModal } from "@/ui"

type ProfileFormValues = {
    name: string;
    email: string
}

export const Profile = () => {
    const { openModal } = useModalStore()
    const [loading, setLoading] = useState<boolean>(false)
    const user = useAuthStore(state => state.user)
    const updateUser = useAuthStore(state => state.updateUser)

    if (!user) {
        throw new Error("Usuario no cargado")
    }

    const form = useForm<ProfileFormValues>({
        mode: "controlled",
        initialValues: {
            name: user?.name ?? "",
            email: user?.email ?? ""
        },
        validate: {
            name: (value) => validateName(value, { required: true })
        }
    })

    const handlePassword = () => {


        openModal({
            content: <Password
                id={user.id}
            />
        })
    }

    const handleSubmit = async (values: ProfileFormValues) => {
        setLoading(true)
        try {
            await updateMe(user.id, values)
            await updateUser(values)
            showSuccessModal("Perfil Actualizado", "El perfil fue actualizado correctamente")
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
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>

                <Fieldset legend="Información Personal">
                    <TextInput
                        withAsterisk
                        label="Nombre completo"
                        maxLength={MAX_NAME_PERSON_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_NAME_PERSON_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("name")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Correo Electronico"
                        leftSection={
                            <IconMail size={16} />
                        }
                        {...form.getInputProps("email")}
                        placeholder="email@example.com"
                    />

                    <Box pt="xl">
                        <Divider mb="lg" />

                        <Stack gap={4} mb="md">
                            <Text fw={600} size="lg">Seguridad</Text>
                            <Text size="sm" c="dimmed">
                                Gestiona tu contraseña y configuración de seguridad
                            </Text>
                        </Stack>

                        <UnstyledButton
                            onClick={handlePassword}
                            className={classes.button}
                        >
                            <Group justify="space-between" wrap="nowrap">
                                <Group gap="md">
                                    <ThemeIcon size={40} radius="md" variant="transparent" color="blue">
                                        <IconKey size={20} stroke={1.5} />
                                    </ThemeIcon>

                                    <Box>
                                        <Text fw={500} size="sm">Cambiar Contraseña</Text>
                                        <Text size="xs" c="dimmed">Actualiza tu contraseña de acceso</Text>
                                    </Box>
                                </Group>

                                <IconChevronRight size={16} className={classes.chevron} stroke={1.5} />
                            </Group>
                        </UnstyledButton>
                    </Box>

                </Fieldset>

                <ModalButtons
                    loading={loading}
                    label="Guardar cambios"
                />
            </Stack>
        </form>
    )
}

// 141 lineas -> 129 lineas