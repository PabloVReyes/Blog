import { Container, Panel, Table } from "@/components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Actions, Add } from "../components"
import { useModalStore } from "@/layout"
import { Badge, Text, ThemeIcon, useMantineTheme } from "@mantine/core"
import { colorMap } from "@/utils"
import { useDirectoryStore } from "@/stores"

export interface Row {
    id: string;
    phone: string;
    boss: null;
    email: null;
    name: string;
    secretary: null;
    levelId: string;
    level: Level;
}

export interface Level {
    id: string;
    name: string;
}

const columns = (primaryColor: string) => [
    {
        key: "phone",
        label: "Extención",
        align: 'center',
        render: (row: Row) => {
            return (
                <ThemeIcon
                    size={50}
                    variant="light"
                    style={{
                        '--icon-rgb': colorMap[primaryColor] || "#40c057" // fallback green
                    } as React.CSSProperties}
                    className="themeIcon"
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
        miw: "200px",
        render: (row: Row) => {
            return <Badge size="sm">{row.level.name}</Badge>
        }
    },
    {
        key: "boss",
        label: "Jefe(a)",
        align: 'left',
        miw: "150px",
        render: (row: Row) => {
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
        render: (row: Row) => {
            if (!row.secretary) {
                return <Text size="xs" c="dimmed">Sin Secretario(a)</Text>
            }

            return <Text size="sm">{row.secretary}</Text>
        }
    },
    {
        key: "email",
        label: "Correo Electronico",
        align: 'left',
        render: (row: Row) => {
            if (!row.email) {
                return <Text size="xs" c="dimmed">Sin Correo Electronico</Text>
            }

            return <Text size="sm">{row.email}</Text>
        }
    },
    {
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row: Row) => {
            return <Actions {...row} />
        }
    }
]

export const Directory = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useDirectoryStore()
    const [debounced] = useDebouncedValue(search, 500)
    const { primaryColor } = useMantineTheme()

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
            content: <Add />
        })
    }

    return (
        <Container
            title="Directorio Telefonico"
        >
            <Panel
                title
                titleValue="Lista de Algoritmos"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar Informe..."
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
                    columns={columns(primaryColor)}
                />
            </Panel>
        </Container>
    )
}   