import { Form, type FormValues } from "./Form"
import { validateDescription, validateKeyPermission, validateName } from "@/utils"
import { useSettingsPermissionsStore } from "@/stores"
import type { PermissionData } from "../../types/permissions.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, description, isActive, permissionKey }: PermissionData) => {
    const update = useSettingsPermissionsStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                description,
                isActive,
                key: permissionKey
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                description: (value) => validateDescription(value),
                key: (value) => validateKeyPermission(value, { required: true })
            }}
            successTitle="Permiso Editado"
            successMessage="El permiso fue editado correctamente"
            errorTitle="Error al editar permiso"
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