import { ActionIcon, Group, Text, Tooltip } from "@mantine/core"
import { useSettingStore } from "../../store";
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";

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
            <Group gap={5}>
                <Tooltip label="Claro">
                    <ActionIcon
                        size="xl"
                        variant={theme === 'light' ? "filled" : "default"}
                        onClick={() => handleThemeChange('light')}
                    >
                        <IconSun />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Automatico">
                    <ActionIcon
                        size="xl"
                        variant={theme === 'auto' ? "filled" : "default"}
                        onClick={() => handleThemeChange('auto')}
                    >
                        <IconSunMoon />
                    </ActionIcon>
                </Tooltip>
                <Tooltip label="Oscuro">
                    <ActionIcon
                        size="xl"
                        variant={theme === 'dark' ? "filled" : "default"}
                        onClick={() => handleThemeChange('dark')}
                    >
                        <IconMoon />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </>
    )
}