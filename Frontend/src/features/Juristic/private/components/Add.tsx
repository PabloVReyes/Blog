import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateFile, validateName } from "@/utils/validators"
import { useJuristicStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const Add = () => {
    const add = useJuristicStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            isNew: true,
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
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
            if (values.file) {
                formData.append("file", values.file)
            }
            await add(formData)
        },
        {
            successTitle: "Disposición Juridica Creada",
            successMessage: "La disposición juridica fue creada correctamente",
            errorTitle: "Error al crear disposición juridica"
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

// 78 lineas -> 57 lineas -> 52 lineas