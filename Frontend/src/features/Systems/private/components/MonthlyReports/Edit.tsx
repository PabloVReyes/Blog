import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validatePdf, validateTitle, validateYear } from "@/utils/validators"
import { useSystemsMonthlyReportsStore } from "@/stores"

interface Props {
    id: string;
    title: string;
    fileName: string;
    description: string;
    type: string;
    month: string;
    period: Period;
}

export interface Period {
    id: string;
    year: number;
    createdAt: Date;
    updatedAt: Date;
}

export const Edit = ({ id, title, fileName, description, type, month, period }: Props) => {
    const update = useSystemsMonthlyReportsStore(s => s.update)
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

            await update?.(id, formData)
            showSuccessModal("Reporte Mensual Editado", "El reporte mensual fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar reporte mensual",
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
            fileName={fileName}
        />
    )
}

// 90 lineas -> 68 lineas