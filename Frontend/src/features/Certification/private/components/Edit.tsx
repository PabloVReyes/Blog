import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useCertificationStore } from "@/stores"
import type { CertificationData } from "../../types/certification.types"

export const Edit = (file: CertificationData) => {
    const update = useCertificationStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            isNew: file.isNew,
            section: String(file.sectionId),
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            section: (value) => validateSelect(value, { required: true }),
            file: (value) => validateFile(value, { required: true, existingFileName: file.file?.name })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("name", values.name)
            formData.append("description", values.description)
            formData.append("isNew", String(values.isNew))
            formData.append("section", String(values.section))
            if (values.file) {
                formData.append("file", values.file)
            }

            await update?.(file.id.toString(), formData)

            showSuccessModal("Certificado Editado", "El certificado fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar certificado",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Editar"
            isLoading={loading}
            fileName={file.file?.name}
        />
    )
}