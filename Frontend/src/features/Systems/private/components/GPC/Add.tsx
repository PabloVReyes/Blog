import { Form, type FormValues } from "./Form"
import { validateDescription, validateOrder, validatePdf, validateSelect, validateTitle } from "@/utils"
import { useSystemsGPCStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddGCP = () => {
    const add = useSystemsGPCStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                title: "",
                description: "",
                cycle: "",
                orderIndex: 1,
                file: null as File | null,
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                cycle: (value) => validateSelect(value, { required: true }),
                orderIndex: (value) => validateOrder(value, { required: true }),
                file: (value) => validatePdf(value, { required: true })
            }}
            successTitle="Algoritmo GPC Creado"
            successMessage="El algoritmo GPC fue creado correctamente"
            errorTitle="Error al crear algoritmo GPC"
            onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("title", values.title)
                formData.append("description", values.description)
                formData.append("cycle", values.cycle)
                formData.append("orderIndex", String(values.orderIndex))

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