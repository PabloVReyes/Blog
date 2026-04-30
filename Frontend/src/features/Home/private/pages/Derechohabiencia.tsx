import { Panel, Table, ThemeIcon } from "@/components"
import { Table as TableMantine, Text } from "@mantine/core"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsDerechohabiencia } from "../components"
import { useHomeDerechohabienciaStore } from "@/stores"
import type { Column } from "@/types"
import { getTablerIcon } from "@/helpers"

export interface Row {
    id: string;
    title: string;
    icon: string;
    color: string;
    description: string;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
    links: Link[];
}

export interface Link {
    id: string;
    title: string;
    url: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    derechohabienciaConfigId: string;
}

const columns: Column<Row>[] = [
    {
        key: "icon",
        label: "Icono",
        align: "center",
        render: (row) => {
            const Icon = getTablerIcon(row.icon)
            return (
                <ThemeIcon
                    color={row.color}
                >
                    <Icon />
                </ThemeIcon>
            )
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
        key: 'links',
        label: 'Links',
        align: 'left',
        render: (row) => {
            const rows = row.links.map((link) => (
                <TableMantine.Tr key={link.id}>
                    <TableMantine.Th
                        style={{
                            backgroundColor: "light-dark(oklch(98% 0.002 264.531), oklch(32% 0.02 259.733))"
                        }}
                    >
                        <Text size="sm" fw={700}>
                            {link.title}
                        </Text>
                    </TableMantine.Th>
                    <TableMantine.Td>{link.url}</TableMantine.Td>
                </TableMantine.Tr>
            ))

            return (
                <TableMantine variant="vertical">
                    <TableMantine.Tbody>
                        {rows}
                    </TableMantine.Tbody>
                </TableMantine >
            )
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <ActionsDerechohabiencia {...row} />
        }
    }
]

export const Derechohabiencia = () => {
    const { fetch, items, isLoading } = useHomeDerechohabienciaStore()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener segunda sección",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    return (
        <Panel
            title
            titleValue="Segunda Sección"
        >
            <Table
                columns={columns}
                data={items}
                isLoading={isLoading}
            />
        </Panel>
    )
}