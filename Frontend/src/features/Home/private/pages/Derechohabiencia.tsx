import { Panel, Table } from "@/components"
import { ThemeIcon, Table as TableMantine, Text } from "@mantine/core"
import { useEffect } from "react"
import { Notify } from "@/ui"
import * as TableIcons from "@tabler/icons-react"
import { ActionsDerechohabiencia } from "../components"
import { useHomeDerechohabienciaStore } from "@/stores"

const columns = [
    {
        key: "icon",
        label: "Icono",
        align: "center",
        render: (row: any) => {
            const Icon =
                row.icon &&
                (TableIcons as any)[row.icon];
            return (
                <ThemeIcon
                    size={50}
                    color={row.color}
                    variant="light"
                    style={{
                        '--icon-rgb': row.color || "#40c057" // fallback green
                    } as React.CSSProperties}
                    className="themeIcon"
                >
                    <Icon />
                </ThemeIcon>
            )
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
        key: 'links',
        label: 'Links',
        align: 'left',
        render: (row: any) => {
            const rows = row.links.map((link: any, index: number) => (
                <TableMantine.Tr key={index}>
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
        render: (row: any) => {
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
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener segunda sección",
                message: error.message
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