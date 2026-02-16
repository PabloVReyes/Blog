import { Button, Card, Group, Stack, Title } from "@mantine/core"
import { useCarouselStore } from "../../store"
import { Pagination, Search, Table } from "@/components"
import { useEffect } from "react"
import { IconPlus } from "@tabler/icons-react"
import { columns } from "./TableColumns"
import { useModalStore } from "@/layout"
import { AddCarousel } from "../../components"
import { Notify } from "@/ui"

export const Carousel = ({ id }: any) => {
    const { openModal } = useModalStore()
    const { fetch, items, search, setSearch, limit, setLimit, page, setPage, totalPages, totalItems, firstItem, lastItem, isLoading} = useCarouselStore()

    useEffect(() => {
        handleFetch()
    }, [search, limit, page])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener carrusel",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddCarousel
                    sectionId={id}
                />
            )
        })

    }


    return (
        <Card>
            <Stack>
                <Card.Section withBorder>
                    <Title order={4}>Carusel</Title>
                </Card.Section>
                <Card>
                    <Group gap={5}>
                        <Search
                            value={search}
                            onChange={setSearch}
                            placeholder="Buscar item..."
                        />
                        <Button
                            onClick={handleAdd}
                            leftSection={<IconPlus size={16} />}
                        >
                            Nuevo Elemento
                        </Button>
                    </Group>
                </Card>
                <Card>
                    <Table
                        columns={columns}
                        data={items}
                        isLoading={isLoading}
                    />
                </Card>
                <Card>
                    <Pagination
                        limit={limit}
                        onChangeLimit={setLimit}
                        totalPages={totalPages}
                        onChangePage={setPage}
                        totalItems={totalItems}
                        firstItem={firstItem}
                        lastItem={lastItem}
                        page={page}
                    />
                </Card>
            </Stack>
        </Card>
    )
}