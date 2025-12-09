import { useModalStore } from "@/store/modalStore"
import { Button, Group, Image, Table } from "@mantine/core"

export const CmpHomeSectionInformation = (item: any) => {
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
                        <Table.Th>Contenido</Table.Th>
                        <Table.Td>{item.content ? item.content : "Sin contenido"}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Image</Table.Th>
                        <Table.Td>
                            {item.image ?
                                <Image
                                    src={item.image}
                                /> :
                                "Sin imagen"
                            }
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>URL</Table.Th>
                        <Table.Td>{item.url ? item.url : "Sin url"}</Table.Td>
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