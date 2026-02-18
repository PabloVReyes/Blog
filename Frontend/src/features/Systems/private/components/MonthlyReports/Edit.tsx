import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useMonthlyReportsStore } from "../../store"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validatePdf, validateTitle, validateYear } from "@/utils/validators"

export const Edit = ({ id, title, fileName, description, type, month, period }: any) => {
    const { openModal } = useModalStore()
    const { update } = useMonthlyReportsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title,
            description,
            type: type as "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA",
            month: String(month),
            year: String(period.year),
            file: null as File | null
        },
        validate: {
            title: validateTitle,
            year: (value) => validateYear(value, { required: true, min: 1900, max: 2100 }),
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData();
            formData.append("title", values.title)

            if (values.description.trim() !== "") {
                formData.append("description", values.description)
            }

            formData.append("type", values.type)

            if (values.type === "MONTHLY") {
                formData.append("month", values.month)
            }

            formData.append("year", values.year)

            if(values.file) {
                formData.append("file", values.file!)
            } 

            await update(id, formData)

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
            fileName={fileName}
        />
    )
}