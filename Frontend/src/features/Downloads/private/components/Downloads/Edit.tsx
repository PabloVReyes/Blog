import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useDownloadStore } from "@/stores"
import type { DownloadData } from "@/features/Downloads/types/download.types"

export const Edit = (file: DownloadData) => {
    const update = useDownloadStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            isNew: file.isNew,
            type: file.type as "DOCUMENT" | "IMAGE",
            area: String(file.category.section?.areaId),
            section: String(file.category.sectionId),
            category: String(file.categoryId),
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            type: (value) => validateSelect(value, { required: true }),
            area: (value) => validateSelect(value, { required: true }),
            section: (value, values) => validateSelect(value, { required: values.area != null }),
            category: (value, values) => validateSelect(value, { required: values.section != null }),
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
            formData.append("type", values.type)
            formData.append("category", String(values.category))
            if (values.file) {
                formData.append("file", values.file)
            }

            await update?.(file.id.toString(), formData)
            showSuccessModal("Descarga Editada", "La descarga fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al actualizar descarga",
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

// 134 lineas -> 118 lineas