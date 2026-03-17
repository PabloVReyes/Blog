import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils/validators"
import { useUVEHStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const Add = () => {
    const add = useUVEHStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            isNew: true,
            category: null,
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            category: (value) => validateSelect(value, { required: true }),
            file: (value) => validateFile(value, { required: true })
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("description", values.description)
            formData.append("isNew", String(values.isNew))
            formData.append("category", String(values.category))
            if (values.file) {
                formData.append("file", values.file)
            }
            await add(formData)
        },
        {
            successTitle: "UVEH Creado",
            successMessage: "UVEH fue creado correctamente",
            errorTitle: "Error al crear UVEH"
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

// 79 lineas -> 62 lineas -> 54 lineas