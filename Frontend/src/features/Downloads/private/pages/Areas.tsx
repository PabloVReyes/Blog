import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsAreas, AddArea } from "../components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text, ThemeIcon } from "@mantine/core"
import { useDownloadAreasStore } from "@/stores"
import type { Column } from "@/types"
import { getTablerIcon } from "@/helpers"
import type { Area } from "../../types/download.types"

const columns: Column<Area>[] = [
    {
        key: 'icon',
        label: 'Icono',
        align: 'center',
        render: (row) => {
            const Icon = getTablerIcon(row.icon)

            return (
                <ThemeIcon
                    size={50}
                    color={row.color}
                    radius={"50%"}
                >
                    <Icon />
                </ThemeIcon>
            )
        }
    },
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
    {
        key: 'slug',
        label: 'URL',
        align: 'left',
        render: (row) => {
            return (
                <Text size="sm">{`/${row.slug}`}</Text>
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
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useDownloadAreasStore()
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
                title: "Error al obtener areas",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            title: "Agregar Área",
            subtitle: "Agregar una nueva Área",
            icon: "IconPlus",
            content: (
                <AddArea />
            )
        })
    }


    return (
        <Container
            title="Áreas"
            description="Areas de descargas de información"
        >
            <Panel
                title
                titleValue="Lista de Áreas"
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
                searchPlaceholder="Buscar área..."
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