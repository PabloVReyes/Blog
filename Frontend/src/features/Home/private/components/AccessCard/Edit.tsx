import { useState } from "react";
import { validateDescription, validatePdf, validateTitle, validateUrl } from "@/utils";
import { Form, type FormValues } from "./Form";
import { useHomeAccessCardStore } from "@/stores";
import type { AccessCardData } from "@/features/Home/types/accessCard.types";
import { CrudEditDialog } from "@/components";

const typeOptions = ["page", "file"] as const;

export const Edit = ({ id, title, description, icon, color, type, url, file, isActive }: AccessCardData) => {
    const update = useHomeAccessCardStore(s => s.update)
    const initialActive = typeOptions.indexOf(type ?? "page");
    const [active, setActive] = useState(initialActive);

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                title: title,
                color: color,
                icon: icon,
                description: description,
                isActive: isActive,
                file: null as File | null,
                url: url,
                type: type as "page" | "file"
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                url: (value) => validateUrl(value, { required: active === 0 }),
                file: (value) => validatePdf(value, { required: active === 1, existingFileName: file?.name })
            }}
            successTitle="Acceso Rápido Editado"
            successMessage="El acceso rápido fue editado correctamente"
            errorTitle="Error al editar acceso rápido"
            onSubmit={async (id, values) => {
                const formData = new FormData();
                formData.append("isActive", String(values.isActive))
                formData.append("title", values.title)
                formData.append("color", values.color)
                formData.append("icon", values.icon)
                formData.append("description", values.description)

                if (values.url) {
                    formData.append("url", values.url)
                }

                if (active === 0) {
                    formData.append("type", "page")
                } else if (active === 1) {
                    formData.append("type", "file")
                }

                if (active === 1 && values.file) {
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
                    isLoading={loading}
                />
            )}
        />
    )
}