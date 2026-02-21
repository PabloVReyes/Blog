import { Affix, Button, Group, Kbd, Menu, Stack, Text, useComputedColorScheme, useMantineTheme, ActionIcon, Transition } from "@mantine/core"
import { useOs } from "@mantine/hooks";
import { IconBook, IconInfoCircle, IconMoon, IconSearch, IconSun, IconArrowUp, IconArrowDown } from "@tabler/icons-react"
import styles from "./Settings.module.css"
import cx from 'clsx';
import { useSettingStore } from "@/features";
import { Directory, Search } from "../Header";
import { useModalStore } from "@/layout/store";
import { useEffect, useState, type RefObject } from "react";

interface SettingsProps {
    scrollContainer: RefObject<HTMLDivElement | null>;
}

export const Settings = ({ scrollContainer }: SettingsProps) => {
    const os = useOs();
    const theme = useMantineTheme();
    const { openModal } = useModalStore();
    const { setTheme } = useSettingStore();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    // Estados para controlar la visibilidad de los botones de scroll
    const [showTop, setShowTop] = useState(false);
    const [showBottom, setShowBottom] = useState(false);

    useEffect(() => {
        const container = scrollContainer.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;

            // Mostrar subir si hemos bajado más de 150px
            setShowTop(scrollTop > 150);

            // Mostrar bajar si el contenido restante es mayor a 100px
            setShowBottom(scrollTop + clientHeight < scrollHeight - 100);
        };

        container.addEventListener("scroll", handleScroll);
        handleScroll(); // Chequeo inicial

        return () => container.removeEventListener("scroll", handleScroll);
    }, [scrollContainer]);

    const scrollToTop = () => {
        scrollContainer.current?.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToBottom = () => {
        scrollContainer.current?.scrollTo({
            top: scrollContainer.current.scrollHeight,
            behavior: "smooth"
        });
    };

    const handleSearch = () => {
        openModal({ content: <Search /> });
    };

    const handleDirectory = () => {
        openModal({ content: <Directory /> });
    };

    return (
        <Affix position={{ bottom: 20, right: 20 }} zIndex={1000}>
            <Stack gap="xs" align="center">

                {/* Botón Ir Arriba */}
                <Transition transition="slide-up" mounted={showTop}>
                    {(transitionStyles) => (
                        <ActionIcon
                            size="xl"
                            radius="xl"
                            style={transitionStyles}
                            onClick={scrollToTop}
                            aria-label="Ir arriba"
                        >
                            <IconArrowUp size={24} />
                        </ActionIcon>
                    )}
                </Transition>

                {/* Botón Ir Abajo */}
                <Transition transition="slide-up" mounted={showBottom}>
                    {(transitionStyles) => (
                        <ActionIcon
                            size="xl"
                            radius="xl"
                            style={transitionStyles}
                            onClick={scrollToBottom}
                            aria-label="Ir abajo"
                        >
                            <IconArrowDown size={24} />
                        </ActionIcon>
                    )}
                </Transition>

                {/* Botón de Configuración y Menú (Original) */}
                <Menu position="left" withArrow shadow="md" arrowSize={15}>
                    <Menu.Target>
                        <Button
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
                                    <Kbd size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd size={"xs"}>K</Kbd>
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
                                    <Kbd size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd size={"xs"}>SHIFT</Kbd> + <Kbd size={"xs"}>D</Kbd>
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
                                    <IconSun className={cx(styles.icon, styles.light)} stroke={1.5} size={16} />
                                    <IconMoon className={cx(styles.icon, styles.dark)} stroke={1.5} size={16} />
                                </div>
                            }
                            rightSection={
                                <div dir="ltr">
                                    <Kbd size={"xs"}>{os !== 'macos' ? "CTRL" : "COMMAND"}</Kbd> + <Kbd size={"xs"}>J</Kbd>
                                </div>
                            }
                            onClick={() => setTheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                        >
                            {`Cambiar a tema ${computedColorScheme === "dark" ? "claro" : "oscuro"}`}
                        </Menu.Item>

                        <Menu.Divider />

                        <Menu.Label>Información</Menu.Label>
                        <Stack p={11} pt={2} gap={10}>
                            <Group justify="space-between" gap={5}>
                                <Text size="sm" fw={700} c={theme.primaryColor}>
                                    Actualizado el 18 de febrero de 2026
                                </Text>
                            </Group>
                        </Stack>
                    </Menu.Dropdown>
                </Menu>
            </Stack>
        </Affix>
    );
};