import {
    Button,
    Menu,
    Kbd,
    Group,
    Text,
    Badge,
    useComputedColorScheme,
    useMantineTheme,
} from "@mantine/core";
import { IconSearch, IconBook, IconInfoCircle, IconSun, IconMoon } from "@tabler/icons-react";
import { useOs } from "@mantine/hooks";
import { useModalStore } from "@/layout/store";
import { Directory, Search } from "../Header";
import { useRef } from "react";
import { useSettingStore } from "@/features";
import cx from "clsx";
import classes from "./KeyboardShortcutsMenu.module.css"

interface Props {
    onOpen: () => void;
    onClose: () => void;
}

const formattedDate = new Date(__COMMIT_DATE__).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
});


export const KeyboardShortcutsMenu = ({ onOpen, onClose }: Props) => {
    const { openModal } = useModalStore()
    const theme = useMantineTheme();
    const { setTheme } = useSettingStore();
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const computedColorScheme = useComputedColorScheme("light", {
        getInitialValueInEffect: true,
    });
    const os = useOs();
    const handleSearch = () => openModal({ content: <Search /> });
    const handleDirectory = () => openModal({ content: <Directory /> });
    return (
        <Menu
            position="left"
            withArrow
            shadow="md"
            arrowSize={15}
            onOpen={onOpen}
            onClose={onClose}
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
                            <IconSun className={cx(classes.icon, classes.light)} size={16} />
                            <IconMoon className={cx(classes.icon, classes.dark)} size={16} />
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
    );
};