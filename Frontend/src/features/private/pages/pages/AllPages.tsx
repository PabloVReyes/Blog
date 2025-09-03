import { useModalStore } from "@/store/modalStore";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { AddNewPage, AddNewPageHeader } from "../components/AddNewPage";

export const AllPages = () => {
    const { openModal } = useModalStore();

    const handleAddNewPage = () => {
        openModal({
            title: "Agregar nueva página",
            content: <AddNewPage/>,
            header: <AddNewPageHeader/>
        })
    }

    return (
        <Container>
            <Stack gap="md">
                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Lista de páginas</Title>
                        <Text c="dimmed" size="sm">Lista de todas las páginas que se encuentran almacenadas</Text>
                    </Stack>

                    <Button leftSection={<IconPlus/>} onClick={handleAddNewPage}>
                        Crear nueva página
                    </Button>
                </Group>
            </Stack>
        </Container>
    )
}