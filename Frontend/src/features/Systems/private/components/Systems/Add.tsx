import { useForm } from "@mantine/form"
import { useState } from "react"
import { Form } from "./Form"
import { validateColor, validateDescription, validateIcon, validateName, validatePdf, validateUrl } from "@/utils/validators"
import { useSystemsStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddSystem = () => {
    const add = useSystemsStore(s => s.add);
    const [active, setActive] = useState(0);

    const form = useForm({
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

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
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
        },
        {
            successTitle: "Sistema Creado",
            successMessage: "El sistema fue creado correctamente",
            errorTitle: "Error al crear el sistema"
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

// 107 lineas -> 91 lineas -> 84 lineas