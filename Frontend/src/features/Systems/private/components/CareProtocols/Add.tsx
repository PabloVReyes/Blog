import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateDescription, validatePdf, validateSelect, validateTitle } from "@/utils"
import { useSystemsCareProtocolsApiStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddCareProtocols = () => {
    const add = useSystemsCareProtocolsApiStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title: "",
            description: "",
            category: "",
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            category: (value) => validateSelect(value, { required: true }),
            file: (value) => validatePdf(value, { required: true })
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            const formData = new FormData();
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("category", values.category)
            if (values.file) {
                formData.append("file", values.file!)
            }
            await add(formData)
        },
        {
            successTitle: "Protocolo de Atención Creado",
            successMessage: "El protocolo de atención fue creado correctamente",
            errorTitle: "Error al crear protocolo de atención"
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

// 79 lineas -> 59 lineas -> 53 lineas