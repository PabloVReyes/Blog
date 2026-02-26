import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateDescription, validatePdf, validateSelect, validateTitle } from "@/utils"
import { useCareProtocolsStore } from "../../store"

export const AddCareProtocols = () => {
    const { openModal } = useModalStore()
    const { add } = useCareProtocolsStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title: "",
            description: "",
            category: "",
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            category: (value) => validateSelect(value, { required: true }),
            file: (value) => validatePdf(value, { required: true })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData();
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("category", values.category)

            if (values.file) {
                formData.append("file", values.file!)
            }

            await add(formData)

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
            Notify({
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