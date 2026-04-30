import { useModalStore } from "@/layout"
import { ActionIcon, Group } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { Edit } from "./Edit"
import type { AlertData } from "@/features/Home/public/pages/Home"

export const ActionsAlert = ({ id, ...props }: AlertData) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Alerta",
            icon: "IconEdit",
            subtitle: "Editar la alerta que se muestra en el inicio",
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
            <ActionIcon className="actionIcon" onClick={handleEdit}>
                <IconEdit size={16} />
            </ActionIcon>
        </Group>
    )
}