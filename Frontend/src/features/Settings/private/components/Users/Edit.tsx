import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateEmail, validateName } from "@/utils"
import { useSettingsUsersStore } from "@/stores"

export interface Data {
    id: string;
    name: string;
    email: string;
    active: boolean;
    lastLoginAt: Date;
    createdAt: Date;
    roles: RoleElement[];
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
    const update = useSettingsUsersStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            email: file.email,
            active: file.active,
            roles: file.roles.map((r: any) => r.role.id)
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            email: (value) => validateEmail(value, { required: true }),
            roles: (value) => {
                if (value.length === 0) {
                    return "Debes seleccionar al menos un rol";
                }
                return null;
            },
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(file.id.toString(), values)
            showSuccessModal("Usuario Editado", "El usuario fue editado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar sistema",
                message: error.message
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

// 93 lineas -> 76 lineas