import { useSettingsStore } from "@/store/settingsStore";
import { colorMap } from "@/utils/colors";
import { ActionIcon, Button, Card, CheckIcon, ColorSwatch, Container, Divider, Group, Stack, Text, TextInput, Title, useMantineColorScheme } from "@mantine/core"
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";

export const Page = () => {
    const { color, setColor, theme, setTheme, saveSetting, title, setTitle } = useSettingsStore()
    const { setColorScheme } = useMantineColorScheme();

    const handleThemeChange = (selected: 'light' | 'dark' | 'auto') => {
        setTheme(selected);
        setColorScheme(selected);
    };

    const handleSubmit = () => {
        saveSetting("color", color);
        saveSetting("theme", theme);
        saveSetting("title", title);
    }

    return (
        <Container>
            <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Configuración de Página</Title>
                        <Text c="dimmed">Configuraciones de la pagina, como nombre</Text>
                    </Stack>
                </Group>

                <Card>
                    <Stack gap="md">

                        <Text>Dados generales</Text>
                        <TextInput
                            label="Nombre"
                            withAsterisk
                            autoFocus
                            placeholder="Nombre de la página"
                            description="Nombre el cual tendra la pagina"
                            defaultValue={title}
                            onChange={(e) => setTitle(e.currentTarget.value)}
                        />

                        <Divider />
                        <Text size="sm">
                            Tema <Text span style={{ color: "red" }}>*</Text>
                            <Text c="dimmed" size="xs">Tema de la página</Text>
                        </Text>

                        <Group gap={5}>
                            <ActionIcon
                                size="xl"
                                variant={theme === 'light' ? "filled" : "default"}
                                onClick={() => handleThemeChange('light')}
                            >
                                <IconSun />
                            </ActionIcon>
                            <ActionIcon
                                size="xl"
                                variant={theme === 'auto' ? "filled" : "default"}
                                onClick={() => handleThemeChange('auto')}
                            >
                                <IconSunMoon />
                            </ActionIcon>
                            <ActionIcon
                                size="xl"
                                variant={theme === 'dark' ? "filled" : "default"}
                                onClick={() => handleThemeChange('dark')}
                            >
                                <IconMoon />
                            </ActionIcon>
                        </Group>

                        <Divider />
                        <Text size="sm">
                            Color principal <Text span style={{ color: "red" }}>*</Text>
                            <Text c="dimmed" size="xs">Paleta de colores</Text>
                        </Text>
                        <Group gap={5} style={{ overflowX: "auto" }}>
                            {Object.entries(colorMap).map(([name, hex]) => (
                                <ColorSwatch
                                    key={name}
                                    color={hex}
                                    size={40} // tamaño fijo en px
                                    onClick={() => setColor(name)}
                                    style={{
                                        cursor: "pointer",
                                        color: '#fff'
                                    }}
                                >
                                    {color === name && <CheckIcon size={12} />}
                                </ColorSwatch>
                            ))}
                        </Group>

                        <Divider />




                        <Group justify="flex-end">
                            <Button
                                onClick={handleSubmit}
                                type="submit"
                            >
                                Aplicar cambios
                            </Button>
                        </Group>
                    </Stack>
                </Card>
            </Stack>
        </Container>
    )
}