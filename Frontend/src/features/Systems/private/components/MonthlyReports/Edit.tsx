import { Form, type FormValues } from "./Form"
import { validatePdf, validateTitle, validateYear } from "@/utils/validators"
import { useSystemsMonthlyReportsStore } from "@/stores"
import type { MonthlyReportsData } from "@/features/Systems/types/monthlyReports.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, title, file, description, type, month, period }: MonthlyReportsData) => {
    const update = useSystemsMonthlyReportsStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                title,
                description,
                type: type as "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA",
                month: String(month),
                year: String(period.year),
                file: null as File | null
            }}
            validate={{
                title: validateTitle,
                year: (value) => validateYear(value, { required: true, min: 1900, max: 2100 }),
                file: (value) => validatePdf(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Informe Mensual Editado"
            successMessage="El informe mensual fue editado correctamente"
            errorTitle="Error al editar informe mensual"
            onSubmit={async (id, values) => {
                const formData = new FormData();
                formData.append("title", values.title)
                if (values.description && values.description.trim() !== "") {
                    formData.append("description", values.description)
                }
                formData.append("type", values.type)
                if (values.type === "MONTHLY") {
                    formData.append("month", values.month!)
                }
                formData.append("year", values.year)
                if (values.file) {
                    formData.append("file", values.file!)
                }

                await update?.(id, formData)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                    fileName={file?.name}
                />
            )}
        />
    )
}