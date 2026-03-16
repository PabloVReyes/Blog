import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { usePBMStore } from "../../store"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validatePdf, validateTitle } from "@/utils/validators"

export const Edit = ({ id, title, fileName }: any) => {
    const { update } = usePBMStore()
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
            await update(id, formData)
            showSuccessModal("Algoritmo PBM Editado", "El algoritmo PBM fue editado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar el algoritmo",
                message: error.message
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