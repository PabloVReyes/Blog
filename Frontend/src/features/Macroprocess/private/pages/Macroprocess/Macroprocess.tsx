import { Container, Pagination, Search, Table } from "@/components"
import { Card, Stack } from "@mantine/core"
import { useEffect } from "react"
import { useMacroprocessStore } from "../../store"
import { notify } from "@/utils/notify"
import { columns } from "./TableColumns"

export const Macroprocess = () => {
    const { fetch, manuals, isLoading, page, search, limit, setSearch } = useMacroprocessStore()

    useEffect(() => {
        handleFetch()
    }, [page, search, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            notify({
                type: "error",
                title: "Error al obtener sistemas",
                message: error.message
            })
        }
    }

    return (
        <Container
            title="Macroproceso"
            description="Configuración de los macroprocesos"
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
                            useStore={useMacroprocessStore}
                        />
                    </Card>
                </Stack>
            </Card>
        </Container>
    )
}