import { ColorSelect, CrudEditDialog, IconSelect, ModalButtons, ThemeIcon } from "@/components"
import { Divider, Fieldset, Group, Stack, Text, TextInput } from "@mantine/core"
import { formRootRule } from "@mantine/form"
import { validateColor, validateDescription, validateIcon, validateTitle, validateUrl } from "@/utils";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
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

interface Links {
    id: string;
    title: string;
    url: string;
    orderIndex: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    derechohabienciaConfigId: string;
}

interface FormValues {
    title: string;
    icon: string;
    color: string;
    description: string
    links: Links[]
}

export const Edit = ({ id, icon, color, title, description, links }: Props) => {
    const update = useHomeDerechohabienciaStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                title,
                icon,
                color,
                description,
                links
            }}
            validate={{
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
            }}
            successTitle="Segunda Sección Editada"
            successMessage="La segunda sección fue editada correctamente"
            errorTitle="Error al editar segunda sección"
            onSubmit={async (id, values) => {
                await update?.(id, values)
            }}
            renderForm={(form, loading, execute) => (
                    <form onSubmit={form.onSubmit(execute)}>
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
                                        color={form.values.color}
                                    >
                                        {(() => {
                                            const DynamicIcon = getTablerIcon(form.values.icon);
                                            return <DynamicIcon />;
                                        })()}
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
        />
    )
}