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
            content: (
                <Delete
                    id={macroprocess.id}
                    name={macroprocess.manualType.name}
                    area={macroprocess.area.name}
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