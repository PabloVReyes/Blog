import { useModalStore } from "@/layout"
import { ActionIcon, Group } from "@mantine/core"
import { IconEdit } from "@tabler/icons-react"
import { Edit } from "./Edit"
import type { CalendarData } from "@/features/Home/types/calendar.types"

export const ActionsCalendar = ({ id, ...props }: CalendarData) => {
    const { openModal } = useModalStore()

    const handleEdit = () => {
        openModal({
            title: "Editar Primera Sección",
            subtitle: "Editar la primera sección del inicio",
            color: "blue",
            icon: "IconEdit",
            content: (
                <Edit
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
        </Group>
    )
}