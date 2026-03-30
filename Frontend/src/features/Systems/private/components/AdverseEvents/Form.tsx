import { Fieldset, FileInput, Stack } from "@mantine/core";
import { ModalButtons } from "@/components";
import type { UseFormReturnType } from "@mantine/form";

interface FormValues {
    file: File | null;
}

interface Props {
    form: UseFormReturnType<FormValues>;
    onSubmit: (values: FormValues) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props) => {
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
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

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}