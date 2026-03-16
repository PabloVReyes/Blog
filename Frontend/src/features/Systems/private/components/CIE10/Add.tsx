import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateCode, validateName } from "@/utils/validators"
import { useCIE10Store } from "../../store"

export const AddCIE10 = () => {
    const { add } = useCIE10Store();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: "",
            name: "",
        },
        validate: {
            code: validateCode,
            name: (value) => validateName(value, { required: true })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await add(values)
            showSuccessModal("Enfermedad Creada", "La enfermedad fue creada correctamente")
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

// 66 lineas -> 48 lineas