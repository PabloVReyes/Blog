import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useMonthlyReportsStore } from "../../store"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validatePdf, validateTitle, validateYear } from "@/utils/validators"

export const Edit = ({ id, title, fileName, description, type, month, period }: any) => {
    const { update } = useMonthlyReportsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title,
            description,
            type: type as "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA",
            month: String(month),
            year: String(period.year),
            file: null as File | null
        },
        validate: {
            title: validateTitle,
            year: (value) => validateYear(value, { required: true, min: 1900, max: 2100 }),
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("title", values.title)
            if (values.description.trim() !== "") {
                formData.append("description", values.description)
            }
            formData.append("type", values.type)
            if (values.type === "MONTHLY") {
                formData.append("month", values.month)
            }
            formData.append("year", values.year)
            if (values.file) {
                formData.append("file", values.file!)
            }

            await update(id, formData)
            showSuccessModal("Reporte Mensual Editado", "El reporte mensual fue editado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar sistema",
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

// 90 lineas -> 68 lineas