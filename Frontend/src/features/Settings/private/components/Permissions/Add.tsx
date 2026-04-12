import { Form, type FormValues } from "./Form"
import { validateDescription, validateKeyPermission, validateName } from "@/utils/validators"
import { useSettingsPermissionsStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddPermissions = () => {
    const add = useSettingsPermissionsStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                isActive: true,
                name: "",
                description: "",
                key: "",
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                description: (value) => validateDescription(value),
                key: (value) => validateKeyPermission(value, { required: true })
            }}
            successTitle="Permiso Creado"
            successMessage="El permiso fue creado correctamente"
            errorTitle="Error al crear el permiso"
            onSubmit={async (values) => {
                if (!add) throw new Error("Add no definido")
                await add(values)
            }}
            renderForm={(form, loading, execute) => {
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Agregar"
                    isLoading={loading}
                />
            }}
        />
    )
}