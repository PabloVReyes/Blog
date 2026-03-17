import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils/validators"
import { useDirectoryStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const Add = () => {
    const add = useDirectoryStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            phone: "",
            name: "",
            level: null,
            boss: "",
            secretary: "",
            email: ""

        },
        validate: {
            phone: (value) => validateExtension(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            level: (value) => validateSelect(value, { required: true }),
            boss: (value, values) => validateName(value, { required: values.boss.length > 0 }),
            secretary: (value, values) => validateName(value, { required: values.secretary.length > 0 }),
            email: (value, values) => validateEmail(value, { required: values.email.length > 0 }),
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            await add(values)
        },
        {
            successTitle: "Extensión Telefónica creada",
            successMessage: "Se ha creado una nueva extensión telefónica",
            errorTitle: "Error al crear extensión"
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

// 75 lineas -> 57 lineas -> 51 lineas