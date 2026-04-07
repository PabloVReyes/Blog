import { Container } from "@/components"
import { Box, Button, Card, Divider, Group, SimpleGrid, Stack, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { FooterInput, IconInput, ThemeSelect, TitleInput } from "../components"
import { useCallback, useState } from "react";
import { useSettingStore } from "../store";
import { IconLetterT, IconPalette, IconSunMoon } from "@tabler/icons-react";
import { uploadFavicon, uploadFooter } from "../api";
import { ColorPicker } from "../components";
import { Notify, showSuccessModal } from "@/ui";
import { getApiAssetUrl } from "@/utils";

export const General = () => {
    const { primaryColor } = useMantineTheme()
    const [icon, setIcon] = useState<File | null>(null);
    const [footerIcon, setFooterIcon] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false)

    // STORE
    const title = useSettingStore((s) => s.title)
    const theme = useSettingStore((s) => s.theme)
    const color = useSettingStore((s) => s.color)
    const subtitle = useSettingStore((s) => s.subtitle)
    
    const setFooter = useSettingStore((s) => s.setFooter)
    const saveSetting = useSettingStore((s) => s.saveSetting)
    const setFavicon = useSettingStore((s) => s.setFavicon)

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
                saveSetting("subtitle", subtitle),
                saveSetting("theme", theme),
                saveSetting("color", color)
            ])

            if (icon) {
                const formData = new FormData();
                formData.append("favicon", icon)

                const { url } = await uploadFavicon(formData)
                const faviconUrl = getApiAssetUrl(url)

                setFavicon(url)
                await saveSetting("favicon", url)

                updateFavicon(faviconUrl);
            }

            if(footerIcon) {
                const formData = new FormData();
                formData.append("footer", footerIcon)

                const { url } = await uploadFooter(formData)

                setFooter(url)
                await saveSetting("footer", url)
            }

            showSuccessModal("Configuraciones Guardadas", "Las configuraciones fueron guardadas correctamente")
        } catch (error: unknown) {
            Notify({
                title: "Error al guardar configuraciones",
                type: "error",
                message: error instanceof Error ? error.message : "Error desconocido"
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
                    <Stack mt={10} gap={5}>
                        <TitleInput />

                        <Divider />

                        <IconInput
                            setIcon={setIcon}
                        />
                        <Divider />
                        <FooterInput
                            setIcon={setFooterIcon}
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

                    <Box style={{ alignItems: "center" }}>
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
                    loading={loading}
                >
                    Guardar
                </Button>
            </Group>
        </Container>
    )
}