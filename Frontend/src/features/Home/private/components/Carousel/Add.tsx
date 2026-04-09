import { useForm } from "@mantine/form"
import { useState } from "react";
import { Form } from "./Form";
import { validateDescription, validateImage, validatePdf, validateTitle, validateUrl } from "@/utils";
import { useHomeCarouselStore } from "@/stores";
import { useFormSubmit } from "@/hooks";

interface Props {
    sectionId: string;
}

export const AddCarousel = ({ sectionId }: Props) => {
    const add = useHomeCarouselStore(s => s.add)
    const [active, setActive] = useState(0);


    const form = useForm({
        mode: "controlled",
        initialValues: {
            isActive: true,
            title: "",
            description: "",
            image: null as File | null,
            file: null as File | null,
            url: "",
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            image: (value) => validateImage(value),
            url: (value) => validateUrl(value, { required: active === 1 }),
            file: (value) => validatePdf(value, { required: active === 2 }),
        },
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            const formData = new FormData();
            formData.append("isActive", String(values.isActive))
            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("url", values.url)
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
            await add(formData)
        },
        {
            successTitle: "Carrusel Creado",
            successMessage: "El carrusel fue creado correctamente",
            errorTitle: "Error al crear carrusel",
        }
    )

    return (
        <Form
            form={form}
            activeIndex={active}
            setActiveIndex={setActive}
            onSubmit={handleSubmit}
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}