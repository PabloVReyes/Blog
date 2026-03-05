import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateColor, validateIcon, validateName } from "@/utils"
import { useShifthStore } from "../../store"

export interface Data {
    id: number;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}


export const Edit = (file: Data) => {
    const { openModal } = useModalStore()
    const { update } = useShifthStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            icon: file.icon,
            color: file.color,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            icon: validateIcon,
            color: validateColor
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