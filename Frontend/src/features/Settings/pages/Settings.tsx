import { ColorSelect, Container } from "@/components"
import { Button, Card, Divider, Group, Stack, Text } from "@mantine/core"
import { IconInput, ThemeSelect, TitleInput } from "../components"
import { useState } from "react";
import { useSettingStore } from "../store";
import { IconCheck } from "@tabler/icons-react";
import { uploadFavicon } from "../api";
import { useModalStore } from "@/layout";

export const Settings = () => {
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
            title="Configuración"
            description="Configuració de la pagina"
        >
            <Card>
                <Stack>
                    <TitleInput />

                    <Divider />

                    <IconInput
                        setIcon={setIcon}
                    />

                    <Divider />

                    <Group justify="space-between" align="flex-start" wrap="nowrap">
                        <Stack gap={1}>
                            <ThemeSelect />
                        </Stack>
                        <Divider orientation="vertical" />
                        <Stack gap={1} style={{ flex: '1 1 auto' }}>
                            <ColorSelect
                                type="settings"
                                useStore={useSettingStore}
                            />
                        </Stack>
                    </Group>

                    <Divider />

                    <Group justify="flex-end">
                        <Button
                            onClick={handleSubmit}
                            disabled={!hasChanges()}
                            loading={loading}
                        >
                            Guardar
                        </Button>
                    </Group>
                </Stack>
            </Card>
        </Container>
    )
}