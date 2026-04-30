import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import { CrudDeleteEntity } from "@/components"
import { CIE10Preview } from "./CIE10Preview"
import type { CIE10Data } from "../../types/CIE10.types"
import { useSystemsCIE10Store } from "@/stores"

export const ActionsCIE10 = ({ id, ...props }: CIE10Data) => {
    const { openModal } = useModalStore()
    const remove = useSystemsCIE10Store(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Enfermedad",
            subtitle: "Editar una enfermedad de la Clasificación internacional de enfermedades (CIE-10) ",
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
            title: "Editar Enfermedad",
            subtitle: "Editar una enfermedad de la Clasificación internacional de enfermedades (CIE-10) ",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Enfermedad"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre de la enfermedad:"
                    warnings={[
                        "Se eliminara permanentemente la enfermedad",
                        "Todos los procesos que tienen esta enfermedad como referencia quedaran sin ella"
                    ]}
                >
                    <CIE10Preview
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