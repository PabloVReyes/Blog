import { Container, Panel, Table } from "@/components"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsAdverseEvents } from "../components"
import { useDebouncedValue } from "@mantine/hooks"
import { Text } from "@mantine/core"
import { useSystemsAdverseEventsStore } from "@/stores"
import type { Column } from "@/types"

interface Row {
    id: string;
    title: string;
    type: string;
    fileName: null | string;
    filePath: null | string;
    fileSize: null | string;
    mimeType: null | string;
}


const columns: Column<Row>[] = [
    {
        key: 'title',
        label: 'Título',
        align: 'left',
    },
    {
        key: 'file',
        label: 'Nombre',
        align: 'left',
        render: (row) => {
            if (!row.fileName) {
                return (
                    <Text size="xs" c="dimmed">Sin archivo</Text>
                )
            }

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
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row) => {
            return <ActionsAdverseEvents {...row} />
        }
    },
]


export const AdverseEvents = () => {
    const {
        fetch,
        search,
        page,
        limit,
        items,
        isLoading,
    } = useSystemsAdverseEventsStore()
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
                title: "Error al obtener registros de Eventos Adversos",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    return (
        <Container
            title="Eventos Adversos"
            description="Sistema de Notificación y Reporte de Eventos Adversos CAE"
        >
            <Panel
                title
                titleValue="Lista de archivos"
            >
                <Table
                    data={items}
                    columns={columns}
                    isLoading={isLoading}
                />
            </Panel>
        </Container>
    )
}