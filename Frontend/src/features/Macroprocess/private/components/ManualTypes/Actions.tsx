import { ActionIcon, Group } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { Edit } from "./Edit"

export const ActionsManualTypes = ({ id, ...props }: any) => {
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
            <ActionIcon className="actionIcon" onClick={handleEdit} >
                <IconEdit size={16} />
            </ActionIcon>
        </Group>
    )
}