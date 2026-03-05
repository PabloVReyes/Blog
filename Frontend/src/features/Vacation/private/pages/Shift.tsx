import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsShift, AddShift } from "../components"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { useShifthStore } from "../store"
import { Notify } from "@/ui"
import { ThemeIcon } from "@mantine/core"
import * as TablerIcons from "@tabler/icons-react";

const columns = [
    {
        key: "icon",
        label: "Icono",
        align: 'left',
        render: (row: any) => {
            const Icon =
                row.icon &&
                (TablerIcons as any)[row.icon];

            return (
                <ThemeIcon
                    size={56}
                    variant="light"
                    color={row.color}
                >
                    <Icon />
                </ThemeIcon>
            )
        }
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
            return <ActionsShift {...row} />
        }
    },
]

export const Shift = () => {
    const { openModal } = useModalStore()

    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useShifthStore()
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
                title: "Error al obtener turnos",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: <AddShift />
        })
    }

    return (
        <Container
            title="Turnos"
        >
            <Panel
                title
                titleValue="Lista de turnos"
                onAddElement={handleAdd}
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                totalPages={totalPages}
                totalItems={totalItems}
                lastItem={lastItem}
                firstItem={firstItem}
                onChangePage={setPage}
                search
                searchPlaceholder="Buscar disposición jurídica..."
                searchValue={search}
                onChangeSearch={setSearch}
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