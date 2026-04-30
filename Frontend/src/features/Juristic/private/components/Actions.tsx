import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { JuristicData } from "../../types/juristic.types"
import { CrudDeleteEntity } from "@/components"
import { useJuristicStore } from "@/stores"

export const Actions = ({ id, ...props }: JuristicData) => {
    const { openModal } = useModalStore()
    const remove = useJuristicStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Disposicion Jurídica Administrativa",
            subtitle: "Editar una Disposicion Jurídica Administrativa existente",
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
            title: "Eliminar Disposicion Jurídica Administrativa",
            subtitle: "Eliminar una Disposicion Jurídica Administrativa existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Disposicion Jurídica Administrativa"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre de la Disposicion Jurídica Administrativa:"
                    warnings={[
                        "Se eliminara permanentemente la Disposicion Jurídica Administrativa",
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