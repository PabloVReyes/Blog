import { Panel, Table } from "@/components"
import { Badge } from "@mantine/core"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsAlert } from "../components"
import { useHomeAlertStore } from "@/stores"
import type { Column } from "@/types";
import { getTablerIcon } from "@/helpers"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

type AlertRow = {
    id: string;
    title: string;
    description: string;
    author: string;
    color: "blue" | "emerald" | "yellow" | "red";
    icon: string;
    isActive: boolean;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const columns: Column<AlertRow>[] = [
    {
        key: "type",
        label: "Tipo",
        align: "center",
        miw: 150,
        render: (row) => {
            const map = {
                blue: { color: "blue", label: "Informativo" },
                emerald: { color: "green", label: "Exitoso" },
                yellow: { color: "yellow", label: "Advertencia" },
                red: { color: "red", label: "Error" },
            };

            const config = map[row.color];

            return (
                <Badge size="xs" variant="filled" color={config.color}>
                    {config.label}
                </Badge>
            );
        }
    },
    {
        key: 'icon',
        label: 'Icono',
        align: 'center',
        render: (row) => {
            const Icon = getTablerIcon(row.icon)
            return <Icon size={16} />
        }
    },
    {
        key: 'title',
        label: 'Título',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripción',
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
        render: (row) => {
            if (row.isActive) {
                return <IconEye />
            } else {
                return <IconEyeOff />
            }
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <ActionsAlert {...row} />
        }
    }
]

export const Alert = () => {
    const { fetch, items, isLoading } = useHomeAlertStore()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener alerta",
                message: error instanceof Error ? error.message : "Error desconocido"
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