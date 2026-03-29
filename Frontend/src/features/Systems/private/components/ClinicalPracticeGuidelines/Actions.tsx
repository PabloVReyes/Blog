import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"
import type { ClinicalPracticeGuidelinesData } from "@/features/Systems/types/ClinicalPracticeGuidelines.types"

export const ActionsClinicalPracticeGuidelines = ({ id, ...props }: ClinicalPracticeGuidelinesData) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Guía de Práctica Clínica",
            subtitle: "Editar una Guía de Práctica Clínica existente",
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
            title: "Eliminar Guía de Práctica Clínica",
            subtitle: "Eliminar una Guía de Práctica Clínica existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <Delete
                    id={id}
                    {...props}
                />
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