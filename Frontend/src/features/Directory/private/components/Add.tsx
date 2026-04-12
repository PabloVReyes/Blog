import { Form, type FormValues } from "./Form"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils/validators"
import { useDirectoryStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const Add = () => {
    const add = useDirectoryStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                phone: "",
                name: "",
                level: null,
                boss: "",
                secretary: "",
                email: ""
            }}
            validate={{
                phone: (value) => validateExtension(value, { required: true }),
                name: (value) => validateName(value, { required: true }),
                level: (value) => validateSelect(value, { required: true }),
                boss: (value, values) => validateName(value, { required: (values.boss && values.boss.length > 0) ? true : false }),
                secretary: (value, values) => validateName(value, { required: (values.secretary && values.secretary.length > 0) ? true : false }),
                email: (value, values) => validateEmail(value, { required: (values.email && values.email.length > 0) ? true : false }),
            }}
            successTitle="Extensión Telefónica creada"
            successMessage="Se ha creado una nueva extensión telefónica"
            errorTitle="Error al crear extensión"
            onSubmit={async (values) => {
                await add?.(values)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Agregar"
                    isLoading={loading}
                />
            )}
        />
    )
}