import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils/validators"
import { useDownloadStore } from "@/stores"

export const AddDownloads = () => {
    const add = useDownloadStore(s => s.add);
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            isNew: true,
            type: "DOCUMENT" as "DOCUMENT" | "IMAGE",
            area: null,
            section: null,
            category: null,
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            type: (value) => validateSelect(value, { required: true }),
            area: (value) => validateSelect(value, { required: true }),
            section: (value, values) => validateSelect(value, { required: values.area != null }),
            category: (value, values) => validateSelect(value, { required: values.section != null }),
            file: (value) => validateFile(value, { required: true })
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

            await add?.(formData)
            showSuccessModal("Descarga agregada", "La descarga se agrego correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al agregar área",
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
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}

// 86 lineas -> 69 lineas