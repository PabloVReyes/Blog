import { useForm } from "@mantine/form"
import { useCarouselStore } from "../../store";
import { useState } from "react";
import { Form } from "./Form";
import { Notify, showSuccessModal } from "@/ui";
import { validateDescription, validateImage, validatePdf, validateTitle, validateUrl } from "@/utils";

interface Props {
    sectionId: string;
}

export const AddCarousel = ({ sectionId }: Props) => {
    const { add } = useCarouselStore()
    const [loading, setLoading] = useState<boolean>(false)
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

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
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
            showSuccessModal("Carrusel Creado", "El carrusel fue creado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al agregar carrusel",
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
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}

// 103 lineas -> 83 lineas