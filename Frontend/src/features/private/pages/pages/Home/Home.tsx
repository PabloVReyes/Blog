import { Button, Card, Container, Divider, Group, Stack, Text, Title } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import { usePrivateHomeCarouselStore, usePrivateHomeSectionStore } from "@/store/pages/homeStore"
import { useEffect } from "react"
import { CmpHomeCarouselAdd, CmpHomeCarouselTable, CmpHomeSectionTable } from "../../../components"
import { Pagination, useModalStore } from "@/shared"

export const Home = () => {
    const { openModal } = useModalStore()
    const { fetchCarousel, items, page, limit, search, setSearch } = usePrivateHomeCarouselStore()
    const { fetchSections, items: sections } = usePrivateHomeSectionStore()

    const handleAddCarousel = () => {
        openModal({
            title: "Agregar elemento",
            content: <CmpHomeCarouselAdd />
        })
    }

    useEffect(() => {
        fetchCarousel()
    }, [page, limit, search])

    useEffect(() => {
        fetchSections()
    }, [])

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
                {/* Busqueda */}
                <Card>
                    {/* <CmpSearch
                        value={search}
                        onChange={setSearch}
                    /> */}
                </Card>
                {/* Contenido */}
                <Card>
                    <CmpHomeCarouselTable
                        items={items}
                    />
                </Card>
                {/* Paginacion */}
                <Card>
                    <Pagination
                        useStore={usePrivateHomeCarouselStore}
                    />
                </Card>

                <Divider />

                <Group align="center">
                    <Stack gap={1} style={{ flex: '1 1 auto' }}>
                        <Title order={4}>Secciones</Title>
                        <Text c="dimmed" size="sm">Configuracion de cada una de las secciones del inicio</Text>
                    </Stack>
                </Group>

                <Card>
                    <CmpHomeSectionTable
                        items={sections}
                    />
                </Card>

            </Stack>
        </Container>
    )
}