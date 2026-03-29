import { useModalStore } from "@/layout"
import { Button, Group } from "@mantine/core"

interface Props {
    loading?: boolean,
    label?: string
    disabled?: boolean
}

export const ModalButtons = ({
    loading = false,
    label = "Boton",
    disabled = false
}: Props) => {
    const { closeModal } = useModalStore()
    return (
        <Group gap={5} justify="flex-end">
            <Button
                variant="outline"
                disabled={loading}
                onClick={closeModal}
            >
                Cancelar
            </Button>
            <Button
                loading={loading}
                type="submit"
                disabled={disabled}
            >
                {label}
            </Button>
        </Group>
    )
}
