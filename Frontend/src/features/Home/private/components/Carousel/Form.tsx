import { IndicatorGroup, ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { Divider, Fieldset, FileInput, Stack, Text, TextInput } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";

export interface CarouselFormValues {
    isActive: boolean;
    title: string;
    description: string;
    image: File | null;
    type: "page" | "file" | "null"
    url: string | null;
    file: File | null;
}

interface Props {
    form: UseFormReturnType<CarouselFormValues>;
    activeIndex: number;
    submitLabel: string;
    setActiveIndex: (index: number) => void;
    onSubmit: (values: CarouselFormValues) => void;
    isLoading?: boolean;
    fileName?: string | null;
    imageName?: string;
}

export const Form = ({
    form,
    activeIndex,
    setActiveIndex,
    onSubmit,
    submitLabel,
    isLoading = false,
    fileName,
    imageName
}: Props) => {
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack gap="md">
                <Fieldset legend="Configuración del Carrusel">
                    <Switch
                        label="Visible"
                        description="Determina si esta diapositiva aparecerá en el carrusel público"
                        checked={form.values.isActive} // IMPORTANTE: Usar checked para booleanos
                        {...form.getInputProps("isActive", { type: "checkbox" })}
                    />

                    <Divider my="sm" />

                    <TextInput
                        label="Título"
                        withAsterisk
                        description="Texto principal que se mostrará sobre la imagen"
                        placeholder="Ej. Bienvenidos al Portal"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.title?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("title")}
                    />

                    <Divider my="sm" />

                    <TextInput
                        label="Descripción"
                        withAsterisk
                        description="Texto secundario o informativo"
                        placeholder="Ej. Conoce nuestras nuevas instalaciones"
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                    />

                    <Divider my="sm" />

                    <FileInput
                        withAsterisk
                        label="Imagen de fondo"
                        description={
                            imageName ?
                                `Imagen actual: ${imageName}` :
                                "Sube una imagen optimizada (recomendado 1920x600px)"
                        }
                        placeholder="seleccionar-imagen.jpg"
                        accept="image/*"
                        clearable
                        {...form.getInputProps("image")}
                    />
                </Fieldset>

                <Fieldset legend="Acciones">
                    <IndicatorGroup
                        label="Tipo de interacción"
                        description="¿Qué sucederá cuando el usuario haga clic en este carrusel?"
                        items={["Ninguna", "Enlace Externo", "Descargar Archivo"]}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />

                    {activeIndex === 1 && (
                        <Stack gap="sm" mt="md">
                            <Divider />
                            <TextInput
                                withAsterisk
                                label="URL de destino"
                                description="Dirección web a la que redirigir (incluye http:// o https://)"
                                placeholder="https://www.google.com"
                                {...form.getInputProps("url")}
                            />
                        </Stack>
                    )}

                    {activeIndex === 2 && (
                        <Stack gap="sm" mt="md">
                            <Divider />
                            <FileInput
                                withAsterisk
                                label="Archivo adjunto"
                                description={
                                    fileName ?
                                        `Archivo actual: ${fileName}` :
                                        "El usuario descargará este archivo al hacer clic"
                                }
                                accept=".pdf,.doc,.docx"
                                placeholder="documento.pdf"
                                clearable
                                {...form.getInputProps("file")}
                            />
                        </Stack>
                    )}
                </Fieldset>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    );
};