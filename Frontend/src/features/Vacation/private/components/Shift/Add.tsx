import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useVacationShiftStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddShift = () => {
    const add = useVacationShiftStore(s => s.add);

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
            successTitle: "Turno Creado",
            successMessage: "El turno fue creado correctamente",
            errorTitle: "Error al crear Turno"
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

// 68 lineas -> 60 lineas -> 46 lineas