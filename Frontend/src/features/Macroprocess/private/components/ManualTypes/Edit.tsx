import { useModalStore } from "@/layout";
import { Button, Divider, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react";
import { ColorSelect } from "@/components";
import { useManualsTypesStore } from "../../store";
import { IconCheck } from "@tabler/icons-react";
import { Notify } from "@/ui";

const MAX_CODE_LENGTH = 10
const MAX_NAME_LENGTH = 50

export const Edit = ({ id, name, color }: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { closeModal, openModal } = useModalStore()
    const { update } = useManualsTypesStore()

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: id,
            name: name,
            color: color
        },
        validate: {
            code: (value) => value.length > 1 ? null : "Ingresa un código",
            name: (value) => value.length > 3 ? null : "Ingresa un nombre de manual",
            color: (value) => value.length > 2 ? null : "Selecciona un color para el código"
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const props = {
                code: values.code,
                name: values.name,
                color: values.color
            }

            await update(id, props)

            openModal({
                title: "Tipo de manual editado",
                subtitle: "El tipo de manual ha sido editado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            el tipo de manual se ha editado correctamente.
                        </Text>
                    </Stack>
                ),
            });
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

                <Group justify="flex-end" gap={5}>
                    <Button
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cerrar
                    </Button>
                    <Button
                        type="submit"
                        loading={loading}
                    >
                        Editar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}