import { Divider, Fieldset, Stack, Text, TextInput } from "@mantine/core"
import { ColorSelect, CrudEditDialog, ModalButtons } from "@/components";
import { validateCode, validateColor, validateName } from "@/utils";
import { useMacroprocessManualTypeStore } from "@/stores";
import type { ManualType } from "@/features/Macroprocess/types/manuals.types";
import { MAX_CODE_LENGTH, MAX_TITLE_LENGTH } from "@/constants";

interface FormValues {
    code: string;
    name: string;
    color: string;
}

export const Edit = ({ id, name, color }: ManualType) => {
    const update = useMacroprocessManualTypeStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                code: id,
                name: name,
                color: color
            }}
            validate={{
                code: validateCode,
                name: (value) => validateName(value, { required: true }),
                color: (value) => validateColor(value)
            }}
            successTitle="Tipo de manual editado"
            successMessage="El tipo de manual fue editado correctamente"
            errorTitle="Error al editar manual"
            onSubmit={async (id, values) => {
                await update?.(id, values)
            }}
            renderForm={(form, loading, execute) => (
                <form onSubmit={form.onSubmit(execute)}>
                    <Stack>
                        <Fieldset>
                            <TextInput
                                withAsterisk
                                label="Código"
                                description="Código del manual"
                                placeholder="NSICA"
                                autoFocus
                                {...form.getInputProps("code")}
                                onChange={(event) => {
                                    form.setFieldValue("code", event.currentTarget.value.toUpperCase());
                                }}
                                maxLength={MAX_CODE_LENGTH}
                                rightSection={
                                    <Text size="xs" c="dimmed">
                                        {form.values.code?.length || 0}/{MAX_CODE_LENGTH}
                                    </Text>
                                }
                                rightSectionWidth={50}
                            />
                            <Divider />
                            <TextInput
                                withAsterisk
                                label="Nombre"
                                description="Nombre del manual"
                                placeholder="Procedimientos"
                                maxLength={MAX_TITLE_LENGTH}
                                rightSection={
                                    <Text size="xs" c="dimmed">
                                        {form.values.name?.length || 0}/{MAX_TITLE_LENGTH}
                                    </Text>
                                }
                                {...form.getInputProps("name")}
                                rightSectionWidth={50}
                            />
                            <Divider />
                            <ColorSelect
                                form={form}
                            />
                        </Fieldset>
                        <ModalButtons
                            label="Editar"
                            loading={loading}
                        />
                    </Stack>
                </form>
            )}
        />
    )
}