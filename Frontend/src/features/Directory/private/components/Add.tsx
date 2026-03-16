import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils/validators"
import { useDirectoryStore } from "../store"

export const Add = () => {
    const { add } = useDirectoryStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            phone: "",
            name: "",
            level: null,
            boss: "",
            secretary: "",
            email: ""

        },
        validate: {
            phone: (value) => validateExtension(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            level: (value) => validateSelect(value, { required: true }),
            boss: (value) => validateName(value, { required: true }),
            secretary: (value) => validateName(value, { required: true }),
            email: (value) => validateEmail(value, { required: true }),
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await add(values)
            showSuccessModal("Extensión Telefónica creada", "Se ha creado una nueva extensión telefónica")
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

// 75 lineas -> 57 lineas