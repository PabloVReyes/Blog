import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsGCP, AddGCP } from "../components"
import { useGPCStore } from "../store"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Notify } from "@/ui"
import { Badge, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import * as TablerIcons from "@tabler/icons-react"
import { colorMap } from "@/utils"


const columns = (theme: any) => [
    {
        key: "orderIndex",
        label: "Prioridad",
        align: 'left',
        render: (row: any) => {
            const Icon =
                row.orderIndex &&
                (TablerIcons as any)[`IconHexagonNumber${row.orderIndex}Filled`];

            return (
                <ThemeIcon
                    size={50}
                    color={row.color}
                    variant="light"
                    style={{
                        '--icon-rgb': colorMap[theme.primaryColor] || "#40c057" // fallback green
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
        miw: "150px",
        render: (row: any) => {
            return (
                <Badge variant="filled"  size="sm">{row.cycle.name}</Badge>
            )
        }
    },
    {
        key: "algorithm",
        label: "Algoritmo",
        align: 'left',
        render: (row: any) => {
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
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsGCP {...row} />
        }
    }
]

export const GPC = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useGPCStore()
    const [debounced] = useDebouncedValue(search, 500)
    const theme = useMantineTheme()

    const handleAdd = () => {
        openModal({
            content: <AddGCP />
        })
    }

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener algoritmos GPC",
                message: error.message
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
                    columns={columns(theme)}
                />
            </Panel>
        </Container>
    )
}