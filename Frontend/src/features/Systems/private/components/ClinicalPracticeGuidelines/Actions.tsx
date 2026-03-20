import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"

export interface Props {
    id: string;
    code: string;
    title: string;
    fileNameER: string;
    filePathER: string;
    fileSizeER: number;
    mimeTypeER: string;
    fileNameRR: string;
    filePathRR: string;
    fileSizeRR: number;
    mimeTypeRR: string;
    categoryId: string;
    category: Category;
}

export interface Category {
    id: string;
    name: string;
}

export const ActionsClinicalPracticeGuidelines = ({ id, ...props }: Props) => {
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
                    name={props.title}
                    code={props.code}
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