import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateDescription, validateOrder, validatePdf, validateSelect, validateTitle } from "@/utils"
import { useSystemsGPCStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddGCP = () => {
    const add = useSystemsGPCStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title: "",
            description: "",
            cycle: "",
            orderIndex: 1,
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            cycle: (value) => validateSelect(value, { required: true }),
            orderIndex: (value) => validateOrder(value, { required: true }),
            file: (value) => validatePdf(value, { required: true })
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            const formData = new FormData();
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("cycle", values.cycle)
            formData.append("orderIndex", String(values.orderIndex))

            if (values.file) {
                formData.append("file", values.file!)
            }
            await add(formData)
        },
        {
            successTitle: "Algoritmo GPC Creado",
            successMessage: "El algoritmo GPC fue creado correctamente",
            errorTitle: "Error al crear algoritmo GPC"
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

// 82 lineas -> 93 lineas -> 57 lineas