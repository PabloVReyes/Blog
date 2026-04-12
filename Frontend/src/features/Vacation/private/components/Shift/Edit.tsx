import { Form, type FormValues } from "./Form"
import { validateColor, validateIcon, validateName } from "@/utils"
import { useVacationShiftStore } from "@/stores"
import type { ShiftData } from "@/features/Vacation/types/vacations.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, name, icon, color }: ShiftData) => {
    const update = useVacationShiftStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                icon,
                color,
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                icon: validateIcon,
                color: validateColor
            }}
            successTitle="Turno Editado"
            successMessage="El turno fue editado correctamente"
            errorTitle="Error al editar turno"
            onSubmit={async (id, values) => {
                await update?.(id, values)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                />
            )}
        />
    )
}