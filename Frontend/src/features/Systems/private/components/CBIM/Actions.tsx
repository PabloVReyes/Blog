import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import { useModalStore } from "@/layout"

export interface Props {
    id:          string;
    code:        string;
    name:        string;
    description: string;
    sp:          null;
    fpgc:        null;
    cbt_cae:     string;
    createdAt:   Date;
    updatedAt:   Date;
}

export const ActionsCBIM = ({ id, ...props }: Props) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Medicamento",
            subtitle: "Editar un medicamento del Cuadro Básico Integral de Medicamentos (CBIM)",
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
            title: "Eliminar Medicamento",
            subtitle: "Eliminar un medicamento del Cuadro Básico Integral de Medicamentos (CBIM)",
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