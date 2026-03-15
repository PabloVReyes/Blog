import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsCareProtocols, AddCareProtocols } from "../components"
import { useCareProtocolsStore } from "../store"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Notify } from "@/ui"
import { Badge, Text } from "@mantine/core"


const columns = [
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
        key: "cycle",
        label: "Ciclo",
        align: 'center',
        miw: "150px",
        render: (row: any) => {
            return (
                <Badge variant="filled" size="sm">{row.category.name}</Badge>
            )
        }
    },
    {
        key: "algorithm",
        label: "Algoritmo",
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.fileName}</Text>
            )
        }
    },
    {
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsCareProtocols {...row} />
        }
    }
]

export const CareProtocols = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useCareProtocolsStore()
    const [debounced] = useDebouncedValue(search, 500)

    const handleAdd = () => {
        openModal({
            content: <AddCareProtocols />
        })
    }

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener Protocolos de Atención",
                message: error.message
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
                searchPlaceholder="Buscar Informe..."
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