import { Container, Pagination, Search, Table } from "@/components"
import { useManualsTypesStore } from "../../store"
import { useEffect } from "react"
import { Card, Stack } from "@mantine/core"
import { columns } from "./TableColumns"
import { Notify } from "@/ui"

export const ManualsTypes = () => {
    const { fetch, manuals, page, limit, search, setSearch, isLoading } = useManualsTypesStore()

    useEffect(() => {
        handleFetch()
    }, [page, limit, search])

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
            title="Tipos de manuales"
            description="Configuración para los diferentes tipos de manuales"
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
                            data={manuals}
                        />
                    </Card>

                    <Card>
                        <Pagination
                            useStore={useManualsTypesStore}
                        />
                    </Card>
                </Stack>
            </Card>
        </Container>
    )
}