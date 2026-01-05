import { ActionIcon, Group, Table, Text } from "@mantine/core"
import { IconEdit, IconInfoCircle } from "@tabler/icons-react"
import { CmpHomeSectionEdit } from "./CmpHomeSectionEdit"
import { CmpHomeSectionInformation } from "./CmpHomeSectionInformation"
import { useModalStore } from "@/shared"

export const CmpHomeSectionTableRow = (item: any) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar seccion",
            content: <CmpHomeSectionEdit key={item.id} {...item} />
        })
    }

    const handleInformation = () => {
        openModal({
            title: "Informacion de seccion",
            content: <CmpHomeSectionInformation key={item.id} {...item} />
        })
    }

    return (
        <Table.Tr key={item.id}>
            <Table.Td style={{ textAlign: "center" }}>{item.id}</Table.Td>
            <Table.Td>{item.title}</Table.Td>
            <Table.Td maw={200}>
                <Text size="sm" truncate>
                    {item.content ? item.content : "Sin contendio"}
                </Text>
            </Table.Td>
            <Table.Td>{item.url ? item.url : "Sin direccion URL"}</Table.Td>
            <Table.Td style={{ textAlign: "center" }}>
                <Group justify="center" gap={5}>
                    <ActionIcon
                        className="action"
                        onClick={handleInformation}
                    >
                        <IconInfoCircle size={16} stroke={1.5} />
                    </ActionIcon>
                    <ActionIcon
                        className="action"
                        onClick={handleEdit}
                    >
                        <IconEdit size={16} stroke={1.5} />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    )
}