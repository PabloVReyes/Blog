import { Container, Panel, Table } from "@/components"
import { useEffect } from "react"
import { Badge, Text } from "@mantine/core"
import { Notify } from "@/ui"
import { ActionsManualTypes } from "../components"
import { useMacroprocessManualTypeStore } from "@/stores"
import type { Column } from "@/types"

export interface Row {
    id: string;
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

const columns: Column<Row>[] = [
    {
        key: 'code',
        label: 'Código',
        align: 'center',
        render: (row) => {
            return (
                <Badge variant="filled" color={row.color} size="sm">
                    {row.id}
                </Badge>
            )
        }
    },
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
                <Badge variant="filled" size="sm">{row.category === "STANDARD" ? "Principal" : "Extra"}</Badge>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row) => {
            return <ActionsManualTypes {...row} />
        }
    },
]

export const ManualsTypes = () => {
    const { fetch, items, setLimit, setPage, lastItem, firstItem, totalItems, totalPages, isLoading, page, search, limit, setSearch } = useMacroprocessManualTypeStore()

    useEffect(() => {
        handleFetch()
    }, [page, limit, search])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener sistemas",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    return (
        <Container
            title="Tipos de manuales"
            description="Configuración para los diferentes tipos de manuales"
        >
            <Panel
                title
                titleValue="Lista de tipos de manual"
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
                searchPlaceholder="Buscar tipo de manual por nombre..."
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