import { useForm } from "@mantine/form"
import type { ItemProps } from "./type"
import { Button, Divider, FileInput, Grid, Group, Image, Stack, Switch, Text, TextInput } from "@mantine/core"
import { IconCheck, IconCircleCheck, IconX } from "@tabler/icons-react"
import { useState } from "react"
import { updateCarousel } from "@/api/carousel"
import { usePrivateHomeCarouselStore } from "@/store/pages/homeStore"
import { useModalStore } from "@/shared"

export const CmpHomeCarouselEdit = (item: ItemProps) => {
    const { closeModal, openModal } = useModalStore()
    const { fetchCarousel } = usePrivateHomeCarouselStore()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [preview, setPreview] = useState<string | null>(null);

    const form = useForm({
        initialValues: {
            title: item.title,
            description: item.description,
            file: null as File | null,
            url: item.url,
            is_visible: item.is_visible
        },
        validate: {
            title: (value) => (value.trim().length < 3 ? "Agrega un titulo mas largo" : null),
            description: (value) => (value.trim().length < 5 ? "Agregar una descripcion mas detallada" : null),
            file: (value) => !item.image && value === null ? "Debes seleccionar una imagen" : null,
            url: (value) => (value.trim().length < 5 ? "Agregar toda la URL de la pagina" : null)
        }
    })

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setIsLoading(true)

            const formData = new FormData()

            formData.append("title", values.title)
            formData.append("description", values.description)
            formData.append("url", values.url)
            formData.append("is_visible", String(values.is_visible))

            if (values.file) {
                formData.append("file", values.file)
            }

            await updateCarousel(item.id, formData)

            setTimeout(() => {
                openModal({
                    title: "Cambios guardados",
                    subtitle: "El item fue actualizado correctamente",
                    content: (
                        <Stack align="center" p="xl">
                            <IconCircleCheck size={60} color="green" />
                            <Text ta="center">
                                La información ha sido actualizada exitosamente.
                            </Text>
                        </Stack>
                    )
                });

                fetchCarousel();

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
        form.setFieldValue("file", file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setPreview(null);
        }
    };

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap={"xs"}>
                <Group justify="space-between" wrap="nowrap" gap="xl">
                    <div>
                        <Text size="sm">Visible</Text>
                        <Text size="xs" c="dimmed">Mostrar o no en el carrusel</Text>
                    </div>
                    <Switch
                        size="md"
                        {...form.getInputProps("is_visible", { type: "checkbox" })}
                        thumbIcon={
                            form.values.is_visible ? (
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
                <Divider />
                <TextInput
                    withAsterisk
                    label="Titulo"
                    description="Titulo de la imagen, el cual aparecera sobre esta"
                    placeholder="Title"
                    {...form.getInputProps("title")}
                />
                <Divider />
                <TextInput
                    withAsterisk
                    label="Descripcion"
                    description="Decripcion de la imagen, el cual aparecera sobre esta"
                    placeholder="Description"
                    {...form.getInputProps("description")}
                />
                <Divider />

                <Grid>
                    <Grid.Col span={"auto"}>
                        <FileInput
                            label="Imagen"
                            description="Imagen que se mostrar en el carrosel"
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
                        /> :
                        <Image
                            p={"sm"}
                            src={item.image}
                            alt="Preview"
                            w={200}
                            h={"auto"}
                        />
                    }
                </Grid>

                <TextInput
                    withAsterisk
                    label="Ir a"
                    description="URL de la pagina a la cual sera dirigido al dar clic sobre la imagen"
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