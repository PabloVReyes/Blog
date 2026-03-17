import { useForm } from "@mantine/form"
import { useState } from "react";
import { Notify, showSuccessModal } from "@/ui";
import { validateDescription, validatePdf, validateTitle, validateUrl } from "@/utils";
import { Form } from "./Form";
import { useHomeAccessCardStore } from "@/stores";

const typeOptions = ["page", "file"] as const;


export const Edit = ({ id, title, description, icon, color, type, url, fileName, isActive }: any) => {
    const update = useHomeAccessCardStore(s => s.update)
    const initialActive = typeOptions.indexOf(type ?? "page");
    const [active, setActive] = useState(initialActive);
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title: title,
            color: color,
            icon: icon,
            description: description,
            isActive: isActive,
            file: null as File | null,
            url: url,
            type: "page" as "page" | "file"
        },
        validate: {
            title: validateTitle,
            description: validateDescription,
            url: (value) => validateUrl(value, { required: active === 0 }),
            file: (value) => validatePdf(value, { required: active === 1, existingFileName: fileName })
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData();
            formData.append("isActive", values.isActive)
            formData.append("title", values.title)
            formData.append("color", values.color)
            formData.append("icon", values.icon)
            formData.append("description", values.description)
            formData.append("url", values.url)

            if (active === 0) {
                formData.append("type", "page")
            } else if (active === 1) {
                formData.append("type", "file")
            }

            if (active === 1 && values.file) {
                formData.append("file", values.file!)
            }

            await update?.(id, formData)
            showSuccessModal("Acceso Rápido Editado", "El acceso rápido fue editado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar acceso rápido",
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
            isLoading={loading}
        />
    )
}

// 99 lienas -> 83 lineas 