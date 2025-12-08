import type { ItemProps } from "@/store/files/type"
import { useModalStore } from "@/store/modalStore"
import { formatDate } from "@/utils/formatDate";
import { Button, Group, Image, Table } from "@mantine/core"

export const CmpFileInformation = (item: ItemProps) => {
    const { closeModal } = useModalStore();

    return (
        <>
            <Table variant="vertical" layout="fixed" withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th w={200}>Nombre</Table.Th>
                        <Table.Td>{item.filename}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th w={200}>Tipo de archivo</Table.Th>
                        <Table.Td>{item.mime}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Peso</Table.Th>
                        <Table.Td>{item.size}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Imagen</Table.Th>
                        <Table.Td>
                            <Image
                                src={item.url}
                            />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Fecha de subida</Table.Th>
                        <Table.Td>{formatDate(item.uploadedAt)}</Table.Td>
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