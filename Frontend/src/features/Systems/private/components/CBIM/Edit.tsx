import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useCBIMStore } from "../../store"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateCodeMedicine, validateName, validatePresentation } from "@/utils/validators"

export const Edit = ({ id, name, code, description, cbt_cae, sp, fpgc }: any) => {
    const { openModal } = useModalStore()
    const { update } = useCBIMStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code,
            name,
            description,
            sp,
            fpgc,
            cbt_cae
        },
        validate: {
            code: (value) => validateCodeMedicine(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            description: validatePresentation
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            await update(id, values)

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
        />
    )
}