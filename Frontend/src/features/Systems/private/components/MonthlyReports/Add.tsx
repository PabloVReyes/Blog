import { Form, type FormValues } from "./Form"
import { validatePdf, validateTitle, validateYear } from "@/utils/validators"
import { useSystemsMonthlyReportsStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddMonthlyReports = () => {
    const add = useSystemsMonthlyReportsStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                title: "",
                description: "",
                type: "MONTHLY" as "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA",
                month: "1",
                year: "",
                file: null as File | null
            }}
            validate={{
                title: validateTitle,
                year: (value) => validateYear(value, { required: true, min: 1900, max: 2100 }),
                file: (value) => validatePdf(value, { required: true })
            }}
            successTitle="Informe Mensual Creado"
            successMessage="El informe mensual fue creado correctamente"
            errorTitle="Error al crear informe mensual"
            onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("title", values.title)
                formData.append("description", values.description!)
                formData.append("type", values.type)
                if (values.type === "MONTHLY") {
                    formData.append("month", values.month!)
                }
                formData.append("year", values.year)
                formData.append("file", values.file!)
                await add?.(formData)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Agregar"
                    isLoading={loading}
                />
            )}
        />
    )
}