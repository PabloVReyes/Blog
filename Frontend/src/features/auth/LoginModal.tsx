import { Modal, Button, Stack, TextInput, PasswordInput, Box, useMantineTheme, Group, Title, ThemeIcon } from "@mantine/core";
import { useState } from "react";
import { useAuthStore } from "./store";
import { api } from "@/lib";
import { useNavigate } from "react-router-dom"
import { IconLock, IconMail, IconX } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { validateEmail } from "@/utils";
import { Notify } from "@/ui";

export function LoginModal() {
    const opened = useAuthStore((s) => s.loginOpened);
    const close = useAuthStore((s) => s.closeLogin);
    const login = useAuthStore((s) => s.login);
    const theme = useMantineTheme()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            email: "",
            password: ""
        },
        validate: {
            email: (value) => validateEmail(value, { required: true }),
            password: (value) => value.length < 1 ? "Introduce la contraseña" : null
        }
    })

    const handleClose = () => {
        form.reset()
        close()
    }

    const navigate = useNavigate()

    const handleLogin = async (values: typeof form.values) => {
        setLoading(true)
        try {
            const { data } = await api.post("/api/auth/login", values)
            login(data.user, data.token)
            form.reset()
            navigate("/administracion")
        } catch (error) {
            Notify({
                type: "error",
                title: "Error al iniciar sesión",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            withCloseButton={false}
            overlayProps={{ opacity: 0.6, blur: 4 }}
            centered
            size="md"
            padding={0}
        >
            <Box
                bg={theme.primaryColor}
                c={"white"}
                p={"xl"}
                style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
            >
                <Group justify="space-between" align="flex-start" mb={"md"} wrap="nowrap">
                    <Box>
                        <Title order={2}>
                            Iniciar Sesión
                        </Title>
                    </Box>

                    <ThemeIcon
                        variant="light"
                        color="white"
                        radius={"md"}
                        style={{ cursor: "pointer" }}
                        onClick={handleClose}
                    >
                        <IconX size={18} />
                    </ThemeIcon>
                </Group>
            </Box>

            <form onSubmit={form.onSubmit(handleLogin)}>
                <Stack p={"xl"} gap={"lg"}>
                    <TextInput
                        leftSection={
                            <IconMail size={16} />
                        }
                        label="Correo"
                        {...form.getInputProps("email")}
                        placeholder="email@example.com"
                    />

                    <PasswordInput
                        leftSection={
                            <IconLock size={16} />
                        }
                        label="Contraseña"
                        {...form.getInputProps("password")}
                        placeholder="•••••••"
                    />

                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Iniciar sesión
                    </Button>

                </Stack>
            </form>
        </Modal>
    );
}