import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { ActionsVacation, AddVacation } from "../components"
import { useVacationStore } from "../store"


export interface Data {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}


const columns = [
    {
        key: 'shift',
        label: 'Turno',
        align: 'left',
        render: (row: any) => {
            return <Text size="sm">{row.shift.name}</Text>
        }
    },
    {
        key: 'type',
        label: 'Tipo',
        align: 'left',
        render: (row: any) => {
            if (row.type === "CALENDAR") {
                return <Text size="sm">Calendario</Text>
            }

            return <Text size="sm">Index</Text>
        }
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'left',
        render: (row: Data) => {
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
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsVacation {...row} />
        }
    },
]


export const Vacation = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useVacationStore()
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
                title: "Error al obtener descargas",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: <AddVacation />
        })
    }

    return (
        <Container
            title="Disposiciones Jurídicas Administrativas"
            description="Leyes, Códigos, Reglamentos, Decretos, Lineamientos, Acuerdos, Circulares, Manuales, Guías, Otros"
        >
            <Panel
                title
                titleValue="Lista de disposiciones"
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