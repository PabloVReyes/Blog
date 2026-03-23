import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateCode, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsClinicalPracticeGuidelinesStore } from "@/stores"
import type { ClinicalPracticeGuidelinesData } from "@/features/Systems/types/ClinicalPracticeGuidelines.types"

export const Edit = ({ id, title, code, category, fileER, fileRR }: ClinicalPracticeGuidelinesData) => {
    const update = useSystemsClinicalPracticeGuidelinesStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code,
            title,
            category: String(category.id),
            er: null as File | null,
            rr: null as File | null
        },
        validate: {
            title: validateTitle,
            code: validateCode,
            category: (value) => validateSelect(value, { required: true }),
            er: (value) => validatePdf(value, { required: true, existingFileName: fileER?.name }),
            rr: (value) => validatePdf(value, { required: true, existingFileName: fileRR?.name })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("code", values.code)
            formData.append("title", values.title)
            formData.append("category", values.category)
            if (values.er) {
                formData.append("er", values.er!)
            }
            if (values.rr) {
                formData.append("rr", values.rr!)
            }
            await update?.(id, formData)
            showSuccessModal("Guía de Práctica Clínica Editada", "La guía de práctica clínica fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar guía de práctica clínica",
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
            fileNameER={fileER?.name}
            fileNameRR={fileRR?.name}
            initialCategory={{
                value: category?.id?.toString(),
                label: category?.name
            }}
        />
    )
}

// 90 lineas -> 70 lineas