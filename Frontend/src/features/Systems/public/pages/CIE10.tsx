import { Container, Panel, Table } from "@/components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { fetchCIE10 } from "../api"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { Highlight } from "@/utils"

export interface Row {
    id: string;
    name: string;
}

export interface Data {
    data: Datum[];
    meta: Meta;
}

export interface Datum {
    id: string;
    name: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    firstItem: number;
    lastItem: number;
}

const columns = (search: string) => [
    {
        key: "id",
        label: "Clave",
        align: "left",
        miw: 100,
        render: (row: Row) => {
            return (
                <Text size="sm">
                    <Highlight text={row.id} query={search} />
                </Text>
            )
        }

    },
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
        render: (row: Row) => {
            return (
                <Text size="sm">
                    <Highlight text={row.name} query={search} />
                </Text>
            )
        }
    },
]

export const CIE10 = () => {
    const [search, setSearch] = useState<string>("")
    const [data, setData] = useState<Data>()
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
            await fetchCIE10({ page, limit, search }).then(setData)
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener enfermedades",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }


    return (
        <Container
            title="Clasificación internacional de enfermedades"
            description="Décima edición de la Clasificación Internacional de Enfermedades"
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
                firstItem={data?.meta?.firstItem ?? 0}
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
        </Container >
    )
}