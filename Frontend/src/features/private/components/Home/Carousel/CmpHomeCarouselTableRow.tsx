import { ActionIcon, Group, Table, Text } from "@mantine/core"
import type { ItemProps } from "./type"
import { IconEdit, IconEye, IconEyeClosed, IconInfoCircle, IconTrash } from "@tabler/icons-react"
import { useModalStore } from "@/store/modalStore"
import { CmpHomeCarouselInformation } from "./CmpHomeCarouselInformation"
import { CmpHomeCarouselEdit } from "./CmpHomeCarouselEdit"
import { CmpHomeCarouselEliminate } from "./CmpHomeCarouselEliminate"

export const CmpHomeCarouselTableRow = (item: ItemProps) => {
    const { openModal } = useModalStore()

    const handleInformation = () => {
        openModal({
            title: "Informacion",
            content: <CmpHomeCarouselInformation key={item.id} {...item} />
        })
    }

    const handleEdit = () => {
        openModal({
            title: "Editar informacion",
            content: <CmpHomeCarouselEdit key={item.id} {...item}/>
        })
    }

    const handleEliminate = () => {
        openModal({
            title: "Eliminar",
            content: <CmpHomeCarouselEliminate key={item.id} {...item}/>
        })
    }

    return (
        <Table.Tr key={item.id}>
            <Table.Td style={{ textAlign: "center" }}>
                {item.is_visible ?
                    <IconEye stroke={1.5}/> :
                    <IconEyeClosed stroke={1.5}/>
                }
            </Table.Td>
            <Table.Td>{item.title}</Table.Td>
            <Table.Td maw={200}>
                <Text
                    size="sm"
                    truncate="end"
                >
                    {item.description}
                </Text>
            </Table.Td>
            <Table.Td>{item.url}</Table.Td>
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
                    <ActionIcon
                        className="action"
                        onClick={handleEliminate}
                    >
                        <IconTrash size={16} stroke={1.5} color="var(--mantine-color-red-6)" />
                    </ActionIcon>
                </Group>
            </Table.Td>
        </Table.Tr>
    )
}