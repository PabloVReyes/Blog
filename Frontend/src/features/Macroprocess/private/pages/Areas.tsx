import { Container, Panel, Table } from "@/components"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Badge, Text } from "@mantine/core"
import { ActionsAreas } from "../components"
import { useMacroprocessAreaStore } from "@/stores"
import type { Column } from "@/types"

export interface Row {
    id: string;
    name: string;
    category: string;
    manager: string;
    description: null;
    createdAt: Date;
    updatedAt: Date;
}

const columns: Column<Row>[] = [
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
        render: (row) => {
            return (
                <Text size="sm">{row.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row) => {
            return (
                <Badge variant="filled" size="sm">{row.category === "main" ? "Área Principal" : "Área de Soporte"}</Badge>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row) => {
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
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener áreas",
                message: error instanceof Error ? error.message : "Error desconocido"
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