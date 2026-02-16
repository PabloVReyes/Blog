import { useModalStore } from "@/layout";
import { Button, Group, Stack, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useState } from "react";
import { useAreasStore } from "../../store";
import { IconCheck } from "@tabler/icons-react";
import { Notify } from "@/ui";

const MAX_NAME_LENGTH = 150

export const Edit = ({ id, name }: any) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { closeModal, openModal } = useModalStore()
    const { update } = useAreasStore()

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

            await update(id, props)

            openModal({
                title: "Área editada",
                subtitle: "El área ha sido editada",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            el área se ha editado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al editar el área",
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
                    label="Nombre"
                    description="Nombre del área"
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