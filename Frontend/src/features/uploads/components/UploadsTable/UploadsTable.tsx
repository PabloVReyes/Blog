import { SimpleGrid } from "@mantine/core"
import { UploadsTableItem } from "../UploadsTableItem"

export const UploadsTable = ({ items }: { items: any[] }) => {
    return (
        <SimpleGrid
            cols={{ base: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
            spacing="sm"
        >
            {items.map((item: any, index: number) => (
                <UploadsTableItem
                    key={index}
                    {...item}
                />
            ))}
        </SimpleGrid>
    )
}