import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateCode, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useClinicalPracticeGuidelinesStore } from "../../store"

export const AddClinicalPracticeGuidelines = () => {
    const { openModal } = useModalStore()
    const { add } = useClinicalPracticeGuidelinesStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: "",
            title: "",
            category: "",
            er: null as File | null,
            rr: null as File | null
        },
        validate: {
            title: validateTitle,
            code: validateCode,
            category: (value) => validateSelect(value, { required: true }),
            er: (value) => validatePdf(value, { required: true }),
            rr: (value) => validatePdf(value, { required: true })
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