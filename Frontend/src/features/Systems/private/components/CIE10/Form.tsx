import { Divider, Fieldset, Stack, Text, TextInput } from "@mantine/core";
import { MAX_TITLE_LENGTH, MAX_CODE_LENGTH } from "@/constants";
import { ModalButtons } from "@/components";
import type { UseFormReturnType } from "@mantine/form";

interface FormValues {
    code: string;
    name: string;
}

interface Props {
    form: UseFormReturnType<FormValues>
    onSubmit: (values: FormValues) => void;
    submitLabel: string;
    isLoading?: boolean;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
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