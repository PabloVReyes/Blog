import { ActionIcon, Group } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { Edit } from "./Edit"
import type { Area } from "@/features/Macroprocess/types/areas.types"

export const ActionsAreas = ({ id, ...props }: Area) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Área",
            subtitle: "Editar un Área existente",
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