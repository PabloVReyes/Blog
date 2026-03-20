import { useForm } from "@mantine/form"
import { type SystemProps } from "../../../types"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateColor, validateDescription, validateIcon, validateName, validatePdf, validateUrl } from "@/utils/validators"
import { useSystemsStore } from "@/stores"

export interface Props {
    id: string;
    acronym: string;
    name: string;
    description: string;
    color: string;
    icon: string;
    url: string;
    type: null;
    fileName: null | string | undefined;
    storedName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    createdAt: Date;
    updatedAt: Date;
}


const typeOptions = ["page", "file"] as const;

export const Edit = ({ id, icon, color, name, description, url, acronym, type, fileName }: Props) => {
    const update = useSystemsStore(s => s.update)
    const initialActive = typeOptions.indexOf(type ?? "page");
    const [active, setActive] = useState(initialActive);
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<SystemProps>({
        mode: "controlled",
        initialValues: {
            acronym,
            icon,
            color,
            name,
            description,
            url,
            type: "page" as "page" | "file",
            file: null as File | null,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            description: validateDescription,
            icon: validateIcon,
            color: validateColor,
            url: (values) => validateUrl(values, { required: active === 0 }),
            file: (values) => validatePdf(values, { required: active === 1, existingFileName: fileName })
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

            await update?.(id, formData)

            showSuccessModal("Sistema Editado", "El sistema fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar sistema",
                message: error instanceof Error ? error.message : "Error desconocido"
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
            fileName={fileName}
            activeIndex={active}
            setActiveIndex={setActive}
        />
    )
}

// 114 lineas -> 99 lineas