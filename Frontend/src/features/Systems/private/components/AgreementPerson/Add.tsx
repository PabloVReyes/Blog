import { Form, type FormValues } from "./Form"
import { validateName, validateSelect } from "@/utils/validators"
import { useSystemsAgreementPersonStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddAgreementPerson = () => {
    const add = useSystemsAgreementPersonStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                name: "",
                group: null,
                zone: null,
                type: "HOLDER" as "HOLDER" | "DEPENDENT",
                holder: null,
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                group: (value) => validateSelect(value, { required: true }),
                zone: (value) => validateSelect(value, { required: true }),
                holder: (value, values) => validateSelect(value, { required: values.type === "DEPENDENT" })
            }}
            successTitle="Paciente de Convenio Creado"
            successMessage="El paciente de convenio fue creado correctamente"
            errorTitle="Error al crear paciente de convenio"
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