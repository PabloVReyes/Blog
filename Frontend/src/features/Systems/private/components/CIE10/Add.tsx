import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateCode, validateName } from "@/utils/validators"
import { useSystemsCIE10Store } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddCIE10 = () => {
    const add = useSystemsCIE10Store(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: "",
            name: "",
        },
        validate: {
            code: validateCode,
            name: (value) => validateName(value, { required: true })
        }
    })

    const {handleSubmit, loading} = useFormSubmit<typeof form.values>(
        async(values) => {
            if(!add) throw new Error("Add no definido")
            await add(values)
        },
        {
            successTitle: "Enfermedad Creada",
            successMessage: "La enfermedad fue creada correctamente",
            errorTitle: "Error al crear enfermedad"
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

// 66 lineas -> 48 lineas -> 42 lineas