import { ActionIcon, Group, Text, Tooltip } from "@mantine/core"
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";
import styles from "./ThemeSelect.module.css"
import { useSettingStore } from "../../store";

export const ThemeSelect = () => {
    const { setTheme, theme } = useSettingStore()

    const handleThemeChange = (selected: 'light' | 'dark' | 'auto') => {
        setTheme(selected);
    };

    return (
        <>
            <Text size="sm">
                Tema <Text span style={{ color: "red" }}>*</Text>
            </Text>
            <Text c="dimmed" size="xs">Tema de la página</Text>
            <Group gap={5} wrap="nowrap">
                <Tooltip label="Claro">
                    <ActionIcon
                        size="xl"
                        className={`${styles.themeBtn}`}
                        data-active={theme === "light" || undefined}
                        onClick={() => handleThemeChange('light')}
                    >
                        <IconSun stroke={2} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Automatico">
                    <ActionIcon
                        size="xl"
                        className={`${styles.themeBtn}`}
                        data-active={theme === "auto" || undefined}
                        onClick={() => handleThemeChange('auto')}
                    >
                        <IconSunMoon stroke={2} />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Oscuro">
                    <ActionIcon
                        size="xl"
                        className={`${styles.themeBtn}`}
                        data-active={theme === "dark" || undefined}
                        onClick={() => handleThemeChange('dark')}
                    >
                        <IconMoon stroke={2} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </>
    )
}