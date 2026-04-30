import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { PMBData } from "@/features/Systems/types/pbm.types"
import { CrudDeleteEntity } from "@/components"
import { useSystemsPBMStore } from "@/stores"
import { PBMPreview } from "./PBMPreview"

export const ActionsPBM = ({ id, ...props }: PMBData) => {
    const { openModal } = useModalStore()
    const remove = useSystemsPBMStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Algoritmo PBM",
            subtitle: "Editar un Algoritmo PBM",
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
            title: "Eliminar Algoritmo PBM",
            subtitle: "Eliminar un Algoritmo PBM",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Algoritmo PBM"
                    confirmValue={props.title}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del algoritmo PBM:"
                    warnings={[
                        "Se eliminara permanentemente el algoritmo PBM",
                        "Todos los procesos que tienen este algoritmo PBM como referencia quedaran sin él"
                    ]}
                >
                    <PBMPreview
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