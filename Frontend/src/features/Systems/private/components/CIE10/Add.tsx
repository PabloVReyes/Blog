import { Form, type FormValues } from "./Form"
import { validateCode, validateName } from "@/utils/validators"
import { useSystemsCIE10Store } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddCIE10 = () => {
    const add = useSystemsCIE10Store(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                code: "",
                name: "",
            }}
            validate={{
                code: validateCode,
                name: (value) => validateName(value, { required: true })
            }}
            successTitle="Enfermedad Creada"
            successMessage="La enfermedad fue creada correctamente"
            errorTitle="Error al crear enfermedad"
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