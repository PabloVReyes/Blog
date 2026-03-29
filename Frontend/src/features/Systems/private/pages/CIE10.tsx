import { Container, Panel, Table } from "@/components"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { ActionsCIE10, AddCIE10 } from "../components"
import { useModalStore } from "@/layout"
import { useDebouncedValue } from "@mantine/hooks"
import { useSystemsCIE10Store } from "@/stores"
import type { Column } from "@/types"

export interface Row {
    id: string;
    name: string;
}

const columns: Column<Row>[] = [
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
        render: (row) => {
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
    } = useSystemsCIE10Store()
    const { openModal } = useModalStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al obtener registros de CIE-10",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            title: "Agregar Enfermedad",
            subtitle: "Agregar una enfermedad de la Clasificación internacional de enfermedades (CIE-10) ",
            icon: "IconPlus",
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