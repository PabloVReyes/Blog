import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { GPCData } from "@/features/Systems/types/gpc.types"
import { CrudDeleteEntity } from "@/components"
import { useSystemsGPCStore } from "@/stores"

export const ActionsGCP = ({ id, ...props }: GPCData) => {
    const { openModal } = useModalStore()
    const remove = useSystemsGPCStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Algoritmo GPC",
            subtitle: "Editar un Algoritmo GPC existente",
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
            title: "Eliminar Algoritmo GPC",
            subtitle: "Eliminar un Algoritmo GPC existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Algoritmo GPC"
                    confirmValue={props.title}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del algoritmo GPC:"
                    warnings={[
                        "Se eliminara permanentemente el algoritmo GPC",
                        "Todos los procesos que tienen este algoritmo GPC como referencia quedaran sin él"
                    ]}
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