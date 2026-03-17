import { Container, Panel, Table } from "@/components"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Notify } from "@/ui"
import { Text, Table as TableMantine, Badge } from "@mantine/core"
import { ActionsAgreementPerson, AddAgreementPerson } from "../components"
import { useModalStore } from "@/layout"
import { useSystemsAgreementPersonStore } from "@/stores"

const columns = [
    {
        key: 'id',
        label: 'No. Convenio',
        align: 'center',
    },
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
    {
        key: 'zone',
        label: 'Zona',
        align: 'left',
        render: (row: any) => {
            return <Text size="sm">{row.zone.name}</Text>
        }
    },
    {
        key: 'group',
        label: 'Grupo',
        align: 'left',
        render: (row: any) => {
            return <Text size="sm">{row.group.name}</Text>
        }
    },
    {
        key: 'type',
        label: 'Tipo',
        align: 'left',
        miw: "150px",
        render: (row: any) => {
            const isTitular = row.type === "HOLDER";

            return (
                <Badge
                    size="sm"
                    variant="filled"
                    color={isTitular ? "" : "grape"}
                >
                    {isTitular ? "Titular" : "Dependiente"}
                </Badge>
            );
        }
    },
    {
        key: 'children',
        label: 'Titular/Dependiente',
        align: 'left',
        render: (row: any) => {
            const isTitular = row.type === "HOLDER";

            const relatives = isTitular ? row.dependents : row.holders;

            const relativeRows = relatives?.map((person: any, index: number) => (
                <TableMantine.Tr key={`${person.id}-${index}`}>
                    <TableMantine.Th
                        style={{
                            backgroundColor: "light-dark(oklch(98% 0.002 264.531), oklch(32% 0.02 259.733))"
                        }}
                    >
                        <Text size="sm" fw={700}>
                            {isTitular ? "Dependiente" : "Titular"}
                        </Text>
                    </TableMantine.Th>
                    <TableMantine.Td>{person.id}</TableMantine.Td>
                    <TableMantine.Td>{person.name}</TableMantine.Td>
                </TableMantine.Tr>
            ));

            return (
                <TableMantine variant="vertical">
                    <TableMantine.Tbody>
                        {/* Filas de parientes vinculados */}
                        {relativeRows}

                        {/* Mensaje si no hay vínculos */}
                        {(!relatives || relatives.length === 0) && (
                            <TableMantine.Tr>
                                <TableMantine.Td colSpan={3}>
                                    <Text size="xs" c="dimmed" ta="center" py="xs">
                                        {isTitular
                                            ? "Este titular no tiene dependientes registrados"
                                            : "Este dependiente no tiene un titular vinculado"}
                                    </Text>
                                </TableMantine.Td>
                            </TableMantine.Tr>
                        )}
                    </TableMantine.Tbody>
                </TableMantine>
            );
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'center',
        render: (row: any) => {
            return <ActionsAgreementPerson {...row} />
        }
    },
]


export const AgreementPerson = () => {
    const { openModal } = useModalStore()
    const {
        fetch,
        search,
        page,
        limit,
        items,
        isLoading,
        setSearch,
        setLimit,
        totalItems,
        totalPages,
        firstItem,
        lastItem,
        setPage
    } = useSystemsAgreementPersonStore()
    const [debounced] = useDebouncedValue(search, 500)


    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener pacientes de convenio",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: (
                <AddAgreementPerson />
            )
        })
    }

    return (
        <Container
            title="Pacientes de Convenio"
            description="Lista de pacientes de convenio titulares y dependientes"
        >
            <Panel
                title
                titleValue="Lista de Pacientes"
                search
                onAddElement={handleAdd}
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar por número de titular, nombre, grupo o zona..."
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                lastItem={lastItem}
                firstItem={firstItem}
                totalItems={totalItems}
                totalPages={totalPages}
                onChangePage={setPage}
            >
                <Table
                    data={items}
                    columns={columns}
                    isLoading={isLoading}
                />
            </Panel>
        </Container >
    )
}