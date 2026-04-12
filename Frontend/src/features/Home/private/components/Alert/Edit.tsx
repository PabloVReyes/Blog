import { CrudEditDialog, IconSelect, ModalButtons, Switch } from "@/components"
import { Divider, Fieldset, Select, Stack, Text, TextInput } from "@mantine/core"
import styles from "./Edit.module.css"
import { validateColor, validateDescription, validateIcon, validateTitle } from "@/utils"
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MAX_AUTHOR_LENGTH } from "@/constants"
import { useHomeAlertStore } from "@/stores"
import type { AlertData } from "@/features/Home/public/pages/Home"

const options = [
    { label: "Informativo", value: "blue" },
    { label: "Exitoso", value: "emerald" },
    { label: "Advertencia", value: "yellow" },
    { label: "Error", value: "red" },
];

interface FormValues {
    icon: string;
    isActive?: boolean;
    title: string;
    description: string;
    author?: string;
    color: string;
}

export const Edit = ({ id, icon, isActive, title, description, author, color }: AlertData) => {
    const update = useHomeAlertStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                icon,
                isActive,
                title,
                description,
                author,
                color
            }}
            validate={{
                icon: validateIcon,
                title: validateTitle,
                description: validateDescription,
                color: validateColor
            }}
            successTitle="Alerta Editada"
            successMessage="La alerta fue editada correctamente"
            errorTitle="Error al editar alerta"
            onSubmit={async (id, values) => {
                await update?.(id, values)
            }}
            renderForm={(form, loading, execute) => (
                <form onSubmit={form.onSubmit(execute)}>
                    <Stack>
                        <Fieldset>
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
                                    label="Título"
                                    description="Título de la alerta"
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
                                    label="Descripción"
                                    description="Descripción que se mostrara en la alerta"
                                    placeholder="Descripción"
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
                        </Fieldset>

                        <ModalButtons
                            loading={loading}
                            label="Editar"
                        />
                    </Stack>
                </form>
            )}
        />
    )
}