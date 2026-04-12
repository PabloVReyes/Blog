import { Form, type FormValues } from "./Form"
import { useState } from "react"
import { validateColor, validateDescription, validateIcon, validateName, validatePdf, validateUrl } from "@/utils/validators"
import { useSystemsStore } from "@/stores"
import type { SystemData } from "@/features/Systems/types/systems.types"
import { CrudEditDialog } from "@/components"

const typeOptions = ["page", "file"] as const;

export const Edit = ({ id, icon, color, name, description, url, acronym, type, file }: SystemData) => {
    const update = useSystemsStore(s => s.update)
    const initialActive = typeOptions.indexOf(type ?? "page");
    const [active, setActive] = useState(initialActive);

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                acronym,
                icon,
                color,
                name,
                description,
                url,
                type: "page" as "page" | "file",
                file: null as File | null,
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                description: validateDescription,
                icon: validateIcon,
                color: validateColor,
                url: (values) => validateUrl(values, { required: active === 0 }),
                file: (values) => validatePdf(values, { required: active === 1, existingFileName: file?.name })
            }}
            successTitle="Sistema Editado"
            successMessage="El sistema fue editado correctamente"
            errorTitle="Error al editar sistema"
            onSubmit={async (id, values) => {
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
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                    fileName={file?.name}
                    activeIndex={active}
                    setActiveIndex={setActive}
                />
            )}
        />
    )
}