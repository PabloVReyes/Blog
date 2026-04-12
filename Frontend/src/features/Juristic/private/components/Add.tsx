import { Form, type FormValues } from "./Form"
import { validateFile, validateName } from "@/utils/validators"
import { useJuristicStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const Add = () => {
    const add = useJuristicStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                name: "",
                description: "",
                isNew: true,
                file: null as File | null
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                file: (value) => validateFile(value, { required: true })
            }}
            successTitle="Disposición Juridica Creada"
            successMessage="La disposición jurídica fue creada correctamente"
            errorTitle="Error al crear disposición jurídica"
            onSubmit={async (values) => {
                if (!add) throw new Error("Add no definido")

                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description)
                formData.append("isNew", String(values.isNew))
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
