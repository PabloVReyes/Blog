import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useDownloadAreasStore } from "@/stores"

interface Props {
    id: string;
    icon: string;
    color: string;
    name: string;
}

export const Edit = ({ id, icon, color, name }: Props) => {
    const update = useDownloadAreasStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
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
            await update?.(id, values)
            showSuccessModal("Área Editada", "El áerea fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al actualizar área",
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

// 68 lineas -> 50 lineas