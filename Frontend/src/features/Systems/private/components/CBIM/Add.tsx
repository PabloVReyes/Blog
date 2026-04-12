import { Form, type FormValues } from "./Form"
import { validateCodeMedicine, validateName, validatePresentation } from "@/utils"
import { useSystemsCBIMStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddCBIM = () => {
    const add = useSystemsCBIMStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                code: "",
                name: "",
                description: "",
                sp: "",
                fpgc: "",
                cbt_cae: "CAE"
            }}
            validate={{
                code: (value) => validateCodeMedicine(value, { required: true }),
                name: (value) => validateName(value, { required: true }),
                description: validatePresentation,
                cbt_cae: (value) => value && value.length < 1 ? "Este dato es necesario" : null
            }}
            successTitle="Medicamento Creado"
            successMessage="El medicamento fue creado correctamente"
            errorTitle="Error al crear el medicamento"
            onSubmit={async (values) => {
                await add?.(values)
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