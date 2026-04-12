import { Divider, Fieldset, Stack, Text, TextInput } from "@mantine/core";
import { MAX_CODE_MEDICAL_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_YEAR_LENGTH } from "@/constants";
import { ModalButtons } from "@/components";
import type { UseFormReturnType } from "@mantine/form";

export interface FormValues {
    code: string;
    name: string;
    description: string;
    sp?: string | null;
    fpgc?: string | null;
    cbt_cae?: string;
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
                        description="Clave del medicamento"
                        placeholder="Ej. 010.000.0000.00"
                        maxLength={MAX_CODE_MEDICAL_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.code?.length || 0}/{MAX_CODE_MEDICAL_LENGTH}
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
                        description="Nombre del medicamento"
                        placeholder="Ej. Maxifloxacino"
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("name")}
                        onChange={(event) => {
                            form.setFieldValue("name", event.currentTarget.value.toUpperCase());
                        }}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Presentación"
                        description="Nombre de la enfermedad"
                        placeholder="Ej. Envase con 28 tabletas"
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                        onChange={(event) => {
                            form.setFieldValue("description", event.currentTarget.value.toUpperCase());
                        }}
                    />

                    <Divider />

                    <TextInput
                        label="SP"
                        description="Seguro Popular"
                        placeholder="Seguro Popular"
                        maxLength={MAX_CODE_MEDICAL_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.sp?.length || 0}/{MAX_CODE_MEDICAL_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("sp")}
                        onChange={(event) => {
                            form.setFieldValue("sp", event.currentTarget.value.toUpperCase());
                        }}
                    />

                    <Divider />

                    <TextInput
                        label="FPGC"
                        description="Fondo de Protección contra Gastos Catastróficos"
                        placeholder="Fondo de Protección contra Gastos Catastróficos"
                        maxLength={MAX_CODE_MEDICAL_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.fpgc?.length || 0}/{MAX_CODE_MEDICAL_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("fpgc")}
                        onChange={(event) => {
                            form.setFieldValue("fpgc", event.currentTarget.value.toUpperCase());
                        }}
                    />

                    <Divider />

                    <TextInput
                        label="CBT CAE"
                        description="CBT CAE"
                        placeholder="CBT CAE"
                        maxLength={MAX_YEAR_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.cbt_cae?.length || 0}/{MAX_YEAR_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("cbt_cae")}
                        onChange={(event) => {
                            form.setFieldValue("cbt_cae", event.currentTarget.value.toUpperCase());
                        }}
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