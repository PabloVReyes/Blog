import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateFile, validateSelect } from "@/utils/validators"
import { useVacationStore } from "../../store"

export const AddVacation = () => {
    const { openModal } = useModalStore()
    const { add } = useVacationStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            type: "CALENDAR" as "CALENDAR" | "INDEX",
            shift: null,
            file: null as File | null
        },
        validate: {
            type: (value) => validateSelect(value, { required: true }),
            shift: (value) => validateSelect(value, { required: true }),
            file: (value) => validateFile(value, { required: true })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData()
            formData.append("type", values.type)
            formData.append("shift", String(values.shift))
            if (values.file) {
                formData.append("file", values.file)
            }

            await add(formData)

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