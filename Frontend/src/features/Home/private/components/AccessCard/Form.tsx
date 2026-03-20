import { ColorSelect, IconSelect, IndicatorGroup, ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { getTablerIcon } from "@/helpers";
import { Divider, Fieldset, FileInput, Group, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import React from "react";

export interface QuickAccessFormValues {
    isActive: boolean;
    title: string;
    description: string;
    icon: string;
    color: string;
    url?: string;
    file?: File | null;
    [key: string]: unknown;
}

interface Props<T extends QuickAccessFormValues> {
    form: UseFormReturnType<T>;
    activeIndex: number;
    submitLabel: string;
    setActiveIndex: (index: number) => void;
    onSubmit: (values: T) => void;
    isLoading?: boolean;
    fileName?: string | null;
}

export const Form = <T extends QuickAccessFormValues>({
    form,
    activeIndex,
    submitLabel,
    setActiveIndex,
    onSubmit,
    isLoading,
    fileName
}: Props<T>) => {

    const Icon = getTablerIcon(form.values.icon)

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Sistema">
                    <Switch
                        label="Visible"
                        withAsterisk
                        checked={form.values.isActive as boolean}
                        {...form.getInputProps("isActive", { type: "checkbox" })}
                        description="El acceso rápido es visible"
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
                                {(form.values.title as string)?.length || 0}/{MAX_TITLE_LENGTH}
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
                                {(form.values.description as string)?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                    />
                </Fieldset>

                <Fieldset legend="Icono">
                    <Group justify="space-between" align="center" wrap="nowrap">
                        <IconSelect form={form} />
                        <ColorSelect form={form} />

                        <Divider orientation="vertical" />

                        <ThemeIcon
                            size={56}
                            color={form.values.color as string}
                            variant="light"
                            style={{
                                '--icon-rgb': (form.values.color as string) || "#40c057"
                            } as React.CSSProperties}
                        >
                            {Icon ? <Icon size={32} stroke={1.5} /> : null}
                        </ThemeIcon>
                    </Group>
                </Fieldset>

                <Fieldset legend="Al dar clic">
                    <IndicatorGroup
                        label="Tipo de contenido"
                        description="Selecciona el tipo de contenido que se mostrará al hacer clic sobre el acceso rápido"
                        items={["Enlace", "Archivo"]}
                        activeIndex={activeIndex}
                        onChange={setActiveIndex}
                    />

                    {activeIndex === 0 && (
                        <div>
                            <Divider />
                            <TextInput
                                withAsterisk
                                label="URL"
                                description="Ingresa la URL a la que se dirigirá el usuario"
                                placeholder="https://ejemplo.com"
                                {...form.getInputProps("url")}
                            />
                        </div>
                    )}

                    {activeIndex === 1 && (
                        <div>
                            <Divider />
                            <FileInput
                                withAsterisk
                                label="Archivo"
                                description={
                                    fileName ?
                                        `El archivo cargado es ${fileName}` :
                                        "Selecciona un archivo para descargar"
                                }
                                accept=".pdf"
                                placeholder="archivo.pdf"
                                {...form.getInputProps("file")}
                            />
                        </div>
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