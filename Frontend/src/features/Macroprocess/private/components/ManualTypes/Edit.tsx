import { Divider, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react";
import { ColorSelect, ModalButtons } from "@/components";
import { Notify, showSuccessModal } from "@/ui";
import { validateCode, validateName } from "@/utils";
import { useMacroprocessManualTypeStore } from "@/stores";

const MAX_CODE_LENGTH = 10
const MAX_NAME_LENGTH = 50

export const Edit = ({ id, name, color }: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const update = useMacroprocessManualTypeStore(s => s.update)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: id,
            name: name,
            color: color
        },
        validate: {
            code: validateCode,
            name: (value) => validateName(value, { required: true }),
            color: (value) => value.length > 2 ? null : "Selecciona un color para el código"
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            await update?.(id, values)
            showSuccessModal("Tipo de manual editado", "El tipo de manual fue editado correctamente")
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al editar manual",
                message: error.message
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
                    label="Código"
                    description="Código del manual"
                    placeholder="NSICA"
                    autoFocus
                    {...form.getInputProps("code")}
                    onChange={(event) => {
                        form.setFieldValue("code", event.currentTarget.value.toUpperCase());
                    }}
                    maxLength={MAX_CODE_LENGTH}
                    rightSection={
                        <Text size="xs" c="dimmed">
                            {form.values.code?.length || 0}/{MAX_CODE_LENGTH}
                        </Text>
                    }
                    rightSectionWidth={50}
                />
                <Divider />
                <TextInput
                    withAsterisk
                    label="Nombre"
                    description="Nombre del manual"
                    placeholder="Procedimientos"
                    maxLength={MAX_NAME_LENGTH}
                    rightSection={
                        <Text size="xs" c="dimmed">
                            {form.values.name?.length || 0}/{MAX_NAME_LENGTH}
                        </Text>
                    }
                    {...form.getInputProps("name")}
                    rightSectionWidth={50}
                />
                <Divider />

                <ColorSelect
                    type="default"
                    form={form}
                />

                <ModalButtons
                    label="Editar"
                    loading={loading}
                />
            </Stack>
        </form>
    )
}

// 127 lineas -> 95 lineas