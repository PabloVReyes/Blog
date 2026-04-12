import { Form, type FormValues } from "./Form"
import { validatePdf, validateTitle } from "@/utils/validators"
import { useSystemsPBMStore } from "@/stores"
import type { PMBData } from "@/features/Systems/types/pbm.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, title, file }: PMBData) => {
    const update = useSystemsPBMStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                title,
                file: null as File | null,
            }}
            validate={{
                title: validateTitle,
                file: (value) => validatePdf(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Algoritmo PBM Editado"
            successMessage="El algoritmo PBM fue editado correctamente"
            errorTitle="Error al editar algoritmo PBM"
            onSubmit={async (id, values) => {
                const formData = new FormData();
                formData.append("title", values.title)
                if (values.file) {
                    formData.append("file", values.file!)
                }
                await update?.(id, formData)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                    fileName={file?.name}
                />
            )}
        />
    )
}