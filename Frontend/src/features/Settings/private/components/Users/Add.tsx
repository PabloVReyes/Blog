import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateEmail, validateName } from "@/utils/validators"
import { useSettingsUsersStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddUsers = () => {
    const add = useSettingsUsersStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            active: true,
            name: "",
            email: "",
            roles: [] as string[]
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            email: (value) => validateEmail(value, { required: true }),
            roles: (value) => {
                if (value.length === 0) {
                    return "Debes seleccionar al menos un rol";
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
            successTitle: "Usuario Creado",
            successMessage: "El usuario fue creado correctamente",
            errorTitle: "Error al crear usuario"
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