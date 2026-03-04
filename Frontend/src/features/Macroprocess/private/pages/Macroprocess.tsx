import { Container, Panel, Table } from "@/components"
import { Badge, Text } from "@mantine/core"
import { useEffect } from "react"
import { useMacroprocessStore } from "../store"
import { Notify } from "@/ui"
import { ActionsMacroprocess } from "../components"

export const columns = [
    {
        key: 'code',
        label: 'Codigo',
        align: 'center',
        render: (row: any) => {
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
        render: (row: any) => {
            return (
                <Text size="sm">{row.manualType.name}</Text>
            )
        }
    },
    {
        key: 'area',
        label: 'Área',
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm">{row.area.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row: any) => {
            return (
                <Badge variant="filled" size="sm">{row.area.category === "main" ? "Área principal" : "Área de apoyo"}</Badge>
            )
        }
    },
    {
        key: 'fileName',
        label: 'Archivo',
        align: 'left',
        render: (row: any) => {
            if (!row.fileName) {
                return <Text size="xs" c="dimmed">Sin archivo</Text>
            }

            return <Text
                style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
                size="sm"
            >
                {row.fileName}
            </Text>
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
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
                searchPlaceholder="Buscar norma..."
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