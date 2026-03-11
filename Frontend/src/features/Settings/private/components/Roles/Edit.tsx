import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateDescription, validateName } from "@/utils"
import { useRolesStore } from "../../store"

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
    active: boolean;
}

export const Edit = (file: Data) => {
    const { openModal } = useModalStore()
    const { update } = useRolesStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            fullAccess: false,
            permissions: file.permissions.map((p: any) => p.permission.id)
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

            await update(file.id.toString(), values)

            openModal({
                title: "Sistema actualizado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El sistema ha sido actualizado correctamente.
                        </Text>
                    </Stack>
                ),
            });
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