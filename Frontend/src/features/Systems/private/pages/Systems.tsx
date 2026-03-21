import { Container, Panel, Table } from "@/components"
import { Text, ThemeIcon } from "@mantine/core"
import { useEffect } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { ActionsSystems, AddSystem } from "../components"
import { useDebouncedValue } from "@mantine/hooks"
import { useSystemsStore } from "@/stores"
import type { Column } from "@/types"
import { getTablerIcon } from "@/helpers"
import type { SystemData } from "../../types/systems.types"

const columns: Column<SystemData>[] = [
    {
        key: 'icon',
        label: 'Icono',
        align: 'center',
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
        key: 'acronym',
        label: 'Nombre corto',
        align: 'left',
        render: (row) => {
            if (!row.acronym) {
                return <Text size="xs" c="dimmed">------</Text>
            }

            return <Text size="sm">{row.acronym}</Text>
        }
    },
    {
        key: 'name',
        label: 'Nombre',
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
        key: 'actions',
        label: 'Acciones',
        align: 'left',
        render: (row) => {
            return <ActionsSystems {...row} />
        }
    },
]

export const Systems = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSystemsStore()
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
                title: "Error al obtener sistemas",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: <AddSystem />
        })
    }

    return (
        <Container
            title="Sistemas de consultas"
            description="Accede a los diferentes sistemas de información institucionales"
        >
            <Panel
                title
                titleValue="Lista de sistemas"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar Sistema..."
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                onChangePage={setPage}
                firstItem={firstItem}
                lastItem={lastItem}
                totalItems={totalItems}
                totalPages={totalPages}
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