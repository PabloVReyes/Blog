import { useState } from 'react';
import { Notify, showSuccessModal } from "@/ui";

interface SuccessMessage {
    title: string;
    message: string;
}

interface UseCrudSubmitProps {
    onSubmit: (...args: any[]) => Promise<void>;
    successMessage: SuccessMessage;
    errorMessage?: { title: string };
    onSuccess?: () => void;
    useFormData?: boolean;
}

export function useCrudSubmit({
    onSubmit,
    successMessage,
    errorMessage,
    onSuccess
}: UseCrudSubmitProps) {
    const [loading, setLoading] = useState(false);

    /**
     * @param args - Puede recibir:
     * - [data] para Add
     * - [id, data] para Edit
     * - [id] para Delete
     */
    const execute = async (...args: any[]) => {
        try {
            setLoading(true);
            await onSubmit(...args);
            showSuccessModal(successMessage.title, successMessage.message);
            if (onSuccess) onSuccess();

        } catch (error: any) {
            const detail = error.response?.data?.message || error.message || "Error desconocido";

            Notify({
                type: "error",
                title: errorMessage?.title || "Error en la operación",
                message: detail
            });

            throw error;
        } finally {
            setLoading(false);
        }
    };

    return { execute, loading };
}