import { Form, type FormValues } from "./Form"
import { validateCode, validateName } from "@/utils/validators"
import { useSystemsCIE10Store } from "@/stores"
import { CrudEditDialog } from "@/components"
import type { CIE10Data } from "../../types/CIE10.types"

export const Edit = ({ id, name }: CIE10Data) => {
    const update = useSystemsCIE10Store(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                code: id,
                name,
            }}
            validate={{
                code: validateCode,
                name: (value) => validateName(value, { required: true }),
            }}
            successTitle="Enfemedad Editada"
            successMessage="La enfermedad fue editada correctamente"
            errorTitle="Error al editar enfermedad"
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