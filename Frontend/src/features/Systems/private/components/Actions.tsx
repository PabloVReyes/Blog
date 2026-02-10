import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconInfoCircle, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import type { SystemProps } from "../../types"
import { Information } from "./Information"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"

interface Props extends SystemProps {
    id: string;
}

export const Actions = ({ id, ...props }: Props) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            content: (
                <Edit
                    id={id}
                    {...props}
                />
            )
        })
    }

    const handleInformation = () => {
        openModal({
            content: (
                <Information
                    {...props}
                />
            )
        })
    }

    const handleDelete = () => {
        openModal({
            content: (
                <Delete
                    id={id}
                    name={props.name}
                />
            )
        })
    }

    return (
        <Group gap={5} wrap="nowrap">
            <ActionIcon className="actionIcon" onClick={handleInformation}>
                <IconInfoCircle size={16} />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleEdit}>
                <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleDelete}>
                <IconTrash size={16} color="red" />
            </ActionIcon>
        </Group>
    )
}