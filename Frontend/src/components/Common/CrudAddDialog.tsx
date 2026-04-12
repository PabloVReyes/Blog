import { useForm, type UseFormReturnType, type FormValidateInput } from "@mantine/form";
import { useCrudSubmit } from "@/hooks"; // El hook unificado que creamos

interface CrudAddDialogProps<T> {
    initialValues: T;
    // Tipamos validate usando los tipos internos de Mantine para evitar el error de 'any'
    validate: FormValidateInput<T>;
    onSubmit: (values: T) => Promise<void>;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    // Pasamos el form, el estado loading y la función execute al renderizado
    renderForm: (
        form: UseFormReturnType<T>,
        loading: boolean,
        execute: (values: T) => Promise<void>
    ) => React.ReactNode;
}

// Añadimos la restricción <T extends Record<string, any>> para que useForm funcione correctamente
export function CrudAddDialog<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit,
    successTitle,
    successMessage,
    errorTitle,
    renderForm,
}: CrudAddDialogProps<T>) {

    // 1. Inicializamos el formulario con el tipo genérico T
    const form = useForm<T>({
        mode: "controlled",
        initialValues,
        validate,
    });

    // 2. Configuramos la lógica de envío mediante el hook unificado
    const { execute, loading } = useCrudSubmit({
        onSubmit: async (values: T) => await onSubmit(values),
        successMessage: {
            title: successTitle,
            message: successMessage
        },
        errorMessage: {
            title: errorTitle
        }
    });

    // 3. Retornamos el renderizado personalizado
    return <>{renderForm(form, loading, execute)}</>;
}