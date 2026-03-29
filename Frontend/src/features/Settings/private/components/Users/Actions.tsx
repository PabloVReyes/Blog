import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconKey, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"
import { ResetPassword } from "./ResetPassword"

export const ActionsUsers = ({ id, ...props }: any) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Usuario",
            subtitle: "Editar usuario registrado en el sistema",
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
        openModal({
            title: "Eliminar Usuario",
            subtitle: "Eliminar usuario registrado en el sistema",
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

    const handleResetPassword = () => {
        openModal({
            title: "Restablecer Contraseña",
            subtitle: "Restablecer contraseña de usuario registrado en el sistema",
            icon: "IconTrash",
            color: "purple",
            content: (
                <ResetPassword
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
            <ActionIcon className="actionIcon" onClick={handleResetPassword}>
                <IconKey size={16} color="var(--mantine-primary-color-filled)" />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleDelete}>
                <IconTrash size={16} color="red" />
            </ActionIcon>
        </Group>
    )
}