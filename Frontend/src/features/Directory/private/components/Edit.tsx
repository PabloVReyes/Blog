import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { useState } from "react"
import { Notify, showSuccessModal } from "@/ui"
import { validateEmail, validateExtension, validateName, validateSelect } from "@/utils"
import { useDirectoryStore } from "@/stores"

export interface EditFormValues {
    phone: string;
    name: string;
    level: string;
    boss: string;
    secretary: string;
    email: string;
    // Firma de índice para compatibilidad con el componente Form genérico
    [key: string]: unknown;
}

export interface EditProps {
    id: string;
    phone: string;
    name: string;
    levelId: string;
    boss: string | null;
    secretary: string | null;
    email: string | null;
}

export const Edit = ({ id, phone, boss, email, name, secretary, levelId }: EditProps) => {
    const update = useDirectoryStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<EditFormValues>({
        mode: "controlled",
        initialValues: {
            phone: phone,
            name: name,
            level: String(levelId),
            boss: boss ?? "",
            secretary: secretary ?? "",
            email: email ?? ""
        },
        validate: {
            phone: (value) => validateExtension(value, { required: true }),
            name: (value) => validateName(value, { required: true }),
            level: (value) => validateSelect(value, { required: true }),
            boss: (value, values) => validateName(value, { required: !!values.boss && values.boss.length > 3 }),
            secretary: (value, values) => validateName(value, { required: !!values.secretary && values.secretary.length > 3 }),
            email: (value, values) => validateEmail(value, { required: !!values.email && values.email.length > 3 }),
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(id, values)
            showSuccessModal("Extensión Telefónica Editada", "La extensión telefónica ha sido editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar extensión telefónica",
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
        />
    )
}

// 89 lineas -> 72 lineas