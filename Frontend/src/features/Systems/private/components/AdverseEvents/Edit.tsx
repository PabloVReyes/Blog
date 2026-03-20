import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validatePdf } from "@/utils/validators"
import { useSystemsAdverseEventsStore } from "@/stores"

interface Props {
    id: string;
    fileName?: string
}

export const Edit = ({ id, fileName }: Props) => {
    const update = useSystemsAdverseEventsStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            file: null as File | null,
        },
        validate: {
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            if (values.file) {
                formData.append("file", values.file!)
            }
            await update?.(id, formData)
            showSuccessModal("Evento Adverso Editado", "El evento adverso fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar evento adverso",
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
            fileName={fileName}
        />
    )
}

// 70 lineas -> 51 lineas