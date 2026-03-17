import { useForm } from "@mantine/form"
import { useState } from "react";
import { Notify, showSuccessModal } from "@/ui";
import { Form } from "./Form";
import { validateColor, validateDescription, validateIcon, validatePdf, validateTitle, validateUrl } from "@/utils";
import { useHomeAccessCardStore } from "@/stores";

interface Props {
    sectionId: string;
}

export const AddAccessCard = ({ sectionId }: Props) => {
    const add = useHomeAccessCardStore(s => s.add)
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)


    const form = useForm({
        mode: "controlled",
        initialValues: {
            isActive: true,
            title: "",
            color: "",
            icon: "",
            description: "",
            file: null as File | null,
            url: "",
            type: "page" as "page" | "file" | "null"
        },
        validate: {
            title: validateTitle,
            color: validateColor,
            icon: validateIcon,
            description: validateDescription,
            url: (value) => validateUrl(value, { required: active === 0 }),
            file: (value) => validatePdf(value, { required: active === 1 }),
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("isActive", String(values.isActive))
            formData.append("title", values.title)
            formData.append("color", values.color)
            formData.append("icon", values.icon)
            formData.append("description", values.description)
            formData.append("url", values.url)
            formData.append("sectionId", sectionId)
            if (active === 0) {
                formData.append("type", "page")
            } else if (active === 1) {
                formData.append("type", "file")
            }
            if (active === 1 && values.file) {
                formData.append("file", values.file!)
            }
            await add?.(formData)
            showSuccessModal("Acceso Rápido Creado", "El aceeso rápido fue creado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al agregar acceso rápido",
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