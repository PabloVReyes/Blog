import { Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react";
import { Notify, showSuccessModal } from "@/ui";
import { MAX_TITLE_LENGTH } from "@/constants";
import { ModalButtons } from "@/components";
import { useMacroprocessAreaStore } from "@/stores";

interface Props {
    id: string;
    name: string;
}

export const Edit = ({ id, name }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const update = useMacroprocessAreaStore(s => s.update)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: name,
        },
        validate: {
            name: (value) => value.length > 3 ? null : "Ingresa un nombre de manual",
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const props = {
                name: values.name,
            }
            await update?.(id, props)
            showSuccessModal("Área Editada", "El área fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar el área",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <TextInput
                    withAsterisk
                    label="Nombre"
                    description="Nombre del área"
                    placeholder="Procedimientos"
                    maxLength={MAX_TITLE_LENGTH}
                    rightSection={
                        <Text size="xs" c="dimmed">
                            {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                        </Text>
                    }
                    {...form.getInputProps("name")}
                    rightSectionWidth={50}
                />

                <ModalButtons
                    label="Editar"
                    loading={loading}
                />
            </Stack>
        </form>
    )
}

// 93 lineas -> 66 lineas