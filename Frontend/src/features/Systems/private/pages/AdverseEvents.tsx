import { Container, Panel, Table } from "@/components"
import { useAdverseEventsStore } from "../store"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsAdverseEvents } from "../components"
import { useDebouncedValue } from "@mantine/hooks"
import { Text } from "@mantine/core"

const columns = [
    {
        key: 'title',
        label: 'Título',
        align: 'left',
    },
    {
        key: 'file',
        label: 'Nombre',
        align: 'left',
        render: (row: any) => {
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
        render: (row: any) => {
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
    } = useAdverseEventsStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener registros de CIE-10",
                message: error.message
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