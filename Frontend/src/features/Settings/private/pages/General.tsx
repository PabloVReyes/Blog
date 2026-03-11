import { Container } from "@/components"
import { Box, Button, Card, Divider, Group, SimpleGrid, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { IconInput, ThemeSelect, TitleInput } from "../components"
import { useState } from "react";
import { useSettingStore } from "../store";
import { IconCheck, IconLetterT, IconPalette, IconSunMoon } from "@tabler/icons-react";
import { uploadFavicon } from "../api";
import { useModalStore } from "@/layout";
import { ColorPicker } from "../components";

export const General = () => {
    const mantineTheme = useMantineTheme()
    const [icon, setIcon] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    const { color, theme, saveSetting, title, setFavicon, favicon } = useSettingStore()
    const { openModal } = useModalStore()
    const [initialState, setInitialState] = useState({
        title,
        theme,
        color,
        favicon
    });

    const hasChanges = () => {
        return (
            title !== initialState.title ||
            theme !== initialState.theme ||
            color !== initialState.color ||
            icon !== null // si se seleccionó un nuevo favicon
        );
    };

    const updateFavicon = (url: string) => {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }
        link.href = url;
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            // Actualizar nombre
            saveSetting("title", title)
            saveSetting("theme", theme)
            saveSetting("color", color)

            // Actualizar icono
            if (icon) {
                const formData = new FormData();
                formData.append("favicon", icon)

                const { url } = await uploadFavicon(formData)
                const faviconUrl = `${import.meta.env.VITE_API_URL}${url}?v=${Date.now()}`;

                setFavicon(url)
                saveSetting("favicon", url)

                updateFavicon(faviconUrl);
            }

            setInitialState({
                title,
                favicon,
                theme,
                color
            })

            openModal({
                title: "Configuraciones guardadas",
                subtitle: "Configuraciones guardadas correctamente",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            las configuraciones se han aplicado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error) {
            console.error("Error al guardar la configuracion", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container
            title="Configuración General"
            description="Personaliza la apariencia y configuración"
        >
            <SimpleGrid cols={{ base: 1, lg: 2 }}>
                <Card>
                    <Card.Section>
                        <Group gap="md">
                            <ThemeIcon
                                size={40}
                                radius="md"
                                color={mantineTheme.primaryColor}
                            >
                                <IconLetterT size={20} />
                            </ThemeIcon>
                            <Box>
                                <Text fw={600} fz="lg" lh={1.2}>
                                    Información General
                                </Text>
                                <Text fz="sm" c="dimmed">
                                    Nombre y datos básicos
                                </Text>
                            </Box>
                        </Group>
                    </Card.Section>
                    <Stack mt={10}>
                        <TitleInput />

                        <Divider />

                        <IconInput
                            setIcon={setIcon}
                        />
                    </Stack>
                </Card>


                <Card>
                    <Card.Section>
                        <Group gap="md">
                            <ThemeIcon
                                size={40}
                                radius="md"
                                color={mantineTheme.primaryColor}
                            >
                                <IconSunMoon size={20} />
                            </ThemeIcon>
                            <Box>
                                <Text fw={600} fz="lg" lh={1.2}>
                                    Tema por defecto
                                </Text>
                                <Text fz="sm" c="dimmed">
                                    Modo claro u oscuro
                                </Text>
                            </Box>
                        </Group>
                    </Card.Section>

                    <Box>
                        <ThemeSelect />
                    </Box>
                </Card>
            </SimpleGrid>

            <Card>
                <Card.Section>
                    <Group gap="md">
                        <ThemeIcon
                            size={40}
                            radius="md"
                            color={mantineTheme.primaryColor}
                        >
                            <IconPalette size={20} />
                        </ThemeIcon>
                        <Box>
                            <Text fw={600} fz="lg" lh={1.2}>
                                Color Primario
                            </Text>
                            <Text fz="sm" c="dimmed">
                                Personaliza el color
                            </Text>
                        </Box>
                    </Group>
                </Card.Section>
                <Group justify="space-between" align="flex-start" wrap="nowrap" mt={10}>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <ColorPicker />
                    </Stack>
                </Group>
            </Card>

            <Group justify="flex-end">
                <Button
                    onClick={handleSubmit}
                    disabled={!hasChanges()}
                    loading={loading}
                >
                    Guardar
                </Button>
            </Group>
        </Container>
    )
}