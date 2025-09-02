import { getSettings } from "@/api/settings"
import { Button, Card, ColorPicker, Container, Divider, Group, Stack, Text, TextInput, Title } from "@mantine/core"
import { useEffect, useState } from "react"

export const Page = () => {
    const [settings, setSettings] = useState<Record<string, string>>({});

    useEffect(() => {
        getSettings()
            .then(setSettings)
    }, [])

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
                            defaultValue={settings.title}
                        />

                        <Divider />

                        <div>

                            <Text size="sm">
                                Color principal <Text span style={{ color: "red" }}>*</Text>
                                <Text c="dimmed" size="xs">Paleta de colores</Text>
                            </Text>
                            <ColorPicker
                                format="hex"
                                withPicker={false}
                                swatches={[
                                    "#228be6", // blue
                                    "#15aabf", // cyan
                                    "#12b886", // teal
                                    "#fab005", // yellow
                                    "#fa5252", // red
                                    "#7950f2", // purple
                                ]}
                                swatchesPerRow={6}
                            />
                        </div>

                        <Divider />

                        <Group justify="flex-end">
                            <Button
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