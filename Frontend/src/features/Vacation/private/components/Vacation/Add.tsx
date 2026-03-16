import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateFile, validateSelect } from "@/utils/validators"
import { useVacationStore } from "../../store"

export const AddVacation = () => {
    const { add } = useVacationStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            type: "CALENDAR" as "CALENDAR" | "INDEX",
            shift: null,
            file: null as File | null
        },
        validate: {
            type: (value) => validateSelect(value, { required: true }),
            shift: (value) => validateSelect(value, { required: true }),
            file: (value) => validateFile(value, { required: true })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("type", values.type)
            formData.append("shift", String(values.shift))
            if (values.file) {
                formData.append("file", values.file)
            }
            await add(formData)
            showSuccessModal("Vacaciones Creadas", "Las vacaciones fueron creadas correctamente")
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

// 75 lineas -> 56 lineas