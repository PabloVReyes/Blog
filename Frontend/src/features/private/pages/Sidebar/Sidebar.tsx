import { Button, Card, Container, Group, Stack, Text, Title } from "@mantine/core"
import { IconDeviceFloppy, IconPlus } from "@tabler/icons-react"
import { AddMenu } from "./components/AddMenu"
import { useSettingStore } from "@/features/settings/store/settingStore"
import { useEffect, useState } from "react"
import { notify } from "@/utils/notify"
import { SortableTree } from "@/components/SortableTree/SortableTree"
import { useModalStore } from "@/shared"

export const Sidebar = () => {
    const { openModal } = useModalStore()

    const { menu, saveSetting } = useSettingStore()
    const [initialMenu, setInitialMenu] = useState(menu);
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        setHasChanges(JSON.stringify(menu) !== JSON.stringify(initialMenu));
    }, [menu, initialMenu]);


    const handleAddMenu = () => {
        openModal({
            title: "Agregar Menú",
            content: <AddMenu />
        })
    }

    const handleSubmit = async () => {
        try {
            saveSetting("menu", JSON.stringify(menu));
            setInitialMenu(menu)
        } finally { 
            notify({
                type: "success",
                title: "Menú guardado",
                message: "Menú guardado con exito"
            })
        }
    }

    return (
        <Container>
            <Stack gap={"md"}>
                <Group>
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Configuración de Menú Lateral</Title>
                        <Text c="dimmed" size="sm">
                            Distintas configuraciones del Menú Lateral
                        </Text>
                    </Stack>


                    <Group gap={3}>
                        <Button
                            leftSection={<IconDeviceFloppy />}
                            onClick={handleSubmit}
                            disabled={!hasChanges}
                        >
                            Guardar
                        </Button>

                        <Button leftSection={<IconPlus />} onClick={handleAddMenu}>
                            Agregar menú
                        </Button>
                    </Group>
                </Group>

                <Card>
                    <SortableTree
                        indicator
                        removable
                        editable
                    />
                </Card>
            </Stack>
        </Container>
    )
}