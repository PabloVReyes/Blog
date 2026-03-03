import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateFile, validateName, validateSelect } from "@/utils"
import { useStandarsStore } from "../store"

export interface Data {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export const Edit = (file: Data) => {
    const { openModal } = useModalStore()
    const { update } = useStandarsStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: file.name,
            description: file.description,
            isNew: file.isNew,
            category: String(file.categoryId),
            file: null as File | null
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            category: (value) => validateSelect(value, { required: true }),
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
            formData.append("category", String(values.category))
            if (values.file) {
                formData.append("file", values.file)
            }

            await update(file.id.toString(), formData)

            openModal({
                title: "Sistema actualizado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El sistema ha sido actualizado correctamente.
                        </Text>
                    </Stack>
                ),
            });
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