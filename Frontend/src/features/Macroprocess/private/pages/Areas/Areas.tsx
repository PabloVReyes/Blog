import { Container, Pagination, Search, Table } from "@/components"
import { Card, Stack } from "@mantine/core"
import { useAreasStore } from "../../store"
import { useEffect } from "react"
import { columns } from "./TableColumns"
import { Notify } from "@/ui"

export const Areas = () => {
    const { fetch, areas, isLoading, page, search, limit, setSearch } = useAreasStore()

    useEffect(() => {
        handleFetch()
    }, [page, search, limit])

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

    return (
        <Container
            title="Áreas"
            description="Configuración de cada una de las Áreas mostradas en el Macroproceso"
        >
            <Card>
                <Stack>
                    <Card>
                        <Search
                            value={search}
                            onChange={setSearch}
                        />
                    </Card>
                    <Card>
                        <Table
                            columns={columns}
                            isLoading={isLoading}
                            data={areas}
                        />
                    </Card>
                    <Card>
                        <Pagination
                            useStore={useAreasStore}
                        />
                    </Card>
                </Stack>
            </Card>
        </Container>
    )
}