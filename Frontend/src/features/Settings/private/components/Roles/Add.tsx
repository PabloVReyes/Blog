import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateDescription, validateName } from "@/utils/validators"
import { useSettingsRolesStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddRoles = () => {
    const add = useSettingsRolesStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            description: "",
            fullAccess: false,
            permissions: [] as string[],
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: (value) => validateDescription(value),
            permissions: (value, values) => {
                if (!values.fullAccess && value.length === 0) {
                    return "Debes seleccionar al menos un permiso";
                }
                return null;
            },
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            await add(values)
        },
        {
            successTitle: "Rol Creado",
            successMessage: "El rol fue creado correctamente",
            errorTitle: "Error al crear rol"
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

// 74 lineas -> 56 lineas -> 50 lineas