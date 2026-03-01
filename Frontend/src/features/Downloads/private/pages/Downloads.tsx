import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { useDownloadsStore } from "../store"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { ActionsDownloads, AddDownloads } from "../components"

export interface Datum {
    id: number;
    name: string;
    description: null | string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    type: "DOCUMENT" | "IMAGE";
    isNew: boolean;
    isActive: boolean;
    order: null;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    order: null;
    isActive: boolean;
    sectionId?: number;
    createdAt: Date;
    updatedAt: Date;
    section?: Category;
    areaId?: number;
    area?: Area;
}

export interface Area {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

const columns = [
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripción',
        align: 'left',
        render: (row: any) => {
            if (!row.description) {
                return <Text size="xs" c="dimmed">------</Text>
            }

            return <Text size="sm">{row.description}</Text>
        }
    },
    {
        key: 'area',
        label: 'Área',
        align: 'center',
        render: (row: Datum) => {
            return (
                <Text size="sm" >{row.category.section?.area?.name}</Text>
            )
        }
    },
    {
        key: 'section',
        label: 'Sección',
        align: 'center',
        render: (row: Datum) => {
            return (
                <Text size="sm">{row.category.section?.name}</Text>
            )
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row: Datum) => {
            return (
                <Text size="sm">{row.category?.name}</ Text>
            )
        }
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'center',
        render: (row: Datum) => {
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
        align: 'left',
        render: (row: any) => {
            return <ActionsDownloads {...row} />
        }
    },
]

export const Downloads = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useDownloadsStore()
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
                title: "Error al obtener areas",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddDownloads />
            )
        })
    }

    return (
        <Container
            title="Descargar Información"
            description="Descarga de información de diferentes áreas"
        >
            <Panel
                title
                titleValue="Lista de descargas"
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
                searchPlaceholder="Buscar descarga..."
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