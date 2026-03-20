import { FileInput, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react";
import { Notify, showSuccessModal } from "@/ui";
import { validatePdf } from "@/utils";
import { ModalButtons } from "@/components";
import { useMacroprocessStore } from "@/stores";

interface Props {
    id: string,
    fileName?: string | null
}

export const Edit = ({ id, fileName }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const update = useMacroprocessStore(s => s.update)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            file: null as File | null
        },
        validate: {
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("file", values.file!);
            await update?.(id, formData)
            showSuccessModal("Macroproceso Editado", "El macroproceso fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar macroproceso",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <FileInput
                    label="Archivo"
                    description={
                        fileName
                            ? `Archivo actual: ${fileName}`
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
    )
}

// 97 lineas -> 70 lineas