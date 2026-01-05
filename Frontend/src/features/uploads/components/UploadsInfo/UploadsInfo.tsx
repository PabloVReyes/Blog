import { formatDate } from "@/shared"
import { Image, Stack, Table } from "@mantine/core"
import type { ItemProps } from "./type"

export const UploadsInfo = ({ filename, mime, size, url, uploadedAt }: ItemProps) => {
    return (
        <Stack gap={5}>
            <Table variant="vertical" layout="fixed" withTableBorder>
                <Table.Tbody>
                    <Table.Tr>
                        <Table.Th w={200}>Nombre</Table.Th>
                        <Table.Td>{filename}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th w={200}>Tipo de archivo</Table.Th>
                        <Table.Td>{mime}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Peso</Table.Th>
                        <Table.Td>{size}</Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Imagen</Table.Th>
                        <Table.Td>
                            <Image
                                src={url}
                            />
                        </Table.Td>
                    </Table.Tr>
                    <Table.Tr>
                        <Table.Th>Fecha de subida</Table.Th>
                        <Table.Td>{formatDate(uploadedAt)}</Table.Td>
                    </Table.Tr>
                </Table.Tbody>
            </Table>
        </Stack>
    )
}