import { useForm } from "@mantine/form"
import type { SystemProps } from "@/features/Systems/types"
import { useSystemsStore } from "../store"
import { notify } from "@/utils/notify"
import { Form, FormValidate } from "./Form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"

export const Add = () => {
    const { openModal } = useModalStore()
    const { add } = useSystemsStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<SystemProps>({
        mode: "controlled",
        initialValues: {
            icon: "",
            color: "",
            name: "",
            description: "",
            url: "",
        },
        validate: FormValidate
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            await add(values)

            openModal({
                title: "Sistema agregado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El sistema ha sido agregado correctamente.
                        </Text>
                    </Stack>
                ),
            });

        } catch (error: any) {
            notify({
                type: "error",
                title: "Error al agregar sistema",
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
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}