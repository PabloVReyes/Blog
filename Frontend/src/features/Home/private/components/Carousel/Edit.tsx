import { useModalStore } from "@/layout"
import { Stack, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react"
import { useCarouselStore } from "../../store"
import { IconCheck } from "@tabler/icons-react"
import { Notify } from "@/ui"
import { Form } from "./Form"
import { validateDescription, validateTitle, validateUrl, validatePdf, validateImage } from "@/utils"

const typeOptions = ["null", "page", "file"] as const;

export const Edit = ({ id, title, description, fileName, imageName, type, url, isActive }: any) => {
    const { openModal } = useModalStore()
    const { update } = useCarouselStore()
    const [loading, setLoading] = useState<boolean>(false)
    const initialActive = typeOptions.indexOf(type ?? "null");
    const [active, setActive] = useState(initialActive);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            isActive,
            title,
            description,
            image: null as File | null,
            type: type as "page" | "file" | "null",
            url: url,
            file: null as File | null
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            url: (value) => validateUrl(value, { required: active === 1 }),
            file: (value) => validatePdf(value, { required: active === 2 }),
            image: (value) => validateImage(value, { required: false })
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData();
            formData.append("isActive", String(values.isActive))
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("url", values.url)

            if (values.image) {
                formData.append("image", values.image!)
            }

            if (active === 1) {
                formData.append("type", "page")
            } else if (active === 2) {
                formData.append("type", "file")
            } else {
                formData.append("type", "null")
            }

            if (values.file && active === 2) {
                formData.append("file", values.file!)
            }

            await update(id, formData)

            openModal({
                title: "Carrusel actualizado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El carrusel ha sido actualizado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar carrusel",
                message: error.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form
            form={form}
            activeIndex={active}
            setActiveIndex={setActive}
            onSubmit={handleSubmit}
            submitLabel="Editar"
            fileName={fileName}
            imageName={imageName}
            isLoading={loading}
        />
    )
}