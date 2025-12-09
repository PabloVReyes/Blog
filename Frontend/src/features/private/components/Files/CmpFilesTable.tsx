import type { ItemProps } from "@/store/files/type"
import { CmpFileTableItem } from "./CmpFileTableItem"
import { Card, SimpleGrid, Text } from "@mantine/core"


export const CmpFilesTable = ({ items }: { items: ItemProps[] }) => {
    if (items.length < 1) {
        return (
            <Card
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: 100,
                }}
            >
                <Text size="sm" c="dimmed">
                    Sin archivos
                </Text>
            </Card>
        )
    }
    return (
        <SimpleGrid
            cols={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="sm"
        >
            {items.map((item: ItemProps, index: number) => (
                <CmpFileTableItem
                    key={index}
                    {...item}
                />
            ))}
        </SimpleGrid>
    )
}