import { Text } from "@mantine/core"
import { Panel, Table } from "@/components"
import { useEffect } from "react"
import { useModalStore } from "@/layout"
import { ActionsCarousel, AddCarousel } from "../components"
import { Notify } from "@/ui"
import { IconEye, IconEyeOff } from "@tabler/icons-react"
import { useDebouncedValue } from "@mantine/hooks"
import { useHomeCarouselStore } from "@/stores"

const columns = [
    {
        key: 'title',
        label: 'Titulo',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripcion',
        align: 'left',
    },
    {
        key: 'url',
        label: 'Enlace',
        align: 'left',
        render: (row: any) => {
            if (!row.url) {
                return <Text size="xs" c="dimmed">Sin enlace</Text>
            }

            return <Text size="sm">{row.url}</Text>
        }
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'left',
        render: (row: any) => {
            if (!row.fileName) {
                return <Text size="xs" c="dimmed">Sin archivo</Text>
            }

            return <Text
                style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
                size="sm"
            >
                {row.fileName}
            </Text>
        }
    },
    {
        key: 'view',
        label: 'Visible',
        align: 'center',
        render: (row: any) => {
            if (row.isActive) {
                return <IconEye />
            } else {
                return <IconEyeOff />
            }
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsCarousel {...row} />
        }
    }
]

export const Carousel = ({ id }: any) => {
    const { openModal } = useModalStore()
    const { fetch, items, search, setSearch, limit, setLimit, page, setPage, totalPages, totalItems, firstItem, lastItem, isLoading } = useHomeCarouselStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, limit, page])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener carrusel",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddCarousel
                    sectionId={id}
                />
            )
        })

    }

    return (
        <Panel
            title
            titleValue="Carrusel"
            onAddElement={handleAdd}
            search
            searchValue={search}
            searchPlaceholder="Buscar Carrusel..."
            onChangeSearch={setSearch}
            limit
            limitValue={limit}
            onChangeLimit={setLimit}
            page
            firstItem={firstItem}
            lastItem={lastItem}
            totalPages={totalPages}
            totalItems={totalItems}
            pageValue={page}
            onChangePage={setPage}
        >
            <Table
                columns={columns}
                data={items}
                isLoading={isLoading}
            />
        </Panel>
    )
}