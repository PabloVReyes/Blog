import { Container, Panel, Table } from "@/components"
import { useCIE10Store } from "../store"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsCIE10, AddCIE10 } from "../components"
import { useModalStore } from "@/layout"
import { useDebouncedValue } from "@mantine/hooks"

const columns = [
    {
        key: 'id',
        label: 'Clave',
        align: 'center',
    },
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsCIE10 {...row} />
        }
    },
]


export const CIE10 = () => {
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
    } = useCIE10Store()
    const { openModal } = useModalStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener registros de CIE-10",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddCIE10 />
            )
        })
    }


    return (
        <Container
            title="Clasificación internacional de enfermedades"
            description="Décima edición de la Clasificación Internacional de Enfermedades"
        >
            <Panel
                title
                titleValue="Lista de enfermedades"
                onAddElement={handleAdd}
                search
                searchValue={search}
                searchPlaceholder="Buscar por clave o nombre..."
                onChangeSearch={setSearch}
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                lastItem={lastItem}
                firstItem={firstItem}
                totalItems={totalItems}
                totalPages={totalPages}
                onChangePage={setPage}
            >
                <Table
                    data={items}
                    columns={columns}
                    isLoading={isLoading}
                />
            </Panel>
        </Container>
    )
}