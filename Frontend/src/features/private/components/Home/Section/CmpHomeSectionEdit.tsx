import { updateSection } from "@/api/sections"
import { useModalStore } from "@/store/modalStore"
import { usePrivateHomeSectionStore } from "@/store/pages/homeStore"
import { Button, Divider, FileInput, Grid, Group, Image, Stack, Switch, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { IconCheck, IconCircleCheck, IconX } from "@tabler/icons-react"
import { useState } from "react"

export const CmpHomeSectionEdit = (item: any) => {
    const { closeModal, openModal } = useModalStore()
    const { fetchSections } = usePrivateHomeSectionStore()
    const [preview, setPreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm({
        initialValues: {
            title: item.title,
            content: item.content,
            file: null as File | null,
            image: item.image ? true : false,
            url: "",
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setIsLoading(true)

            const formData = new FormData()

            formData.append("title", values.title)
            formData.append("content", values.content)
            formData.append("url", values.url)
            formData.append("image", String(values.image))

            if (values.file) {
                formData.append("file", values.file)
            }

            await updateSection(item.id, formData)

            setTimeout(() => {
                openModal({
                    title: "Cambios guardados",
                    subtitle: "La seccion fue actualizado correctamente",
                    content: (
                        <Stack align="center" p="xl">
                            <IconCircleCheck size={60} color="green" />
                            <Text ta="center">
                                La seccion ha sido actualizada exitosamente.
                            </Text>
                        </Stack>
                    )
                });

                fetchSections();

                setTimeout(() => {
                    closeModal();
                }, 2500);

            }, 1000);
        } catch (error) {
            console.error(error)
        } finally {
            setTimeout(() => setIsLoading(false), 1000);
        }
    }

    const handleFileChange = (file: File | null) => {
        form.setFieldValue("file", file)

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreview(null)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={"xs"}>
                <TextInput
                    withAsterisk
                    label="Titulo"
                    description="Titulo que se mostrara en la parte superior de la seccion"
                    placeholder="Title"
                    {...form.getInputProps("title")}
                />
                <Divider />
                <TextInput
                    label="Contenido"
                    description="Texto que se mostrar dentro de la seccion"
                    placeholder="Content"
                    {...form.getInputProps("content")}
                />
                <Divider />
                <Group justify="space-between" wrap="nowrap" gap="xl">
                    <div>
                        <Text size="sm">Imagen</Text>
                        <Text size="xs" c="dimmed">Imagen en la seccion</Text>
                    </div>
                    <Switch
                        size="md"
                        {...form.getInputProps("image", { type: "checkbox" })}
                        thumbIcon={
                            form.values.image ? (
                                <IconCheck
                                    size={12}
                                    color="light-dark(var(--mantine-primary-color-6), var(--mantine-primary-color-8))"
                                    stroke={3}
                                />
                            ) : (
                                <IconX size={12} color="red" stroke={3} />
                            )
                        }
                    />
                </Group>
                {form.values.image && (
                    <Grid>
                        <Grid.Col span={"auto"}>
                            <FileInput
                                placeholder="Da clic para seleccionar una imagen de tu equipo"
                                accept="image/png,image/jpeg,image/jpg"
                                {...form.getInputProps("file")}
                                onChange={handleFileChange}
                            />
                        </Grid.Col>
                        {preview ?
                            <Image
                                p={"sm"}
                                src={preview}
                                alt="Preview"
                                w={200}
                                h={"auto"}
                            /> : (item.image &&
                                <Image
                                    p={"sm"}
                                    src={item.image}
                                    alt="Preview"
                                    w={200}
                                    h={"auto"}
                                />
                            )
                        }
                    </Grid>
                )}
                <Divider />
                <TextInput
                    label="Ir a"
                    description="URL de la pagina a la cual sera dirigido al dar clic sobre la seccion"
                    placeholder="https://"
                    {...form.getInputProps("url")}
                />
                <Group
                    mt={"lg"}
                    gap={5}
                    justify="flex-end"
                >
                    <Button
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        loading={isLoading}
                    >
                        Editar
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}