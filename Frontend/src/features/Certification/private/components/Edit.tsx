import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useCertificationStore } from "../store"

export interface Data {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    sectionId: number;
    createdAt: Date;
    updatedAt: Date;
    section: Section;
}

export interface Section {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export const Edit = (file: Data) => {
    const { update } = useCertificationStore()
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
            file: (value) => validateFile(value, { required: true, existingFileName: file.fileName })
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

            await update(file.id.toString(), formData)

            showSuccessModal("Certificación Editada", "La certificación ha sido editada correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar sistema",
                message: error.message
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
            fileName={file.fileName}
        />
    )
}