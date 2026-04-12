import { Form, type FormValues } from "./Form"
import { validateCode, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsClinicalPracticeGuidelinesStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddClinicalPracticeGuidelines = () => {
    const add = useSystemsClinicalPracticeGuidelinesStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                code: "",
                title: "",
                category: "",
                er: null as File | null,
                rr: null as File | null
            }}
            validate={{
                title: validateTitle,
                code: validateCode,
                category: (value) => validateSelect(value, { required: true }),
                er: (value) => validatePdf(value, { required: true }),
                rr: (value) => validatePdf(value, { required: true })
            }}
            successTitle="Guía de Práctica Clínica Creada"
            successMessage="La guía de práctica clínica fue creada correctamente"
            errorTitle="Error al crear guía de práctica clínica"
            onSubmit={async (values) => {
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