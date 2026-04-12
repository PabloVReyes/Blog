import { Form, type FormValues } from "./Form"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useCertificationStore } from "@/stores"
import type { CertificationData } from "../../types/certification.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, description, isNew, sectionId, file }: CertificationData) => {
    const update = useCertificationStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name: name,
                description: description,
                isNew: isNew,
                section: String(sectionId),
                file: null as File | null
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                section: (value) => validateSelect(value, { required: true }),
                file: (value) => validateFile(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Certificado Editado"
            successMessage="El certificado fue editado correctamente"
            errorTitle="Error al editar certificado"
            onSubmit={async (id, values) => {
                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description)
                formData.append("isNew", String(values.isNew))
                formData.append("section", String(values.section))
                if (values.file) {
                    formData.append("file", values.file)
                }

                await update?.(id as String, formData)
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