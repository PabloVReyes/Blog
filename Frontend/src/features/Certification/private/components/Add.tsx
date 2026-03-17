import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils/validators"
import { useCertificationStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const Add = () => {
    const add = useCertificationStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            isNew: true,
            section: null,
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            section: (value) => validateSelect(value, { required: true }),
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
            formData.append("section", String(values.section))

            if (values.file) {
                formData.append("file", values.file)
            }

            await add(formData)
        },
        {
            successTitle: "Certificación creada",
            successMessage: "La certificación ha sido creada correctamente",
            errorTitle: "Error al agregar certificación"
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

// 79 lineas -> 65 lineas -> 57 lineas