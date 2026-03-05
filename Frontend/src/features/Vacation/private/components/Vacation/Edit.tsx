import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { Stack, Text } from "@mantine/core"
import { IconCheck } from "@tabler/icons-react"
import { useState } from "react"
import { useModalStore } from "@/layout"
import { Notify } from "@/ui"
import { validateFile, validateSelect } from "@/utils"
import { useVacationStore } from "../../store"
// import { useJuristicStore } from "../store"

export interface Data {
    id: number;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    type: string;
    shiftId: number;
    createdAt: Date;
    shift: Shift;
}

export interface Shift {
    id: number;
    name: string;
    icon: string;
    color: string;
    createdAt: Date;
    updatedAt: Date;
}


export const Edit = (file: Data) => {
    const { openModal } = useModalStore()
    const { update } = useVacationStore()
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            type: file.type as "CALENDAR" | "INDEX",
            shift: String(file.shiftId),
            file: null as File | null
        },
        validate: {
            type: (value) => validateSelect(value, { required: true }),
            shift: (value) => validateSelect(value, { required: true }),
            file: (value) => validateFile(value, { required: true, existingFileName: file.fileName })
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData()
            formData.append("type", values.type)
            formData.append("shift", String(values.shift))
            if (values.file) {
                formData.append("file", values.file)
            }

            await update(file.id.toString(), formData)

            openModal({
                title: "Sistema actualizado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El sistema ha sido actualizado correctamente.
                        </Text>
                    </Stack>
                ),
            });
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
            fileName={file.fileName}
        />
    )
}