import { Form, type FormValues } from "./Form"
import { validateEmail, validateName } from "@/utils/validators"
import { useSettingsUsersStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddUsers = () => {
    const add = useSettingsUsersStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                isActive: true,
                name: "",
                email: "",
                roles: [] as string[]
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                email: (value) => validateEmail(value, { required: true }),
                roles: (value) => {
                    if (value.length === 0) {
                        return "Debes seleccionar al menos un rol";
                    }
                    return null;
                },
            }}
            successTitle="Usuario Creado"
            successMessage="El usuario fue creado correctamente"
            errorTitle="Error al crear usuario"
            onSubmit={async (values) => (
                await add?.(values)
            )}
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