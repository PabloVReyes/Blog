import { Loader, Table as MantineTable, Text } from "@mantine/core"

interface Props {
    columns: any[],
    isLoading?: boolean
    data: any[]
}

export const Table = ({ columns, isLoading = false, data }: Props) => {
    const renderRows = () => {
        if (isLoading) {
            return (
                <MantineTable.Tr>
                    <MantineTable.Td colSpan={columns.length} style={{ textAlign: "center" }}>
                        <Loader
                            mt={20}
                            style={{ textAlign: "center" }}
                        />
                    </MantineTable.Td>
                </MantineTable.Tr>
            )
        }

        if (!data || data.length === 0) {
            return (
                <MantineTable.Tr>
                    <MantineTable.Td colSpan={columns.length}>
                        <Text
                            mt={20}
                            size="sm"
                            truncate="end"
                            c="dimmed"
                            style={{ textAlign: "center" }}
                        >
                            No se encontraron resultados
                        </Text>
                    </MantineTable.Td>
                </MantineTable.Tr>
            )
        }

        return data.map((row, rowIndex: number) => (
            <MantineTable.Tr key={rowIndex}>
                {columns.map((col, colIndex: number) => (
                    <MantineTable.Td
                        key={colIndex}
                        style={{ textAlign: col.align }}
                    >
                        {col.render
                            ? col.render(row)
                            : String(row[col.key as typeof row] ?? "")
                        }
                    </MantineTable.Td>
                ))}
            </MantineTable.Tr>
        ))
    }

    return (
        <MantineTable.ScrollContainer minWidth={800}>
            <MantineTable verticalSpacing={"xs"}>
                <MantineTable.Thead>
                    <MantineTable.Tr>
                        {columns.map((item, index: number) => (
                            <MantineTable.Th key={index} style={{ textAlign: item.align }}>{item.label}</MantineTable.Th>
                        ))}
                    </MantineTable.Tr>
                </MantineTable.Thead>
                <MantineTable.Tbody>
                    {renderRows()}
                </MantineTable.Tbody>
            </MantineTable>
        </MantineTable.ScrollContainer>
    )
}