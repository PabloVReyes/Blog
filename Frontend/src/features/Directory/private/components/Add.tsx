import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils/validators"
import { useDirectoryStore } from "../store"

export const Add = () => {
    const { openModal } = useModalStore()
    const { add } = useDirectoryStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            phone: "",
            name: "",
            level: null,
            boss: "",
            secretary: "",
            email: ""

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

            await add(values)

            openModal({
                title: "Área agregado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El área ha sido agregado correctamente.
                        </Text>
                    </Stack>
                ),
            });

        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al agregar área",
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