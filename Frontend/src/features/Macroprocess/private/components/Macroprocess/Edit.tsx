import { useModalStore } from "@/layout";
import { Button, FileInput, Group, Stack, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMacroprocessStore } from "../../store";
import { useState } from "react";
import { IconCheck } from "@tabler/icons-react";
import { Notify } from "@/ui";
import { validatePdf } from "@/utils";

interface Props {
    id: string,
    fileName?: string | null
}

export const Edit = ({ id, fileName }: Props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const { openModal } = useModalStore()
    const { closeModal } = useModalStore()
    const { update } = useMacroprocessStore()

    const form = useForm({
        mode: "controlled",
        initialValues: {
            file: null as File | null
        },
        validate: {
            file: (value) => validatePdf(value, { required: true, existingFileName: fileName })
        },
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            const formData = new FormData();
            formData.append("file", values.file!);

            await update(id, formData)

            openModal({
                title: "Manual editado",
                subtitle: "El manual ha sido editado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            el manual se ha editado correctamente.
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
                <FileInput
                    label="Archivo"
                    description={
                        fileName
                            ? `Archivo actual: ${fileName}`
                            : "Selecciona un archivo PDF"
                    }
                    placeholder="Manual de procedimientos PDF"
                    withAsterisk
                    accept="application/pdf"
                    required
                    {...form.getInputProps("file")}
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