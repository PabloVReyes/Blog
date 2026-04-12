import { Form, type FormValues } from "./Form"
import { validateFile, validateSelect } from "@/utils"
import { useVacationStore } from "@/stores"
import type { VacationsData } from "@/features/Vacation/types/vacations.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, type, shiftId, file }: VacationsData) => {
    const update = useVacationStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                type: type as "CALENDAR" | "INDEX",
                shift: String(shiftId),
                file: null as File | null
            }}
            validate={{
                type: (value) => validateSelect(value, { required: true }),
                shift: (value) => validateSelect(value, { required: true }),
                file: (value) => validateFile(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Vacaciones Editadas"
            successMessage="Las vacaciones fueron editadas correctamente"
            errorTitle="Error al editar vacaciones"
            onSubmit={async (id, values) => {
                const formData = new FormData()
                formData.append("type", values.type)
                formData.append("shift", String(values.shift))
                if (values.file) {
                    formData.append("file", values.file)
                }
                await update?.(id, formData)
            }}
            renderForm={(form, loading, execute) => (
                <Form
                    form={form}
                    onSubmit={execute}
                    submitLabel="Editar"
                    isLoading={loading}
                    fileName={file?.name}
                />
            )}
        />
    )
}