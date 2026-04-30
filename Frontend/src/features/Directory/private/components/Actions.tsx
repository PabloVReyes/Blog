import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { DirectoryData } from "../types/directory.types"
import { CrudDeleteEntity } from "@/components"
import { useDirectoryStore } from "@/stores"
import { DirectoryPreview } from "./DirectoryPreview"

export const Actions = ({ id, ...props }: DirectoryData) => {
    const { openModal } = useModalStore()
    const remove = useDirectoryStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Extensión Telefónica",
            subtitle: "Editar una Extensión Telefónica existente",
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
            title: "Eliminar Extensión Telefónica",
            subtitle: "Eliminar una Extensión Telefónica existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Extensión Telefónica"
                    confirmValue={props.phone}
                    onDelete={remove}
                    label="Para confirmar escribe la extensión telefónica:"
                    warnings={[
                        "Se eliminara permanentemente la extensión telefonica"
                    ]}
                >
                    <DirectoryPreview
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