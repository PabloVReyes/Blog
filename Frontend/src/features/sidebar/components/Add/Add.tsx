import { Button, Divider, Group, Stack, Text } from "@mantine/core"
import { IconSelect, PageSelect, TitleInput } from "../shared"
import { useForm } from "@mantine/form"
import { useModalStore } from "@/shared"
import { IconCheck } from "@tabler/icons-react"
import { useSettingStore } from "@/features/Settings"

export const Add = () => {
    const { closeModal, openModal } = useModalStore();
    const { addMenuItem } = useSettingStore();

    const form = useForm({
        initialValues: {
            title: '',
            url: '',
            icon: ''
        },
        validate: {
            title: (value) => (value.trim().length < 3 ? 'Introduce un título mas largo' : null),
            url: (value) =>
                value.startsWith("/") || /^https?:\/\//.test(value)
                    ? null
                    : "Debe ser una ruta interna o una URL válida",
            icon: (value) => value ? null : "Selecciona un icono"
        }
    })

    const handleSubmit = (values: typeof form.values) => {
        const newItem = {
            id: crypto.randomUUID(),
            children: [],
            label: values.title,
            link: values.url,
            icon: values.icon,
        }

        addMenuItem(newItem)

        openModal({
            title: "Elemento agregado",
            subtitle: "El elemento fue agregado correctamente",
            autoClose: 2500,
            content: (
                <Stack align="center" p="xl" gap={1}>
                    <IconCheck size={60} color="green" />
                    <Text ta="center">
                        El elemento ha sido agregado correctamente.
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

                <Group gap={5} justify="flex-end">
                    <Button variant="outline" onClick={closeModal}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                    >
                        Agregar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}