import { Panel, Table } from "@/components"
import { Text, ThemeIcon } from "@mantine/core"
import { useEffect } from "react"
import { useAccessCardStore } from "../store"
import { useModalStore } from "@/layout"
import { ActionsAccessCard, AddAccessCard } from "../components"
import { Notify } from "@/ui"
import * as TableIcons from "@tabler/icons-react"

const columns = [
    {
        key: "icon",
        label: "Icono",
        align: "center",
        render: (row: any) => {
            const Icon =
                row.icon &&
                (TableIcons as any)[row.icon];
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
        render: (row: any) => {
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
        render: (row: any) => {
            return <ActionsAccessCard {...row} />
        }
    }
]

export const AccessCard = ({ id }: any) => {
    const { openModal } = useModalStore()
    const { fetch, items, search, setSearch, page, limit, setLimit, totalPages, totalItems, firstItem, lastItem, setPage, isLoading } = useAccessCardStore()

    useEffect(() => {
        handleFetch()
    }, [search, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener sistemas",
                message: error.message
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