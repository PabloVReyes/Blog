import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { AgreementPerson } from "../../types/agreementPerson.types"
import { CrudDeleteEntity } from "@/components"
import { useSystemsAgreementPersonStore } from "@/stores"
import { PersonPreview } from "./PersonPreview"

export const ActionsAgreementPerson = ({ id, ...props }: AgreementPerson) => {
    const { openModal } = useModalStore()
    const remove = useSystemsAgreementPersonStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Paciente de Convenio",
            subtitle: "Editar un paciente de convenio existente",
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
            title: "Eliminar Paciente de Convenio",
            subtitle: "Eliminar un paciente de convenio existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Paciente de Convenio"
                    confirmValue={props.name}
                    onDelete={remove}
                    label="Para confirmar escribe el nombre del paciente de convenio:"
                    warnings={[
                        "Se eliminara permanentemente el paciente de convenio",
                        "Todos los procesos que tienen este paciente de convenio como referencia quedaran sin él"
                    ]}
                >
                    <PersonPreview
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