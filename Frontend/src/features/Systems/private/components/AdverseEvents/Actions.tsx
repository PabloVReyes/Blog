import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"
import type { AdverseEventsData } from "../../types/adverseEvents.types"

export const ActionsAdverseEvents = ({ id, ...props }: AdverseEventsData) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Evento Adverso",
            subtitle: "Editar un evento adverso existente",
            icon: "IconEdit",
            color: "blue",
            content: (
                <Edit
                    id={id}
                    {...props}
                />
            )
        })
    }

    const handleDelete = () => {
        if (!props.fileId) return null;
        openModal({
            title: "Eliminar Evento Adverso",
            subtitle: "Eliminar un evento adverso existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <Delete
                    id={id}
                    {...props}
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