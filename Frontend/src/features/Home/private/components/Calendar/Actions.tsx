import { useModalStore } from "@/layout"
import { ActionIcon, Group } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { Edit } from "./Edit"

export interface Props {
    id: string
    year: string;
    title: string;
    icon: string;
    color: string;
    description: string;
    sectionId: string;
    fileName?: null | string;
    storedName?: null | string;
    filePath?: null | string;
    fileSize?: null | number;
    mimeType?: null | string;
    createdAt: Date;
    updatedAt: Date;
}

export const ActionsCalendar = ({ id, ...props }: Props) => {
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


    return (
        <Group gap={5} wrap="nowrap" justify="center">
            <ActionIcon className="actionIcon" onClick={handleEdit}>
                <IconEdit size={16} />
            </ActionIcon>
        </Group>
    )
}