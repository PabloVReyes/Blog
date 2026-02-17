import { Card, Loader, Table as MantineTable, Text } from "@mantine/core"
import styles from "./Table.module.css"

interface Props {
    columns: any[]
    isLoading?: boolean
    data: any[]
}

export const Table = ({ columns, isLoading = false, data }: Props) => {

    const renderRows = () => {
        if (isLoading) {
            return (
                <MantineTable.Tr>
                    <MantineTable.Td
                        colSpan={columns.length}
                        className={styles.loaderCell}
                    >
                        <Loader />
                    </MantineTable.Td>
                </MantineTable.Tr>
            )
        }

        if (!data || data.length === 0) {
            return (
                <MantineTable.Tr>
                    <MantineTable.Td
                        colSpan={columns.length}
                        className={styles.empty}
                    >
                        <Text size="sm" c="dimmed">
                            No se encontraron resultados
                        </Text>
                    </MantineTable.Td>
                </MantineTable.Tr>
            )
        }

        return data.map((row, rowIndex: number) => (
            <MantineTable.Tr
                key={rowIndex}
                className={`${styles.row} ${rowIndex % 2 === 0 ? styles.rowEven : styles.rowOdd
                    }`}
            >
                {columns.map((col, colIndex: number) => (
                    <MantineTable.Td
                        key={colIndex}
                        miw={col.miw}
                        className={styles.td}
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
        <Card p={0} withBorder className={styles.wrapper}>
            <MantineTable.ScrollContainer minWidth={800} type="native">
                <MantineTable verticalSpacing={0} highlightOnHover>
                    <MantineTable.Thead className={styles.thead}>
                        <MantineTable.Tr>
                            {columns.map((item, index: number) => (
                                <MantineTable.Th
                                    key={index}
                                    className={styles.th}
                                    style={{ textAlign: item.align }}
                                >
                                    {item.label}
                                </MantineTable.Th>
                            ))}
                        </MantineTable.Tr>
                    </MantineTable.Thead>

                    <MantineTable.Tbody>
                        {renderRows()}
                    </MantineTable.Tbody>
                </MantineTable>
            </MantineTable.ScrollContainer>
        </Card>
    )
}
