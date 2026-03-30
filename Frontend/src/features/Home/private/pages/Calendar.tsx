import { Panel, Table } from "@/components"
import { Badge, Text, ThemeIcon } from "@mantine/core"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsCalendar } from "../components"
import { useHomeCalendarStore } from "@/stores"
import type { Column } from "@/types"
import { getTablerIcon } from "@/helpers"
import type { CalendarData } from "../../types/calendar.types"

const columns: Column<CalendarData>[] = [
    {
        key: "icon",
        label: "Icono",
        align: "center",
        render: (row) => {
            const Icon = getTablerIcon(row.icon)
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
        label: 'Título',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripción',
        align: 'left',
    },
    {
        key: 'year',
        label: 'Año',
        align: 'center',
        miw: 75,
        render: (row) => {
            return <Badge variant="filled" color="red" size="xs">{row.year}</Badge>
        }
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'left',
        render: (row) => {
            if (!row.file) {
                return <Text size="xs" c="dimmed">Sin archivo</Text>
            }

            return <Text
                style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
                size="sm"
            >
                {row.file.name}
            </Text>
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <ActionsCalendar {...row} />
        }
    }
]

export const Calendar = () => {
    const { items, fetch, isLoading } = useHomeCalendarStore()

    useEffect(() => {
        handleFetch()
    }, [])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener primera sección",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    return (
        <Panel
            title
            titleValue="Primera Sección"
        >
            <Table
                columns={columns}
                data={items}
                isLoading={isLoading}
            />
        </Panel>
    )
}