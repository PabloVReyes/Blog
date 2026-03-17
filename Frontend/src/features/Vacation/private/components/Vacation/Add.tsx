import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateFile, validateSelect } from "@/utils/validators"
import { useVacationStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddVacation = () => {
    const add = useVacationStore(s => s.add);

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

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")

            const formData = new FormData()
            formData.append("type", values.type)
            formData.append("shift", String(values.shift))

            if (values.file) {
                formData.append("file", values.file)
            }
            await add?.(formData)
        },
        {
            successTitle: "Vacaciones Creadas",
            successMessage: "Las vacaciones fueron creadas correctamente",
            errorTitle: "Error al crear vacaciones"
        }
    )

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}

// 75 lineas -> 56 lineas -> 52 lineas