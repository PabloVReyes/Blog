import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { DownloadData } from "@/features/Downloads/types/download.types"
import { CrudDeleteEntity } from "@/components"
import { useDownloadAreasStore } from "@/stores"

export const ActionsDownloads = ({ id, ...props }: DownloadData) => {
    const { openModal } = useModalStore()
    const remove = useDownloadAreasStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Descarga",
            subtitle: "Editar una descarga existente",
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
            title: "Eliminar Descarga",
            subtitle: "Eliminar una descarga existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Descarga"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre de la descarga:"
                    warnings={[
                        "Se eliminara permanentemente la descarga",
                        "El archivo cargado será eliminado permanentemente"
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