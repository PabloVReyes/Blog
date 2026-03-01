import { Divider, Fieldset, Group, Stack, Text, TextInput, ThemeIcon } from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";
import { ColorSelect, IconSelect, ModalButtons } from "@/components";
import type { SystemProps } from "@/features/Systems/types";
import { MAX_TITLE_LENGTH } from "@/constants";

interface Props {
    form: any;
    onSubmit: (values: SystemProps) => void;
    submitLabel: string;
    isLoading?: boolean;
    activeIndex: number,
    setActiveIndex: (index: number) => void
    fileName?: string;
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
                        description="Nombre del Área"
                        placeholder="Ej. Dirección"
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
                            radius={"50%"}
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