import { Panel, Table } from "@/components"
import { Badge } from "@mantine/core"
import { useEffect } from "react"
import { useAlertStore } from "../store"
import { Notify } from "@/ui"
import * as TablerIcons from "@tabler/icons-react";
import { ActionsAlert } from "../components"

export const columns = [
    {
        key: "type",
        label: "Tipo",
        align: "center",
        miw: 100,
        render: (row: any) => {
            if (row.color === "blue") {
                return <Badge size="xs" autoContrast color="blue">Informativo</Badge>
            }

            if (row.color === "green") {
                return <Badge size="xs" autoContrast color="green">Exitoso</Badge>
            }

            if (row.color === "yellow") {
                return <Badge size="xs" autoContrast color="yellow">Advertencia</Badge>
            }

            if (row.color === "red") {
                return <Badge size="xs" autoContrast color="red">Error</Badge>
            }
        }
    },
    {
        key: 'icon',
        label: 'Icono',
        align: 'center',
        render: (row: any) => {
            const Icon =
                row.icon &&
                (TablerIcons as any)[row.icon];

            return <Icon />
        }
    },
    {
        key: 'title',
        label: 'Titulo',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripcion',
        align: 'left',
    },
    {
        key: 'author',
        label: 'Autor',
        align: 'left',
    },
    {
        key: 'file',
        label: 'Visible',
        align: 'center',
        render: (row: any) => {
            if (row.isActive) {
                return <TablerIcons.IconEye />
            } else {
                return <TablerIcons.IconEyeOff />
            }
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsAlert {...row} />
        }
    }
]

export const Alert = () => {
    const { fetch, items, isLoading } = useAlertStore()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener alertas",
                message: error.message
            })
        }
    }

    return (
        <Panel
            title
            titleValue="Alerta"
        >
            <Table
                columns={columns}
                data={items}
                isLoading={isLoading}
            />
        </Panel>
    )
}