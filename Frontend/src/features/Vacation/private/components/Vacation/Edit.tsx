import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateFile, validateSelect } from "@/utils"
import { useVacationStore } from "@/stores"
import type { VacationsData } from "@/features/Vacation/types/vacations.types"

export const Edit = (file: VacationsData) => {
    const update = useVacationStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            type: file.type as "CALENDAR" | "INDEX",
            shift: String(file.shiftId),
            file: null as File | null
        },
        validate: {
            type: (value) => validateSelect(value, { required: true }),
            shift: (value) => validateSelect(value, { required: true }),
            file: (value) => validateFile(value, { required: true, existingFileName: file.file?.name })
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

            await update?.(file.id.toString(), formData)
            showSuccessModal("Vacaciones Editadas", "Las vacaciones fueron editadas correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar vacaciones",
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
            fileName={file.file?.name}
        />
    )
}

// 96 lineas -> 79 lineas