import { Form, type FormValues } from "./Form"
import { validateFile, validateName } from "@/utils"
import { useJuristicStore } from "@/stores"
import type { JuristicData } from "../../types/juristic.types"
import { CrudEditDialog } from "@/components"

export const Edit = ({ id, description, isNew, name, file }: JuristicData) => {
    const update = useJuristicStore(s => s.update)

    return (
        <CrudEditDialog<FormValues>
            id={id}
            initialValues={{
                name,
                description,
                isNew,
                file: null as File | null
            }}
            validate={{
                name: (value) => validateName(value, { required: true }),
                file: (value) => validateFile(value, { required: true, existingFileName: file?.name })
            }}
            successTitle="Disposición Juridica Editada"
            successMessage="La disposición juridica fue editada correctamente"
            errorTitle="Error al editar disposición juridica"
            onSubmit={async (id, values) => {
                const formData = new FormData()
                formData.append("name", values.name)
                formData.append("description", values.description)
                formData.append("isNew", String(values.isNew))
                if (values.file) {
                    formData.append("file", values.file)
                }
                await update?.(id.toString(), formData)
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