import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { CBIMData } from "../../types/CBIM.types"
import { CrudDeleteEntity } from "@/components"
import { CBIMPreview } from "./CBIMPreview"
import { useSystemsCBIMStore } from "@/stores"

export const ActionsCBIM = ({ id, ...props }: CBIMData) => {
    const { openModal } = useModalStore()
    const remove = useSystemsCBIMStore(s => s.remove)

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
                <CrudDeleteEntity
                    id={id}
                    entityName="Medicamento del CBIM"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del medicamento:"
                    warnings={[
                        "Se eliminara permanentemente el medicamento del CBIM",
                        "Todos los procesos que tienen este medicamento del CBIM como referencia quedaran sin él"
                    ]}
                >
                    <CBIMPreview
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