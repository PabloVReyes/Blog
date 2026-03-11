import { useForm } from "@mantine/form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateDescription, validateName } from "@/utils/validators"
import { useRolesStore } from "../../store"

export const AddRoles = () => {
    const { openModal } = useModalStore()
    const { add } = useRolesStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            fullAccess: false,
            permissions: [] as string[],
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: (value) => validateDescription(value),
            permissions: (value, values) => {
                if (!values.fullAccess && value.length === 0) {
                    return "Debes seleccionar al menos un permiso";
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