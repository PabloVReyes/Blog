import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { useModalStore } from "@/layout"
import { Edit } from "./Edit"
import { Delete } from "./Delete"

export interface Data {
    id: string;
    fileName: string;
    filePath: string;
    fileSize: string;
    mimeType: number;
    areaId: string;
    manualTypeId: string;
    createdAt: Date;
    updatedAt: Date;
    area: Area;
    manualType: ManualType;
}

export interface Area {
    id: string;
    name: string;
    category: string;
    manager: null;
    description: null;
    createdAt: Date;
    updatedAt: Date;
}

export interface ManualType {
    id: string;
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export const ActionsMacroprocess = (macroprocess: Data) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            content: (
                <Edit
                    id={macroprocess.id}
                    fileName={macroprocess.fileName}
                />
            )
        })
    }

    const handleDelete = () => {
        if (!macroprocess.fileName) {
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