import { Divider, Fieldset, Stack, Text, TextInput } from "@mantine/core";
import { MAX_TITLE_LENGTH, MAX_CODE_LENGTH } from "@/constants";
import { ModalButtons } from "@/components";
import type { UseFormReturnType } from "@mantine/form";

export interface FormValues {
    code: string;
    name: string;
}

interface Props<T extends FormValues> {
    form: UseFormReturnType<T>
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props<FormValues>) => {
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset>
                    <TextInput
                        withAsterisk
                        label="Clave"
                        description="Clave de la enfermedad"
                        placeholder="Ej. A001"
                        maxLength={MAX_CODE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.code?.length || 0}/{MAX_CODE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("code")}
                        onChange={(event) => {
                            form.setFieldValue("code", event.currentTarget.value.toUpperCase());
                        }}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre de la enfermedad"
                        placeholder="Ej. Cólera"
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

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    )
}