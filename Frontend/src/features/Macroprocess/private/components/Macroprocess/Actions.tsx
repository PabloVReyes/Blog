import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { Edit } from "./Edit"
import { Delete } from "./Delete"

export const ActionsMacroprocess = ({ id, ...props }: any) => {
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

    const handleDelete = () => {
        if (!props.storedName) {
            return null
        }

        openModal({
            content: (
                <Delete
                    id={id}
                    fileName={props.fileName}
                />
            )
        })
    }

    return (
        <Group gap={5} wrap="nowrap" justify="center">
            <ActionIcon className="actionIcon" onClick={handleEdit} >
                <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleDelete}>
                <IconTrash size={16} color="red" />
            </ActionIcon>
        </Group>
    )
}