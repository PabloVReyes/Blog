import { useModalStore, useSettingStore } from "@/shared"
import type { EditProps } from "./types"
import { useForm } from "@mantine/form"
import { Button, Divider, Group, Stack, Text } from "@mantine/core"
import { IconSelect, PageSelect, TitleInput } from "../shared"
import { IconCheck } from "@tabler/icons-react"

export const Edit = ({ id }: EditProps) => {
    const { getMenuItemById, updateMenuItem } = useSettingStore()
    const node = getMenuItemById(id)
    const { closeModal, openModal } = useModalStore();

    const form = useForm({
        initialValues: {
            title: node?.label,
            url: node?.link,
            icon: node?.icon
        },
        validate: {
            title: (value: any) => (value.trim().length < 3 ? 'Introduce un título mas largo' : null),
            url: (value: any) =>
                value.startsWith("/") || /^https?:\/\//.test(value)
                    ? null
                    : "Debe ser una ruta interna o una URL válida",
            icon: (value) => value ? null : "Selecciona un icono"
        }
    })

    const handleSubmit = (values: typeof form.values) => {
        updateMenuItem(String(id), {
            label: values.title,
            link: values.url, // slug
            icon: values.icon
        });

        openModal({
            title: "Elemento editado",
            subtitle: "El elemento fue editado correctamente",
            autoClose: 2500,
            content: (
                <Stack align="center" p="xl" gap={1}>
                    <IconCheck size={60} color="green" />
                    <Text ta="center">
                        El elemento ha sido editado correctamente.
                    </Text>
                    <Text ta="center">
                        Recuerda dar clic en "Guardar" para aplicar los cambios.
                    </Text>
                </Stack>
            ),
        });
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TitleInput
                    form={form}
                />

                <Divider />

                <PageSelect
                    form={form}
                />

                <Divider />

                <IconSelect
                    form={form}
                />

                <Group mt="lg" gap={5} justify="flex-end">
                    <Button variant="outline" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button type="submit">
                        Editar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}