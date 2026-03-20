import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateCodeMedicine, validateName, validatePresentation } from "@/utils"
import { useSystemsCBIMStore } from "@/stores"

interface Props {
    id: string;
    name: string;
    code: string;
    description: string;
    cbt_cae: string | null;
    sp: string;
    fpgc: string;
}

export const Edit = ({ id, name, code, description, cbt_cae, sp, fpgc }: Props) => {
    const update = useSystemsCBIMStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code,
            name,
            description,
            sp,
            fpgc,
            cbt_cae
        },
        validate: {
            code: (value) => validateCodeMedicine(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            description: validatePresentation
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(id, values)
            showSuccessModal("Medicamento Editado", "El medicamento fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar medicamento",
                message: error instanceof Error ? error.message : "Error desconocido"
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
        />
    )
}

// 70 lineas -> 53 lineas