import { useState } from "react";
import { Form, type FormValues } from "./Form";
import { validateColor, validateDescription, validateIcon, validatePdf, validateTitle, validateUrl } from "@/utils";
import { useHomeAccessCardStore } from "@/stores";
import { CrudAddDialog } from "@/components";

interface Props {
    sectionId: string;
}

export const AddAccessCard = ({ sectionId }: Props) => {
    const add = useHomeAccessCardStore(s => s.add)
    const [active, setActive] = useState(0);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                isActive: true,
                title: "",
                color: "",
                icon: "",
                description: "",
                file: null as File | null,
                url: "",
                type: "page" as "page" | "file" | "null"
            }}
            validate={{
                title: validateTitle,
                color: validateColor,
                icon: validateIcon,
                description: validateDescription,
                url: (value) => validateUrl(value, { required: active === 0 }),
                file: (value) => validatePdf(value, { required: active === 1 }),
            }}
            successTitle="Acceso Rápido Creado"
            successMessage="El acceso rápido fue creado correctamente"
            errorTitle="Error al crear acceso rápido"
            onSubmit={async (values) => {
                const formData = new FormData();
                formData.append("isActive", String(values.isActive))
                formData.append("title", values.title)
                formData.append("color", values.color)
                formData.append("icon", values.icon)
                formData.append("description", values.description)
                formData.append("url", values.url!)
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