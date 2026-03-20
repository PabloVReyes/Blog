import type { UseFormReturnType } from "@mantine/form"
import { Divider, Fieldset, FileInput, Group, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import { ColorSelect, IconSelect, IndicatorGroup, ModalButtons } from "@/components";
import type { SystemProps } from "@/features/Systems/types";
import { MAX_ACRONYM_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { getTablerIcon } from "@/helpers";

interface Props {
    form: UseFormReturnType<SystemProps>;
    onSubmit: (values: SystemProps) => void;
    submitLabel: string;
    isLoading?: boolean;
    activeIndex: number,
    setActiveIndex: (index: number) => void
    fileName?: string | null;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading, activeIndex, setActiveIndex, fileName }: Props) => {
    const Icon = getTablerIcon(form.values.icon)

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <TextInput
                        withAsterisk
                        label="Nombre corto"
                        description="Nombre corto del sistema"
                        placeholder="Ej. SICA"
                        maxLength={MAX_ACRONYM_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.acronym?.length || 0}/{MAX_ACRONYM_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={30}
                        {...form.getInputProps("acronym")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre del sistema"
                        placeholder="Ej. Sistema Integral Clinico Administrativo"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("name")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Descripción"
                        description="Descripción el cual tendra el sistemas"
                        placeholder="Ej. Sistema Integral Medico Administrativo"
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.trim().length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                    />

                    <Divider />

                </Fieldset>

                <Fieldset legend="Icono">
                    <Group justify="space-between" align="center" wrap="nowrap">
                        <IconSelect
                            form={form}
                        />
                        <ColorSelect
                            form={form}
                        />
                        <Divider orientation="vertical" />
                        <ThemeIcon
                            size={56}
                            color={form.values.color}
                            variant="light"
                            style={{
                                '--icon-rgb': form.values.color || "#40c057" // fallback green
                            } as React.CSSProperties}
                            className="themeIcon"
                        >
                            {Icon ? <Icon /> : null}
                        </ThemeIcon>
                    </Group>
                </Fieldset>

                <Fieldset legend="Al acceder">
                    <IndicatorGroup
                        label="Tipo de contenido"
                        description="Selecciona el tipo de contenido que se mostrará al acceder al sistema"
                        items={["Encale", "Archivo"]}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />

                    {activeIndex === 0 &&
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

                    {activeIndex === 1 &&
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

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}