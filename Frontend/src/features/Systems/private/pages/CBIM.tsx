import { Container, Panel, Table } from "@/components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { Highlight } from "@/utils"
import { ActionsCBIM, AddCBIM } from "../components"
import { useModalStore } from "@/layout"
import { useSystemsCBIMStore } from "@/stores"

const columns = (search: string) => [
    {
        key: "code",
        label: "Clave",
        align: "left",
        miw: 100,
        render: (row: any) => {
            return (
                <Text size="sm">
                    <Highlight text={row.code} query={search} />
                </Text>
            )
        }

    },
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm">
                    <Highlight text={row.name} query={search} />
                </Text>
            )
        }
    },
    {
        key: 'description',
        label: 'Presentación',
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm">
                    <Highlight text={row.description} query={search} />
                </Text>
            )
        }
    },
    {
        key: 'sp',
        label: 'SP',
        align: 'left',
        render: (row: any) => {
            if (!row.sp) {
                return <Text size="xs" c="dimmed">--</Text>
            }

            return (
                <Text size="sm">
                    <Highlight text={row.sp} query={search} />
                </Text>
            )
        }
    },
    {
        key: 'fpgc',
        label: 'FPGC',
        align: 'center',
        render: (row: any) => {
            if (!row.fpgc) {
                return <Text size="xs" c="dimmed">--</Text>
            }

            return (
                <Text size="sm">
                    <Highlight text={row.fpgc} query={search} />
                </Text>
            )
        }
    },
    {
        key: 'cbt_cae',
        label: 'CBT CAE',
        align: 'center',
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsCBIM {...row} />
        }
    },
]

export const CBIM = () => {
    const { openModal } = useModalStore()
    const {
        fetch,
        search,
        page,
        limit,
        items,
        isLoading,
        setSearch,
        setLimit,
        totalItems,
        totalPages,
        firstItem,
        lastItem,
        setPage
    } = useSystemsCBIMStore()

    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [limit, page])

    useEffect(() => {
        setPage(1)
        handleFetch()
    }, [debounced])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener registros del Cuadro Basico de Medicamentos",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: <AddCBIM />
        })
    }


    return (
        <Container
            title="Cuadro Básico Integral de Medicamentos"
            description="Herramienta normativa en México que agrupa, bajo criterios de eficacia, seguridad y calidad, los medicamentos esenciales necesarios para la atención médica en las instituciones públicas"
        >
            <Panel
                title
                titleValue="Lista de medicamentos"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar por clave o nombre..."
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                firstItem={firstItem}
                lastItem={lastItem}
                totalItems={totalItems}
                totalPages={totalPages}
                onChangePage={setPage}
                pageValue={page}
            >
                <Table
                    columns={columns(search)}
                    data={items}
                    isLoading={isLoading}
                />
            </Panel>
        </Container>
    )
}