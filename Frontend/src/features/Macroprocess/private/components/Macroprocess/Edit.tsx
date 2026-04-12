import { FileInput, Stack } from "@mantine/core"
import { validatePdf } from "@/utils";
import { CrudEditDialog, ModalButtons } from "@/components";
import { useMacroprocessStore } from "@/stores";
import type { MacroprocessData } from "@/features/Macroprocess/types/macroprocess.types";

interface FormValues {
    file: File | null
}

export const Edit = ({ id, file }: MacroprocessData) => {
    const update = useMacroprocessStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                file: null as File | null
            }}
            validate={{
                file: (value) => validatePdf(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Macroproceso Editado"
            successMessage="El macroproceso fue editado correctamente"
            errorTitle="Error al editar macroproceso"
            onSubmit={async (id, values) => {
                const formData = new FormData();
                formData.append("file", values.file!);
                await update?.(id, formData)
            }}
            renderForm={(form, loading, execute) => (
                <form onSubmit={form.onSubmit(execute)}>
                    <Stack>
                        <FileInput
                            label="Archivo"
                            description={
                                file?.name
                                    ? `Archivo actual: ${file.name}`
                                    : "Selecciona un archivo PDF"
                            }
                            placeholder="Manual de procedimientos PDF"
                            withAsterisk
                            accept="application/pdf"
                            required
                            {...form.getInputProps("file")}
                        />

                        <ModalButtons
                            label="Editar"
                            loading={loading}
                        />
                    </Stack>
                </form>
            )}
        />
    )
}