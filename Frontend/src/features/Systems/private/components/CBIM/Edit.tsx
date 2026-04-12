import { Form, type FormValues } from "./Form"
import { validateCodeMedicine, validateName, validatePresentation } from "@/utils"
import { useSystemsCBIMStore } from "@/stores"
import type { CBIMData } from "../../types/CBIM.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, code, description, cbt_cae, sp, fpgc }: CBIMData) => {
    const update = useSystemsCBIMStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                code,
                name,
                description,
                sp,
                fpgc,
                cbt_cae
            }}
            validate={{
                code: (value) => validateCodeMedicine(value, { required: true }),
                name: (value) => validateName(value, { required: true }),
                description: validatePresentation
            }}
            successTitle="Medicamento Editado"
            successMessage="El medicamento fue editado correctamente"
            errorTitle="Error al editar medicamento"
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