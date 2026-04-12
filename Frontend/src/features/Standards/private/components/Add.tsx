import { Form, type FormValues } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils/validators"
import { useStandardsStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const Add = () => {
    const add = useStandardsStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                name: "",
                description: "",
                isNew: true,
                category: null,
                file: null as File | null
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                category: (value) => validateSelect(value, { required: true }),
                file: (value) => validateFile(value, { required: true })
            }}
            successTitle="Norma Oficial Creada"
            successMessage="La norma oficial fue creada correctamente"
            errorTitle="Error al crear norma oficial"
            onSubmit={async (values) => {
                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description!)
                formData.append("isNew", String(values.isNew))
                formData.append("category", String(values.category))
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