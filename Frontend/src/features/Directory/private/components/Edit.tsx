import { Form, type FormValues } from "./Form"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils"
import { useDirectoryStore } from "@/stores"
import { CrudEditDialog } from "@/components"
import type { DirectoryData } from "../types/directory.types"

export const Edit = ({ id, phone, boss, email, name, secretary, levelId }: DirectoryData) => {
    const update = useDirectoryStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                phone: phone,
                name: name,
                level: String(levelId),
                boss: boss ?? "",
                secretary: secretary ?? "",
                email: email ?? ""
            }}
            validate={{
                phone: (value) => validateExtension(value, { required: true }),
                name: (value) => validateName(value, { required: true }),
                level: (value) => validateSelect(value, { required: true }),
                boss: (value, values) => validateName(value, { required: !!values.boss && values.boss.length > 3 }),
                secretary: (value, values) => validateName(value, { required: !!values.secretary && values.secretary.length > 3 }),
                email: (value, values) => validateEmail(value, { required: !!values.email && values.email.length > 3 })
            }}
            successTitle="Extensión Telefónica Editada"
            successMessage="La extensión telefónica ha sido editada correctamente"
            errorTitle="Error al editar extensión telefónica"
            onSubmit={async (id, values) => {
                await update?.(id, values)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                />
            )}
        />
    )
}