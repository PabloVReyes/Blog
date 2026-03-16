import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateCodeMedicine, validateName, validatePresentation } from "@/utils"
import { useCBIMStore } from "../../store"

export const AddCBIM = () => {
    const { add } = useCBIMStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: "",
            name: "",
            description: "",
            sp: "",
            fpgc: "",
            cbt_cae: "CAE"
        },
        validate: {
            code: (value) => validateCodeMedicine(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            description: validatePresentation,
            cbt_cae: (value) => value.length < 1 ? "Este dato es necesario" : null
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await add(values)
            showSuccessModal("Medicamento Creado", "El medicamento fue creado correctamente")
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

// 72 lineas -> 54 lineas