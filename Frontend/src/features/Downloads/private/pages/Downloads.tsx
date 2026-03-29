import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { ActionsDownloads, AddDownloads } from "../components"
import { useDownloadStore } from "@/stores"
import type { Column } from "@/types"
import type { DownloadData } from "../../types/download.types"

const columns: Column<DownloadData>[] = [
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripción',
        align: 'left',
        render: (row) => {
            if (!row.description) {
                return <Text size="xs" c="dimmed">------</Text>
            }

            return <Text size="sm">{row.description}</Text>
        }
    },
    {
        key: 'area',
        label: 'Área',
        align: 'center',
        render: (row) => {
            return (
                <Text size="sm" >{row.category.section?.area?.name}</Text>
            )
        }
    },
    {
        key: 'section',
        label: 'Sección',
        align: 'center',
        render: (row) => {
            return (
                <Text size="sm">{row.category.section?.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row) => {
            return (
                <Text size="sm">{row.category?.name}</ Text>
            )
        }
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'center',
        render: (row) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.file?.name}</Text>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'left',
        render: (row) => {
            return <ActionsDownloads {...row} />
        }
    },
]

export const Downloads = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useDownloadStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener descargas",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            title: "Agregar Descarga",
            subtitle: "Agregar una nueva Descarga",
            icon: "IconPlus",
            content: (
                <AddDownloads />
            )
        })
    }

    return (
        <Container
            title="Descargar Información"
            description="Descarga de información de diferentes áreas"
        >
            <Panel
                title
                titleValue="Lista de descargas"
                onAddElement={handleAdd}
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
                searchPlaceholder="Buscar descarga..."
                searchValue={search}
                onChangeSearch={setSearch}
            >
                <Table
                    isLoading={isLoading}
                    data={items}
                    columns={columns}
                />
            </Panel>
        </Container>
    )
}