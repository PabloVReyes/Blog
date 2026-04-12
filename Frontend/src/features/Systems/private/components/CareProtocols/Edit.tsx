import { Form, type FormValues } from "./Form"
import { validateDescription, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsCareProtocolsApiStore } from "@/stores"
import type { CareProtocolsData } from "@/features/Systems/types/careProtocols.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, title, file, description, category }: CareProtocolsData) => {
    const update = useSystemsCareProtocolsApiStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                title,
                description,
                category: String(category.id),
                file: null as File | null,
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                category: (value) => validateSelect(value, { required: true }),
                file: (value) => validatePdf(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Protocolo de Atención Editado"
            successMessage="El protocolo de atención fue editado correctamente"
            errorTitle="Error al editar protocolo de atención"
            onSubmit={async (id, values) => {
                const formData = new FormData();
                formData.append("title", values.title)
                formData.append("description", values.description)
                formData.append("category", values.category)
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
                    initialCategory={{
                        value: category?.id?.toString(),
                        label: category?.name
                    }}
                />
            )}
        />
    )
}