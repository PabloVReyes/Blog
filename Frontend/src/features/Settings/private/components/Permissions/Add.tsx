import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateDescription, validateKeyPermission, validateName } from "@/utils/validators"
import { useSettingsPermissionsStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddPermissions = () => {
    const add = useSettingsPermissionsStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            active: true,
            name: "",
            description: "",
            key: "",
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: (value) => validateDescription(value),
            key: (value) => validateKeyPermission(value, { required: true })
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            await add(values)
        },
        {
            successTitle: "Permiso Creado",
            successMessage: "El permiso fue creado correctamente",
            errorTitle: "Error al crear el permiso"
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

// 68 lineas -> 45 lineas