import { useForm } from "@mantine/form"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateName, validateSelect } from "@/utils/validators"
import { useAgreementPersonStore } from "../../store"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"

export const AddAgreementPerson = () => {
    const { openModal } = useModalStore()
    const { add } = useAgreementPersonStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            group: null,
            zone: null,
            type: "HOLDER" as "HOLDER" | "DEPENDENT",
            holder: null,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            group: (value) => validateSelect(value, { required: true }),
            zone: (value) => validateSelect(value, { required: true }),
            holder: (value, values) => validateSelect(value, { required: values.type === "DEPENDENT" })
        },
    });

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
                title: "Error al editar paciente de convenio",
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