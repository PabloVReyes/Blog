import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsCareProtocols, AddCareProtocols } from "../components"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Notify } from "@/ui"
import { Badge, Text } from "@mantine/core"
import { useSystemsCareProtocolsApiStore } from "@/stores"
import type { Column } from "@/types"
import type { CareProtocolsData } from "../../types/careProtocols.types"

const columns: Column<CareProtocolsData>[] = [
    {
        key: "title",
        label: "Título",
        align: 'left',
    },
    {
        key: "description",
        label: "Descripción",
        align: 'left',
    },
    {
        key: "category",
        label: "Categoria",
        align: 'center',
        miw: 150,
        render: (row) => {
            return (
                <Badge variant="filled" size="sm">{row.category.name}</Badge>
            )
        }
    },
    {
        key: "algorithm",
        label: "Algoritmo",
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
            return <ActionsCareProtocols {...row} />
        }
    }
]

export const CareProtocols = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSystemsCareProtocolsApiStore()
    const [debounced] = useDebouncedValue(search, 500)

    const handleAdd = () => {
        openModal({
            title: "Agregar Protocolo de Atención (Pediatría)",
            subtitle: "Agregar un nuevo Protocolo de Atención (Pediatría)",
            icon: "IconPlus",
            content: <AddCareProtocols />
        })
    }

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener Protocolos de Atención",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }


    return (
        <Container
            title="Protocolos de Atención (Pediatría)"
            description="Guías estandarizadas basadas en evidencia científica que definen los procedimientos de prevención, diagnóstico y tratamiento para enfermedades infantiles"
        >
            <Panel
                title
                titleValue="Lista de Protocolos"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar protocolos..."
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