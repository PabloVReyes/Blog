import { Table, Text } from "@mantine/core"
import { CmpHomeCarouselTableRow } from "./CmpHomeCarouselTableRow"
import type { ItemProps } from "./type"

export const CmpHomeCarouselTable = ({ items }: { items: ItemProps[] }) => {
    const renderRows = () => {
        if (items.length < 1) {
            return (
                <Table.Td colSpan={5}>
                    <Text
                        mt={20}
                        size="sm"
                        truncate="end"
                        c="dimmed"
                        style={{ textAlign: "center" }}
                    >
                        Sin elementos
                    </Text>
                </Table.Td>
            )
        }

        return items.map((item: ItemProps, index: number) => (
            <CmpHomeCarouselTableRow
                {...item}
                key={index}
            />
        ))
    }

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="xs">
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th
                            style={{ textAlign: "center" }}
                        >
                            Vista
                        </Table.Th>
                        <Table.Th>Titulo</Table.Th>
                        <Table.Th>Descripcion</Table.Th>
                        <Table.Th>Ir a</Table.Th>
                        <Table.Th
                            style={{ textAlign: "center" }}
                        >
                            Acciones
                        </Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{renderRows()}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}