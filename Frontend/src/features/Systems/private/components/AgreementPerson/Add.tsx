import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateName, validateSelect } from "@/utils/validators"
import { useSystemsAgreementPersonStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddAgreementPerson = () => {
    const add = useSystemsAgreementPersonStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            name: "",
            group: null,
            zone: null,
            type: "HOLDER" as "HOLDER" | "DEPENDENT",
            holder: null,
        },
        validate: {
            name: (value) => validateName(value, { required: true }),
            group: (value) => validateSelect(value, { required: true }),
            zone: (value) => validateSelect(value, { required: true }),
            holder: (value, values) => validateSelect(value, { required: values.type === "DEPENDENT" })
        },
    });

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            await add(values)
        },
        {
            successTitle: "Paciente de Convenio Creado",
            successMessage: "El paciente de convenio fue creado correctamente",
            errorTitle: "Error al crear paciente de convenio"
        }
    )

    return (
        <Form
            form={form}
            onSubmit={handleSubmit}
            submitLabel="Agregar"
            isLoading={loading}
        />
    )
}

// 71 lineas -> 53 lineas -> 47 lineas