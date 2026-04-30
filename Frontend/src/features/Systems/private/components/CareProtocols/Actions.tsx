import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import { useModalStore } from "@/layout"
import type { CareProtocolsData } from "@/features/Systems/types/careProtocols.types"
import { CrudDeleteEntity } from "@/components"
import { useSystemsCareProtocolsApiStore } from "@/stores"
import { ProtocolPreview } from "./ProtocolPreview"

export const ActionsCareProtocols = ({ id, ...props }: CareProtocolsData) => {
    const { openModal } = useModalStore()
    const remove = useSystemsCareProtocolsApiStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Protocolo de Atención (Pediatría)",
            subtitle: "Editar un Protocolo de Atención (Pediatría) existente",
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
            title: "Eliminar Protocolo de Atención (Pediatría)",
            subtitle: "Eliminar un Protocolo de Atención (Pediatría) existente",
            icon: "IconTrash",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Protocolo de Atención (Pediatría)"
                    confirmValue={props.title}
                    onDelete={remove}
                    label="Para confirmar escribe el título del protocolo:"
                    warnings={[
                        "Se eliminara permanentemente el Protocolo de Atención (Pediatría)",
                        "El archivo cargado será eliminado permanentemente"
                    ]}
                >
                    <ProtocolPreview
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