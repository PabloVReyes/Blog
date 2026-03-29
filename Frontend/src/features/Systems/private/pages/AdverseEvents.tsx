import { Container, Panel, Table } from "@/components"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsAdverseEvents } from "../components"
import { useDebouncedValue } from "@mantine/hooks"
import { Text } from "@mantine/core"
import { useSystemsAdverseEventsStore } from "@/stores"
import type { Column } from "@/types"
import type { AdverseEventsData } from "../types/adverseEvents.types"

const columns: Column<AdverseEventsData>[] = [
    {
        key: 'title',
        label: 'Título',
        align: 'left',
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'left',
        render: (row) => {
            if (!row.file) {
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
                >{row.file.name}</Text>
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