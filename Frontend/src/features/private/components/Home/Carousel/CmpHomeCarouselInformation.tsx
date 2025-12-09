import { Button, Group, Image, Table } from "@mantine/core"
import type { ItemProps } from "./type"
import { useModalStore } from "@/store/modalStore"
import { formatDate } from "@/utils/formatDate"

export const CmpHomeCarouselInformation = (item: ItemProps) => {
    const { closeModal } = useModalStore()

    return (
        <>
            <Table variant="vertical" layout="fixed" withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th w={200}>Titulo</Table.Th>
                        <Table.Td>{item.title}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Titulo</Table.Th>
                        <Table.Td>{item.description}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Image</Table.Th>
                        <Table.Td>
                            <Image
                                src={item.image}
                            />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>URL</Table.Th>
                        <Table.Td>{item.url}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Fecha de creacion</Table.Th>
                        <Table.Td>{formatDate(item.createdAt)}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
            <Group justify="flex-end">
                <Button onClick={closeModal} variant="outline">
                    Cerrar
                </Button>
            </Group>
        </>
    )
}