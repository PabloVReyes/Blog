import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useClinicalPracticeGuidelinesStore } from "../../store"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateCode, validatePdf, validateSelect, validateTitle } from "@/utils/validators"

export const Edit = ({ id, title, code, category, fileNameER, fileNameRR }: any) => {
    const { openModal } = useModalStore()
    const { update } = useClinicalPracticeGuidelinesStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code,
            title,
            category: String(category.id),
            er: null as File | null,
            rr: null as File | null
        },
        validate: {
            title: validateTitle,
            code: validateCode,
            category: (value) => validateSelect(value, { required: true }),
            er: (value) => validatePdf(value, { required: true, existingFileName: fileNameER }),
            rr: (value) => validatePdf(value, { required: true, existingFileName: fileNameRR })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData();
            formData.append("code", values.code)
            formData.append("title", values.title)
            formData.append("category", values.category)

            if (values.er) {
                formData.append("er", values.er!)
            }

            if (values.rr) {
                formData.append("rr", values.rr!)
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
                title: "Error al actualizar la guía",
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
            fileNameER={fileNameER}
            fileNameRR={fileNameRR}
            initialCategory={{
                value: category?.id?.toString(),
                label: category?.name
            }}
        />
    )
}