import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { MonthlyReportsData } from "@/features/Systems/types/monthlyReports.types"
import { CrudDeleteEntity } from "@/components"
import { useSystemsMonthlyReportsStore } from "@/stores"
import { ReportPreview } from "./ReportPreview"

export const ActionsMonthlyReports = ({ id, ...props }: MonthlyReportsData) => {
    const { openModal } = useModalStore()
    const remove = useSystemsMonthlyReportsStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Informe Mensual",
            subtitle: "Editar el informe mensual seleccionado",
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
            title: "Eliminar Informe Mensual",
            subtitle: "Eliminar el informe mensual seleccionado",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Informe Mensual"
                    confirmValue={props.title}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del informe mensual:"
                    warnings={[
                        "Se eliminara permanentemente el informe mensual",
                        "Todos los procesos que tienen este informe mensual como referencia quedaran sin él"
                    ]}
                >
                    <ReportPreview
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