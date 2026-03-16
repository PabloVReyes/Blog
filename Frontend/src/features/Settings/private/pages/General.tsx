import { Container } from "@/components"
import { Box, Button, Card, Divider, Group, SimpleGrid, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { IconInput, ThemeSelect, TitleInput } from "../components"
import { useCallback, useMemo, useState } from "react";
import { useSettingStore } from "../store";
import { IconLetterT, IconPalette, IconSunMoon } from "@tabler/icons-react";
import { uploadFavicon } from "../api";
import { ColorPicker } from "../components";
import { Notify, showSuccessModal } from "@/ui";

export const General = () => {
    const { primaryColor } = useMantineTheme()
    const [icon, setIcon] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    // STORE
    const title = useSettingStore((s) => s.title)
    const theme = useSettingStore((s) => s.theme)
    const color = useSettingStore((s) => s.color)
    const favicon = useSettingStore((s) => s.favicon)
    const saveSetting = useSettingStore((s) => s.saveSetting)
    const setFavicon = useSettingStore((s) => s.setFavicon)

    const [initialState, setInitialState] = useState(() => ({
        title,
        theme,
        color,
        favicon
    }))

    const hasChanges = useMemo(() => {
        return (
            title !== initialState.title ||
            theme !== initialState.theme ||
            color !== initialState.color ||
            icon !== null
        )
    }, [title, theme, color, icon, initialState])

    const updateFavicon = useCallback((url: string) => {
        let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.head.appendChild(link);
        }
        link.href = url;
    }, [])

    const handleSubmit = async () => {
        try {
            setLoading(true)

            await Promise.all([
                saveSetting("title", title),
                saveSetting("theme", theme),
                saveSetting("color", color)
            ])

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

            showSuccessModal("Configuraciones Guardadas", "Las configuraciones fueron guardadas correctamente")
        } catch (error: any) {
            Notify({
                title: "Error al guardar configuraciones",
                type: "error",
                message: error.message
            })
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
                                color={primaryColor}
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
                                color={primaryColor}
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
                            color={primaryColor}
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
                    disabled={!hasChanges}
                    loading={loading}
                >
                    Guardar
                </Button>
            </Group>
        </Container>
    )
}

// 201 lineas -> 194 lineas