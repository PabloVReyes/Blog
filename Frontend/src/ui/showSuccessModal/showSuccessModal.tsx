import { useModalStore } from "@/layout"
import { Stack, Text } from "@mantine/core"
import { IconCircleCheck } from "@tabler/icons-react"

// ui/showSuccessModal.ts
export const showSuccessModal = (title: string, message: string) => {
    const { openModal } = useModalStore.getState()

    openModal({
        title,
        autoClose: 2500,
        content: (
            <Stack align="center" p="xl">
                <IconCircleCheck size={60} color="green" />
                <Text ta="center">{message}</Text>
            </Stack>
        ),
    })
}