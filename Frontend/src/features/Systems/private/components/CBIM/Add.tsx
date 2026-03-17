import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateCodeMedicine, validateName, validatePresentation } from "@/utils"
import { useSystemsCBIMStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddCBIM = () => {
    const add = useSystemsCBIMStore(s => s.add);

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

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            await add(values)
        },
        {
            successTitle: "Medicamento Creado",
            successMessage: "El medicamento fue creado correctamente",
            errorTitle: "Error al crear el medicamento"
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

// 72 lineas -> 54 lineas -> 48 lineas