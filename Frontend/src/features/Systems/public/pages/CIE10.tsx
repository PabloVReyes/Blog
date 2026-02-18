import { Container, Panel, Table } from "@/components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect, useState } from "react"
import { fecthCIE10 } from "../api"
import { Notify } from "@/ui"

const columns = [
    {
        key: "id",
        label: "Clave",
        align: "left",
        miw: 100,

    },
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
]

export const CIE10 = () => {
    const [search, setSearch] = useState<string>("")
    const [data, setData]: any = useState<any[]>([])
    const [page, setPage]: any = useState<number>(1)
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
            await fecthCIE10({ page, limit, search }).then(setData)
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener alertas",
                message: error.message
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
                firstItem={data?.meta?.firstItem}
                lastItem={data?.meta?.lastItem}
                totalItems={data?.meta?.total}
                totalPages={data?.meta?.totalPages}
                onChangePage={setPage}
                pageValue={page}
            >
                <Table
                    columns={columns}
                    data={data.data}
                    isLoading={loading}
                />
            </Panel>
        </Container >
    )
}