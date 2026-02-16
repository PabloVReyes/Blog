import { Container, Pagination, Search, Table } from "@/components"
import { Button, Card, Group, Stack } from "@mantine/core"
import { columns } from "./TableColumns"
import { IconPlus } from "@tabler/icons-react"
import { Add } from "../components"
import { useSystemsStore } from "../store"
import { useEffect } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"

export const Systems = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSystemsStore()

    useEffect(() => {
        handleFetch()
    }, [search, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener sistemas",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: <Add />
        })
    }

    return (
        <Container
            title="Sistemas de consultas"
            description="Accede a los diferentes sistemas de información institucionales"
        >
            <Card>
                <Stack>
                    <Card>
                        <Group gap={5}>
                            <Search
                                value={search}
                                onChange={setSearch}
                                placeholder="Buscar permisos..."
                            />
                            <Button
                                style={{ flex: "1 1 auto" }}
                                leftSection={
                                    <IconPlus
                                        size={16}
                                    />
                                }
                                onClick={handleAdd}
                            >
                                Nuevo sistema
                            </Button>
                        </Group>
                    </Card>

                    <Card>
                        <Table
                            isLoading={isLoading}
                            data={items}
                            columns={columns}
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
        </Container>
    )
}