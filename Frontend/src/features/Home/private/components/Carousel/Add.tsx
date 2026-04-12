import { useState } from "react";
import { Form, type FormValues } from "./Form";
import { validateDescription, validateImage, validatePdf, validateTitle, validateUrl } from "@/utils";
import { useHomeCarouselStore } from "@/stores";
import { CrudAddDialog } from "@/components";

interface Props {
    sectionId: string;
}

export const AddCarousel = ({ sectionId }: Props) => {
    const add = useHomeCarouselStore(s => s.add)
    const [active, setActive] = useState(0);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                isActive: true,
                title: "",
                type: "page" as "page" | "file" | "null",
                description: "",
                image: null as File | null,
                file: null as File | null,
                url: ""
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                image: (value) => validateImage(value),
                url: (value) => validateUrl(value, { required: active === 1 }),
                file: (value) => validatePdf(value, { required: active === 2 }),
            }}
            successTitle="Carrusel Creado"
            successMessage="El carrusel fue creado correctamente"
            errorTitle="Error al crear carrusel"
            onSubmit={async (values) => {
                if (!add) throw new Error("Add no definido")
                const formData = new FormData();
                formData.append("isActive", String(values.isActive))
                formData.append("title", values.title)
                formData.append("description", values.description)
                formData.append("url", values.url!)
                formData.append("sectionId", sectionId)
                if (active === 1) {
                    formData.append("type", "page")
                } else if (active === 2) {
                    formData.append("type", "file")
                } else {
                    formData.append("type", "null")
                }
                if (values.image) {
                    formData.append("image", values.image!)
                }
                if (active === 2 && values.file) {
                    formData.append("file", values.file)
                }
                await add?.(formData)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    activeIndex={active}
                    setActiveIndex={setActive}
                    onSubmit={execute}
                    submitLabel="Agregar"
                    isLoading={loading}
                />
            )}
        />
    )
}