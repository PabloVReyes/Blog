import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validatePdf, validateTitle } from "@/utils/validators"
import { useSystemsPBMStore } from "@/stores"

interface Props {
    id: string;
    title: string;
    fileName: string
}

export const Edit = ({ id, title, fileName }: Props) => {
    const update = useSystemsPBMStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title,
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName }),
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("title", values.title)
            if (values.file) {
                formData.append("file", values.file!)
            }
            await update?.(id, formData)
            showSuccessModal("Algoritmo PBM Editado", "El algoritmo PBM fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar algoritmo PBM",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Editar"
            isLoading={loading}
            fileName={fileName}
        />
    )
}

// 73 lineas -> 54 lineas