import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validatePdf, validateTitle } from "@/utils/validators"
import { useSystemsPBMStore } from "@/stores"
import type { PMBData } from "@/features/Systems/types/pbm.types"

export const Edit = ({ id, title, file }: PMBData) => {
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
            file: (value) => validatePdf(value, { required: true, existingFileName: file?.name }),
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
            fileName={file?.name}
        />
    )
}

// 73 lineas -> 54 lineas