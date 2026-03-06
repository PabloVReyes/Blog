import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils"
import { useDirectoryStore } from "../store"

export interface Data {
    id: string;
    phone: string;
    boss: string;
    email: string;
    name: string;
    secretary: string;
    levelId: string;
    level: Level;
}

export interface Level {
    id: string;
    name: string;
}

export const Edit = (file: Data) => {
    const { openModal } = useModalStore()
    const { update } = useDirectoryStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<any>({
        mode: "controlled",
        initialValues: {
            phone: file.phone,
            name: file.name,
            level: String(file.levelId),
            boss: file.boss,
            secretary: file.secretary,
            email: file.email
        },
        validate: {
            phone: (value) => validateExtension(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            level: (value) => validateSelect(value, { required: true }),
            boss: (value) => validateName(value, { required: true }),
            secretary: (value) => validateName(value, { required: true }),
            email: (value) => validateEmail(value, { required: true }),
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            await update(file.id, values)

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