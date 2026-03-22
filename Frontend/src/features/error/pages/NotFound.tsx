import { Card, Text, Button, Group, Stack, Center, Divider } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import classes from "./NotFound.module.css";
import { IconAlertCircle, IconArrowLeft, IconHome } from "@tabler/icons-react";
import { Alert } from "@/ui";
import Lottie from "lottie-react";
import NotFoundAnimation from "@/assets/not_found.json";

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Center className={classes.container}>
            <Card shadow="xl" radius="lg" padding="xl" style={{ maxWidth: 600, width: "100%" }}>
                <Stack align="center" gap="lg">
                    <Stack align="center" gap={4} style={{ position: "relative" }}>
                        <Text
                            size={"200px"}
                            c={"var(--mantine-primary-color-filled)"}
                        >
                            404
                        </Text>
                        <Lottie
                            animationData={NotFoundAnimation}
                            style={{ width: 200, height: 200, position: "absolute", top: 55 }}
                        />
                        <Group gap={8}>
                            <Divider style={{ width: 48, background: "linear-gradient(to right, transparent, #10B981)" }} />
                            <IconAlertCircle size={20} color="var(--mantine-primary-color-filled)" />
                            <Divider style={{ width: 48, background: "linear-gradient(to left, transparent, #10B981)" }} />
                        </Group>
                    </Stack>

                    <Stack align="center" gap={4}>
                        <Text size="xl" w={600} ta="center">
                            Página no encontrada
                        </Text>
                        <Text size="sm" c="dimmed" ta="center" style={{ maxWidth: 400 }}>
                            Lo sentimos, la página que estás buscando no existe, ha sido movida o no tienes permisos para acceder a ella.
                        </Text>
                    </Stack>

                    <Alert
                        content={
                            <Stack gap={4} align="center">
                                <Text size="sm" ta="center" w={500} fw={700}>Sugerencias</Text>
                                <Stack gap={2}>
                                    <Text size="sm">• Verifica que la URL esté correctamente escrita</Text>
                                    <Text size="sm">• Regresa a la página anterior o al inicio</Text>
                                    <Text size="sm">• Contacta al administrador si crees que esto es un error</Text>
                                </Stack>
                            </Stack>
                        }
                    />

                    <Group gap="sm" justify="center">
                        <Button variant="outline" leftSection={<IconArrowLeft size={16} />} onClick={() => navigate(-1)}>
                            Página anterior
                        </Button>
                        <Button
                            component={Link}
                            to="/"
                            leftSection={<IconHome size={16} />}
                        >
                            Ir al inicio
                        </Button>
                    </Group>

                    <Text size="xs" c="dimmed" fs="center" style={{ fontFamily: "monospace", marginTop: 16 }}>
                        ERROR_CODE: HTTP_404_NOT_FOUND
                    </Text>
                </Stack>
            </Card>
        </Center>
    );
}