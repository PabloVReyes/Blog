import { Form, type FormValues } from "./Form"
import { validatePdf, validateTitle } from "@/utils/validators"
import { useSystemsPBMStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddPBM = () => {
    const add = useSystemsPBMStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                title: "",
                file: null as File | null,
            }}
            validate={{
                title: validateTitle,
                file: (value) => validatePdf(value, { required: true })
            }}
            successTitle="Algoritmo PBM Creado"
            successMessage="El algoritmo PBM fue creado correctamente"
            errorTitle="Error al crear algoritmo PBM"
            onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("title", values.title)
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