import { Container, Panel, Table, ThemeIcon } from "@/components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Actions, Add } from "../components"
import { useModalStore } from "@/layout"
import { Badge, Text } from "@mantine/core"
import { useDirectoryStore } from "@/stores"
import type { Column } from "@/types"
import type { DirectoryData } from "../types/directory.types"

const columns: Column<DirectoryData>[] = [
    {
        key: "phone",
        label: "Extención",
        align: 'center',
        render: (row) => {
            return (
                <ThemeIcon
                    variant="filled"
                >
                    <Text fw={900}>{row.phone}</Text>
                </ThemeIcon>
            )
        }
    },
    {
        key: "name",
        label: "Nombre",
        align: 'left',
    },
    {
        key: "level",
        label: "Nivel",
        align: 'left',
        miw: 200,
        render: (row) => {
            return <Badge size="sm">{row.level.name}</Badge>
        }
    },
    {
        key: "boss",
        label: "Jefe(a)",
        align: 'left',
        miw: 150,
        render: (row) => {
            if (!row.boss) {
                return <Text size="xs" c="dimmed">Sin Jefe(a)</Text>
            }

            return <Text size="sm">{row.boss}</Text>
        }
    },
    {
        key: "secretary",
        label: "Secretario(a)",
        align: 'left',
        render: (row) => {
            if (!row.secretary) {
                return <Text size="xs" c="dimmed">Sin Secretario(a)</Text>
            }

            return <Text size="sm">{row.secretary}</Text>
        }
    },
    {
        key: "email",
        label: "Correo Electrónico",
        align: 'left',
        render: (row) => {
            if (!row.email) {
                return <Text size="xs" c="dimmed">Sin Correo Electrónico</Text>
            }

            return <Text size="sm">{row.email}</Text>
        }
    },
    {
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <Actions {...row} />
        }
    }
]

export const Directory = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useDirectoryStore()
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
                title: "Error al obtener Directorio",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            title: "Agregar Extensión Telefónica",
            subtitle: "Agregar una nueva Extensión Telefónica",
            icon: "IconPlus",
            content: <Add />
        })
    }

    return (
        <Container
            title="Directorio Telefónico"
        >
            <Panel
                title
                titleValue="Lista de Extensiones"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar extensión telefónica..."
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