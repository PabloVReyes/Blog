import { Button, Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { IconCheck, IconDeviceFloppy, IconPlus } from "@tabler/icons-react"
import { Add, SortableTree } from "../components"
import { useState } from "react"
import { useSettingStore } from "@/features/Settings"
import { useModalStore } from "@/layout"

export const Sidebar = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const { openModal } = useModalStore()
    const { menu, saveSetting } = useSettingStore()
    const [initialState, setInitialState] = useState(menu)

    const hasChanges = () => {
        return (
            JSON.stringify(menu) !== JSON.stringify(initialState)
        )
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)

            const newMenu = JSON.stringify(menu)
            saveSetting("menu", newMenu)
            setInitialState(menu)

            openModal({
                title: "Configuraciones guardadas",
                subtitle: "Configuraciones guardadas correctamente",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            Las configuraciones de menu se han aplicado correctamente
                        </Text>
                    </Stack>
                ),
            });
        } catch (error) {
            console.error("Error al guardar el menu", error)
        } finally {
            setLoading(false)
        }
    }

    const handleAddElement = () => {
        const payload = {
            title: "Agregar elemento",
            content: <Add />
        }

        openModal(payload)
    }
    return (
        <Container>
            <Stack gap={"md"}>
                <Group>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Menu Lateral</Title>
                        <Text c="dimmed" size="sm">
                            Distribucion del menu lateral
                        </Text>
                    </Stack>

                    <Button.Group>
                        <Button
                            leftSection={<IconPlus size={16} />}
                            onClick={handleAddElement}
                        >
                            Agregar elemento
                        </Button>
                        <Button
                            leftSection={<IconDeviceFloppy size={16} />}
                            disabled={!hasChanges()}
                            onClick={handleSubmit}
                            loading={loading}
                        >
                            Guardar
                        </Button>
                    </Button.Group>
                </Group>

                <Card>
                    {menu.length > 0 ?
                        <SortableTree
                            indicator
                            removable
                            editable
                        /> :
                        <Text
                            mt={20}
                            mb={20}
                            size="sm"
                            truncate="end"
                            c="dimmed"
                            style={{ textAlign: "center" }}
                        >
                            Sin elementos
                        </Text>
                    }
                </Card>
            </Stack>
        </Container >
    )
}