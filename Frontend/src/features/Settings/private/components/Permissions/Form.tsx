import { Divider, Fieldset, Stack, Text, TextInput } from "@mantine/core";
import { ModalButtons, Switch } from "@/components";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "@/constants";
import { type UseFormReturnType } from '@mantine/form'

interface RoleFormValues {
    isActive: boolean
    name: string
    description: string
}


interface Props {
    form: UseFormReturnType<RoleFormValues>;
    onSubmit: (values: RoleFormValues) => void;
    submitLabel: string;
    isLoading?: boolean;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <Fieldset legend="Información">
                    <Switch
                        label="Estado"
                        description='Estado del permiso: Activo/Inactivo'
                        value={form.values.isActive}
                        {...form.getInputProps("isActive", { type: "checkbox" })}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Nombre"
                        description="Nombre del permiso"
                        placeholder="Ej. Ver usuarios"
                        maxLength={MAX_TITLE_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={40}
                        {...form.getInputProps("name")}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Código Unico"
                        description="Código del permiso"
                        placeholder="Ej. user.read"
                        {...form.getInputProps("key")}
                        onChange={(event) => {
                            const value = event.currentTarget.value
                                .toLowerCase()
                                .replace(/\s/g, "");

                            form.setFieldValue("key", value);
                        }}
                    />

                    <Divider />

                    <TextInput
                        withAsterisk
                        label="Descripción"
                        description="Describe qué permite hacer este permiso."
                        maxLength={MAX_DESCRIPTION_LENGTH}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                {form.values.description?.length || 0}/{MAX_DESCRIPTION_LENGTH}
                            </Text>
                        }
                        rightSectionWidth={50}
                        {...form.getInputProps("description")}
                        placeholder="Permite ver usuarios"
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