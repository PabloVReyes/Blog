import { useState } from "react"
import { Form, type FormValues } from "./Form"
import { validateDescription, validateTitle, validateUrl, validatePdf, validateImage } from "@/utils"
import { useHomeCarouselStore } from "@/stores"
import type { CarouselData } from "@/features/Home/types/carousel.types"
import { CrudEditDialog } from "@/components"

const typeOptions = ["null", "page", "file"] as const;

export const Edit = ({ id, title, description, file, imageName, type, url, isActive }: CarouselData) => {
    const update = useHomeCarouselStore(s => s.update)
    const initialActive = typeOptions.indexOf(type ?? "null");
    const [active, setActive] = useState(initialActive);

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                isActive,
                title,
                description,
                image: null as File | null,
                type: type as "page" | "file" | "null",
                url: url,
                file: null as File | null
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                url: (value) => validateUrl(value, { required: active === 1 }),
                file: (value) => validatePdf(value, { required: active === 2, existingFileName: file?.name }),
                image: (value) => validateImage(value, { required: false })
            }}
            successTitle="Carrusel Editado"
            successMessage="El carrusel fue editado correctamente"
            errorTitle="Error al editar carrusel"
            onSubmit={async (id, values) => {
                const formData = new FormData();
                formData.append("isActive", String(values.isActive))
                formData.append("title", values.title)
                formData.append("description", values.description)

                if (values.url) {
                    formData.append("url", values.url)
                }

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

                await update?.(id, formData)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    activeIndex={active}
                    setActiveIndex={setActive}
                    onSubmit={execute}
                    submitLabel="Editar"
                    fileName={file?.name}
                    imageName={imageName}
                    isLoading={loading}
                />
            )}
        />
    )
}