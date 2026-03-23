import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useStandardsStore } from "@/stores"
import type { StandardsData } from "../../types/standards.types"

export const Edit = (file: StandardsData) => {
    const update = useStandardsStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            isNew: file.isNew,
            category: String(file.categoryId),
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            category: (value) => validateSelect(value, { required: true }),
            file: (value) => validateFile(value, { required: true, existingFileName: file.file?.name })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("description", values.description)
            formData.append("isNew", String(values.isNew))
            formData.append("category", String(values.category))
            if (values.file) {
                formData.append("file", values.file)
            }
            await update?.(file.id.toString(), formData)
            showSuccessModal("Norma Oficial Editada", "La norma oficial fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar norma oficial",
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
            fileName={file.file?.name}
        />
    )
}

// 107 lineas -> 90 lineas