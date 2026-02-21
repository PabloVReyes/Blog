import { ColorSelect, IconSelect, ModalButtons } from "@/components"
import { Divider, Fieldset, FileInput, Group, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import * as TablerIcons from "@tabler/icons-react";
import { useForm } from "@mantine/form"
import { useModalStore } from "@/layout";
import { useCalendarStore } from "../../store";
import { Notify } from "@/ui";
import { validateColor, validateDescription, validateIcon, validateTitle, validateYear } from "@/utils";
import { useState } from "react";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MAX_YEAR_LENGTH } from "@/constants";

export const Edit = ({ id, icon, color, title, description, year, fileName }: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { openModal } = useModalStore()
    const { update } = useCalendarStore()

    const form = useForm({
        mode: 'controlled',
        initialValues: {
            title,
            icon,
            color,
            description,
            year,
            file: null as File | null
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            year: (values) => validateYear(values, { required: true, min: 1900, max: 2100 }),
            color: validateColor,
            icon: validateIcon
        }
    })

    const Icon =
        form.values.icon &&
        (TablerIcons as any)[form.values.icon];

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("year", values.year)
            formData.append("color", values.color)
            formData.append("icon", values.icon)

            if (values.file) {
                formData.append("file", values.file!)
            }

            await update(id, formData)

            openModal({
                title: "Primera Sección Actualizada",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <TablerIcons.IconCheck size={60} color="green" />
                        <Text ta="center">
                            La primera sección ha sido actualizada correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar primera sección",
                message: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Fieldset legend="Contenido">
                    <TextInput
                        withAsterisk
                        label="Titulo"
                        description="Titulo del la primera sección"
                        placeholder="Calendario"
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
                        description="Descripción de la primera sección"
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
                        label="Año"
                        description="Año del calendario"
                        placeholder="Año"
                        {...form.getInputProps("year")}
                        maxLength={MAX_YEAR_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.year?.length || 0}/{MAX_YEAR_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={30}
                    />

                    <Divider />

                    <FileInput
                        label="Archivo"
                        description={
                            fileName ?
                                `Archivo cargado: ${fileName}` :
                                "Selecciona un archivo PDF"
                        }
                        placeholder="Manual de procedimientos PDF"
                        withAsterisk
                        accept="application/pdf"
                        required
                        {...form.getInputProps("file")}
                    />
                </Fieldset>
                <Fieldset legend="Icono">
                    <Group justify="space-between" align="center" wrap="nowrap">
                        <IconSelect
                            form={form}
                        />

                        <ColorSelect
                            type="default"
                            form={form}
                        />
                        <Divider orientation="vertical" />
                        <ThemeIcon
                            size={56}
                            color={form.values.color}
                            variant="light"
                            style={{
                                '--icon-rgb': form.values.color || "#40c057" // fallback green
                            } as React.CSSProperties}
                            className="themeIcon"
                        >
                            {Icon ? <Icon /> : null}
                        </ThemeIcon>
                    </Group>
                </Fieldset>

                <ModalButtons
                    loading={loading}
                    label="Editar"
                />
            </Stack>
        </form>
    )
}