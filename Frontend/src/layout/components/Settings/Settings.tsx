import {
    Affix,
    Button,
    Group,
    Kbd,
    Menu,
    Stack,
    Text,
    useComputedColorScheme,
    useMantineTheme,
    ActionIcon,
    Transition,
    Portal,
    Paper,
    Title,
    Badge,
} from "@mantine/core";

import { useOs } from "@mantine/hooks";

import {
    IconBook,
    IconInfoCircle,
    IconMoon,
    IconSearch,
    IconSun,
    IconArrowUp,
    IconArrowDown,
} from "@tabler/icons-react";

import styles from "./Settings.module.css";
import cx from "clsx";

import { useSettingStore } from "@/features";
import { Directory, Search } from "../Header";
import { useModalStore } from "@/layout/store";

import { useEffect, useRef, useState, type RefObject } from "react";

import Lottie from "lottie-react";
import catAnimation from "@/assets/cat.json";
import SpaceCatAnimation from "@/assets/space_cat.json";
import OfflineCatAnimation from "@/assets/offline_cat.json";

import { catMessages } from "@/utils";

interface SettingsProps {
    scrollContainer: RefObject<HTMLDivElement | null>;
}

const formattedDate = new Date(__COMMIT_DATE__).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
});

export const Settings = ({ scrollContainer }: SettingsProps) => {
    const os = useOs();
    const theme = useMantineTheme();
    const [rotation, setRotation] = useState(0);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [checkingConnection, setCheckingConnection] = useState(false);

    const BLOCKED_PORT = "5173";
    const isBlockedPort = window.location.port === BLOCKED_PORT;

    const { openModal } = useModalStore();
    const { setTheme } = useSettingStore();

    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });

    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const [menuOpened, setMenuOpened] = useState(false);
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    const [message, setMessage] = useState(catMessages[0]);
    const [showBubble, setShowBubble] = useState(false);

    const [showIdleCat, setShowIdleCat] = useState(false);
    const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
    const IDLE_TIME = 30 * 60 * 1000; // 30 minutos

    /* ================= SCROLL ================= */
    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;

            setShowTop(scrollTop > 150);
            setShowBottom(scrollTop + clientHeight < scrollHeight - 100);
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => container.removeEventListener("scroll", handleScroll);
    }, [scrollContainer]);

    /* ================= MENSAJES GATO ================= */
    useEffect(() => {
        if (!menuOpened) return;

        const random =
            catMessages[Math.floor(Math.random() * catMessages.length)];

        setMessage(random);
        setShowBubble(true);

        const timer = setTimeout(() => setShowBubble(false), 6000);

        return () => clearTimeout(timer);
    }, [menuOpened]);

    /* ================= IDLE DETECTOR ================= */

    useEffect(() => {
        if (!isOnline || isBlockedPort) return;

        const resetTimer = () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);

            setShowIdleCat(false);

            idleTimerRef.current = setTimeout(() => {
                setShowIdleCat(true);
            }, IDLE_TIME);
        };

        const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

        events.forEach((event) =>
            window.addEventListener(event, resetTimer)
        );

        resetTimer();

        return () => {
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            events.forEach((event) =>
                window.removeEventListener(event, resetTimer)
            );
        };
    }, [isOnline, isBlockedPort]);

    /* ================= ACCIONES ================= */
    const scrollToTop = () =>
        scrollContainer.current?.scrollTo({ top: 0, behavior: "smooth" });

    const scrollToBottom = () =>
        scrollContainer.current?.scrollTo({
            top: scrollContainer.current.scrollHeight,
            behavior: "smooth",
        });

    const handleSearch = () => openModal({ content: <Search /> });
    const handleDirectory = () => openModal({ content: <Directory /> });

    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!menuOpened) {
            // limpiar cuando cierre
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        const showRandomMessage = () => {
            const random =
                catMessages[Math.floor(Math.random() * catMessages.length)];

            setMessage(random);
            setShowBubble(true);

            setTimeout(() => setShowBubble(false), 7000);
        };

        // mostrar uno inmediato
        showRandomMessage();

        // luego cada 10 segundos
        intervalRef.current = setInterval(showRandomMessage, 10000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [menuOpened]);

    const getRandomRotation = () => {
        const randomStep = Math.floor(Math.random() * 360) + 90;
        return randomStep;
    };

    /* ================= Conexión ================= */
    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    const checkConnection = async () => {
        setCheckingConnection(true);

        try {
            // Intento ligero (puede ser tu backend /health)
            await fetch("/", { method: "HEAD", cache: "no-store" });

            setIsOnline(true);
            window.location.reload(); // opcional: recargar app
        } catch (error) {
            setIsOnline(false);
        } finally {
            setCheckingConnection(false);
        }
    };

    return (
        <Affix position={{ bottom: 20, right: 20 }} zIndex={1000}>
            <Stack gap="xs" align="center">
                {/* SUBIR */}
                <Transition transition="slide-up" mounted={showTop}>
                    {(styles) => (
                        <ActionIcon size="xl" radius="xl" style={styles} onClick={scrollToTop}>
                            <IconArrowUp size={24} />
                        </ActionIcon>
                    )}
                </Transition>

                {/* BAJAR */}
                <Transition transition="slide-up" mounted={showBottom}>
                    {(styles) => (
                        <ActionIcon
                            size="xl"
                            radius="xl"
                            style={styles}
                            onClick={scrollToBottom}
                        >
                            <IconArrowDown size={24} />
                        </ActionIcon>
                    )}
                </Transition>

                {/* MENU */}
                <Menu
                    position="left"
                    withArrow
                    shadow="md"
                    arrowSize={15}
                    onOpen={() => setMenuOpened(true)}
                    onClose={() => setMenuOpened(false)}
                >
                    <Menu.Target>
                        <Button
                            ref={buttonRef}
                            radius="xl"
                            size="xl"
                            style={{ width: 56, height: 56, padding: 0 }}
                        >
                            <IconInfoCircle size={28} />
                        </Button>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>Combinaciones de teclado</Menu.Label>

                        <Menu.Item
                            leftSection={<IconSearch size={16} />}
                            rightSection={
                                <div dir="ltr">
                                    <Kbd size="xs">{os !== "macos" ? "CTRL" : "COMMAND"}</Kbd> +{" "}
                                    <Kbd size="xs">K</Kbd>
                                </div>
                            }
                            onClick={handleSearch}
                        >
                            Buscar
                        </Menu.Item>

                        <Menu.Item
                            leftSection={<IconBook size={16} />}
                            rightSection={
                                <div dir="ltr">
                                    <Kbd size="xs">{os !== "macos" ? "CTRL" : "COMMAND"}</Kbd> +{" "}
                                    <Kbd size="xs">SHIFT</Kbd> + <Kbd size="xs">D</Kbd>
                                </div>
                            }
                            onClick={handleDirectory}
                        >
                            Directorio
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Accesibilidad</Menu.Label>

                        <Menu.Item
                            leftSection={
                                <div>
                                    <IconSun className={cx(styles.icon, styles.light)} size={16} />
                                    <IconMoon className={cx(styles.icon, styles.dark)} size={16} />
                                </div>
                            }
                            rightSection={
                                <div dir="ltr">
                                    <Kbd size="xs">{os !== "macos" ? "CTRL" : "COMMAND"}</Kbd> +{" "}
                                    <Kbd size="xs">J</Kbd>
                                </div>
                            }
                            onClick={() =>
                                setTheme(computedColorScheme === "light" ? "dark" : "light")
                            }
                        >
                            {`Cambiar a tema ${computedColorScheme === "dark" ? "claro" : "oscuro"
                                }`}
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Información</Menu.Label>

                        <Group gap={6} justify="center" p={11} pt={2}>
                            <Text size="sm" fw={900} c={theme.primaryColor}>
                                Actualizado el {formattedDate}
                            </Text>
                            <Badge size="md">
                                #{__COMMIT_HASH__}
                            </Badge>
                        </Group>
                    </Menu.Dropdown>
                </Menu>

                {/* 🐱 GATO + BURBUJA */}
                {menuOpened && (
                    <Portal>
                        <div
                            style={{
                                position: "fixed",
                                bottom: 180,
                                right: -20,
                                width: 400,
                                pointerEvents: "none",
                                zIndex: 2000,
                            }}
                        >
                            {/* BURBUJA */}
                            {showBubble && (
                                <Paper
                                    shadow="md"
                                    radius="md"
                                    p="sm"
                                    style={{
                                        position: "absolute",
                                        bottom: 270,
                                        left: 120,
                                        whiteSpace: "nowrap",
                                        fontSize: 14,
                                    }}
                                    className={styles.speechBubble}
                                >
                                    {message}
                                </Paper>
                            )}

                            {/* GATO */}
                            <Lottie
                                animationData={catAnimation}
                                loop
                                autoplay
                            />
                        </div>
                    </Portal>
                )}
            </Stack>

            {/* OFFLINE */}
            {!isOnline && (
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
                            <Title fw={700} c="var(--mantine-primary-color-contrast)">
                                Sin conexión a internet
                            </Title>

                            <Text size="sm" fw={700} c="var(--mantine-primary-color-contrast)">
                                Verifica tu red e intenta nuevamente.
                            </Text>

                            <Button
                                mt={"xl"}
                                size="md"
                                radius="xl"
                                loading={checkingConnection}
                                onClick={checkConnection}
                            >
                                Volver a intentar
                            </Button>
                        </Stack>
                    </div>
                </Portal>
            )}

            {showIdleCat && isOnline && !isBlockedPort && (
                <Portal>
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 3000,
                            background: "rgba(0,0,0,0.5)",
                            backdropFilter: "blur(6px)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "visible",
                        }}
                    >
                        <div
                            style={{
                                width: "100vw",
                                height: "100vh",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transform: `rotate(${rotation}deg)`,
                                transformOrigin: "center center",
                                transition: "transform 0.8s ease-in-out",
                            }}
                        >
                            <div
                                style={{
                                    width: "180%",
                                    height: "180%",
                                    overflow: "visible",
                                }}
                            >
                                <Lottie
                                    animationData={SpaceCatAnimation}
                                    loop
                                    autoplay
                                    onLoopComplete={() => {
                                        const randomRotation = getRandomRotation();
                                        setRotation((prev) => prev + randomRotation);
                                    }}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </Affix>
    );
};