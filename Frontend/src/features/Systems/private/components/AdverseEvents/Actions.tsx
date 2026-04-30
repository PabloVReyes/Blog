import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { AdverseEventsData } from "../../types/adverseEvents.types"
import { CrudDeleteEntity } from "@/components"
import { useSystemsAdverseEventsStore } from "@/stores"

export const ActionsAdverseEvents = ({ id, ...props }: AdverseEventsData) => {
    const { openModal } = useModalStore()
    const remove = useSystemsAdverseEventsStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Evento Adverso",
            subtitle: "Editar un evento adverso existente",
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
        if (!props.fileId) return null;
        openModal({
            title: "Eliminar Evento Adverso",
            subtitle: "Eliminar un evento adverso existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Evento Adverso"
                    confirmValue={props.title}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del evento adverso:"
                    warnings={[
                        "Se eliminara permanentemente el evento adverso",
                        "Todos los procesos que tienen este evento adverso como referencia quedaran sin él"
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