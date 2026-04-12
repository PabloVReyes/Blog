import { Form, type FormValues } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils/validators"
import { useCertificationStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const Add = () => {
    const add = useCertificationStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                name: "",
                description: "",
                isNew: true,
                section: null,
                file: null
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                section: (value) => validateSelect(value, { required: true }),
                file: (value) => validateFile(value, { required: true })
            }}
            successTitle="Certificación creada"
            successMessage="La certificación ha sido creada correctamente"
            errorTitle="Error al agregar certificación"
            onSubmit={async (values) => {
                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description)
                formData.append("isNew", String(values.isNew))
                formData.append("section", String(values.section))

                if (values.file) {
                    formData.append("file", values.file)
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