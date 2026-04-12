import { Form, type FormValues } from "./Form"
import { validateCode, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsClinicalPracticeGuidelinesStore } from "@/stores"
import { CrudEditDialog } from "@/components"
import type { ClinicalPracticeGuidelinesData } from "@/features/Systems/types/ClinicalPracticeGuidelines.types"

export const Edit = ({ id, title, code, category, fileER, fileRR }: ClinicalPracticeGuidelinesData) => {
    const update = useSystemsClinicalPracticeGuidelinesStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                code,
                title,
                category: String(category.id),
                er: null as File | null,
                rr: null as File | null
            }}
            validate={{
                title: validateTitle,
                code: validateCode,
                category: (value) => validateSelect(value, { required: true }),
                er: (value) => validatePdf(value, { required: true, existingFileName: fileER?.name }),
                rr: (value) => validatePdf(value, { required: true, existingFileName: fileRR?.name })
            }}
            successTitle="Guía de Práctica Clínica Editada"
            successMessage="La guía de práctica clínica fue editada correctamente"
            errorTitle="Error al editar guía de práctica clínica"
            onSubmit={async (id, values) => {
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
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                    fileNameER={fileER?.name}
                    fileNameRR={fileRR?.name}
                    initialCategory={{
                        value: category?.id?.toString(),
                        label: category?.name
                    }}
                />
            )}
        />
    )
}