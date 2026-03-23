import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateFile, validateName } from "@/utils"
import { useJuristicStore } from "@/stores"
import type { JuristicData } from "../../types/juristic.types"

export const Edit = (file: JuristicData) => {
    const update = useJuristicStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            isNew: file.isNew,
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
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
            if (values.file) {
                formData.append("file", values.file)
            }
            await update?.(file.id.toString(), formData)
            showSuccessModal("Disposición Juridica Editada", "La dispisición juridica fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar disposición juridica",
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

// 104 lineas -> 87 lineas