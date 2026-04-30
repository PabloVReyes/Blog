import { Divider, Fieldset, FileInput, Text, TextInput } from "@mantine/core";
import { MAX_TITLE_LENGTH } from "@/constants";
import { BaseForm } from "@/components";
import type { UseFormReturnType } from "@mantine/form";

export interface FormValues {
    title: string;
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
        <BaseForm
            form={form}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
            isLoading={isLoading}
        >
            <Fieldset>
                <TextInput
                    withAsterisk
                    label="Título"
                    description="Título del algoritmo"
                    placeholder="Ej. Solicitud de componentes"
                    maxLength={MAX_TITLE_LENGTH}
                    rightSection={
                        <Text size="xs" c="dimmed">
                            {form.values.title?.length || 0}/{MAX_TITLE_LENGTH}
                        </Text>
                    }
                    rightSectionWidth={40}
                    {...form.getInputProps("title")}
                />

                <Divider />

                <FileInput
                    withAsterisk
                    label="Algoritmo"
                    description={
                        fileName ?
                            `El archivo cargado es: ${fileName}` :
                            "Selecciona un archivo perteneciente al algoritmo"
                    }
                    accept=".pdf"
                    placeholder="Algoritmo.pdf"
                    {...form.getInputProps("file")}
                />
            </Fieldset>
        </BaseForm >
    )
}