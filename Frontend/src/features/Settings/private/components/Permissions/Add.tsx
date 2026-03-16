import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateDescription, validateKeyPermission, validateName } from "@/utils/validators"
import { usePermissionsStore } from "../../store"

export const AddPermissions = () => {
    const { add } = usePermissionsStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            active: true,
            name: "",
            description: "",
            key: "",
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: (value) => validateDescription(value),
            key: (value) => validateKeyPermission(value, { required: true })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await add(values)
            showSuccessModal("Permiso Creado", "El permiso fue creado correctamente")
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

// 68 lineas