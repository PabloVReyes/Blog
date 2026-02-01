import { useForm } from "@mantine/form"
import { type SystemProps } from "../../types"
import { Form, FormValidate } from "./Form"
import { useSystemsStore } from "../store/Systems"
import { notify } from "@/utils/notify"
import { useModalStore } from "@/shared"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"

interface Props extends SystemProps {
    id: string
}

export const Edit = ({ id, icon, color, name, description, url }: Props) => {
    const { openModal } = useModalStore()
    const { update } = useSystemsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<SystemProps>({
        mode: "controlled",
        initialValues: {
            icon,
            color,
            name,
            description,
            url
        },
        validate: FormValidate
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update(id, values)
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
            notify({
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