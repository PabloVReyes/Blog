import { Form, type FormValues } from "./Form"
import { validateDescription, validateOrder, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsGPCStore } from "@/stores"
import type { GPCData } from "@/features/Systems/types/gpc.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, title, file, description, cycle, orderIndex }: GPCData) => {
    const update = useSystemsGPCStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                title,
                description,
                orderIndex,
                cycle: String(cycle.id),
                file: null as File | null,
            }}
            validate={{
                title: validateTitle,
                description: validateDescription,
                cycle: (value) => validateSelect(value, { required: true }),
                orderIndex: (value) => validateOrder(value, { required: true }),
                file: (value) => validatePdf(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Algoritmo GPC Editado"
            successMessage="El algoritmo GPC fue editado correctamente"
            errorTitle="Error al actualizar el algoritmo GPC"
            onSubmit={async (id, values) => {
                const formData = new FormData();
                formData.append("title", values.title)
                formData.append("description", values.description)
                formData.append("cycle", values.cycle)
                formData.append("orderIndex", String(values.orderIndex))

                if (values.file) {
                    formData.append("file", values.file!)
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
                    initialCycle={{
                        value: cycle?.id?.toString(),
                        label: cycle?.name
                    }}
                />
            )}
        />
    )
}