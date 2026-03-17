import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateDescription, validateOrder, validatePdf, validateSelect, validateTitle } from "@/utils"
import { useSystemsGPCStore } from "@/stores"

export const AddGCP = () => {
    const add = useSystemsGPCStore(s => s.add);
    const [loading, setLoading] = useState<boolean>(false)

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

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("cycle", values.cycle)
            formData.append("orderIndex", String(values.orderIndex))

            if (values.file) {
                formData.append("file", values.file!)
            }
            await add?.(formData)
            showSuccessModal("Algoritmo GPC Creado", "El algoritmo GPC fue creado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al agregar sistema",
                message: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}

// 82 lineas -> 93 lineas