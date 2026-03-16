import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useAreasStore } from "../../store"

export const AddArea = () => {
    const { add } = useAreasStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            icon: "",
            color: ""
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            icon: validateIcon,
            color: validateColor
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await add(values)
            showSuccessModal("Área creada", "El área se ha creado correctamente")
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

// 68 lineas -> 50 lineas 