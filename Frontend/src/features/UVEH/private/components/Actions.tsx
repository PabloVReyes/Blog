import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { UVEHData } from "../../types/UVEH.types"
import { CrudDeleteEntity } from "@/components"
import { useUVEHStore } from "@/stores"
import { UVEHPreview } from "./UVEHPreview"

export const Actions = ({ id, ...props }: UVEHData) => {
    const { openModal } = useModalStore()
    const remove = useUVEHStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar UVEH",
            subtitle: "Editar un UVEH existente",
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
            title: "Eliminar UVEH",
            subtitle: "Eliminar un UVEH existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="UVEH"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del UVEH:"
                    warnings={[
                        "Se eliminara permanentemente el UVEH",
                        "El archivo cargado será eliminado permanentemente"
                    ]}
                >
                    <UVEHPreview
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