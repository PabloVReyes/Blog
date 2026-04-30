import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { Edit } from "./Edit"
import type { MacroprocessData } from "@/features/Macroprocess/types/macroprocess.types"
import { CrudDeleteEntity } from "@/components"
import { useMacroprocessStore } from "@/stores"
import { MacroprocessPreview } from "./MacroprocessPreview"

export const ActionsMacroprocess = ({ id, ...props }: MacroprocessData) => {
    const { openModal } = useModalStore()
    const remove = useMacroprocessStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Macroproceso",
            subtitle: "Editar un Macroproceso existente",
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
        if (!props.file) {
            return null
        }

        openModal({
            title: "Eliminar Macroproceso",
            subtitle: "Eliminar un macroproceso existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Macroproceso"
                    confirmValue={props.manualType.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del macroproceso:"
                    warnings={[
                        "Se eliminara permanentemente la guía del macroproceso"
                    ]}
                >
                    <MacroprocessPreview
                        id={id}
                        {...props}
                    />
                </CrudDeleteEntity>
            )
        })
    }

    return (
        <Group gap={5} wrap="nowrap" justify="center">
            <ActionIcon className="actionIcon" onClick={handleEdit} >
                <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon className="actionIcon" onClick={handleDelete}>
                <IconTrash size={16} color="red" />
            </ActionIcon>
        </Group>
    )
}