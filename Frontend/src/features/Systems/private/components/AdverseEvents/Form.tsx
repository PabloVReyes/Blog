import { FileInput, Stack } from "@mantine/core";
import { ModalButtons } from "@/components";

interface Props {
    form: any;
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
    fileName?: string;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, fileName }: Props) => {
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <div>
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
                </div>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}