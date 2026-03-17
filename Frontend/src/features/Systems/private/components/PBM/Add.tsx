import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validatePdf, validateTitle } from "@/utils/validators"
import { useSystemsPBMStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddPBM = () => {
    const add = useSystemsPBMStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title: "",
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            file: (value) => validatePdf(value, { required: true })
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            const formData = new FormData();
            formData.append("title", values.title)
            if (values.file) {
                formData.append("file", values.file!)
            }
            await add(formData)
        },
        {
            successTitle: "Algoritmo PBM Creado",
            successMessage: "El algoritmo PBM fue creado correctamente",
            errorTitle: "Error al crear algoritmo PBM"
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

// 73 lineas -> 53 lineas -> 47 lineas