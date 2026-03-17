import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils"
import { useDirectoryStore } from "@/stores"

export interface Data {
    id: string;
    phone: string;
    boss: string;
    email: string;
    name: string;
    secretary: string;
    levelId: string;
    level: Level;
}

export interface Level {
    id: string;
    name: string;
}

export const Edit = (file: Data) => {
    const update = useDirectoryStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<any>({
        mode: "controlled",
        initialValues: {
            phone: file.phone,
            name: file.name,
            level: String(file.levelId),
            boss: file.boss ?? "",
            secretary: file.secretary ?? "",
            email: file.email ?? ""
        },
        validate: {
            phone: (value) => validateExtension(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            level: (value) => validateSelect(value, { required: true }),
            boss: (value, values) => validateName(value, { required: values.boss && values.boss.length > 3 }),
            secretary: (value, values) => validateName(value, { required: values.secretary && values.secretary.length > 3 }),
            email: (value, values) => validateEmail(value, { required: values.email && values.email.length > 3 }),
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(file.id, values)
            showSuccessModal("Extensión Telefónica Editada", "La extensión telefónica ha sido editada correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar sistema",
                message: error.message
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
        />
    )
}

// 89 lineas -> 72 lineas