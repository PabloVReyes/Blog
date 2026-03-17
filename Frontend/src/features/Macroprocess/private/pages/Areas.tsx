import { Container, Panel, Table } from "@/components"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Badge, Text } from "@mantine/core"
import { ActionsAreas } from "../components"
import { useMacroprocessAreaStore } from "@/stores"

export const columns = [
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm">{row.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row: any) => {
            return (
                <Badge variant="filled" size="sm">{row.category === "main" ? "Área Principal" : "Área de Soporte"}</Badge>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsAreas {...row} />
        }
    },
]

export const Areas = () => {
    const { fetch, items, setLimit, setPage, lastItem, firstItem, totalItems, totalPages, isLoading, page, search, limit, setSearch } = useMacroprocessAreaStore()

    useEffect(() => {
        handleFetch()
    }, [page, search, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
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
            <Panel
                title
                titleValue="Lista de Áreas"
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                totalPages={totalPages}
                totalItems={totalItems}
                lastItem={lastItem}
                firstItem={firstItem}
                onChangePage={setPage}
                search
                searchPlaceholder="Buscar área por nombre..."
                searchValue={search}
                onChangeSearch={setSearch}
            >
                <Table
                    columns={columns}
                    isLoading={isLoading}
                    data={items}
                />
            </Panel>
        </Container>
    )
}