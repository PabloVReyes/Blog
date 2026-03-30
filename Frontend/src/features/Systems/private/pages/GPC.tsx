import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsGCP, AddGCP } from "../components"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Notify } from "@/ui"
import { Badge, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { colorMap } from "@/utils"
import { useSystemsGPCStore } from "@/stores"
import { getTablerIcon } from "@/helpers"
import type { GPCData } from "../../types/gpc.types"
import type { Column } from "@/types"

const columns = (primaryColor: string): Column<GPCData>[] => [
    {
        key: "orderIndex",
        label: "Prioridad",
        align: 'left',
        render: (row) => {
            const Icon = getTablerIcon(`IconHexagonNumber${row.orderIndex}Filled`)

            return (
                <ThemeIcon
                    size={50}
                    variant="light"
                    style={{
                        '--icon-rgb': colorMap[primaryColor] || "#40c057" // fallback green
                    } as React.CSSProperties}
                    className="themeIcon"
                >
                    <Icon />
                </ThemeIcon>
            )
        }
    },
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
        miw: 150,
        render: (row) => {
            return (
                <Badge variant="filled" size="sm">{row.cycle.name}</Badge>
            )
        }
    },
    {
        key: "algorithm",
        label: "Algoritmo",
        align: 'left',
        render: (row) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.file?.name}</Text>
            )
        }
    },
    {
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <ActionsGCP {...row} />
        }
    }
]

export const GPC = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSystemsGPCStore()
    const [debounced] = useDebouncedValue(search, 500)
    const { primaryColor } = useMantineTheme()

    const handleAdd = () => {
        openModal({
            title: "Agregar Algoritmo GPC",
            subtitle: "Agregar un nuevo Algoritmo GPC",
            icon: "IconPlus",
            content: <AddGCP />
        })
    }

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener algoritmos GPC",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }


    return (
        <Container
            title="Algoritmos GPC - Algoritmos de las Guías de Práctica Clínica"
            description="Representaciones gráficas y secuenciales de las recomendaciones basadas en evidencia científica para el diagnóstico, tratamiento y seguimiento de enfermedades"
        >
            <Panel
                title
                titleValue="Lista de Algoritmos"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar algoritmos..."
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
                    columns={columns(primaryColor)}
                />
            </Panel>
        </Container>
    )
}