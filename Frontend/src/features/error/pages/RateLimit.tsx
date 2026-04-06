// src/components/RateLimitScreen.tsx
import { Text, Button, Center, Card, Stack, Group, Divider } from "@mantine/core";
import { useAppStore } from "@/stores/appStore";
import { useEffect, useState } from "react";
import classes from "./NotFound.module.css"
import Lottie from "lottie-react";
import RateLimitAnimation from "@/assets/rate_limit.json";
import { IconAlertCircle, IconReload } from "@tabler/icons-react";

export const RateLimitScreen = () => {
    const { rateLimit, clearRateLimit } = useAppStore();
    const [seconds, setSeconds] = useState(rateLimit.retryAfter);

    useEffect(() => {
        setSeconds(rateLimit.retryAfter);

        if (!rateLimit.active) return;

        const interval = setInterval(() => {
            setSeconds((s) => (s > 0 ? s - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [rateLimit]);

    return (
        <Center className={classes.container}>
            <Card shadow="xl" radius="lg" padding="xl" style={{ maxWidth: 600, width: "100%" }}>
                <Stack align="center" gap="lg">
                    <Stack align="center" gap={4} style={{ position: "relative" }}>
                        <Text
                            size={"200px"}
                            c={"var(--mantine-primary-color-filled)"}
                        >
                            429
                        </Text>
                        <Lottie
                            animationData={RateLimitAnimation}
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
                            Demasiadas solicitudes
                        </Text>
                        <Text size="sm" c="dimmed" ta="center" style={{ maxWidth: 400 }}>
                            Lo sentimos, has excedido el número de solicitudes permitidas. Por favor, intenta nuevamente en unos momentos.
                        </Text>
                    </Stack>

                    <Stack gap="sm" justify="center">
                        <Text mt="xs">
                            Intenta nuevamente en {seconds} segundos
                        </Text>
                        <Button mt="lg" onClick={clearRateLimit} leftSection={<IconReload size={16} />} >
                            Reintentar
                        </Button>
                    </Stack>

                    <Text size="xs" c="dimmed" fs="center" style={{ fontFamily: "monospace", marginTop: 16 }}>
                        ERROR_CODE: HTTP_429_RATE_LIMIT
                    </Text>
                </Stack>
            </Card>
            {/* <Text size="xl" fw={700} c="orange">
                Sistema temporalmente no disponible
            </Text>

            <Text mt="md">
                Has excedido el número de peticiones.
            </Text>

            {seconds > 0 && (
                <Text mt="xs">
                    Intenta nuevamente en {seconds} segundos
                </Text>
            )}

            <Button mt="lg" onClick={clearRateLimit}>
                Reintentar
            </Button> */}
        </Center>
    );
};