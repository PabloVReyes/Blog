import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { Edit } from "./Edit"
import { Delete } from "./Delete"
import type { MacroprocessData } from "@/features/Macroprocess/types/macroprocess.types"

export const ActionsMacroprocess = (macroprocess: MacroprocessData) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Macroproceso",
            subtitle: "Editar un Macroproceso existente",
            icon: "IconEdit",
            color: "blue",
            content: (
                <Edit
                    id={macroprocess.id}
                    fileName={macroprocess.file?.name}
                />
            )
        })
    }

    const handleDelete = () => {
        if (!macroprocess.file) {
            return null
        }

        openModal({
            title: "Eliminar Macroproceso",
            subtitle: "Eliminar un macroproceso existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <Delete
                    {...macroprocess}
                />
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