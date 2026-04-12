import { Form, type FormValues } from "./Form";
import { validateName, validateSelect } from "@/utils/validators";
import { useSystemsAgreementPersonStore } from "@/stores";
import type { AgreementPerson } from "../../types/agreementPerson.types";
import { CrudEditDialog } from "@/components";

export const Edit = ({ name, groupId, zoneId, type, holders, id, zone, group }: AgreementPerson) => {
    const update = useSystemsAgreementPersonStore(s => s.update);

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                group: groupId?.toString() || null,
                zone: zoneId?.toString() || null,
                type: type as "HOLDER" | "DEPENDENT",
                holder: holders?.[0]?.id?.toString() || null,
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                group: (value) => validateSelect(value, { required: true }),
                zone: (value) => validateSelect(value, { required: true }),
                holder: (value, values) => validateSelect(value, { required: values.type === "DEPENDENT" })
            }}
            successTitle="Paciente de Convenio Editado"
            successMessage="El paciente de convenio fue editado correctamente"
            errorTitle="Error al actualizar Paciente de Convenio"
            onSubmit={async (id, values) => (
                await update?.(id, values)
            )}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
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
            )}
        />
    )
};