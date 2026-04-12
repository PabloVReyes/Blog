import { Form, type FormValues } from "./Form"
import { validateEmail, validateName } from "@/utils"
import { useSettingsUsersStore } from "@/stores"
import type { UsersData } from "../../types/users.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, email, roles, isActive }: UsersData) => {
    const update = useSettingsUsersStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                email,
                isActive,
                roles: roles.map((r) => r.role.id)
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
            successTitle="Usuario Editado"
            successMessage="El usuario fue editado correctamente"
            errorTitle="Error al editar usuario"
            onSubmit={async (id, values) => {
                await update?.(id.toString(), values)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                />
            )}
        />
    )
}