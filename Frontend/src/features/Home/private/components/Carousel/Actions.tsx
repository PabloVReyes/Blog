import { useModalStore } from "@/layout"
import { ActionIcon, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Edit } from "./Edit"
import type { CarouselData } from "@/features/Home/types/carousel.types"
import { CrudDeleteEntity } from "@/components"
import { useHomeCarouselStore } from "@/stores"

export const ActionsCarousel = ({ id, ...props }: CarouselData) => {
    const { openModal } = useModalStore()
    const remove = useHomeCarouselStore(s => s.remove)

    const handleEdit = () => {
        openModal({
            title: "Editar Carrusel",
            subtitle: "Editar la información del carrusel",
            icon: "IconPhotoEdit",
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
            title: "Eliminar Carrusel",
            subtitle: "Elimina el carrusel seleccionado",
            icon: "IconPhotoCancel",
            color: "red",
            content: (
                <CrudDeleteEntity
                    id={id}
                    entityName="Carrusel"
                    confirmValue={props.title}
                    onDelete={remove}
                    label="Para confirmar escribe el título del carrusel:"
                    warnings={[
                        "Se eliminara permanentemente el carrusel",
                        "La imagen cargada será eliminada permanentemente"
                    ]}
                >

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