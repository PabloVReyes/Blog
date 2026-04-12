import { Form, type FormValues } from "./Form"
import { validateDescription, validatePdf, validateSelect, validateTitle } from "@/utils"
import { useSystemsCareProtocolsApiStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddCareProtocols = () => {
    const add = useSystemsCareProtocolsApiStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                title: "",
                description: "",
                category: "",
                file: null as File | null,
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                category: (value) => validateSelect(value, { required: true }),
                file: (value) => validatePdf(value, { required: true })
            }}
            successTitle="Protocolo de Atención Creado"
            successMessage="El protocolo de atención fue creado correctamente"
            errorTitle="Error al crear protocolo de atención"
            onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("title", values.title)
                formData.append("description", values.description)
                formData.append("category", values.category)
                if (values.file) {
                    formData.append("file", values.file!)
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