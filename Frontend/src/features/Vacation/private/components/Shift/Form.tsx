import { Divider, Fieldset, Group, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import { ColorSelect, IconSelect, ModalButtons } from "@/components";
import { MAX_TITLE_LENGTH } from "@/constants";
import * as TablerIcons from "@tabler/icons-react";

interface Props {
    form: any;
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
    const Icon =
        form.values.icon &&
        (TablerIcons as any)[form.values.icon];

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
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
                            className="themeIcon"
                        >
                            {Icon ? <Icon /> : null}
                        </ThemeIcon>
                    </Group>
                </Fieldset>

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}