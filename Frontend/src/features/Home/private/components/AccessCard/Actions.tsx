import { useModalStore } from "@/layout"
import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"

export interface Props {
    id: string
    title: string;
    badge: null;
    color: string;
    description: string;
    icon: string;
    url: string;
    type: "page" | "file";
    fileName: null | string;
    storedName: null | string;
    filePath: null | string;
    fileSize: null | number;
    mimeType: null | string;
    orderIndex: number;
    isActive: boolean;
    sectionId: string;
}

export const ActionsAccessCard = ({ id, ...props }: Props) => {
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
        openModal({
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