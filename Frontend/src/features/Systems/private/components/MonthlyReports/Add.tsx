import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validatePdf, validateTitle, validateYear } from "@/utils/validators"
import { useMonthlyReportsStore } from "../../store"

export const AddMonthlyReports = () => {
    const { openModal } = useModalStore()
    const { add } = useMonthlyReportsStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title: "",
            description: "",
            type: "MONTHLY" as "MONTHLY" | "ANNUAL" | "STATISTICAL" | "EXTRA",
            month: "1",
            year: "",
            file: null as File | null
        },
        validate: {
            title: validateTitle,
            year: (value) => validateYear(value, { required: true, min: 1900, max: 2100 }),
            file: (value) => validatePdf(value, { required: true })
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

            formData.append("file", values.file!)

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