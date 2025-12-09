import { Table } from "@mantine/core"
import { CmpHomeSectionTableRow } from "./CmpHomeSectionTableRow"

export const CmpHomeSectionTable = ({ items }: { items: any[] }) => {
    const renderRows = () => {
        return items.map((section, index: number) => (
            <CmpHomeSectionTableRow
                key={index}
                {...section}
            />
        ))
    }

    return (
        <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing={"xs"}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th w={10} style={{ textAlign: "center" }}>Seccion</Table.Th>
                        <Table.Th>Titulo</Table.Th>
                        <Table.Th>Contenido</Table.Th>
                        <Table.Th>Ir a</Table.Th>
                        <Table.Th style={{ textAlign: "center" }}>Acciones</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{renderRows()}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    )
}