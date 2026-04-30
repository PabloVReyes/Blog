import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { PermissionData } from "../../types/permissions.types"
import { CrudDeleteEntity } from "@/components"
import { useSettingsPermissionsStore } from "@/stores"
import { PermissionPreview } from "./PermissionPreview"

export const ActionsPermissions = ({ id, ...props }: PermissionData) => {
    const { openModal } = useModalStore()
    const remove = useSettingsPermissionsStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Permiso",
            subtitle: "Editar un permiso existente en el sistema",
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
            title: "Eliminar Permiso",
            subtitle: "Eliminar un permiso existente en el sistema",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Permiso"
                    confirmValue={props.permissionKey}
                    onDelete={remove}
                    label="Para confirmar escribe el código del permiso:"
                    warnings={[
                        "Se eliminara permanentemente el permiso"
                    ]}
                >
                    <PermissionPreview
                        id={id}
                        {...props}
                    />
                </CrudDeleteEntity>
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