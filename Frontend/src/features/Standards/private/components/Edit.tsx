import { Form, type FormValues } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useStandardsStore } from "@/stores"
import type { StandardsData } from "../../types/standards.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, description, isNew, categoryId, file }: StandardsData) => {
    const update = useStandardsStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                description,
                isNew,
                category: String(categoryId),
                file: null as File | null
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                category: (value) => validateSelect(value, { required: true }),
                file: (value) => validateFile(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Norma Oficial Editada"
            successMessage="La norma oficial fue editada correctamente"
            errorTitle="Error al editar norma oficial"
            onSubmit={async (id, values) => {
                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description!)
                formData.append("isNew", String(values.isNew))
                formData.append("category", String(values.category))
                if (values.file) {
                    formData.append("file", values.file)
                }
                await update?.(id.toString(), formData)
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