import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validatePdf, validateTitle, validateYear } from "@/utils/validators"
import { useSystemsMonthlyReportsStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddMonthlyReports = () => {
    const add = useSystemsMonthlyReportsStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title: "",
            description: "",
            type: "MONTHLY" as "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA",
            month: "1",
            year: "",
            file: null as File | null
        },
        validate: {
            title: validateTitle,
            year: (value) => validateYear(value, { required: true, min: 1900, max: 2100 }),
            file: (value) => validatePdf(value, { required: true })
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
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
            formData.append("file", values.file!)
            await add(formData)
        },
        {
            successTitle: "Reporte Mensual Creado",
            successMessage: "El reporte mensual fue creado correctamente",
            errorTitle: "Error al crear reporte mensual"
        }
    )

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}

// 88 lineas  -> 64 lineas -> 58 lineas