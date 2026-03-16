import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useAreasStore } from "../../store"

export const Edit = ({ id, icon, color, name }: any) => {
    const { update } = useAreasStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<any>({
        mode: "controlled",
        initialValues: {
            name,
            icon,
            color
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            icon: validateIcon,
            color: validateColor,
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update(id, values)
            showSuccessModal("Área Editada", "El áerea se ha editado correctamente")
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

// 68 lineas -> 50 lineas