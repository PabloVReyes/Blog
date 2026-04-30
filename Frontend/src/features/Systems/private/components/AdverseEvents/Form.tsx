import { Fieldset, FileInput } from "@mantine/core";
import { BaseForm } from "@/components";
import type { UseFormReturnType } from "@mantine/form";

export interface FormValues {
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
                <FileInput
                    withAsterisk
                    label="Archivo"
                    description={
                        fileName ?
                            `El archivo cargado es: ${fileName}` :
                            "Selecciona un archivo perteneciente al evento adverso"
                    }
                    accept=".pdf"
                    placeholder="Evento Adverso.pdf"
                    {...form.getInputProps("file")}
                />
            </Fieldset>
        </BaseForm>
    )
}