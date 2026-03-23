import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { Actions, Add } from "../components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { useUVEHStore } from "@/stores"
import type { Column } from "@/types"
import type { UVEHData } from "../../types/UVEH.types"

const columns: Column<UVEHData>[] = [
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
            return <Actions {...row} />
        }
    },
]


export const UVEH = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useUVEHStore()
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
                title: "Error al obtener UVEH",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <Add />
            )
        })
    }

    return (
        <Container
            title="Unidad de Vigilancia Epidemiológica Hospitalaria (UVEH)"
        >
            <Panel
                title
                titleValue="Lista de Archivos"
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