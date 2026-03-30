import { Card, Loader, Table as MantineTable, Text, Center } from "@mantine/core"
import styles from "./Table.module.css"
import { type ReactNode } from "react"

export interface ColumnProps<T> {
    key: string;
    label: string;
    align?: "left" | "center" | "right";
    miw?: number | string;
    render?: (row: T) => ReactNode;
}

interface Props<T> {
    columns: ColumnProps<T>[];
    isLoading?: boolean;
    data: T[] | undefined;
}

export const Table = <T extends Record<string, any>>({
    columns,
    isLoading = false,
    data
}: Props<T>) => {

    const renderRows = () => {
        if (isLoading) {
            return (
                <MantineTable.Tr>
                    <MantineTable.Td colSpan={columns.length}>
                        <Center py="xl" className={styles.loaderCell}>
                            <Loader size="sm" />
                        </Center>
                    </MantineTable.Td>
                </MantineTable.Tr>
            )
        }

        // Estado vacío
        if (!data || data.length === 0) {
            return (
                <MantineTable.Tr>
                    <MantineTable.Td colSpan={columns.length} className={styles.empty}>
                        <Text size="sm" c="dimmed" ta="center" py="xl">
                            No se encontraron resultados
                        </Text>
                    </MantineTable.Td>
                </MantineTable.Tr>
            )
        }

        return data.map((row) => (
            <MantineTable.Tr
                key={row.id}
                className={`${styles.row} ${row.id % 2 === 0 ? styles.rowEven : styles.rowOdd}`}
            >
                {columns.map((col) => (
                    <MantineTable.Td
                        key={`${row.id}-${col.key}`}
                        miw={col.miw}
                        className={styles.td}
                        style={{ textAlign: col.align || "left" }}
                    >
                        {col.render
                            ? col.render(row)
                            : String(row[col.key] ?? "")
                        }
                    </MantineTable.Td>
                ))}
            </MantineTable.Tr>
        ))
    }

    return (
        <Card p={0} withBorder className={styles.wrapper} radius="md">
            <MantineTable.ScrollContainer minWidth={800} type="native">
                <MantineTable verticalSpacing="sm" highlightOnHover withColumnBorders={false}>
                    <MantineTable.Thead className={styles.thead}>
                        <MantineTable.Tr>
                            {columns.map((item) => (
                                <MantineTable.Th
                                    key={item.key}
                                    className={styles.th}
                                    style={{ textAlign: item.align || "left" }}
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