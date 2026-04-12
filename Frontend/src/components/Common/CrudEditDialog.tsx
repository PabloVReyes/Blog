import { useForm, type FormValidateInput, type UseFormReturnType } from "@mantine/form";
import { useCrudSubmit } from "@/hooks";

interface CrudEditDialogProps<T> {
    id: string | number;
    initialValues: T;
    validate: FormValidateInput<T>;
    onSubmit: (id: string | number, values: T) => Promise<void>;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    renderForm: (
        form: UseFormReturnType<T>,
        loading: boolean,
        execute: (values: T) => Promise<void>
    ) => React.ReactNode;
}

export function CrudEditDialog<T extends Record<string, any>>({
    id,
    initialValues,
    validate,
    onSubmit,
    successTitle,
    successMessage,
    errorTitle,
    renderForm,
}: CrudEditDialogProps<T>) {

    const form = useForm<T>({
        mode: "controlled",
        initialValues,
        validate,
    });

    const { execute, loading } = useCrudSubmit({
        onSubmit: async (values: T) => await onSubmit(id, values),
        successMessage: { title: successTitle, message: successMessage },
        errorMessage: { title: errorTitle }
    });

    return <>{renderForm(form, loading, execute)}</>;
}