import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useDownloadsStore } from "../../store"

export interface Datum {
    id: number;
    name: string;
    description: null | string;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    type: "DOCUMENT" | "IMAGE";
    isNew: boolean;
    isActive: boolean;
    order: null;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    order: null;
    isActive: boolean;
    sectionId: number;
    createdAt: Date;
    updatedAt: Date;
    section: Category;
    areaId: number;
    area: Area;
}

export interface Area {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const Edit = (file: Datum) => {
    const { update } = useDownloadsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<any>({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            isNew: file.isNew,
            type: file.type as "DOCUMENT" | "IMAGE",
            area: String(file.category.section?.areaId),
            section: String(file.category.sectionId),
            category: String(file.categoryId),
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            type: (value) => validateSelect(value, { required: true }),
            area: (value) => validateSelect(value, { required: true }),
            section: (value, values) => validateSelect(value, { required: values.area != null }),
            category: (value, values) => validateSelect(value, { required: values.section != null }),
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
            formData.append("type", values.type)
            formData.append("category", String(values.category))
            if (values.file) {
                formData.append("file", values.file)
            }

            await update(file.id.toString(), formData)
            showSuccessModal("Descarga Editada", "La descarga fue editada correctamente")
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

// 134 lineas -> 118 lineas