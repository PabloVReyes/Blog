import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateDescription, validateOrder, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsGPCStore } from "@/stores"

export const Edit = ({ id, title, fileName, description, cycle, orderIndex }: any) => {
    const update = useSystemsGPCStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title,
            description,
            orderIndex,
            cycle: String(cycle.id),
            file: null as File | null,
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            cycle: (value) => validateSelect(value, { required: true }),
            orderIndex: (value) => validateOrder(value, { required: true }),
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
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

            await update?.(id, formData)
            showSuccessModal("Algoritmo GPC Editado", "El algoritmo GPC fue editado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar el algoritmo",
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
            submitLabel="Editar"
            isLoading={loading}
            fileName={fileName}
            initialCycle={{
                value: cycle?.id?.toString(),
                label: cycle?.name
            }}
        />
    )
}

// 86 lineas -> 70 lineas