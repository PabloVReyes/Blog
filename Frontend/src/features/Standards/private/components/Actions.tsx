import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { StandardsData } from "../../types/standards.types"
import { CrudDeleteEntity } from "@/components"
import { useStandardsStore } from "@/stores"
import { StandardPreview } from "./StandardPreview"

export const Actions = ({ id, ...props }: StandardsData) => {
    const { openModal } = useModalStore()
    const remove = useStandardsStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Norma Oficial Mexicana",
            subtitle: "Editar una Norma Oficial Mexicana existente",
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
            title: "Eliminar Norma Oficial Mexicana",
            subtitle: "Eliminar una Norma Oficial Mexicana existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Norma Oficial Mexicana"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre de la norma:"
                    warnings={[
                        "Se eliminara permanentemente la norma",
                        "Todos los procesos que tienen esta norma como referencia quedaran sin ella"
                    ]}
                >
                    <StandardPreview
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