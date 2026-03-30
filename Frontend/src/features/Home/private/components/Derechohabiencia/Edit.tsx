import { ColorSelect, IconSelect, ModalButtons } from "@/components"
import { Divider, Fieldset, Group, Stack, Text, TextInput, ThemeIcon } from "@mantine/core"
import { formRootRule, useForm } from "@mantine/form"
import { Notify, showSuccessModal } from "@/ui";
import { validateColor, validateDescription, validateIcon, validateTitle, validateUrl } from "@/utils";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { useState } from "react";
import { useHomeDerechohabienciaStore } from "@/stores";
import { getTablerIcon } from "@/helpers";

interface Props {
    id: string;
    icon: string;
    color: string;
    title: string;
    description: string;
    links: Links[]
}

export interface Links {
    id: string;
    title: string;
    url: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    derechohabienciaConfigId: string;
}

export const Edit = ({ id, icon, color, title, description, links }: Props) => {
    const update = useHomeDerechohabienciaStore(s => s.update)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm({
        mode: "controlled",
        initialValues: {
            title,
            icon,
            color,
            description,
            links
        },
        validate: {
            title: validateTitle,
            icon: validateIcon,
            color: validateColor,
            description: validateDescription,
            links: {
                [formRootRule]: (value) =>
                    value.length === 0 ? "Debe agregar al menos un botón" : null,

                title: (value: string) => validateTitle(value),
                url: (value: string) => validateUrl(value, { required: true }),
            },
        }
    })

    const Icon = getTablerIcon(form.values.icon)

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true)
            await update?.(id, values)
            showSuccessModal("Segunda Sección Editada", "La segunda sección fue editada correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al editar segunda sección",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack>
                <Fieldset legend="Contenido">
                    <TextInput
                        withAsterisk
                        label="Título"
                        description="Título del calendario"
                        placeholder="Calendario"
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
                        withAsterisk
                        label="Descripción"
                        description="Descripción del calendario"
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

                <Fieldset legend="Botones">
                    {form.values.links.map((_, index: number) => (
                        <div key={form.key(`links.${index}`)}>
                            <Group justify="space-between">
                                <TextInput
                                    withAsterisk
                                    label="Nombre"
                                    description="Nombre del botón"
                                    placeholder="Name"
                                    style={{ flex: "1 1 auto" }}
                                    {...form.getInputProps(`links.${index}.title`)}
                                    maxLength={MAX_TITLE_LENGTH}
                                    rightSection={
                                        <Text size="xs" c="dimmed">
                                            {form.values.links[index]?.title?.length || 0}/{MAX_TITLE_LENGTH}
                                        </Text>
                                    }
                                    rightSectionWidth={50}
                                />

                                <TextInput
                                    withAsterisk
                                    label="URL"
                                    description="URL del botón"
                                    placeholder="https://example.com"
                                    style={{ flex: "1 1 auto" }}
                                    {...form.getInputProps(`links.${index}.url`)}
                                />
                            </Group>

                            {index < form.values.links.length - 1 && <Divider />}
                        </div>
                    ))}
                </Fieldset>

                <ModalButtons
                    label="Editar"
                    loading={loading}
                />
            </Stack>
        </form>
    )
}

// 178 lineas -> 164 lineas