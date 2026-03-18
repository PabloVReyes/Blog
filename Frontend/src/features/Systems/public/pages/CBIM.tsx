import { Container, Panel, Table } from "@/components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { fetchCBIM } from "../api"
import { Alert, Notify } from "@/ui"
import { Text } from "@mantine/core"
import { Highlight } from "@/utils"
import * as types from "../types/CBIM"

const columns = (search: string) => [
    {
        key: "code",
        label: "Clave",
        align: "left",
        miw: 100,
        render: (row: types.Datum) => {
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
        render: (row: types.Datum) => {
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
        render: (row: types.Datum) => {
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
        render: (row: types.Datum) => {
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
        render: (row: types.Datum) => {
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
]

export const CBIM = () => {
    const [search, setSearch] = useState<string>("")
    const [data, setData] = useState<types.Data | null>(null)
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const [debounced] = useDebouncedValue(search, 500)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        handleFetch()
    }, [limit, page])

    useEffect(() => {
        setPage(1)
        handleFetch()
    }, [debounced])

    const handleFetch = async () => {
        try {
            setLoading(true)
            await fetchCBIM({ page, limit, search }).then(setData)
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener Cuadro Basico de Medicamentos",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container
            title="Cuadro Básico Integral de Medicamentos"
            description="Herramienta normativa en México que agrupa, bajo criterios de eficacia, seguridad y calidad, los medicamentos esenciales necesarios para la atención médica en las instituciones públicas"
        >
            <Panel
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar por clave o nombre..."
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                firstItem={data?.meta.firstItem ?? 0}
                lastItem={data?.meta?.lastItem ?? 0}
                totalItems={data?.meta?.total ?? 0}
                totalPages={data?.meta?.totalPages ?? 0}
                onChangePage={setPage}
                pageValue={page}
            >
                <Table
                    columns={columns(search)}
                    data={data?.data}
                    isLoading={loading}
                />
            </Panel>
            <Alert
                color="orange"
                title="Información"
                content="Cualquier duda o aclaración marcar a la ext. 1251"
            />
        </Container>
    )
}