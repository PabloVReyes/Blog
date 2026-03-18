import { Portal, Stack, Title, Text, Button } from "@mantine/core";
import Lottie from "lottie-react";
import OfflineCatAnimation from "@/assets/offline_cat.json";
import { useState } from "react";

interface Props {
    isOnline: boolean;
}

export const OfflineOverlay = ({ isOnline }: Props) => {
    const [loading, setLoading] = useState(false);

    const retry = async () => {
        setLoading(true);
        try {
            await fetch("/", { method: "HEAD" });
            window.location.reload();
        } catch {
        } finally {
            setLoading(false);
        }
    };

    if (isOnline) return null;

    return (
        <Portal>
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 5000,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: 40,
                }}
            >
                <Lottie
                    animationData={OfflineCatAnimation}
                    loop
                    autoplay
                    style={{ width: "60dvw", height: "60dvh" }}
                />
                <Stack gap={5} align="center">
                    <Title
                        fw={700}
                        c="white"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                    >
                        Sin conexión a internet
                    </Title>

                    <Text
                        size="sm"
                        fw={700}
                        c="white"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}
                    >
                        Verifica tu red e intenta nuevamente.
                    </Text>

                    <Button
                        mt={"xl"}
                        size="md"
                        radius="xl"
                        onClick={retry}
                        loading={loading}
                    >
                        Volver a intentar
                    </Button>
                </Stack>
            </div>
        </Portal>
    );
};