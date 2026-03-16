import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useCareProtocolsStore } from "../../store"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateDescription, validatePdf, validateSelect, validateTitle } from "@/utils/validators"

export const Edit = ({ id, title, fileName, description, category }: any) => {
    const { update } = useCareProtocolsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title,
            description,
            category: String(category.id),
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            category: (value) => validateSelect(value, { required: true }),
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("category", values.category)
            if (values.file) {
                formData.append("file", values.file!)
            }
            await update(id, formData)
            showSuccessModal("Protocolo de Atención Editado", "El protocolo de atención fue editado correctamente")
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
            initialCategory={{
                value: category?.id?.toString(),
                label: category?.name
            }}
        />
    )
}

// 83 lineas -> 64 lineas