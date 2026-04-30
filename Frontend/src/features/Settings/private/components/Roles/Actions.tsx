import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { RolData } from "../../types/roles.types"
import { CrudDeleteEntity } from "@/components"
import { useSettingsRolesStore } from "@/stores"
import { RolPreview } from "./RolPreview"

export const ActionsRoles = ({ id, ...props }: RolData) => {
    const { openModal } = useModalStore()
    const remove = useSettingsRolesStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Rol",
            subtitle: "Editar un rol existente del sistema",
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
            title: "Eliminar Rol",
            subtitle: "Eliminar un rol existente del sistema",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Rol"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del rol:"
                    warnings={[
                        "Se eliminara permanentemente el rol",
                        "Todos los usuario que tienen este rol no podran acceder a algunos apartados del sistema"
                    ]}
                >
                    <RolPreview
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