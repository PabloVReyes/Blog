import { useForm } from "@mantine/form"
import type { SystemProps } from "@/features/Systems/types"
import { useSystemsStore } from "../../store"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { Form } from "./Form"
import { validateColor, validateDescription, validateIcon, validateName, validatePdf, validateUrl } from "@/utils/validators"

export const AddSystem = () => {
    const { add } = useSystemsStore();
    const [loading, setLoading] = useState<boolean>(false)
    const [active, setActive] = useState(0);

    const form = useForm<SystemProps>({
        mode: "controlled",
        initialValues: {
            acronym: "",
            icon: "",
            color: "",
            name: "",
            description: "",
            url: "",
            type: "page" as "page" | "file",
            file: null as File | null,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: validateDescription,
            icon: validateIcon,
            color: validateColor,
            url: (value) => validateUrl(value, { required: active === 0 }),
            file: (value) => validatePdf(value, { required: active === 1 })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)

            const formData = new FormData();
            if (values.acronym && values.acronym.trim() !== "") {
                formData.append("acronym", values.acronym)
            }

            if (values.name && values.name.trim() !== "") {
                formData.append("name", values.name)
            }

            formData.append("description", values.description)
            formData.append("icon", values.icon)
            formData.append("color", values.color)

            if (active === 0) {
                formData.append("type", "page")
            } else if (active === 1) {
                formData.append("type", "file")
            }

            if (active == 0 && values.url && values.url.trim() !== "") {
                formData.append("url", values.url)
            }

            if (active === 1 && values.file) {
                formData.append("file", values.file!)
            }

            await add(formData)

            showSuccessModal("Sistema Creado", "El sistema fue creado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al agregar sistema",
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

// 107 lineas -> 91 lineas