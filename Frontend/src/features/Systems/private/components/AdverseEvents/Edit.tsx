import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useAdverseEventsStore } from "../../store"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validatePdf } from "@/utils/validators"

export const Edit = ({ id, fileName }: any) => {
    const { openModal } = useModalStore()
    const { update } = useAdverseEventsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            file: null as File | null,
        },
        validate: {
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData();

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
        />
    )
}