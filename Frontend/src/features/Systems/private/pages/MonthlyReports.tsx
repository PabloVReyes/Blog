import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsMonthlyReports, AddMonthlyReports } from "../components"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { useDebouncedValue } from "@mantine/hooks"
import { useSystemsMonthlyReportsStore } from "@/stores"

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]

const columns = [
    {
        key: 'title',
        label: 'Título',
        align: 'left',
    },
    {
        key: "description",
        label: "Descripción",
        align: 'left',
        render: (row: any) => {
            if (!row.description) {
                return <Text size="xs" c="dimmed">------</Text>
            }

            return <Text size="sm">{row.description}</Text>
        }
    },
    {
        key: "type",
        label: "Tipo",
        align: 'left',
        render: (row: any) => {
            switch (row.type) {
                case "MONTHLY":
                    return <Text size="sm">Mensual</Text>
                case "ANNUAL":
                    return <Text size="sm">Anual</Text>
                case "STATISTICAL":
                    return <Text size="sm">Estadistico</Text>
                case "EXTRA":
                    return <Text size="sm">Extra</Text>
            }
        }
    },
    {
        key: "month",
        label: "Mes",
        align: 'left',
        render: (row: any) => {
            if (!row.month) {
                return <Text size="xs" c="dimmed">------</Text>
            }

            return <Text size="sm">{months[row.month - 1]}</Text>
        }
    },
    {
        key: "year",
        label: "Año",
        align: 'left',
        render: (row: any) => {
            return <Text size="sm">{row.period.year}</Text>
        }
    },
    {
        key: "file",
        label: "Archivo",
        align: 'left',
        render: (row: any) => {
            return <Text
                style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
                size="sm">
                {row.fileName}
            </Text>
        }
    },
    {
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsMonthlyReports {...row} />
        }
    }
]

export const MonthlyReports = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSystemsMonthlyReportsStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener informes mensuales",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddMonthlyReports />
            )
        })
    }

    return (
        <Container
            title="Informes Mensuales"
            description="Informes mensuales de los resultados de alcance de metas e indicadores de productividad y desempeño"
        >
            <Panel
                title
                titleValue="Lista de Informes Mensuales"
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