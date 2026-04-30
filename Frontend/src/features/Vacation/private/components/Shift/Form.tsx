import { Divider, Fieldset, Group, Text, TextInput } from "@mantine/core";
import { BaseForm, ColorSelect, IconSelect, ThemeIcon } from "@/components";
import { MAX_TITLE_LENGTH } from "@/constants";
import { getTablerIcon } from "@/helpers";
import type { UseFormReturnType } from "@mantine/form";

export interface FormValues {
    name: string;
    icon: string;
    color: string;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props<FormValues>) => {
    const Icon = getTablerIcon(form.values.icon)

    return (
        <BaseForm
            form={form}
            onSubmit={onSubmit}
            submitLabel={submitLabel}
            isLoading={isLoading}
        >
            <Fieldset legend="Información">
                <TextInput
                    withAsterisk
                    label="Nombre"
                    description="Nombre del Turno"
                    placeholder="Ej. Matutino"
                    maxLength={MAX_TITLE_LENGTH}
                    rightSection={
                        <Text size="xs" c="dimmed">
                            {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                        </Text>
                    }
                    rightSectionWidth={40}
                    {...form.getInputProps("name")}
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
                        variant="filled"
                        color={form.values.color}
                    >
                        <Icon />
                    </ThemeIcon>
                </Group>
            </Fieldset>
        </BaseForm>
    )
}