import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateDescription, validateKeyPermission, validateName } from "@/utils"
import { usePermissionsStore } from "../../store"

export interface Data {
    id: string;
    name: string;
    description: string;
    active: boolean;
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
    const { openModal } = useModalStore()
    const { update } = usePermissionsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            active: file.active,
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