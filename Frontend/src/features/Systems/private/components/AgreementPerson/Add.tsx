import { useForm } from "@mantine/form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateName, validateSelect } from "@/utils/validators"
import { useAgreementPersonStore } from "../../store"

export const AddAgreementPerson = () => {
    const { add } = useAgreementPersonStore();
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            group: null,
            zone: null,
            type: "HOLDER" as "HOLDER" | "DEPENDENT",
            holder: null,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            group: (value) => validateSelect(value, { required: true }),
            zone: (value) => validateSelect(value, { required: true }),
            holder: (value, values) => validateSelect(value, { required: values.type === "DEPENDENT" })
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await add(values)
            showSuccessModal("Paciente de Convenio Creado", "El paciente de convenio fue creado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al editar paciente de convenio",
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

// 71 lineas -> 53 lineas