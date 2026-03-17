import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useDownloadAreasStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddArea = () => {
    const add = useDownloadAreasStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            icon: "",
            color: ""
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            icon: validateIcon,
            color: validateColor
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            await add(values)
        },
        {
            successTitle: "Área Creada",
            successMessage: "El área fue creada correctamente",
            errorTitle: "Error al crear el área"
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

// 68 lineas -> 50 lineas -> 43 lineas