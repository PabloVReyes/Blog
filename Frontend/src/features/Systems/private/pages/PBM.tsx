import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsPBM, AddPBM } from "../components"
import { Notify } from "@/ui"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Text } from "@mantine/core"
import { useSystemsPBMStore } from "@/stores"
import type { Column } from "@/types"
import type { PMBData } from "../../types/pbm.types"

const columns: Column<PMBData>[] = [
    {
        key: 'title',
        label: 'Título',
        align: 'left',
    },
    {
        key: 'file',
        label: 'Algoritmo',
        align: 'left',
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
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <ActionsPBM {...row} />
        }
    }
]


export const PBM = () => {
    const { openModal } = useModalStore()
    const {
        items,
        fetch,
        setSearch,
        search,
        isLoading,
        page,
        limit,
        totalItems,
        totalPages,
        setLimit,
        firstItem,
        lastItem,
        setPage
    } = useSystemsPBMStore()
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
                title: "Error al obtener algoritmos PBM",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            title: "Agregar Algoritmo PBM",
            subtitle: "Agregar un Algoritmos PBM",
            icon: "IconPlus",
            content: <AddPBM />
        })
    }

    return (
        <Container
            title="Algoritmos PBM"
            description="Protocolos o guías de actuación basadas en la evidencia utilizadas dentro del Patient Blood Management"
        >
            <Panel
                title
                titleValue="Lista de Algoritmos"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar Algoritmo..."
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                onChangePage={setPage}
                firstItem={firstItem}
                lastItem={lastItem}
                totalItems={totalItems}
                totalPages={totalPages}
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