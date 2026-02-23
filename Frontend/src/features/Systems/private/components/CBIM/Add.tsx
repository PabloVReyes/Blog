import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateCodeMedicine, validateName, validatePresentation } from "@/utils/validators"
import { useCBIMStore } from "../../store"

export const AddCBIM = () => {
    const { openModal } = useModalStore()
    const { add } = useCBIMStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: "",
            name: "",
            description: "",
            sp: "",
            fpgc: "",
            cbt_cae: "CAE"
        },
        validate: {
            code: (value) => validateCodeMedicine(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            description: validatePresentation,
            cbt_cae: (value) => value.length < 1 ? "Este dato es necesario" : null
        }
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