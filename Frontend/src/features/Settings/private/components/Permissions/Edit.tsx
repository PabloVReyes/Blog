import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateDescription, validateKeyPermission, validateName } from "@/utils"
import { useSettingsPermissionsStore } from "@/stores"

export interface Data {
    id: string;
    name: string;
    description: string;
    isActive: boolean;
    permissionKey: string;
    _count: Count;
    roles: RoleElement[];
}

export interface Count {
    roles: number;
}

export interface RoleElement {
    role: RoleRole;
}

export interface RoleRole {
    id: string;
    name: string;
    description: string;
}

export const Edit = (file: Data) => {
    const update = useSettingsPermissionsStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            isActive: file.isActive,
            key: file.permissionKey
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: (value) => validateDescription(value),
            key: (value) => validateKeyPermission(value, { required: true })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(file.id.toString(), values)
            showSuccessModal("Permiso Editado", "El permiso fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar permiso",
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

// 92 lineas -> 75 lineas