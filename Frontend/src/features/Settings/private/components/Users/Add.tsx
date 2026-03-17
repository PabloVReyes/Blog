import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateEmail, validateName } from "@/utils/validators"
import { useSettingsUsersStore } from "@/stores"

export const AddUsers = () => {
    const add = useSettingsUsersStore(s => s.add);
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
            await add?.(values)
            showSuccessModal("Usuario Creado", "El usuario fue creado correctamente")
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

// 74 lineas -> 56 lineas