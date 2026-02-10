import type { UseFormReturnType } from "@mantine/form"
import { Button, Divider, Fieldset, Group, Stack, Text, Textarea, TextInput, ThemeIcon } from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";
import { ColorSelect, IconSelect, PageSelect } from "@/components";
import type { SystemProps } from "@/features/Systems/types";
import { useModalStore } from "@/layout";

interface Props {
    form: UseFormReturnType<SystemProps>;
    onSubmit: (values: SystemProps) => void;
    submitLabel: string;
    isLoading?: boolean;
}

const MAX_NAME_LENGTH = 50
const MAX_NAME_DESCRIPTION = 500

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
    const { closeModal } = useModalStore()

    const Icon =
        form.values.icon &&
        (TablerIcons as any)[form.values.icon];

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Nombre"
                            description="Nombre del sistema"
                            placeholder="Ej. SICA"
                            maxLength={MAX_NAME_LENGTH}
                            rightSection={
                                <Text size="xs" c="dimmed">
                                    {form.values.name?.length || 0}/{MAX_NAME_LENGTH}
                                </Text>
                            }
                            rightSectionWidth={75}
                            {...form.getInputProps("name")}
                        />

                        <Divider />

                        <Textarea
                            withAsterisk
                            label="Descripción"
                            autosize
                            minRows={2}
                            maxRows={4}
                            description="Descripción el cual tendra el sistemas"
                            placeholder="Ej. Sistema Integral Medico Administrativo"
                            maxLength={MAX_NAME_DESCRIPTION}
                            rightSection={
                                <Text size="xs" c="dimmed">
                                    {form.values.description?.trim().length || 0}/{MAX_NAME_DESCRIPTION}
                                </Text>
                            }
                            rightSectionWidth={75}
                            {...form.getInputProps("description")}
                        />

                        <Divider />

                        <PageSelect
                            form={form}
                        />
                    </Stack>
                </Fieldset>

                <Fieldset legend="Icono">
                    <Group justify="space-between" align="center" wrap="nowrap">
                        <IconSelect
                            form={form}
                        />
                        <ColorSelect
                            type="default"
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
                            className="iconWrapper"
                        >
                            {Icon ? <Icon /> : null}
                        </ThemeIcon>
                    </Group>
                </Fieldset>

                <Group gap={5} justify="flex-end">
                    <Button variant="outline" onClick={closeModal}>
                        Cancelar
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