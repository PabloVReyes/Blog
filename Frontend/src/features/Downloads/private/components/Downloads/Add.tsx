import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils/validators"
import { useDownloadStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddDownloads = () => {
    const add = useDownloadStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            isNew: true,
            type: "DOCUMENT" as "DOCUMENT" | "IMAGE",
            area: null,
            section: null,
            category: null,
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            type: (value) => validateSelect(value, { required: true }),
            area: (value) => validateSelect(value, { required: true }),
            section: (value, values) => validateSelect(value, { required: values.area != null }),
            category: (value, values) => validateSelect(value, { required: values.section != null }),
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
            formData.append("type", values.type)
            formData.append("category", String(values.category))
            if (values.file) {
                formData.append("file", values.file)
            }

            await add?.(formData)
        },
        {
            successTitle: "Descarga Creada",
            successMessage: "La descarga fue creada correctamente",
            errorTitle: "Error al crear la descarga"
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

// 86 lineas -> 69 lineas -> 62 lineas