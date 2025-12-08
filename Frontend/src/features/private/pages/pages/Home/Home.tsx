import { Button, Card, Container, Divider, Group, Stack, Text, Title } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { useModalStore } from "@/store/modalStore"
import { usePrivateHomeCarouselStore } from "@/store/pages/homeStore"
import { useEffect } from "react"
import { CmpPagination } from "@/components"
import { CmpHomeCarouselAdd, CmpHomeCarouselTable } from "../../../components"

export const Home = () => {
    const { openModal } = useModalStore()
    const { fetchCarousel, items, page, limit } = usePrivateHomeCarouselStore()

    const handleAddCarousel = () => {
        openModal({
            title: "Agregar elemento",
            content: <CmpHomeCarouselAdd />
        })
    }

    useEffect(() => {
        fetchCarousel()
    }, [page, limit])

    return (
        <Container>
            <Stack gap="md">
                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={2}>Pagina de inicio</Title>
                        <Text c="dimmed" size="sm">Configuracion de la pagina de inicio</Text>
                    </Stack>
                </Group>

                <Divider />

                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={4}>Carrusel</Title>
                        <Text c="dimmed" size="sm">Configuracion del carrusel</Text>
                    </Stack>

                    <Button leftSection={<IconPlus size={14} />} onClick={handleAddCarousel}>
                        Agregar nuevo elemento
                    </Button>

                </Group>
                <Card>
                    <CmpHomeCarouselTable
                        items={items}
                    />
                </Card>

                <Card>
                    <CmpPagination
                        useStore={usePrivateHomeCarouselStore}
                    />
                </Card>

                <Divider />

                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={4}>Apartados</Title>
                        <Text c="dimmed" size="sm">Configuracion del carrusel</Text>
                    </Stack>
                </Group>

                <Card>
                    {/* <CmpHomeCarousel /> */}
                </Card>

            </Stack>
        </Container>
    )
}