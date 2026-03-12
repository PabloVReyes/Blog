import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateEmail, validateName } from "@/utils/validators"
import { useUserStore } from "../../store"

export const AddUsers = () => {
    const { openModal } = useModalStore()
    const { add } = useUserStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            active: true,
            name: "",
            email: "",
            roles: [] as string[]
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            email: (value) => validateEmail(value, { required: true }),
            roles: (value) => {
                if (value.length === 0) {
                    return "Debes seleccionar al menos un rol";
                }
                return null;
            },
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            await add(values)

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