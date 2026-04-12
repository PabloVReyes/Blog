import { Form, type FormValues } from "./Form"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useDownloadAreasStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddArea = () => {
    const add = useDownloadAreasStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                name: "",
                icon: "",
                color: ""
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                icon: validateIcon,
                color: validateColor
            }}
            successTitle="Área Creada"
            successMessage="El área fue creada correctamente"
            errorTitle="Error al crear el área"
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