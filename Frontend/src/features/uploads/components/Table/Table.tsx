import { SimpleGrid } from "@mantine/core"
import { Item } from "./components"

export const Table = ({ items }: { items: any[] }) => {
    return (
        <SimpleGrid
            cols={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="sm"
        >
            {items.map((item: any, index: number) => (
                <Item
                    key={index}
                    {...item}
                />
            ))}
        </SimpleGrid>
    )
}