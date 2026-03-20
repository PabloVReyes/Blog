import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"

interface Props {
    name: string;
    type: string;
    zoneId: number;
    groupId: number;
    zone: Group;
    group: Group;
    dependents?: Props[];
    holders?: Props[];
    id: number;
}

interface Group {
    id: number;
    name: string;
}

export const ActionsAgreementPerson = ({id, name, zone, groupId, group, zoneId, type }: Props) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            content: (
                <Edit
                    id={id}
                    name={name}
                    groupId={groupId}
                    group={group}
                    zone={zone}
                    zoneId={zoneId}
                    type={type}
                />
            )
        })
    }

    const handleDelete = () => {
        openModal({
            content: (
                <Delete
                    id={id}
                    name={name}
                />
            )
        })
    }

    return (
        <Group gap={5} wrap="nowrap" justify="center">
            <ActionIcon className="actionIcon" onClick={handleEdit}>
                <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleDelete}>
                <IconTrash size={16} color="red" />
            </ActionIcon>
        </Group>
    )
}