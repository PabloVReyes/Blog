import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { SystemData } from "@/features/Systems/types/systems.types"
import { CrudDeleteEntity } from "@/components"
import { useSystemsStore } from "@/stores"

export const ActionsSystems = ({ id, ...props }: SystemData) => {
    const { openModal } = useModalStore()
    const remove = useSystemsStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Sistema",
            subtitle: "Editar un sistema existente",
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
            title: "Eliminar Sistema",
            subtitle: "Eliminar un sistema existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Sistema"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del sistema:"
                    warnings={[
                        "Se eliminara permanentemente el sistema",
                        props.type === "file" && "El archivo cargado será eliminado permanentemente"
                    ].filter(Boolean) as string[]}
                >

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