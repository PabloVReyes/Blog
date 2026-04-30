import { useModalStore } from "@/layout"
import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import type { AccessCardData } from "@/features/Home/types/accessCard.types"
import { useHomeAccessCardStore } from "@/stores"
import { CrudDeleteEntity } from "@/components"
import { AccessCardPreview } from "./AccessCardPreview"

export const ActionsAccessCard = ({ id, ...props }: AccessCardData) => {
    const { openModal } = useModalStore()
    const remove = useHomeAccessCardStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Acceso Rápido",
            subtitle: "Editar un acceso rápido del inicio",
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
            title: "Eliminar Acceso Rápido",
            subtitle: "Eliminar un acceso rápido del inicio",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Acceso Rápido"
                    confirmValue={props.title}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del acceso rápido:"
                    warnings={[
                        "Se eliminara permanentemente el acceso rápido",
                        "El ícono seleccionado será eliminado permanentemente"
                    ]}
                >
                    <AccessCardPreview
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