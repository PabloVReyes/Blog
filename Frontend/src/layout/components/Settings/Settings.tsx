import { Affix, Button, Group, Kbd, Menu, Stack, Text, useComputedColorScheme, useMantineTheme } from "@mantine/core"
import { useOs } from "@mantine/hooks";
import { IconBook, IconInfoCircle, IconMoon, IconSearch, IconSun } from "@tabler/icons-react"
import styles from "./Settings.module.css"
import cx from 'clsx';
import { useSettingStore } from "@/features";
import { useModalStore } from "@/shared";
import { Directory, Search } from "../Header";

export const Settings = () => {
    const os = useOs();
    const theme = useMantineTheme()
    const { openModal } = useModalStore()
    const { setTheme } = useSettingStore();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const handleSearch = () => {
        openModal({
            content: <Search />
        })
    }

    const handleDirectory = () => {
        openModal({
            content: <Directory />
        })
    }

    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <Menu
                position="top"
                withArrow
                shadow="md"
            >
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
                        leftSection={
                            <IconSearch size={16} />
                        }
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
                        leftSection={
                            <IconBook size={16} />
                        }
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
                            <Group gap={10}>
                                <Text size="sm" fw={700} c={theme.primaryColor}>Actualizado el 1 de febrero de 2026</Text>
                            </Group>
                        </Group>
                    </Stack>
                </Menu.Dropdown>
            </Menu>
        </Affix>
    )
}