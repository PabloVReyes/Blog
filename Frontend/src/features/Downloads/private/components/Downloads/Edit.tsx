import { Form, type FormValues } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useDownloadStore } from "@/stores"
import type { DownloadData } from "@/features/Downloads/types/download.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, description, isNew, type, category, categoryId, file }: DownloadData) => {
    const update = useDownloadStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name: name,
                description: description,
                isNew: isNew,
                type: type as "DOCUMENT" | "IMAGE",
                area: String(category.section?.areaId),
                section: String(category.sectionId),
                category: String(categoryId),
                file: null as File | null
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                type: (value) => validateSelect(value, { required: true }),
                area: (value) => validateSelect(value, { required: true }),
                section: (value, values) => validateSelect(value, { required: values.area != null }),
                category: (value, values) => validateSelect(value, { required: values.section != null }),
                file: (value) => validateFile(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Descarga Editada"
            successMessage="La descarga fue editada correctamente"
            errorTitle="Error al actualizar descarga"
            onSubmit={async (id, values) => {
                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description)
                formData.append("isNew", String(values.isNew))
                formData.append("type", values.type)
                formData.append("category", String(values.category))
                if (values.file) {
                    formData.append("file", values.file)
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