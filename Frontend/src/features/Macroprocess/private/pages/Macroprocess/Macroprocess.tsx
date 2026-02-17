import { Container, Table } from "@/components"
import { Card, Stack } from "@mantine/core"
import { useEffect } from "react"
import { useMacroprocessStore } from "../../store"
import { columns } from "./TableColumns"
import { Notify } from "@/ui"

export const Macroprocess = () => {
    const { fetch, manuals, isLoading, page, search, limit, setSearch } = useMacroprocessStore()

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
            title="Macroproceso"
            description="Configuración de los macroprocesos"
        >
            <Card>
                <Stack>
                    <Card>
                        {/* <Search
                            value={search}
                            onChange={setSearch}
                        /> */}
                    </Card>
                    <Card>
                        <Table
                            columns={columns}
                            isLoading={isLoading}
                            data={manuals}
                        />
                    </Card>
                    <Card>
                        {/* <Pagination
                            useStore={useMacroprocessStore}
                        /> */}
                    </Card>
                </Stack>
            </Card>
        </Container>
    )
}