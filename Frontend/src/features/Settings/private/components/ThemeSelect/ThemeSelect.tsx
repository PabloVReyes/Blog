import { Text, Stack, Box, UnstyledButton } from "@mantine/core";
import { IconMoon, IconSun, IconSunMoon, IconCheck } from "@tabler/icons-react";
import classes from "./ThemeSelect.module.css";
import { useSettingStore } from "../../store";

const availableThemes = [
    {
        value: "light",
        label: "Modo Claro",
        icon: IconSun,
        desc: "Interfaz clara para ambientes luminosos"
    },
    {
        value: "auto",
        label: "Automático",
        icon: IconSunMoon,
        desc: "Se ajusta según la configuración del sistema"
    },
    {
        value: "dark",
        label: "Modo Oscuro",
        icon: IconMoon,
        desc: "Interfaz oscura para reducir fatiga visual"
    },
] as const;

export const ThemeSelect = () => {
    const { setTheme, theme: currentTheme } = useSettingStore();

    return (
        <Stack gap="sm" mt={10}>
            {availableThemes.map((themeOption) => {
                const isSelected = currentTheme === themeOption.value;
                const Icon = themeOption.icon;

                return (
                    <UnstyledButton
                        key={themeOption.value}
                        onClick={() => setTheme(themeOption.value)}
                        className={`${classes.themeButton} ${isSelected ? classes.selected : classes.unselected
                            }`}
                    >
                        <Icon
                            size={20}
                            className={isSelected ? classes.iconSelected : classes.iconUnselected}
                        />

                        <Box style={{ flex: 1 }}>
                            <Text
                                fz="sm"
                                className={isSelected ? classes.labelSelected : undefined}
                            >
                                {themeOption.label}
                            </Text>
                            <Text fz="xs" c="dimmed" lh={1.2}>
                                {themeOption.desc}
                            </Text>
                        </Box>

                        {isSelected && (
                            <IconCheck
                                size={20}
                                stroke={3}
                                className={classes.iconSelected}
                            />
                        )}
                    </UnstyledButton>
                );
            })}
        </Stack>
    );
};