import { Panel, Table, ThemeIcon } from "@/components"
import { Text } from "@mantine/core"
import { useEffect } from "react"
import { useModalStore } from "@/layout"
import { ActionsAccessCard, AddAccessCard } from "../components"
import { Notify } from "@/ui"
import * as TableIcons from "@tabler/icons-react"
import { useDebouncedValue } from "@mantine/hooks"
import { useHomeAccessCardStore } from "@/stores"
import type { Column } from "@/types"
import { getTablerIcon } from "@/helpers"
import type { AccessCardData } from "../../types/accessCard.types"

const columns: Column<AccessCardData>[] = [
    {
        key: "icon",
        label: "Icono",
        align: "center",
        render: (row) => {
            const Icon = getTablerIcon(row.icon)

            return (
                <ThemeIcon
                    color={row.color}
                >
                    <Icon />
                </ThemeIcon>
            )
        }
    },
    {
        key: 'title',
        label: 'Título',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripción',
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
            if (!row.file) {
                return <Text size="xs" c="dimmed">Sin archivo</Text>
            }

            return <Text
                style={{
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                }}
                size="sm"
            >
                {row.file.name}
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
            title: "Agregar Acceso Rápido",
            subtitle: "Agregar un nuevo acceso rápido en el inicio",
            icon: "IconPlus",
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