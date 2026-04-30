import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { Area } from "../../types/areas.types"
import { CrudDeleteEntity } from "@/components"
import { AreaPreview } from "./AreaPreview"
import { useDownloadAreasStore } from "@/stores"

export const ActionsAreas = ({ id, ...props }: Area) => {
    const { openModal } = useModalStore()
    const remove = useDownloadAreasStore(s => s.remove)

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

    const handleDelete = () => {
        openModal({
            title: "Eliminar Área",
            subtitle: "Eliminar un Área existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Área"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del área:"
                    warnings={[
                        "Se eliminara permanentemente el área",
                        "Los archivos asociados a esta área serán eliminados permanentemente"
                    ]}
                >
                    <AreaPreview
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