import { Form, type FormValues } from "./Form"
import { validateColor, validateIcon, validateName } from "@/utils/validators"
import { useDownloadAreasStore } from "@/stores"
import type { Area } from "../../types/areas.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, icon, color, name }: Area) => {
    const update = useDownloadAreasStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                icon,
                color
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                icon: validateIcon,
                color: validateColor,
            }}
            successTitle="Área Editada"
            successMessage="El área fue editada correctamente"
            errorTitle="Error al actualizar área"
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