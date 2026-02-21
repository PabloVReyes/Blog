import { useForm } from "@mantine/form";
import { Form } from "./Form";
import { useAgreementPersonStore } from "../../store";
import { Stack, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import { useState } from "react";
import { useModalStore } from "@/layout";
import { Notify } from "@/ui";
import { validateName, validateSelect } from "@/utils/validators";

export const Edit = (person: any) => {
    const { openModal } = useModalStore();
    const { update } = useAgreementPersonStore();
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: person.name,
            group: person.groupId?.toString() || null,
            zone: person.zoneId?.toString() || null,
            type: person.type as "HOLDER" | "DEPENDENT",
            holder: person.holders?.[0]?.id?.toString() || null,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            group: (value) => validateSelect(value, { required: true }),
            zone: (value) => validateSelect(value, { required: true }),
            holder: (value, values) => validateSelect(value, { required: values.type === "DEPENDENT"})
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true);
            await update(person.id, values);

            openModal({
                title: "Paciente de Convenio actualizado",
                autoClose: 2500,
                content: (
                    <Stack align="center" p="xl">
                        <IconCheck size={60} color="green" />
                        <Text ta="center">
                            El Paciente de Convenio ha sido actualizado correctamente.
                        </Text>
                    </Stack>
                ),
            });
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al actualizar Paciente de Convenio",
                message: error.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Editar"
            isLoading={loading}
            initialGroup={{
                value: person.group?.id?.toString(),
                label: person.group?.name,
            }}
            initialZone={{
                value: person.zone?.id?.toString(),
                label: person.zone?.name,
            }}
            initialHolder={
                person.holders?.[0]
                    ? { value: person.holders[0].id.toString(), label: person.holders[0].name }
                    : null
            }
        />
    );
};