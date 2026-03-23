import { Container, Panel, Table } from "@/components"
import { Badge, Text } from "@mantine/core"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsMacroprocess } from "../components"
import { useMacroprocessStore } from "@/stores"
import type { Column } from "@/types"
import type { MacroprocessData } from "../../types/macroprocess.types"

export const columns: Column<MacroprocessData>[] = [
    {
        key: 'code',
        label: 'Codigo',
        align: 'center',
        render: (row) => {
            return (
                <Badge variant="filled" color={row.manualType.color} size="sm">
                    {row.manualType.id}
                </Badge>
            )
        }
    },
    {
        key: 'manualType',
        label: 'Tipo',
        align: 'left',
        render: (row) => {
            return (
                <Text size="sm">{row.manualType.name}</Text>
            )
        }
    },
    {
        key: 'area',
        label: 'Área',
        align: 'left',
        render: (row) => {
            return (
                <Text size="sm">{row.area.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row) => {
            return (
                <Badge variant="filled" size="sm">{row.area.category === "main" ? "Área principal" : "Área de apoyo"}</Badge>
            )
        }
    },
    {
        key: 'fileName',
        label: 'Archivo',
        align: 'left',
        render: (row) => {
            if (!row.file) {
                return <Text size="xs" c="dimmed">Sin archivo</Text>
            }

            return <Text
                style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
                size="sm"
            >
                {row.file.name}
            </Text>
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row) => {
            return <ActionsMacroprocess {...row} />
        }
    },
]

export const Macroprocess = () => {
    const { fetch, items, setLimit, setPage, lastItem, firstItem, totalItems, totalPages, isLoading, page, search, limit, setSearch } = useMacroprocessStore()

    useEffect(() => {
        handleFetch()
    }, [page, search, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener macroproceso",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    return (
        <Container
            title="Macroproceso"
            description="Configuración de los macroprocesos"
        >
            <Panel
                title
                titleValue="Lista de normas"
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
                searchPlaceholder="Buscar manual..."
                searchValue={search}
                onChangeSearch={setSearch}
            >
                <Table
                    columns={columns}
                    isLoading={isLoading}
                    data={items}
                />
            </Panel>
        </Container >
    )
}