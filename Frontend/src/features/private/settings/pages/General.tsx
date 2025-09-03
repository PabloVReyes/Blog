import { uploadFavicon } from "@/api/settings";
import { useSettingsStore } from "@/store/settingsStore";
import { colorMap } from "@/utils/colors";
import { ActionIcon, Button, Card, CheckIcon, ColorSwatch, Container, Divider, FileInput, Group, Image, Stack, Text, TextInput, Title, Tooltip } from "@mantine/core"
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export const General = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { color, setColor, theme, setTheme, saveSetting, title, setTitle, setFavicon, favicon } = useSettingsStore()
    const [initialState, setInitialState] = useState({
        title,
        theme,
        color,
        favicon
    });


    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleThemeChange = (selected: 'light' | 'dark' | 'auto') => {
        setTheme(selected);
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
            setLoading(true);

            saveSetting("color", color);
            saveSetting("theme", theme);
            saveSetting("title", title);

            if (file) {
                await handleUploadFavicon();
            }

            // Actualizar el estado inicial después de guardar
            setInitialState({
                title,
                theme,
                color,
                favicon
            });

            // Limpiar el archivo cargado
            setFile(null);

        } finally {
            setLoading(false);
        }

    }

    const handleUploadFavicon = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append("favicon", file);

        const { url } = await uploadFavicon(formData)
        const faviconUrl = `http://localhost:3001${url}?v=${Date.now()}`;

        setFavicon(url)
        saveSetting("favicon", url)

        updateFavicon(faviconUrl);

    }

    const handleFileChange = (file: File | null) => {
        setFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    useEffect(() => {
        setInitialState({ title, theme, color, favicon });
    }, []);

    const hasChanges = () => {
        return (
            title !== initialState.title ||
            theme !== initialState.theme ||
            color !== initialState.color ||
            file !== null // si se seleccionó un nuevo favicon
        );
    };

    return (
        <Container>
            <Stack gap="md">
                <Group justify="space-between" align="flex-start">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Configuración General de Página</Title>
                        <Text c="dimmed" size="sm">Configura la apariencia de tu página modificando el icono, el nombre, el tema y el color principal.</Text>
                    </Stack>
                </Group>

                <Card>
                    <Card.Section withBorder inheritPadding py="xs">
                        <Text fw={500}>Datos generales</Text>
                    </Card.Section>
                    <Stack gap="md">
                        <Group justify="space-between" align="center" mt="sm">
                            <FileInput
                                label="Icono"
                                description="Icono que se muestra en la pestaña"
                                withAsterisk
                                accept="image/png,image/x-icon"
                                placeholder="Da clic para seleccionar el icono"
                                onChange={handleFileChange}
                                style={{ flex: 1 }}
                                styles={{
                                    input: {
                                        fontSize: '14px', // Cambia el tamaño del placeholder y texto
                                    },
                                    placeholder: {
                                        fontSize: '14px', // Solo el placeholder
                                    },
                                }}
                            />
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="Preview"
                                    w={80}
                                    h="auto"
                                    radius="sm"
                                />
                            ) :
                                <Image
                                    src={`http://localhost:3001${favicon}`}
                                    alt="Preview"
                                    w={80}
                                    h="auto"
                                    radius="sm"
                                />
                            }
                        </Group>

                        <Divider />
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
                                className="button"
                                onClick={handleSubmit}
                                type="submit"
                                disabled={!hasChanges()}
                                loading={loading}
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