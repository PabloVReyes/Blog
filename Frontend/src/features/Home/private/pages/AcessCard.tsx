import { Panel, Table } from "@/components"
import { Text, ThemeIcon } from "@mantine/core"
import { useEffect } from "react"
import { useModalStore } from "@/layout"
import { ActionsAccessCard, AddAccessCard } from "../components"
import { Notify } from "@/ui"
import * as TableIcons from "@tabler/icons-react"
import { useDebouncedValue } from "@mantine/hooks"
import { useHomeAccessCardStore } from "@/stores"
import type { Column } from "@/types"
import { getTablerIcon } from "@/helpers"

export interface Row {
    id: string;
    title: string;
    badge: null;
    color: string;
    description: string;
    icon: string;
    url: string;
    type: string;
    fileName: null;
    storedName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    orderIndex: number;
    isActive: boolean;
    sectionId: string;
}


const columns: Column<Row>[] = [
    {
        key: "icon",
        label: "Icono",
        align: "center",
        render: (row) => {
            const Icon = getTablerIcon(row.icon)

            return (
                <ThemeIcon
                    size={50}
                    color={row.color}
                    variant="light"
                    style={{
                        '--icon-rgb': row.color || "#40c057" // fallback green
                    } as React.CSSProperties}
                    className="themeIcon"
                >
                    <Icon />
                </ThemeIcon>
            )
        }
    },
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
        render: (row) => {
            if (!row.url) {
                return <Text size="xs" c="dimmed">Sin enlace</Text>
            }

            return <Text size="sm">{row.url}</Text>
        }
    },
    {
        key: "file",
        label: "Archivo",
        align: "left",
        render: (row) => {
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
        render: (row) => {
            if (row.isActive) {
                return <TableIcons.IconEye />
            } else {
                return <TableIcons.IconEyeOff />
            }
        }
    },
    {
        key: 'actions',
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <ActionsAccessCard {...row} />
        }
    }
]

interface Props {
    id: string
}

export const AccessCard = ({ id }: Props) => {
    const { openModal } = useModalStore()
    const { fetch, items, search, setSearch, page, limit, setLimit, totalPages, totalItems, firstItem, lastItem, setPage, isLoading } = useHomeAccessCardStore()
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
                title: "Error al obtener Accesos Rápidos",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddAccessCard
                    sectionId={id}
                />
            )
        })
    }

    return (
        <Panel
            title
            titleValue="Accesos Rápidos"
            onAddElement={handleAdd}
            search
            searchValue={search}
            searchPlaceholder="Buscar Acceso Rápido...."
            onChangeSearch={setSearch}
            limit
            limitValue={limit}
            onChangeLimit={setLimit}
            page
            pageValue={page}
            onChangePage={setPage}
            totalItems={totalItems}
            totalPages={totalPages}
            firstItem={firstItem}
            lastItem={lastItem}
        >
            <Table
                columns={columns}
                data={items}
                isLoading={isLoading}
            />
        </Panel>
    )
}