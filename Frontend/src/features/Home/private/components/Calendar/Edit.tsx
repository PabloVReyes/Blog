import { ColorSelect, CrudEditDialog, IconSelect, ModalButtons, ThemeIcon } from "@/components"
import { Divider, Fieldset, FileInput, Group, Stack, Text, TextInput } from "@mantine/core"
import { validateColor, validateDescription, validateIcon, validateTitle, validateYear } from "@/utils";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH, MAX_YEAR_LENGTH } from "@/constants";
import { useHomeCalendarStore } from "@/stores";
import { getTablerIcon } from "@/helpers";
import type { CalendarData } from "@/features/Home/types/calendar.types";

interface FormValues {
    title: string;
    icon: string;
    color: string;
    description: string;
    year: number;
    file: File | null;
}

export const Edit = ({ id, icon, color, title, description, year, file }: CalendarData) => {
    const update = useHomeCalendarStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                title,
                icon,
                color,
                description,
                year,
                file: null as File | null
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                year: (values) => validateYear(values, { required: true, min: 1900, max: 2100 }),
                color: validateColor,
                icon: validateIcon
            }}
            successTitle="Primera Sección Editada"
            successMessage="La primera sección fue editada correctamente"
            errorTitle="Error al editar primera sección"
            onSubmit={async (id, values) => {
                const formData = new FormData()
                formData.append("title", values.title)
                formData.append("description", values.description)
                formData.append("year", String(values.year))
                formData.append("color", values.color)
                formData.append("icon", values.icon)
                if (values.file) {
                    formData.append("file", values.file!)
                }
                await update?.(id, formData)
            }}
            renderForm={(form, loading, execute) => (
                <form onSubmit={form.onSubmit(execute)}>
                    <Stack>
                        <Fieldset legend="Contenido">
                            <TextInput
                                withAsterisk
                                label="Título"
                                description="Título del la primera sección"
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
                                        {form.values.year?.toString().length || 0}/{MAX_YEAR_LENGTH}
                                    </Text>
                                }
                                rightSectionWidth={30}
                            />

                            <Divider />

                            <FileInput
                                label="Archivo"
                                description={
                                    file?.name ?
                                        `Archivo cargado: ${file?.name}` :
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
                                    form={form}
                                />
                                <Divider orientation="vertical" />
                                <ThemeIcon
                                    color={form.values.color}
                                >
                                    {(() => {
                                        const DynamicIcon = getTablerIcon(form.values.icon);
                                        return <DynamicIcon />;
                                    })()}
                                </ThemeIcon>
                            </Group>
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