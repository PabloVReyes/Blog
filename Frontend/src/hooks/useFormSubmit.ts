import { extractErrorMessage } from "@/lib"
import { Notify, showSuccessModal } from "@/ui"
import { useState } from "react"

// hooks/useFormSubmit.ts
export function useFormSubmit<T>(
    action: (values: T) => Promise<void>,
    options: {
        successTitle: string
        successMessage: string
        errorTitle?: string
        onSuccess?: () => void
    }
) {
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (values: T) => {
        setLoading(true)
        try {
            await action(values)
            showSuccessModal(options.successTitle, options.successMessage)
            options.onSuccess?.()
        } catch (error) {
            Notify({ type: 'error', title: options.errorTitle ?? 'Error', message: extractErrorMessage(error) })
        } finally {
            setLoading(false)
        }
    }

    return { loading, handleSubmit }
}