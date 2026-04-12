import { Form, type FormValues } from "./Form"
import { validateDescription, validateName } from "@/utils"
import { useSettingsRolesStore } from "@/stores"
import type { RolData } from "../../types/roles.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, description, permissions }: RolData) => {
    const update = useSettingsRolesStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                description,
                fullAccess: false,
                permissions: permissions.map((p) => p.permission.id)
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                description: (value) => validateDescription(value),
                permissions: (value, values) => {
                    if (!values.fullAccess && value.length === 0) {
                        return "Debes seleccionar al menos un permiso";
                    }
                    return null;
                },
            }}
            successTitle="Rol Editado"
            successMessage="El rol fue editado correctamente"
            errorTitle="Error al editar rol"
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