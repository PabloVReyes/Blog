import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateDescription, validateName } from "@/utils"
import { useSettingsRolesStore } from "@/stores"

export interface Data {
    id: string;
    name: string;
    description: string;
    _count: Count;
    permissions: PermissionElement[];
}

export interface Count {
    users: number;
    permissions: number;
}

export interface PermissionElement {
    permission: PermissionPermission;
}

export interface PermissionPermission {
    id: string;
    name: string;
    key: string;
    description: string;
    isActive: boolean;
}

export const Edit = (file: Data) => {
    const update = useSettingsRolesStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            fullAccess: false,
            permissions: file.permissions.map((p) => p.permission.id)
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: (value) => validateDescription(value),
            permissions: (value, values) => {
                if (!values.fullAccess && value.length === 0) {
                    return "Debes seleccionar al menos un permiso";
                }
                return null;
            },
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(file.id.toString(), values)
            showSuccessModal("Rol Editado", "El rol fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar rol",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Editar"
            isLoading={loading}
        />
    )
}

// 98 lineas -> 81 lineas