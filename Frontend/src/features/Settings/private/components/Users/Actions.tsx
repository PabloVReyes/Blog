import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconKey, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import { ResetPassword } from "./ResetPassword"
import type { UsersData } from "../../types/users.types"
import { CrudDeleteEntity } from "@/components"
import { useSettingsUsersStore } from "@/stores"
import { UserPreview } from "./UserPreview"

export const ActionsUsers = ({ id, ...props }: UsersData) => {
    const { openModal } = useModalStore()
    const remove = useSettingsUsersStore(s => s.remove)

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
                <CrudDeleteEntity
                    id={id}
                    entityName="Usuario"
                    confirmValue={props.email}
                    onDelete={remove}
                    label="Para confirmar escribe el email del usuario:"
                    warnings={[
                        "Se eliminara permanentemente el usuario",
                        "No podra volver acceder al sistema"
                    ]}
                >
                    <UserPreview
                        id={id}
                        {...props}
                    />
                </CrudDeleteEntity>
            )
        })
    }

    const handleResetPassword = () => {
        openModal({
            title: "Restablecer Contraseña",
            subtitle: "Restablecer contraseña de usuario registrado en el sistema",
            icon: "IconKey",
            color: "violet",
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