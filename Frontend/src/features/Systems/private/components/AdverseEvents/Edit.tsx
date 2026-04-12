import { Form, type FormValues } from "./Form"
import { validatePdf } from "@/utils/validators"
import { useSystemsAdverseEventsStore } from "@/stores"
import type { AdverseEventsData } from "../../types/adverseEvents.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, file }: AdverseEventsData) => {
    const update = useSystemsAdverseEventsStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                file: null as File | null,
            }}
            validate={{
                file: (value) => validatePdf(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Evento Adverso Editado"
            successMessage="El evento adverso fue editado correctamente"
            errorTitle="Error al editar evento adverso"
            onSubmit={async (id, values) => {
                const formData = new FormData();
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
                />
            )}
        />
    )
}