import { Button, Divider, Group, Stack, Text, TextInput } from "@mantine/core";
import { useModalStore } from "@/layout";
import { MAX_TITLE_LENGTH } from "@/constants";
import { MAX_CODE_LENGTH } from "@/constants/inputs";

interface Props {
    form: any;
    onSubmit: (values: any) => void;
    submitLabel: string;
    isLoading?: boolean;
}

export const Form = ({ form, onSubmit, submitLabel, isLoading }: Props) => {
    const { closeModal } = useModalStore()

    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                <div>
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
                </div>

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