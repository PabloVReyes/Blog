import { Form, type FormValues } from "./Form"
import { validateFile, validateSelect } from "@/utils/validators"
import { useVacationStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddVacation = () => {
    const add = useVacationStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                type: "CALENDAR" as "CALENDAR" | "INDEX",
                shift: null,
                file: null as File | null
            }}
            validate={{
                type: (value) => validateSelect(value, { required: true }),
                shift: (value) => validateSelect(value, { required: true }),
                file: (value) => validateFile(value, { required: true })
            }}
            successTitle="Vacaciones Creadas"
            successMessage="Las vacaciones fueron creadas correctamente"
            errorTitle="Error al crear vacaciones"
            onSubmit={async (values) => {
                const formData = new FormData()
                formData.append("type", values.type)
                formData.append("shift", String(values.shift))

                if (values.file) {
                    formData.append("file", values.file)
                }
                await add?.(formData)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Agregar"
                    isLoading={loading}
                />
            )}
        />
    )
}