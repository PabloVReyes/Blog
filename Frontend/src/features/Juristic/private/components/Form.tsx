import { Divider, Fieldset, FileInput, Stack, Text, TextInput } from "@mantine/core";
import { ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { type UseFormReturnType } from "@mantine/form";

export interface FormValues {
    name: string;
    description: string;
    isNew: boolean;
    file: File | null;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>;
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props<FormValues>) => {
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap="md">
                <Fieldset legend="Información del Documento">
                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Título identificador del archivo"
                        placeholder="Ej. Manual de Organización"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={45}
                        {...form.getInputProps("name")}
                    />

                    <Divider my="sm" />

                    <TextInput
                        label="Descripción"
                        description="Breve detalle sobre el contenido (opcional)"
                        placeholder="Ej. Contiene los lineamientos actualizados del área"
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                    />

                    <Divider my="sm" />

                    <Switch
                        value="isNew"
                        label="Nuevo"
                        description='Muestra una etiqueta visual de novedad al costado del nombre'
                        checked={form.values.isNew} // IMPORTANTE: Usar checked para booleanos
                        {...form.getInputProps("isNew", { type: "checkbox" })}
                    />
                </Fieldset>

                <Fieldset legend="Archivo adjunto">
                    <FileInput
                        withAsterisk
                        label="Documento PDF"
                        accept="application/pdf"
                        description={
                            fileName ?
                                `Archivo actual: ${fileName}` :
                                "Selecciona el archivo PDF que los usuarios podrán descargar"
                        }
                        placeholder="Click para seleccionar PDF"
                        clearable
                        {...form.getInputProps("file")}
                    />
                </Fieldset>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    );
};