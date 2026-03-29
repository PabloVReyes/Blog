import { useForm } from "@mantine/form";
import { Form } from "./Form";
import { useState } from "react";
import { Notify, showSuccessModal } from "@/ui";
import { validateName, validateSelect } from "@/utils/validators";
import { useSystemsAgreementPersonStore } from "@/stores";
import type { AgreementPerson } from "../../types/agreementPerson.types";

export const Edit = ({ name, groupId, zoneId, type, holders, id, zone, group }: AgreementPerson) => {
    const update = useSystemsAgreementPersonStore(s => s.update);
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: name,
            group: groupId?.toString() || null,
            zone: zoneId?.toString() || null,
            type: type as "HOLDER" | "DEPENDENT",
            holder: holders?.[0]?.id?.toString() || null,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            group: (value) => validateSelect(value, { required: true }),
            zone: (value) => validateSelect(value, { required: true }),
            holder: (value, values) => validateSelect(value, { required: values.type === "DEPENDENT" })
        },
    });

    const handleSubmit = async (values: typeof form.values) => {
        try {
            setLoading(true);
            await update?.(id, values);
            showSuccessModal("Paciente de Convenio Editado", "El paciente de convenio fue editado correctamente")
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al actualizar Paciente de Convenio",
                message: error instanceof Error ? error.message : "Error desconocido"
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
                value: group?.id?.toString(),
                label: group?.name,
            }}
            initialZone={{
                value: zone?.id?.toString(),
                label: zone?.name,
            }}
        />
    );
};

// 82 lineas -> 66 lineas