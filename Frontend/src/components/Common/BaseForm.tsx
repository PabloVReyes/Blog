// Frontend/src/components/shared/BaseForm.tsx
import { Stack } from "@mantine/core";
import { type UseFormReturnType } from "@mantine/form";
import { ModalButtons } from "@/components";
import { type ReactNode } from "react";

interface BaseFormProps<T> {
    form: UseFormReturnType<T>;
    onSubmit: (values: T) => void;
    submitLabel: string;
    isLoading?: boolean;
    children: ReactNode;
    legend?: string;
}

export const BaseForm = <T,>({
    form,
    onSubmit,
    submitLabel,
    isLoading,
    children,
}: BaseFormProps<T>) => {
    return (
        <form onSubmit={form.onSubmit(onSubmit)}>
            <Stack>
                {children}

                <ModalButtons
                    label={submitLabel}
                    loading={isLoading}
                />
            </Stack>
        </form>
    );
};