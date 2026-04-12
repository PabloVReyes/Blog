import { Stack, TextInput, List, Group, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { Alert, ModalButtons } from "@/components";
import { useCrudSubmit } from "@/hooks";

interface CrudDeleteDialogProps {
    id: string | number;
    confirmValue: string;
    label: string;
    titleEntity: string;
    onDelete?: (id: string | number) => Promise<void>;
    warningItems: string[];
    children: React.ReactNode;
}

export const CrudDeleteDialog = ({
    id,
    confirmValue,
    titleEntity,
    onDelete,
    warningItems,
    children,
    label
}: CrudDeleteDialogProps) => {

    const { execute, loading } = useCrudSubmit({
        onSubmit: onDelete || (async () => { }),
        useFormData: false,
        successMessage: {
            title: `${titleEntity} Eliminada`,
            message: `El registro se ha eliminado correctamente`
        }
    });

    const form = useForm({
        initialValues: { value: "" },
        validate: {
            value: (val) => val === confirmValue ? null : "Escribe lo solicitado"
        }
    });

    return (
        <form onSubmit={form.onSubmit(() => execute(id, {}))}>
            <Stack>
                {children}

                <Alert
                    color="red"
                    title={
                        <Group align="center" gap="xs" mb="sm" wrap="nowrap">
                            <IconAlertTriangleFilled
                                size={20}
                                color="orange"
                                style={{ flex: "0 0 auto" }}
                            />
                            <Text fw={600} fz="lg">
                                ADVERTENCIA: Esta acción es irreversible
                            </Text>
                        </Group>
                    }
                    content={
                        <List size="sm">
                            {warningItems.map((item, i) => (
                                <List.Item key={i}>{item}</List.Item>
                            ))}
                        </List>
                    }
                />

                <TextInput
                    label={label}
                    placeholder={confirmValue}
                    autoFocus
                    {...form.getInputProps("value")}
                />

                {/* ModalButtons ya maneja el cierre internamente */}
                <ModalButtons
                    label="Eliminar"
                    loading={loading}
                    disabled={!form.isValid()}
                />
            </Stack>
        </form>
    );
};