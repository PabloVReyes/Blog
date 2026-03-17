import { useForm } from "@mantine/form"
import { Form } from "./Form"
import { validateCode, validatePdf, validateSelect, validateTitle } from "@/utils/validators"
import { useSystemsClinicalPracticeGuidelinesStore } from "@/stores"
import { useFormSubmit } from "@/hooks"

export const AddClinicalPracticeGuidelines = () => {
    const add = useSystemsClinicalPracticeGuidelinesStore(s => s.add);

    const form = useForm({
        mode: "controlled",
        initialValues: {
            code: "",
            title: "",
            category: "",
            er: null as File | null,
            rr: null as File | null
        },
        validate: {
            title: validateTitle,
            code: validateCode,
            category: (value) => validateSelect(value, { required: true }),
            er: (value) => validatePdf(value, { required: true }),
            rr: (value) => validatePdf(value, { required: true })
        }
    })

    const { handleSubmit, loading } = useFormSubmit<typeof form.values>(
        async (values) => {
            if (!add) throw new Error("Add no definido")
            const formData = new FormData();
            formData.append("code", values.code)
            formData.append("title", values.title)
            formData.append("category", values.category)
            if (values.er) {
                formData.append("er", values.er!)
            }
            if (values.rr) {
                formData.append("rr", values.rr!)
            }
            await add(formData)
        },
        {
            successTitle: "Guía de Práctica Clínica Creada",
            successMessage: "La guía de práctica clínica fue creada correctamente",
            errorTitle: "Error al crear guía de práctica clínica"
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

// 85 lineas -> 64 lineas -> 58 lineas