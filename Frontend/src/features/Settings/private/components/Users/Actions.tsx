import { ActionIcon, Group, useMantineTheme } from "@mantine/core"
import { IconEdit, IconKey, IconLock, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"
import { ResetPassword } from "./ResetPassword"

export const ActionsUsers = ({ id, ...props }: any) => {
    const { openModal } = useModalStore()
    const theme = useMantineTheme()

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
                    name={props.name}
                />
            )
        })
    }

    const handleResetPassword = () => {
        openModal({
            content: (
                <ResetPassword
                    id={id}
                    name={props.name}
                    email={props.email}
                />
            )
        })
    }

    return (
        <Group gap={5} wrap="nowrap" justify="center">
            <ActionIcon className="actionIcon" onClick={handleEdit}>
                <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleResetPassword}>
                <IconKey size={16} color="var(--mantine-primary-color-filled)" />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleDelete}>
                <IconTrash size={16} color="red" />
            </ActionIcon>
        </Group>
    )
}