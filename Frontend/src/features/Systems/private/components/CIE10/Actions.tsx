import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"

export interface Props {
    id: string;
    name: string;
}

export const ActionsCIE10 = ({ id, ...props }: Props) => {
    const { openModal } = useModalStore()

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
                <Delete
                    id={id}
                    name={props.name}
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