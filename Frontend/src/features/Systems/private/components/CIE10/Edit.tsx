import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateCode, validateName } from "@/utils/validators"
import { useSystemsCIE10Store } from "@/stores"

interface Props {
    id: string;
    name: string;
}

export const Edit = ({ id, name }: Props) => {
    const update = useSystemsCIE10Store(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: id,
            name,
        },
        validate: {
            code: validateCode,
            name: (value) => validateName(value, { required: true }),
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(id, values)
            showSuccessModal("Enfemedad Editada", "La enfermedad fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar enfermedad",
                message: error instanceof Error ? error.message : "Error desconocido"
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

// 65 lineas