import { useModalStore } from "@/layout"
import { Button, Group } from "@mantine/core"

interface Props {
    loading?: boolean,
    label?: string
}

export const ModalButtons = ({
    loading = false,
    label = "Boton"
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
            >
                {label}
            </Button>
        </Group>
    )
}
