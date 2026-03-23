import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateDescription, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsCareProtocolsApiStore } from "@/stores"
import type { CareProtocolsData } from "@/features/Systems/types/careProtocols.types"

export const Edit = ({ id, title, file, description, category }: CareProtocolsData) => {
    const update = useSystemsCareProtocolsApiStore(s => s.update)
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
            file: (value) => validatePdf(value, { required: true, existingFileName: file?.name })
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
            await update?.(id, formData)
            showSuccessModal("Protocolo de Atención Editado", "El protocolo de atención fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar protocolo de atención",
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
            fileName={file?.name}
            initialCategory={{
                value: category?.id?.toString(),
                label: category?.name
            }}
        />
    )
}

// 83 lineas -> 64 lineas