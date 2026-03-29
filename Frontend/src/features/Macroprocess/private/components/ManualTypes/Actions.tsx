import { ActionIcon, Group } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { Edit } from "./Edit"

export interface Props {
    id: string
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export const ActionsManualTypes = ({ id, ...props }: Props) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Tipo de Manual",
            subtitle: "Editar un Tipo de Manual existente",
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

    return (
        <Group gap={5} wrap="nowrap" justify="center">
            <ActionIcon className="actionIcon" onClick={handleEdit} >
                <IconEdit size={16} />
            </ActionIcon>
        </Group>
    )
}