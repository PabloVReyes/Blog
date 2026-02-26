import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useCareProtocolsStore } from "../../store"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateDescription, validatePdf, validateSelect, validateTitle } from "@/utils/validators"

export const Edit = ({ id, title, fileName, description, category }: any) => {
    const { openModal } = useModalStore()
    const { update } = useCareProtocolsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title,
            description,
            category: String(category.id),
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            category: (value) => validateSelect(value, { required: true }),
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
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

            await update(id, formData)

            openModal({
                title: "Guía actualizada",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            La guía se actualizo correctamente
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar el algoritmo",
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
            fileName={fileName}
            initialCategory={{
                value: category?.id?.toString(),
                label: category?.name
            }}
        />
    )
}