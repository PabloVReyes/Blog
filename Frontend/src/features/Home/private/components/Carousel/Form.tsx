import { IndicatorGroup, Switch } from "@/components"
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants"
import { useModalStore } from "@/layout"
import { Button, Divider, Fieldset, FileInput, Group, Stack, Text, TextInput } from "@mantine/core"

interface Props {
    form: any
    activeIndex: number
    submitLabel: string
    setActiveIndex: (index: number) => void
    onSubmit: (values: any) => void
    isLoading?: boolean
    fileName?: string
    imageName?: string
}

export const Form = ({ form, activeIndex, setActiveIndex, onSubmit, submitLabel, isLoading = false, fileName, imageName }: Props) => {
    const { closeModal } = useModalStore()

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Carrusel">
                    <Switch
                        label="Visible"
                        withAsterisk
                        value={form.values.isActive}
                        {...form.getInputProps("isActive", { type: "checkbox" })}
                        description="El carusel es visible"
                    />

                    <Divider />

                    <TextInput
                        label="Titulo"
                        withAsterisk
                        description="Titulo que se mostrara sobre la imagen en el carrusel"
                        placeholder="Title"
                        {...form.getInputProps("title")}
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.title?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                    />

                    <Divider />

                    <TextInput
                        label="Descripción"
                        withAsterisk
                        description="Selecciona la descripción de la imagen en el carrusel"
                        placeholder="Descripción"
                        {...form.getInputProps("description")}
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                    />

                    <Divider />

                    <FileInput
                        withAsterisk
                        label="Imagen"
                        description={
                            imageName ?
                                `La imagen cargada es ${imageName}` :
                                "Selecciona una imagen para mostrar en el carrusel"
                        }
                        placeholder={"imagen.jpg"}
                        accept="image/*"
                        {...form.getInputProps("image")}
                    />
                </Fieldset>

                <Fieldset legend="Al dar clic">
                    <IndicatorGroup
                        label="Tipo de contenido"
                        description="Selecciona el tipo de contenido que se mostrará al hacer clic en la imagen del carrusel"
                        items={["Ninguna", "Enlace", "Archivo"]}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />

                    {activeIndex === 1 &&
                        <div>
                            <Divider />

                            <TextInput
                                withAsterisk
                                label="URL"
                                description="Ingresa la URL a la que se dirigirá el usuario al hacer clic en la imagen del carrusel"
                                placeholder="https://ejemplo.com"
                                {...form.getInputProps("url")}
                            />
                        </div>
                    }

                    {activeIndex === 2 &&
                        <div>
                            <Divider />

                            <FileInput
                                withAsterisk
                                label="Archivo"
                                description={
                                    fileName ?
                                        `El archivo cargado es ${fileName}` :
                                        "Selecciona un archivo que se descargará al hacer clic en la imagen del carrusel"
                                }
                                accept=".pdf"
                                placeholder="archivo.pdf"
                                {...form.getInputProps("file")}
                            />
                        </div>
                    }
                </Fieldset>

                <Group gap={5} justify="flex-end">
                    <Button
                        variant="outline"
                        onClick={closeModal}
                    >
                        Cerrar
                    </Button>
                    <Button
                        type="submit"
                        loading={isLoading}
                    >
                        {submitLabel}
                    </Button>
                </Group>
            </Stack>
        </form>
    )
}