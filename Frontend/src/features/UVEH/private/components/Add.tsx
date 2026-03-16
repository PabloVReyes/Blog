import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils/validators"
import { useUVEHStore } from "../store"

export const Add = () => {
    const { add } = useUVEHStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            isNew: true,
            category: null,
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            category: (value) => validateSelect(value, { required: true }),
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
            formData.append("category", String(values.category))
            if (values.file) {
                formData.append("file", values.file)
            }

            await add(formData)

            showSuccessModal("UVEH Creado", "UVEH fue creado correctamente")
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

// 79 lineas -> 62 lineas