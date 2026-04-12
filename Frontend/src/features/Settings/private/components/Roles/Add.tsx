import { Form, type FormValues } from "./Form"
import { validateDescription, validateName } from "@/utils/validators"
import { useSettingsRolesStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddRoles = () => {
    const add = useSettingsRolesStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                name: "",
                description: "",
                fullAccess: false,
                permissions: [] as string[],
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                description: (value) => validateDescription(value),
                permissions: (value, values) => {
                    if (!values.fullAccess && value.length === 0) {
                        return "Debes seleccionar al menos un permiso";
                    }
                    return null;
                }
            }}
            successTitle="Rol Creado"
            successMessage="El rol fue creado correctamente"
            errorTitle="Error al crear rol"
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