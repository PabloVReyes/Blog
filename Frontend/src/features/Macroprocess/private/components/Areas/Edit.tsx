import { Stack, Text, TextInput } from "@mantine/core"
import { MAX_TITLE_LENGTH } from "@/constants";
import { CrudEditDialog, ModalButtons } from "@/components";
import { useMacroprocessAreaStore } from "@/stores";
import { validateName } from "@/utils";
import type { Area } from "@/features/Macroprocess/types/areas.types";

interface FormValues {
    name: string;
}

export const Edit = ({ id, name }: Area) => {
    const update = useMacroprocessAreaStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name
            }}
            validate={{
                name: (value) => validateName(value, { required: true })
            }}
            successTitle="Área Editada"
            successMessage="El área fue editada correctamente"
            errorTitle="Error al editar el área"
            onSubmit={async (id, values) => {
                await update?.(id, values)
            }}
            renderForm={(form, loading, execute) => (
                <form onSubmit={form.onSubmit(execute)}>
                    <Stack>
                        <TextInput
                            withAsterisk
                            label="Nombre"
                            description="Nombre del área"
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