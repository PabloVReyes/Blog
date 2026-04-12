import { Form, type FormValues } from "./Form"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useVacationShiftStore } from "@/stores"
import { CrudAddDialog } from "@/components"

export const AddShift = () => {
    const add = useVacationShiftStore(s => s.add);

    return (
        <CrudAddDialog<FormValues>
            initialValues={{
                name: "",
                icon: "",
                color: ""
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                icon: validateIcon,
                color: validateColor
            }}
            successTitle="Turno Creado"
            successMessage="El turno fue creado correctamente"
            errorTitle="Error al crear Turno"
            onSubmit={async (values) => {
                await add?.(values)
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