import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { ShiftData } from "@/features/Vacation/types/vacations.types"
import { CrudDeleteEntity } from "@/components"
import { useVacationShiftStore } from "@/stores"
import { ShiftPreview } from "./ShiftPreview"

export const ActionsShift = ({ id, ...props }: ShiftData) => {
    const { openModal } = useModalStore()
    const remove = useVacationShiftStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Turno",
            subtitle: "Editar un turno existente para roles vacacionales",
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
            title: "Eliminar Turno",
            subtitle: "Eliminar un turno existente para roles vacacionales",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Turno"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del turno:"
                    warnings={[
                        "Se eliminará permanentemente el turno",
                        "Los roles vacacionales serán eliminados permanentemente"
                    ]}
                >
                    <ShiftPreview
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