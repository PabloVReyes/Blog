import { useState } from "react"
import { Form, type FormValues } from "./Form"
import { validateColor, validateDescription, validateIcon, validateName, validatePdf, validateUrl } from "@/utils/validators"
import { useSystemsStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddSystem = () => {
    const add = useSystemsStore(s => s.add);
    const [active, setActive] = useState(0);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                acronym: "",
                icon: "",
                color: "",
                name: "",
                description: "",
                url: "",
                type: "page" as "page" | "file",
                file: null as File | null,
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                description: validateDescription,
                icon: validateIcon,
                color: validateColor,
                url: (value) => validateUrl(value, { required: active === 0 }),
                file: (value) => validatePdf(value, { required: active === 1 })
            }}
            successTitle="Sistema Creado"
            successMessage="El sistema fue creado correctamente"
            errorTitle="Error al crear el sistema"
            onSubmit={async (values) => {
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