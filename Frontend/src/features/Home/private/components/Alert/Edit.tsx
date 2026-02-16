import { IconSelect, Switch } from "@/components"
import { useModalStore } from "@/layout"
import { Button, Divider, Group, Select, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconCheck } from "@tabler/icons-react"
import styles from "./Edit.module.css"
import { useAlertStore } from "../../store"
import { useState } from "react"
import { Notify } from "@/ui"
import { validateColor, validateDescription, validateIcon, validateTitle } from "@/utils"
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MAX_AUTHOR_LENGTH } from "@/constants"

const options = [
    { label: "Informativo", value: "blue" },
    { label: "Exitoso", value: "green" },
    { label: "Advertencia", value: "yellow" },
    { label: "Error", value: "red" },
];

export const Edit = ({ id, icon, isActive, title, description, author, color }: any) => {
    const { closeModal, openModal } = useModalStore()
    const { update } = useAlertStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            icon,
            isActive,
            title,
            description,
            author,
            color
        },
        validate: {
            icon: validateIcon,
            title: validateTitle,
            description: validateDescription,
            color: validateColor
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            await update(id, values)

            openModal({
                title: "Alerta Actualizada",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            la alerta se ha actualizado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar alerta",
                message: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <div>
                    <Switch
                        label="Visible"
                        withAsterisk
                        description="La alerta es visible"
                        value={form.values.isActive}
                        {...form.getInputProps("isActive", { type: "checkbox" })}
                    />

                    <Divider />
                    <Select
                        allowDeselect={false}
                        classNames={{
                            option: styles.option
                        }}
                        withAsterisk
                        label="Tipo de alerta"
                        description="Selecciona el tipo de alerta"
                        placeholder="Selecciona tipo"
                        data={options.map(o => o.label)} // solo los labels visibles
                        value={options.find(o => o.value === form.values.color)?.label || ""}
                        onChange={(val) => {
                            const selected = options.find(o => o.label === val)
                            form.setFieldValue("color", selected ? selected.value : "")
                        }}
                    />

                    <Divider />

                    <IconSelect
                        form={form}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Titulo"
                        description="Titulo de la alerta"
                        placeholder="Title"
                        {...form.getInputProps("title")}
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.title?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Descripcion"
                        description="Descripcion que se mostrara en la alerta"
                        placeholder="Descripcion"
                        {...form.getInputProps("description")}
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Autor"
                        description="Autor de la alerta"
                        placeholder="Autor"
                        {...form.getInputProps("author")}
                        maxLength={MAX_AUTHOR_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.author?.length || 0}/{MAX_AUTHOR_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                    />
                </div>

                <Group gap={5} justify="flex-end">
                    <Button
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cerrar
                    </Button>
                    <Button
                        loading={loading}
                        type="submit"
                    >
                        Editar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}