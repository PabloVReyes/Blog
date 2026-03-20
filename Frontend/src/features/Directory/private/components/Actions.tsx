import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"

interface Props {
    id: string;
    phone: string;
    boss: string | null;
    email: string | null;
    name: string;
    secretary: null | null;
    levelId: string;
    level: Level;
}

export interface Level {
    id: string;
    name: string;
}


export const Actions = (data: Props) => {
    const { id, phone, boss, email, name, secretary, levelId } = data
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            content: (
                <Edit
                    id={id}
                    phone={phone}
                    boss={boss}
                    email={email}
                    name={name}
                    secretary={secretary}
                    levelId={levelId}
                />
            )
        })
    }

    const handleDelete = () => {
        openModal({
            content: (
                <Delete
                    id={id}
                    phone={phone}
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